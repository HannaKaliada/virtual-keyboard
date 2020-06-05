import properties from "../data/properties.js";

export default function addKeyValueToTextarea(value) {
    const textarea = document.querySelector('.use-keyboard-input');

    const firstPartOfString = properties.value.substr(0, textarea.selectionStart);
    const secondPartOfString = properties.value.substr(textarea.selectionStart,
        properties.value.length);

    properties.value = firstPartOfString + value + secondPartOfString;

    textarea.value = properties.value;
}