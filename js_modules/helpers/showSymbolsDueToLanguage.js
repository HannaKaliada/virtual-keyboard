import keyLayout from "../data/keyLayout.js";

export default function // show symbols due to language
    showSymbolsDueToLanguage(index) {
    const buttons = document.querySelectorAll('.keyboard__button_short');

    buttons.forEach((button) => {
        const keyboardButton = button;

        // check if key of keyLayout object is an array
        if (keyLayout[`+${button.getAttribute('key-code')}`] instanceof Array
            && keyLayout[`+${button.getAttribute('key-code')}`].length > 2) {
            keyboardButton.textContent = keyLayout[`+${button.getAttribute('key-code')}`][index];
        }
    });
}