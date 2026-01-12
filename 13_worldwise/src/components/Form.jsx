// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import {useURLPosition} from "../hooks/useURLPosition.js";
import FlagImg from "./FlagImg.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useNavigate} from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const [lat, lng] = useURLPosition();
    const {createCity, isLoading} = useCities();
    const navigate = useNavigate();

    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [geoCodingError, setGeoCodingError] = useState("");

    const [isLoadingGeocoding, setIsInLoadingGeocoding] = useState(false);
    useEffect(() => {
        if (!lat && !lng) return;

        async function fetchCityData() {
            try {
                setGeoCodingError("");
                setIsInLoadingGeocoding(true);
                const res = await fetch(
                    `${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                console.log(data);
                if (!data.countryCode) throw new Error(
                    "That doesn't seem to be a city. Click somewhere else 🙂"
                );


                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (err) {
                setGeoCodingError(err);
            } finally {
                setIsInLoadingGeocoding(false);
            }
        }

        fetchCityData();
    }, [lat, lng])

    async function handleSubmit(e) {
        e.preventDefault();
        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date: date.toISOString(),
            notes,
            position: {lat, lng},
        };
        await createCity(newCity);
        navigate("/app/cities")
    }

    if (isLoadingGeocoding) return <Spinner/>

    if (!lat && !lng) return <Message message="Start by clicking somewhere on the map"/>

    if (geoCodingError) return <Message message={geoCodingError.message}/>

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading :""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}><FlagImg emoji={emoji}/></span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker id="date"
                    selected={date}
                    onChange={date => setDate(date)}
                    dateFormat="dd/MMM/yyyy"
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
