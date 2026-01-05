import {useEffect, useState} from "react";
import {PostProvider} from "./Components/PostProvider";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Archive from "./Components/Archive";
import Footer from "./Components/Footer";

function App() {
    const [isFakeDark, setIsFakeDark] = useState(false);

    // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
    function handleFakeDarkMode() {
        setIsFakeDark((isFakeDark) => !isFakeDark);
    }

    useEffect(
        function () {
            document.documentElement.classList.toggle("fake-dark-mode");
        },
        [isFakeDark]
    );

    return (
        <section>
            <button
                className="btn-fake-dark-mode"
                onClick={handleFakeDarkMode}
            >
                {isFakeDark ? "☀️" : "🌙"}
            < /button>

            <PostProvider>
                <Header/>
                <Main/>
                <Archive/>
                <Footer/>
            </PostProvider>
        </section>
    );
}

export default App;
