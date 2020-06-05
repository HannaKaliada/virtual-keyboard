import switchLanguage from './helpers/switchLanguage.js';
import keyCodes from './data/keyCodes.js';

export default function // change language when alt and shift pressed
    handleAltAndShiftKeyDown() {
    const pressedKeys = new Set();

    // add property isEnglish to localStorage
    localStorage.setItem('isEnglish', 'true');

    document.addEventListener('keydown', (event) => {
        pressedKeys.add(event.keyCode);

        // change when alt and shift pressed
        if (pressedKeys.has(keyCodes.shiftKeyCode)
            && pressedKeys.has(keyCodes.altKeyCode)) {
            switchLanguage();
            pressedKeys.clear();
        }
    });

    document.addEventListener('keyup', (event) => {
        pressedKeys.delete(event.code);
    });
}