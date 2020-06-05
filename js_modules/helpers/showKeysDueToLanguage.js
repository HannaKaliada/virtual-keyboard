import keyLayout from "../data/keyLayout.js";

export default function // show keys due to language
    showKeysDueToLanguage(index) {
    const buttons = document.querySelectorAll('.keyboard__button_short');

    buttons.forEach((button) => {
        const keyBoardButton = button;
        if (keyLayout[`+${button.getAttribute('key-code')}`] instanceof Array) {
            keyBoardButton.textContent = this.keyLayout[`+${button.getAttribute('key-code')}`][index];
        }
    });
}