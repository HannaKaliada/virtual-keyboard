import keyLayout from "../data/keyLayout.js";
import properties from "../data/properties.js";

export default function // show keys due to language and register
    showKeysDueToLanguageAndRegister(index) {
    const buttons = document.querySelectorAll('.keyboard__button_short');

    buttons.forEach((button) => {
        const keyBoardButton = button;

        if (keyLayout[`+${button.getAttribute('key-code')}`] instanceof Array) {
            if (properties.capsLock) { // show button content due to register
                keyBoardButton.textContent = keyLayout[`+${button.getAttribute('key-code')}`][index].toUpperCase();
            } else {
                keyBoardButton.textContent = keyLayout[`+${button.getAttribute('key-code')}`][index].toLowerCase();
            }
        }
    });
}