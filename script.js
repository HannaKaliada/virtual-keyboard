import init from "./js_modules/init.js";
import handleKeyDown from './js_modules/handleKeyDown.js';
import handleKeyUp from './js_modules/handleKeyUp.js';
import handleKeyClick from './js_modules/handleKeyClick.js';
import handleKeyMouseOver from './js_modules/handleKeyMouseOver.js';
import handleKeyMouseUp from './js_modules/handleKeyMouseUp.js';
import handleKeyMouseOut from './js_modules/handleKeyMouseOut.js';
import handleAltAndShiftKeyDown from "./js_modules/handleAltAndShiftKeyDown.js";
import handleShiftMouseDown from "./js_modules/handleShiftMouseDown.js";
import handleShiftMouseUp from "./js_modules/handleShiftMouseUp.js";

window.addEventListener('DOMContentLoaded', () => {
  init();
  handleKeyDown();
  handleKeyUp();
  handleKeyClick();
  handleKeyMouseOver();
  handleKeyMouseUp();
  handleKeyMouseOut();
  handleAltAndShiftKeyDown();
  handleShiftMouseDown();
  handleShiftMouseUp();
});
