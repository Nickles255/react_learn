import {createContext, useContext, useMemo, useState} from "react";
import createRandomPost from "../Components/createRandomPost";

// 1) create a context
const PostContext = createContext();

function PostProvider({children}) {
    const [posts, setPosts] = useState(() =>
        Array.from({length: 30}, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : posts;

    const value = useMemo(() => {
        return {
            posts: searchedPosts,
            onAddPost: handleAddPost,
            onClearPosts: handleClearPosts,
            searchQuery,
            setSearchQuery,
        };
    }, [searchedPosts, searchQuery]);

    // 2) Provide value to child components
    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );


}

function usePosts() {
    const context = useContext(PostContext);
    if (context === undefined) throw new Error("usePosts must be used within a PostProvider");

    return context;
}

export {PostProvider, usePosts};