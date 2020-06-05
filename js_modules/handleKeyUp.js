import keyCodes from "./data/keyCodes.js";
import toggleCapsLock from "./helpers/toggleCapsLock.js";
import hideSymbolsWhenShiftUnpressed from './helpers/hideSymbolsWhenShiftUnpressed.js'

export default function // physical keyboard release processing function
    handleKeyUp() {
    document.addEventListener('keyup', (event) => {
        const key = document.querySelector(`[key-code-${event.keyCode}]`);

        if (key) {
            key.classList.remove('pressed-key');

            // if shift
            if (event.keyCode === keyCodes.shiftKeyCode) {
                // change register
                toggleCapsLock();

                // hide symbols, when shift unpressed
                hideSymbolsWhenShiftUnpressed();
            }
        }
    });
}