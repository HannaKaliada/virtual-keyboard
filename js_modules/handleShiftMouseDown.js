import keyCodes from "./data/keyCodes.js";
import toggleCapsLock from "./helpers/toggleCapsLock.js";
import showSymbolsWhenShiftPressed from "./helpers/showSymbolsWhenShiftPressed.js";

// change register and show symbols when shift pressed
export default function handleShiftMouseDown() {
    const shift = document.querySelector(`[key-code-${keyCodes.shiftKeyCode}]`);

    shift.addEventListener('mousedown', () => {
        if (!shift.classList.contains('pressed-key')) {
            toggleCapsLock();
            showSymbolsWhenShiftPressed();
        } else {
            shift.classList.remove('pressed-key');
        }
    });
}