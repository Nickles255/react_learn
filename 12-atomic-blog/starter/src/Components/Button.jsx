import {useContext} from "react";
import {PostContext} from '../App';

export default function Button({children, className}) {
    const {onSwitchFakeDarkMode} = useContext(PostContext);
    return (
        <button
            onClick={onSwitchFakeDarkMode}
            className={className}
        >
            {children}
        </button>
    );

}