import {createContext, useEffect, useState} from "react";
import createRandomPost from "./Components/createRandomPost";
import Button from "./Components/Button";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Archive from "./Components/Archive";
import Footer from "./Components/Footer";


// 1) create a context
export const PostContext = createContext();

function App() {
    const [posts, setPosts] = useState(() =>
        Array.from({length: 30}, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [isFakeDark, setIsFakeDark] = useState(false);

    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    function handleFakeDarkMode() {
        setIsFakeDark((isFakeDark) => !isFakeDark);
    }

    // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
    useEffect(
        function () {
            document.documentElement.classList.toggle("fake-dark-mode");
        },
        [isFakeDark]
    );

    return (
        // 2) Provide value to child components
        <PostContext.Provider value={{
            posts: searchedPosts,
            onAddPost: handleAddPost,
            onClearPosts: handleClearPosts,
            onSwitchFakeDarkMode: handleFakeDarkMode,
            isFakeDark,
            searchQuery,
            setSearchQuery,
        }}>
            <section>

                <Button className="btn-fake-dark-mode">
                    {isFakeDark ? "☀️" : "🌙"}
                < /Button>
                <Header/>
                <Main />
                <Archive />
                <Footer/>
            </section>
        </PostContext.Provider>
    );
}
export default App;
