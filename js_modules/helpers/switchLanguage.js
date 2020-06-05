import showKeysDueToLanguageAndRegister from './showKeysDueToLanguageAndRegister.js'
import languageIndexes from '../data/languageIndexes.js';

export default function // change language
    switchLanguage() {
    if (localStorage.isEnglish === 'true') {
        localStorage.isEnglish = 'false'; // change to russian

        showKeysDueToLanguageAndRegister(languageIndexes.russianLetters);
    } else {
        localStorage.isEnglish = 'true'; // change to english

        showKeysDueToLanguageAndRegister(languageIndexes.englishLetters);
    }
}