export default function flagemojiToPNG(flag) {
    if (flag === undefined) return "";

    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
        .map((char) => String.fromCharCode(char - 127397).toLowerCase())
        .join("");

    return countryCode ? `https://flagcdn.com/24x18/${countryCode}.png` : "";
}