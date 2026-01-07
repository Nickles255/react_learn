import flagemojiToPNG from "../utils/flagemojiToPNG.js";

function FlagImg({emoji}) {

    const flag = flagemojiToPNG(emoji)

    return (flag ? <img src={flag} alt="flag" /> : "");
}

export default FlagImg;