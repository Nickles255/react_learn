import styles from './Search.module.css'
import Button from "./Button.jsx";

export default function Search() {
    return (
        <div className={styles.searchRow}>
            <label htmlFor="searchBox">Pokemon Name: </label>
            <input
                id="searchBox"
            />
            <Button type="back">Search</Button>
        </div>
    );
}