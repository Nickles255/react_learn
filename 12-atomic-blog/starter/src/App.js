import {createContext, useContext, useEffect, useState} from "react";
import {faker} from "@faker-js/faker";
import Button from "./Components/Button";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Posts from "./Components/Posts";
import FormAddPost from "./Components/FormAddPost";
import Main from "./Components/Main";
import createRandomPost from "./Components/createRandomPost";


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

function Archive() {
    // Here we don't need the setter function. We're only using state to store these posts because the callback function passed into useState (which generates the posts) is only called once, on the initial render. So we use this trick as an optimization technique, because if we just used a regular variable, these posts would be re-created on every render. We could also move the posts outside the components, but I wanted to show you this trick 😉
    const [posts] = useState(() =>
        // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
        Array.from({length: 10000}, () => createRandomPost())
    );

    const {onAddPost} = useContext(PostContext);
    const [showArchive, setShowArchive] = useState(false);

    return (
        <aside>
            <h2>Post archive</h2>
            <button onClick={() => setShowArchive((s) => !s)}>
                {showArchive ? "Hide archive posts" : "Show archive posts"}
            </button>

            {showArchive && (
                <ul>
                    {posts.map((post, i) => (
                        <li key={i}>
                            <p>
                                <strong>{post.title}:</strong> {post.body}
                            </p>
                            <button onClick={() => onAddPost(post)}>Add as new post</button>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
}

export default App;
