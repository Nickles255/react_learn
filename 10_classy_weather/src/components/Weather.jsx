import Day from "./Day.jsx";

export default function Weather({weather, location}) {
    const dates = weather.time;
    const min = weather.temperature_2m_min;
    const max = weather.temperature_2m_max;
    const codes = weather.weathercode;

    return (
        <div>
            <h2>Weather {location}</h2>
            <ul className="weather">
                {/*    <p>{thisDay}</p>*/}
                {dates?.map((thisDay, i) => (
                <Day
                    date={thisDay}
                    max={max[i]}
                    min={min[i]}
                    code={codes[i]}
                    isToday={i === 0}
                />
                ))}
            </ul>
        </div>
    );


}