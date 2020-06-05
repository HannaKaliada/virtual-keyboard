export default function // add animation to pressed button
    handleKeyMouseDown() {
    document.querySelector('.keyboard__keys').addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('keyboard__button')) {
            event.target.classList.remove('keyboard__button_hover');
            event.target.classList.add('pressed-key');
        }
    });
}