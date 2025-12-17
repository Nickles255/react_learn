import PageNav from "../components/PageNav.jsx";
import styles from "./Homepage.module.css";

export default function PageNotFound() {
    return (
        <main className={styles.homepage}>
            <PageNav/>
            <h1>Page not found 😢</h1>
        </main>
    );
}
