import keyCodes from "./data/keyCodes.js";
import properties from "./data/properties.js";
import toggleCapsLock from "./helpers/toggleCapsLock.js";
import addKeyValueToTextarea from "./helpers/addKeyValueToTextarea.js";
import showSymbolsWhenShiftPressed from "./helpers/showSymbolsWhenShiftPressed.js";

export default function // physical keyboard touch processing function
    handleKeyDown() {
    document.addEventListener('keydown', (event) => {
        event.preventDefault();

        // initializing variables
        const textarea = document.querySelector('.use-keyboard-input');
        let allowed;
        let currentCaret = 0;
        let firstPartOfString = '';
        let secondPartOfString = '';
        const key = document.querySelector(`[key-code-${event.keyCode}]`);

        if (key) {
            textarea.focus();

            // add style to button
            key.classList.add('pressed-key');

            // add content
            switch (event.keyCode) {
                case keyCodes.backspaceKeyCode: // if backspace
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

                    break;

                case keyCodes.deleteKeyCode: // if delete
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

                    break;

                case keyCodes.shiftKeyCode: // if shift

                    // prevent code from repeating
                    if (event.repeat !== undefined) {
                        allowed = !event.repeat;
                    }
                    if (!allowed) return;
                    allowed = false;

                    // change register
                    toggleCapsLock();

                    // show symbols, when shift pressed
                    showSymbolsWhenShiftPressed();

                    break;

                case keyCodes.enterKeyCode: // if enter
                    currentCaret = textarea.selectionStart;

                    addKeyValueToTextarea('\n');

                    // move caret
                    textarea.selectionStart = currentCaret + 1;
                    textarea.selectionEnd = textarea.selectionStart;

                    break;

                case keyCodes.tabKeyCode: // if tab
                    currentCaret = textarea.selectionStart;

                    addKeyValueToTextarea('  ');

                    // move caret
                    textarea.selectionStart = currentCaret + 2;
                    textarea.selectionEnd = textarea.selectionStart;

                    break;

                case keyCodes.spaceKeyCode: // if space
                    currentCaret = textarea.selectionStart;

                    addKeyValueToTextarea(' ');

                    // move caret
                    textarea.selectionStart = currentCaret + 1;
                    textarea.selectionEnd = textarea.selectionStart;

                    break;

                case keyCodes.altKeyCode: // if alt or ctrl
                case keyCodes.ctrlKeyCode:

                    break;

                case keyCodes.leftArrowKeyCode: // if left arrow

                    // move caret
                    textarea.selectionStart -= 1;
                    textarea.selectionEnd = textarea.selectionStart;

                    break;

                case keyCodes.rightArrowKeyCode: // if right arrow

                    // move caret
                    textarea.selectionStart += 1;
                    textarea.selectionEnd = textarea.selectionStart;

                    break;

                case keyCodes.capsLockKeyCode: // if caps lock

                    // prevent code from repeating
                    if (event.repeat !== undefined) {
                        allowed = !event.repeat;
                    }
                    if (!allowed) return;
                    allowed = false;

                    // change register
                    toggleCapsLock();

                    // add active class to caps lock button
                    document.querySelector(`[key-code-${keyCodes.capsLockKeyCode}]`).classList.toggle('keyboard__button_activated', properties.capsLock);

                    break;

                default:
                    currentCaret = textarea.selectionStart;

                    addKeyValueToTextarea(key.textContent);

                    // move caret
                    textarea.selectionStart = currentCaret + 1;
                    textarea.selectionEnd = textarea.selectionStart;

                    break;
            }
        }
    });
}