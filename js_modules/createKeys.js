import keyLayout from "./data/keyLayout.js";
import languageIndexes from "./data/languageIndexes.js";

// function to create buttons
export default function createKeys() {
    const fragment = document.createDocumentFragment();
    Object.keys(keyLayout).forEach((key) => {
        const keyElement = document.createElement('button');
        const insertLineBreak = ['Backspace', 'Del', 'Enter', '▲'].indexOf(keyLayout[key]) !== -1;

        // add attributes/classes
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard__button');
        keyElement.setAttribute(`key-code-${key.replace('+', '')}`, '');
        keyElement.setAttribute('key-code', `${key.replace('+', '')}`);

        // add text to button
        if (localStorage.isEnglish === 'true') {
            if (keyLayout[key] instanceof Array) {
                keyElement.textContent = keyLayout[key][languageIndexes.englishLetters];
            } else {
                keyElement.textContent = keyLayout[key];
            }
        } else if (keyLayout[key] instanceof Array) {
            keyElement.textContent = keyLayout[key][languageIndexes.russianLetters];
        } else {
            keyElement.textContent = keyLayout[key];
        }

        switch (keyLayout[key]) {
            case 'Backspace':
            case 'Shift':
            case 'Enter':
            case 'CapsLock':
                keyElement.classList.add('keyboard__button_long', 'keyboard__button_dark');

                break;

            case 'Del':
            case 'Ctrl':
            case 'Alt':
            case 'Tab':
                keyElement.classList.add('keyboard__button_medium', 'keyboard__button_dark');

                break;

            case 'space':
                keyElement.classList.add('keyboard__button_huge');
                keyElement.textContent = '';

                break;

            case '◄':
            case '►':
            case '▲':
            case '▼':
                keyElement.classList.add('keyboard__button_short', 'keyboard__button_dark');

                break;

            default:
                keyElement.classList.add('keyboard__button_short');

                break;
        }

        fragment.appendChild(keyElement);
        if (insertLineBreak) {
            fragment.appendChild(document.createElement('br'));
        }
    });

    return fragment;
}