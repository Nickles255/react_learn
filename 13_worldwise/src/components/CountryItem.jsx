import styles from "./CountryItem.module.css";
import FlagImg from "./FlagImg.jsx";

function CountryItem({ country }) {
    return (
    <li className={styles.countryItem}>
      <span><FlagImg emoji={country.emoji}/></span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
