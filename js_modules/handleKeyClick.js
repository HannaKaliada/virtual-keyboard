import keyCodes from "./data/keyCodes.js";
import properties from "./data/properties.js";
import toggleCapsLock from "./helpers/toggleCapsLock.js";
import addKeyValueToTextarea from "./helpers/addKeyValueToTextarea.js";
import switchLanguage from "./helpers/switchLanguage.js";

export default function // physical keyboard touch processing function
    handleKeyClick() {
    document.querySelector('.keyboard__keys').addEventListener('click', (event) => {
        // initializing variables
        const textarea = document.querySelector('.use-keyboard-input');
        let currentCaret;
        let firstPartOfString = '';
        let secondPartOfString = '';

        textarea.focus();

        if (event.target.classList.contains('keyboard__button')) {
            if (event.target.hasAttribute(`key-code-${keyCodes.backspaceKeyCode}`)) { // if backspace click
                currentCaret = textarea.selectionStart;

                firstPartOfString = properties.value.substr(0, textarea.selectionStart - 1);
                secondPartOfString = properties.value.substr(textarea.selectionStart,
                    properties.value.length);
                properties.value = firstPartOfString + secondPartOfString;

                // add result to textarea
                textarea.value = properties.value;

                // move caret
                textarea.selectionStart = currentCaret - 1;
                textarea.selectionEnd = textarea.selectionStart;
            } else if (event.target.hasAttribute(`key-code-${keyCodes.deleteKeyCode}`)) { // if delete
                currentCaret = textarea.selectionStart;

                firstPartOfString = properties.value.substr(0, textarea.selectionStart);
                secondPartOfString = properties.value.substr(textarea.selectionStart + 1,
                    properties.value.length);
                properties.value = firstPartOfString + secondPartOfString;

                // add result to textarea
                textarea.value = properties.value;

                // move caret
                textarea.selectionStart = currentCaret;
                textarea.selectionEnd = textarea.selectionStart;
            } else if (event.target.hasAttribute(`key-code-${keyCodes.capsLockKeyCode}`)) { // if caps lock click
                const shift = document.querySelector(`[key-code-${keyCodes.shiftKeyCode}]`);

                // change register
                toggleCapsLock();

                // if shift pressed when caps lock pressed
                if (shift.classList.contains('pressed-key')) {
                    event.target.classList.toggle('keyboard__button_activated', !properties.capsLock);
                } else {
                    event.target.classList.toggle('keyboard__button_activated', properties.capsLock);
                }
            } else if (event.target.hasAttribute(`key-code-${keyCodes.enterKeyCode}`)) { // if enter
                currentCaret = textarea.selectionStart;

                addKeyValueToTextarea('\n');

                // move caret
                textarea.selectionStart = currentCaret + 1;
                textarea.selectionEnd = textarea.selectionStart;
            } else if (event.target.hasAttribute(`key-code-${keyCodes.tabKeyCode}`)) { // if tab
                currentCaret = textarea.selectionStart;

                addKeyValueToTextarea('  ');

                // move caret
                textarea.selectionStart = currentCaret + 2;
                textarea.selectionEnd = textarea.selectionStart;
            } else if (event.target.hasAttribute(`key-code-${keyCodes.spaceKeyCode}`)) { // if space
                currentCaret = textarea.selectionStart;

                addKeyValueToTextarea(' ');

                // move caret
                textarea.selectionStart = currentCaret + 1;
                textarea.selectionEnd = textarea.selectionStart;
            } else if (event.target.hasAttribute(`key-code-${keyCodes.leftArrowKeyCode}`)) { // if left arrow
                // move caret
                textarea.selectionStart -= 1;
                textarea.selectionEnd = textarea.selectionStart;
            } else if (event.target.hasAttribute(`key-code-${keyCodes.rightArrowKeyCode}`)) { // if right arrow
                // move caret
                textarea.selectionStart += 1;
                textarea.selectionEnd = textarea.selectionStart;
            } else if (event.target.hasAttribute(`key-code-${keyCodes.altKeyCode}`)) { // if alt
                // if alt pressed when shift pressed
                if (document.querySelector(`[key-code-${keyCodes.shiftKeyCode}]`).classList.contains('pressed-key')) {
                    // change language
                    switchLanguage();
                    toggleCapsLock();
                    document.querySelector(`[key-code-${keyCodes.shiftKeyCode}]`).classList.remove('pressed-key');
                }
            } else if (!event.target.hasAttribute(`key-code-${keyCodes.shiftKeyCode}`)
                && !event.target.hasAttribute(`key-code-${keyCodes.altKeyCode}`)
                && !event.target.hasAttribute(`key-code-${keyCodes.ctrlKeyCode}`)) {
                let keyValue;
                currentCaret = textarea.selectionStart;

                // add text due to register
                if (properties.capsLock) {
                    keyValue = event.target.textContent.toUpperCase();
                } else {
                    keyValue = event.target.textContent.toLowerCase();
                }

                addKeyValueToTextarea(keyValue);

                // move caret
                textarea.selectionStart = currentCaret + 1;
                textarea.selectionEnd = textarea.selectionStart;
            }
            textarea.value = properties.value;
        }
    });
}