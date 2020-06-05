export default function // remove animation when button unpressed
    handleKeyMouseUp() {
    document.querySelector('.keyboard__keys').addEventListener('mouseup', (event) => {
        if (event.target.classList.contains('keyboard__button')) {
            event.target.classList.remove('pressed-key');
        }
    });
}
