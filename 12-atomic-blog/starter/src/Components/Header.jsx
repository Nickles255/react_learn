import {useContext} from "react";
import {PostContext} from "./PostProvider";
import Results from "./Results";
import SearchPosts from "./SearchPosts";

export default function Header() {
    // 3) Consume conetext value
    const {onClearPosts} = useContext(PostContext);

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