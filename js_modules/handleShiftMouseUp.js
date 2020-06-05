import toggleCapsLock from "./helpers/toggleCapsLock.js";
import hideSymbolsWhenShiftUnpressed from "./helpers/hideSymbolsWhenShiftUnpressed.js";
import keyCodes from "./data/keyCodes.js";

export default function // change register and hide symbols when shift unpressed
    handleShiftMouseUp() {
    const shift = document.querySelector(`[key-code-${keyCodes.shiftKeyCode}]`);

    shift.addEventListener('mouseup', () => {
        toggleCapsLock();
        hideSymbolsWhenShiftUnpressed();
    });
}