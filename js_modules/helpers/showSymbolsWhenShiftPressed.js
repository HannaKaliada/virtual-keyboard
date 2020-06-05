import showSymbolsDueToLanguage from "./showSymbolsDueToLanguage.js";
import languageIndexes from "../data/languageIndexes.js";

export default function // show symbols when shift pressed
    showSymbolsWhenShiftPressed() {
    // check language
    if (localStorage.isEnglish === 'true') { // if english
        showSymbolsDueToLanguage(languageIndexes.englishSymbols);
    } else { // if russian
        showSymbolsDueToLanguage(languageIndexes.russianSymbols);
    }
}