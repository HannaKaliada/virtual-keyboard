import properties from "../data/properties.js";
import elements from "../data/elements.js";

// function to change register
export default function toggleCapsLock() {
    properties.capsLock = !properties.capsLock;

    elements.keys.forEach((key) => {
        const keyboardKey = key;

        if (properties.capsLock) {
            keyboardKey.textContent = key.textContent.toUpperCase();
        } else {
            keyboardKey.textContent = key.textContent.toLowerCase();
        }
    });
}