import keyCodes from "./data/keyCodes.js";

export default function  // remove hover from button
    handleKeyMouseOut() {
    document.querySelector('.keyboard__keys').addEventListener('mouseout', (event) => {
        if (event.target.classList.contains('keyboard__button')) {
            event.target.classList.remove('keyboard__button_hover');

            // remove button press animation when button pressed and then mouse moved out
            if (!event.target.hasAttribute(`key-code-${keyCodes.shiftKeyCode}`)) {
                event.target.classList.remove('pressed-key');
            }
        }
    });
}