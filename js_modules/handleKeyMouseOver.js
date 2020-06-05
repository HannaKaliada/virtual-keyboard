import handleKeyMouseDown from "./helpers/handleKeyMouseDown.js";

export default function // add hover to button
    handleKeyMouseOver() {
    document.querySelector('.keyboard__keys').addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('keyboard__button')) {
            event.target.classList.add('keyboard__button_hover');
        }

        handleKeyMouseDown();
    });
}