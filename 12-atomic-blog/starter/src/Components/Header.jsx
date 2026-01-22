import {useContext} from "react";
import {usePosts} from "../contexts/PostProvider";
import Results from "./Results";
import SearchPosts from "./SearchPosts";

export default function Header() {
    // 3) Consume conetext value
    const {onClearPosts} = usePosts();

    return (
        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
            <div>
                <Results/>
                <SearchPosts/>
                <button onClick={onClearPosts}>Clear posts</button>
            </div>
        </header>
    );
}