import styles from "./CountryItem.module.css";
import flagemojiToPNG from "../utils/flagemojiToPNG.js";

function CountryItem({ country }) {
   const flag = flagemojiToPNG(country.emoji);
    return (
    <li className={styles.countryItem}>
      <span>{flag ? <img src={flag} alt="flag" /> : ""}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
