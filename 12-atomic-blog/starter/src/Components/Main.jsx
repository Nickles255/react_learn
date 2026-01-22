import FormAddPost from "./FormAddPost";
import Posts from "./Posts";
import {memo} from "react";

const Main = memo (function Main() {
    return (
        <main>
            <FormAddPost />
            <Posts />
        </main>
    );
});

export default Main
