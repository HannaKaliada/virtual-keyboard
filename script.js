const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    textarea: null,
    description: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
  },

  keyLayout: {
    '+192': ['`', 'ё', '~', 'Ё'],
    '+49': ['1', '1', '!', '!'],
    '+50': ['2', '2', '@', '"'],
    '+51': ['3', '3', '#', '№'],
    '+52': ['4', '4', '$', ';'],
    '+53': ['5', '5', '%', '%'],
    '+54': ['6', '6', '^', ':'],
    '+55': ['7', '7', '&', '?'],
    '+56': ['8', '8', '*', '*'],
    '+57': ['9', '9', '(', '('],
    '+48': ['0', '0', ')', ')'],
    '+189': ['-', '-', '_', '_'],
    '+187': ['=', '=', '+', '+'],
    '+8': 'Backspace',
    '+9': 'Tab',
    '+81': ['q', 'й'],
    '+87': ['w', 'ц'],
    '+69': ['e', 'у'],
    '+82': ['r', 'к'],
    '+84': ['t', 'е'],
    '+89': ['y', 'н'],
    '+85': ['u', 'г'],
    '+73': ['i', 'ш'],
    '+79': ['o', 'щ'],
    '+80': ['p', 'з'],
    '+219': ['[', 'х', '{', 'Х'],
    '+221': [']', 'ъ', '}', 'Ъ'],
    '+220': ['\\', '\\', '|', '/'],
    '+46': 'Del',
    '+20': 'CapsLock',
    '+65': ['a', 'ф'],
    '+83': ['s', 'ы'],
    '+68': ['d', 'в'],
    '+70': ['f', 'а'],
    '+71': ['g', 'п'],
    '+72': ['h', 'р'],
    '+74': ['j', 'о'],
    '+75': ['k', 'л'],
    '+76': ['l', 'д'],
    '+186': [';', 'ж', ':', 'Ж'],
    '+222': ["'", 'э', '"', 'Э'],
    '+13': 'Enter',
    '+16': 'Shift',
    '+90': ['z', 'я'],
    '+88': ['x', 'ч'],
    '+67': ['c', 'с'],
    '+86': ['v', 'м'],
    '+66': ['b', 'и'],
    '+78': ['n', 'т'],
    '+77': ['m', 'ь'],
    '+188': [',', 'б', '<', 'Б'],
    '+190': ['.', 'ю', '>', 'Ю'],
    '+191': ['/', '.', '?', ','],
    '+38': '▲',
    '+17': 'Ctrl',
    '+18': 'Alt',
    '+32': 'space',
    '+37': '◄',
    '+40': '▼',
    '+39': '►',
  },

  keyCodes: {
    backspaceKeyCode: 8,
    deleteKeyCode: 46,
    shiftKeyCode: 16,
    enterKeyCode: 13,
    tabKeyCode: 9,
    spaceKeyCode: 32,
    altKeyCode: 18,
    ctrlKeyCode: 17,
    leftArrowKeyCode: 37,
    rightArrowKeyCode: 39,
    capsLockKeyCode: 20,
  },

  languageIndexes: {
    englishLetters: 0,
    russianLetters: 1,
    englishSymbols: 2,
    russianSymbols: 3,
  },

  init() {
    // create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    this.elements.description = document.createElement('p');
    this.elements.textarea = document.createElement('textarea');

    // setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.description.classList.add('keyboard__description');
    this.elements.description.textContent = 'OS Windows. Use Shift + Alt to switch the language';
    this.elements.textarea.classList.add('use-keyboard-input');
    this.elements.main.appendChild(this.elements.keysContainer);

    // add to DOM
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.description);
    document.body.appendChild(this.elements.main);
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__button_short');
  },

  // function to create buttons
  createKeys() {
    const fragment = document.createDocumentFragment();
    Object.keys(this.keyLayout).forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'Del', 'Enter', '▲'].indexOf(this.keyLayout[key]) !== -1;

      // add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__button');
      keyElement.setAttribute(`key-code-${key.replace('+', '')}`, '');
      keyElement.setAttribute('key-code', `${key.replace('+', '')}`);

      // add text to button
      if (localStorage.isEnglish === 'true') {
        if (this.keyLayout[key] instanceof Array) {
          keyElement.textContent = this.keyLayout[key][this.languageIndexes.englishLetters];
        } else {
          keyElement.textContent = this.keyLayout[key];
        }
      } else if (this.keyLayout[key] instanceof Array) {
        keyElement.textContent = this.keyLayout[key][this.languageIndexes.russianLetters];
      } else {
        keyElement.textContent = this.keyLayout[key];
      }

      switch (this.keyLayout[key]) {
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
  },

  // function to change register
  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    this.elements.keys.forEach((key) => {
      const keyboardKey = key;

      if (this.properties.capsLock) {
        keyboardKey.textContent = key.textContent.toUpperCase();
      } else {
        keyboardKey.textContent = key.textContent.toLowerCase();
      }
    });
  },

  // physical keyboard touch processing function
  handleKeyDown() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();

      // initializing variables
      const textarea = document.querySelector('.use-keyboard-input');
      let allowed;
      let currentCaret = 0;
      let firstPartOfString = '';
      let secondPartOfString = '';
      const key = document.querySelector(`[key-code-${event.keyCode}]`);

      if (key) {
        textarea.focus();

        // add style to button
        key.classList.add('pressed-key');

        // add content
        switch (event.keyCode) {
          case this.keyCodes.backspaceKeyCode: // if backspace
            currentCaret = textarea.selectionStart;

            firstPartOfString = this.properties.value.substr(0, textarea.selectionStart - 1);
            secondPartOfString = this.properties.value.substr(textarea.selectionStart,
              this.properties.value.length);

            this.properties.value = firstPartOfString + secondPartOfString;

            // add result to textarea
            textarea.value = this.properties.value;

            // move caret
            textarea.selectionStart = currentCaret - 1;
            textarea.selectionEnd = textarea.selectionStart;

            break;

          case this.keyCodes.deleteKeyCode: // if delete
            currentCaret = textarea.selectionStart;

            firstPartOfString = this.properties.value.substr(0, textarea.selectionStart);
            secondPartOfString = this.properties.value.substr(textarea.selectionStart + 1,
              this.properties.value.length);
            this.properties.value = firstPartOfString + secondPartOfString;

            // add result to textarea
            textarea.value = this.properties.value;

            // move caret
            textarea.selectionStart = currentCaret;
            textarea.selectionEnd = textarea.selectionStart;

            break;

          case this.keyCodes.shiftKeyCode: // if shift

            // prevent code from repeating
            if (event.repeat !== undefined) {
              allowed = !event.repeat;
            }
            if (!allowed) return;
            allowed = false;

            // change register
            this.toggleCapsLock();

            // show symbols, when shift pressed
            this.showSymbolsWhenShiftPressed();

            break;

          case this.keyCodes.enterKeyCode: // if enter
            currentCaret = textarea.selectionStart;

            this.addKeyValueToTextarea('\n');

            // move caret
            textarea.selectionStart = currentCaret + 1;
            textarea.selectionEnd = textarea.selectionStart;

            break;

          case this.keyCodes.tabKeyCode: // if tab
            currentCaret = textarea.selectionStart;

            this.addKeyValueToTextarea('  ');

            // move caret
            textarea.selectionStart = currentCaret + 2;
            textarea.selectionEnd = textarea.selectionStart;

            break;

          case this.keyCodes.spaceKeyCode: // if space
            currentCaret = textarea.selectionStart;

            this.addKeyValueToTextarea(' ');

            // move caret
            textarea.selectionStart = currentCaret + 1;
            textarea.selectionEnd = textarea.selectionStart;

            break;

          case this.keyCodes.altKeyCode: // if alt or ctrl
          case this.keyCodes.ctrlKeyCode:

            break;

          case this.keyCodes.leftArrowKeyCode: // if left arrow

            // move caret
            textarea.selectionStart -= 1;
            textarea.selectionEnd = textarea.selectionStart;

            break;

          case this.keyCodes.rightArrowKeyCode: // if right arrow

            // move caret
            textarea.selectionStart += 1;
            textarea.selectionEnd = textarea.selectionStart;

            break;

          case this.keyCodes.capsLockKeyCode: // if caps lock

            // prevent code from repeating
            if (event.repeat !== undefined) {
              allowed = !event.repeat;
            }
            if (!allowed) return;
            allowed = false;

            // change register
            this.toggleCapsLock();

            // add active class to caps lock button
            document.querySelector(`[key-code-${this.keyCodes.capsLockKeyCode}]`).classList.toggle('keyboard__button_activated', this.properties.capsLock);

            break;

          default:
            currentCaret = textarea.selectionStart;

            this.addKeyValueToTextarea(key.textContent);

            // move caret
            textarea.selectionStart = currentCaret + 1;
            textarea.selectionEnd = textarea.selectionStart;

            break;
        }
      }
    });
  },

  addKeyValueToTextarea(value) {
    const textarea = document.querySelector('.use-keyboard-input');

    const firstPartOfString = this.properties.value.substr(0, textarea.selectionStart);
    const secondPartOfString = this.properties.value.substr(textarea.selectionStart,
      this.properties.value.length);

    this.properties.value = firstPartOfString + value + secondPartOfString;

    textarea.value = this.properties.value;
  },

  // physical keyboard release processing function
  handleKeyUp() {
    document.addEventListener('keyup', (event) => {
      const key = document.querySelector(`[key-code-${event.keyCode}]`);

      if (key) {
        key.classList.remove('pressed-key');

        // if shift
        if (event.keyCode === this.keyCodes.shiftKeyCode) {
          // change register
          this.toggleCapsLock();

          // hide symbols, when shift unpressed
          this.hideSymbolsWhenShiftUnpressed();
        }
      }
    });
  },

  // physical keyboard touch processing function
  handleKeyClick() {
    document.querySelector('.keyboard__keys').addEventListener('click', (event) => {
      // initializing variables
      const textarea = document.querySelector('.use-keyboard-input');
      let currentCaret;
      let firstPartOfString = '';
      let secondPartOfString = '';

      textarea.focus();

      if (event.target.classList.contains('keyboard__button')) {
        if (event.target.hasAttribute(`key-code-${this.keyCodes.backspaceKeyCode}`)) { // if backspace click
          currentCaret = textarea.selectionStart;

          firstPartOfString = this.properties.value.substr(0, textarea.selectionStart - 1);
          secondPartOfString = this.properties.value.substr(textarea.selectionStart,
            this.properties.value.length);
          this.properties.value = firstPartOfString + secondPartOfString;

          // add result to textarea
          textarea.value = this.properties.value;

          // move caret
          textarea.selectionStart = currentCaret - 1;
          textarea.selectionEnd = textarea.selectionStart;
        } else if (event.target.hasAttribute(`key-code-${this.keyCodes.deleteKeyCode}`)) { // if delete
          currentCaret = textarea.selectionStart;

          firstPartOfString = this.properties.value.substr(0, textarea.selectionStart);
          secondPartOfString = this.properties.value.substr(textarea.selectionStart + 1,
            this.properties.value.length);
          this.properties.value = firstPartOfString + secondPartOfString;

          // add result to textarea
          textarea.value = this.properties.value;

          // move caret
          textarea.selectionStart = currentCaret;
          textarea.selectionEnd = textarea.selectionStart;
        } else if (event.target.hasAttribute(`key-code-${this.keyCodes.capsLockKeyCode}`)) { // if caps lock click
          const shift = document.querySelector(`[key-code-${this.keyCodes.shiftKeyCode}]`);

          // change register
          this.toggleCapsLock();

          // if shift pressed when caps lock pressed
          if (shift.classList.contains('pressed-key')) {
            event.target.classList.toggle('keyboard__button_activated', !this.properties.capsLock);
          } else {
            event.target.classList.toggle('keyboard__button_activated', this.properties.capsLock);
          }
        } else if (event.target.hasAttribute(`key-code-${this.keyCodes.enterKeyCode}`)) { // if enter
          currentCaret = textarea.selectionStart;

          this.addKeyValueToTextarea('\n');

          // move caret
          textarea.selectionStart = currentCaret + 1;
          textarea.selectionEnd = textarea.selectionStart;
        } else if (event.target.hasAttribute(`key-code-${this.keyCodes.tabKeyCode}`)) { // if tab
          currentCaret = textarea.selectionStart;

          this.addKeyValueToTextarea('  ');

          // move caret
          textarea.selectionStart = currentCaret + 2;
          textarea.selectionEnd = textarea.selectionStart;
        } else if (event.target.hasAttribute(`key-code-${this.keyCodes.spaceKeyCode}`)) { // if space
          currentCaret = textarea.selectionStart;

          this.addKeyValueToTextarea(' ');

          // move caret
          textarea.selectionStart = currentCaret + 1;
          textarea.selectionEnd = textarea.selectionStart;
        } else if (event.target.hasAttribute(`key-code-${this.keyCodes.leftArrowKeyCode}`)) { // if left arrow
          // move caret
          textarea.selectionStart -= 1;
          textarea.selectionEnd = textarea.selectionStart;
        } else if (event.target.hasAttribute(`key-code-${this.keyCodes.rightArrowKeyCode}`)) { // if right arrow
          // move caret
          textarea.selectionStart += 1;
          textarea.selectionEnd = textarea.selectionStart;
        } else if (event.target.hasAttribute(`key-code-${this.keyCodes.altKeyCode}`)) { // if alt
          // if alt pressed when shift pressed
          if (document.querySelector(`[key-code-${this.keyCodes.shiftKeyCode}]`).classList.contains('pressed-key')) {
            // change language
            this.switchLanguage();
            this.toggleCapsLock();
            document.querySelector(`[key-code-${this.keyCodes.shiftKeyCode}]`).classList.remove('pressed-key');
          }
        } else if (!event.target.hasAttribute(`key-code-${this.keyCodes.shiftKeyCode}`)
          && !event.target.hasAttribute(`key-code-${this.keyCodes.altKeyCode}`)
          && !event.target.hasAttribute(`key-code-${this.keyCodes.ctrlKeyCode}`)) {
          let keyValue;
          currentCaret = textarea.selectionStart;

          // add text due to register
          if (this.properties.capsLock) {
            keyValue = event.target.textContent.toUpperCase();
          } else {
            keyValue = event.target.textContent.toLowerCase();
          }

          this.addKeyValueToTextarea(keyValue);

          // move caret
          textarea.selectionStart = currentCaret + 1;
          textarea.selectionEnd = textarea.selectionStart;
        }
        textarea.value = this.properties.value;
      }
    });
  },

  // add hover to button
  handleKeyMouseOver() {
    document.querySelector('.keyboard__keys').addEventListener('mouseover', (event) => {
      if (event.target.classList.contains('keyboard__button')) {
        event.target.classList.add('keyboard__button_hover');
      }

      this.handleKeyMouseDown();
    });
  },

  // remove hover from button
  handleKeyMouseOut() {
    document.querySelector('.keyboard__keys').addEventListener('mouseout', (event) => {
      if (event.target.classList.contains('keyboard__button')) {
        event.target.classList.remove('keyboard__button_hover');

        // remove button press animation when button pressed and then mouse moved out
        if (!event.target.hasAttribute(`key-code-${this.keyCodes.shiftKeyCode}`)) {
          event.target.classList.remove('pressed-key');
        }
      }
    });
  },

  // add animation to pressed button
  handleKeyMouseDown() {
    document.querySelector('.keyboard__keys').addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('keyboard__button')) {
        event.target.classList.remove('keyboard__button_hover');
        event.target.classList.add('pressed-key');
      }
    });
  },

  // remove animation when button unpressed
  handleKeyMouseUp() {
    document.querySelector('.keyboard__keys').addEventListener('mouseup', (event) => {
      if (event.target.classList.contains('keyboard__button')) {
        event.target.classList.remove('pressed-key');
      }
    });
  },

  // change register and show symbols when shift pressed
  handleShiftMouseDown() {
    const shift = document.querySelector(`[key-code-${this.keyCodes.shiftKeyCode}]`);

    shift.addEventListener('mousedown', () => {
      if (!shift.classList.contains('pressed-key')) {
        this.toggleCapsLock();
        this.showSymbolsWhenShiftPressed();
      } else {
        shift.classList.remove('pressed-key');
      }
    });
  },

  // change register and hide symbols when shift unpressed
  handleShiftMouseUp() {
    const shift = document.querySelector(`[key-code-${this.keyCodes.shiftKeyCode}]`);

    shift.addEventListener('mouseup', () => {
      this.toggleCapsLock();
      this.hideSymbolsWhenShiftUnpressed();
    });
  },

  // change language when alt and shift pressed
  handleAltAndShiftKeyDown() {
    const pressedKeys = new Set();

    // add property isEnglish to localStorage
    localStorage.setItem('isEnglish', 'true');

    document.addEventListener('keydown', (event) => {
      pressedKeys.add(event.keyCode);

      // change when alt and shift pressed
      if (pressedKeys.has(this.keyCodes.shiftKeyCode)
      && pressedKeys.has(this.keyCodes.altKeyCode)) {
        this.switchLanguage();
        pressedKeys.clear();
      }
    });

    document.addEventListener('keyup', (event) => {
      pressedKeys.delete(event.code);
    });
  },

  // show symbols due to language
  showSymbolsDueToLanguage(index) {
    const buttons = document.querySelectorAll('.keyboard__button_short');

    buttons.forEach((button) => {
      const keyboardButton = button;

      // check if key of keyLayout object is an array
      if (this.keyLayout[`+${button.getAttribute('key-code')}`] instanceof Array
        && this.keyLayout[`+${button.getAttribute('key-code')}`].length > 2) {
        keyboardButton.textContent = this.keyLayout[`+${button.getAttribute('key-code')}`][index];
      }
    });
  },

  // show symbols when shift pressed
  showSymbolsWhenShiftPressed() {
    // check language
    if (localStorage.isEnglish === 'true') { // if english
      this.showSymbolsDueToLanguage(this.languageIndexes.englishSymbols);
    } else { // if russian
      this.showSymbolsDueToLanguage(this.languageIndexes.russianSymbols);
    }
  },

  // hide symbols and show initial value of keys
  hideSymbolsWhenShiftUnpressed() {
    if (localStorage.isEnglish === 'true') {
      this.showKeysDueToLanguageAndRegister(this.languageIndexes.englishLetters);
    } else {
      this.showKeysDueToLanguageAndRegister(this.languageIndexes.russianLetters);
    }
  },

  // show keys due to language
  showKeysDueToLanguage(index) {
    const buttons = document.querySelectorAll('.keyboard__button_short');

    buttons.forEach((button) => {
      const keyBoardButton = button;
      if (this.keyLayout[`+${button.getAttribute('key-code')}`] instanceof Array) {
        keyBoardButton.textContent = this.keyLayout[`+${button.getAttribute('key-code')}`][index];
      }
    });
  },

  // change language
  switchLanguage() {
    if (localStorage.isEnglish === 'true') {
      localStorage.isEnglish = 'false'; // change to russian

      this.showKeysDueToLanguageAndRegister(this.languageIndexes.russianLetters);
    } else {
      localStorage.isEnglish = 'true'; // change to english

      this.showKeysDueToLanguageAndRegister(this.languageIndexes.englishLetters);
    }
  },

  // show keys due to language and register
  showKeysDueToLanguageAndRegister(index) {
    const buttons = document.querySelectorAll('.keyboard__button_short');

    buttons.forEach((button) => {
      const keyBoardButton = button;

      if (this.keyLayout[`+${button.getAttribute('key-code')}`] instanceof Array) {
        if (this.properties.capsLock) { // show button content due to register
          keyBoardButton.textContent = this.keyLayout[`+${button.getAttribute('key-code')}`][index].toUpperCase();
        } else {
          keyBoardButton.textContent = this.keyLayout[`+${button.getAttribute('key-code')}`][index].toLowerCase();
        }
      }
    });
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
  Keyboard.handleKeyDown();
  Keyboard.handleKeyUp();
  Keyboard.handleKeyClick();
  Keyboard.handleKeyMouseOver();
  Keyboard.handleKeyMouseUp();
  Keyboard.handleKeyMouseOut();
  Keyboard.handleAltAndShiftKeyDown();
  Keyboard.handleShiftMouseDown();
  Keyboard.handleShiftMouseUp();
});
