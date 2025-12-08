import React, {useEffect} from 'react';
import Input from "./components/Input.jsx";
import convertToFlag from "./components/convertToFlag.jsx";
import Weather from "./components/Weather.jsx";

export default function App() {
    const [location, setLocation] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [displayLocation, setDisplayLocation] = React.useState("");
    const [weather, setWeather] = React.useState({});

    function handleLocationChange(e) {
        setLocation(e.target.value);
        console.log(e.target.value);
    }

    useEffect(function () {
        setLocation(localStorage.getItem("location") || "");
    }, []);

    useEffect(function () {
            const geoController = new AbortController();
            const weatherController = new AbortController();

            async function fetchWeather() {
                if (location.length < 2) return setWeather({});

                try {
                    setIsLoading(true);
                    const geoRes = await fetch(
                        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
                        { signal: geoController.signal }
                    );
                    const geoData = await geoRes.json();
                    console.log(geoData);
                    if (!geoRes.ok) throw new Error("Something went wrong with fetching geolocation");

                    if (!geoData.results) throw new Error("Location not found");

                    const {latitude, longitude, timezone, name, country_code} = geoData.results.at(0);
                    setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

                    const weatherRes = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
                         { signal: weatherController.signal }

                    );
                    if (!weatherRes.ok) throw new Error("Something went wrong with fetching weather");

                    const weatherData = await weatherRes.json();
                    console.log(weatherData.daily);
                    setWeather(weatherData.daily);

                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }

            fetchWeather();
        }
        , [location]);

    return (
        <div className="app">
            <h1>Classy Weather</h1>
            <Input location={location} onChangeLocation={handleLocationChange}/>
            {isLoading && <p className="loader">Loading...</p>}
            {weather.weathercode &&
                <Weather weather={weather} location={displayLocation}/>
            }
        </div>

    );
}