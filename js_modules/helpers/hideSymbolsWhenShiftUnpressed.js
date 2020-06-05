import showKeysDueToLanguageAndRegister from './showKeysDueToLanguageAndRegister.js';
import languageIndexes from '../data/languageIndexes.js';

export default function // hide symbols and show initial value of keys
    hideSymbolsWhenShiftUnpressed() {
    if (localStorage.isEnglish === 'true') {
        showKeysDueToLanguageAndRegister(languageIndexes.englishLetters);
    } else {
        showKeysDueToLanguageAndRegister(languageIndexes.russianLetters);
    }
}