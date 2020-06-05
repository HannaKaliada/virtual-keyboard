import createKeys from "./createKeys.js";
import elements from "./data/elements.js";

export default function init() {
    // create main elements
    elements.main = document.createElement('div');
    elements.keysContainer = document.createElement('div');
    elements.description = document.createElement('p');
    elements.textarea = document.createElement('textarea');

    // setup main elements
    elements.main.classList.add('keyboard');
    elements.keysContainer.classList.add('keyboard__keys');
    elements.description.classList.add('keyboard__description');
    elements.description.textContent = 'OS Windows. Use Shift + Alt to switch the language';
    elements.textarea.classList.add('use-keyboard-input');
    elements.main.appendChild(elements.keysContainer);

    // add to DOM
    document.body.appendChild(elements.textarea);
    document.body.appendChild(elements.description);
    document.body.appendChild(elements.main);
    elements.keysContainer.appendChild(createKeys());

    elements.keys = elements.keysContainer.querySelectorAll('.keyboard__button_short');
}