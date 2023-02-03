window.addEventListener('DOMContentLoaded', () => {
  const password = document.getElementById('password_input-text');
  const characterLengthDisplay = document.getElementById('settings_character-length-value');
  const slider = document.getElementById('settings_slider');
  const generateButton = document.getElementById('action_button');

  const uppercaseCheckbox = document.getElementById('uppercase-option');
  const lowercaseCheckbox = document.getElementById('lowercase-option');
  const numbersCheckbox = document.getElementById('numbers-option');
  const symbolsCheckbox = document.getElementById('symbols-option');
  const regularExpressionsCheckbox = document.getElementById('regular-expressions-option');

  const setCheckboxListeners = () => {
    const checkboxes = document.querySelectorAll('.settings_checkbox');

    for (i=0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', setButtonState);
    }
  }

  // Model
  const uppercaseCharacters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  const lowercaseCharacters = [...'abcdefghijklmnopqrstuvwxyz']
  const numbers = [...'0123456789']
  const symbols = [...'!@#$%^&*']
  const selectedArrayCharacters = [...uppercaseCharacters, ...lowercaseCharacters, ...numbers, ...symbols];


  const setCharacterArray = () => {
    const selectedArrayCharacters = []

    const selectedOptions = checkSelectedOptions();

    if (selectedOptions.uppercase) {
      selectedArrayCharacters.push(...uppercaseCharacters);
    }

    if (selectedOptions.lowercase) {
      selectedArrayCharacters.push(...lowercaseCharacters);
    }

    if (selectedOptions.numbers) {
      selectedArrayCharacters.push(...numbers);
    }

    if (selectedOptions.symbols) {
      selectedArrayCharacters.push(...symbols);
    }

    // No logic yet for expressions

    return selectedArrayCharacters;

  }

  // View
  const setButtonState = () => {
    const selectedOptions = Object.values(checkSelectedOptions()).includes(true);
    
    if (selectedOptions) {
      generateButton.className = "action_button_enabled";
      generateButton.disabled = false;
    }
    else {
      generateButton.className = "action_button_disabled";
      generateButton.disabled = true;
    }
  }

  const displayPassword = (pass) => {
    password.value = pass;
  };


  // Controller

  const checkSelectedOptions = () => {
    const selectedOptions = {
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
      expressions: false
    }

    if (uppercaseCheckbox.checked){
      selectedOptions.uppercase = true;
    }
    else {
      selectedOptions.uppercase = false;
    }

    if (lowercaseCheckbox.checked){
      selectedOptions.lowercase = true;
    }
    else {
      selectedOptions.lowercase = false;
    }

    if (numbersCheckbox.checked){
      selectedOptions.numbers = true;
    }
    else {
      selectedOptions.numbers = false;
    }

    if (symbolsCheckbox.checked){
      selectedOptions.symbols = true;
    }
    else {
      selectedOptions.symbols = false;
    }

    if (regularExpressionsCheckbox.checked){
      selectedOptions.expressions = true;
    }
    else {
      selectedOptions.expressions = false;
    }

    return selectedOptions;
  }

  const generatePassword = () => {
    const passwordLength = slider.value;

    // Initialise password and possible character arrays
    const randomCharacterArray = setCharacterArray();
    const generatedPasswordArray = [];

    // Push random elements into array
    for (i=0; i < passwordLength; i++) {
      let randomElement = Math.floor(Math.random()*randomCharacterArray.length);
      generatedPasswordArray.push(randomCharacterArray[randomElement]);
    }

    // Convert password array to string
    const passwordString = generatedPasswordArray.join("");

    // Check if password includes at least one of each selection, else try again
    if (checkPassword(passwordString)) {
      displayPassword(passwordString);
    }
    else {
      generatePassword();
    }
  }

  const checkPassword = (password) => { 
    // Check how many options are selected
    const optionsSelected = Object.values(checkSelectedOptions()).reduce((a, item) => a + item, 0)
    
    // Only apply logic if length is >= number of true options ex.regexp
    if (optionsSelected > slider.value) {
      return true;
    }
    
    // Check that at least 1 item from respective array is included in string if option selected
    const selectedOptions = checkSelectedOptions();
    const passString = (character) => {return password.includes(character)};

    if (selectedOptions.uppercase) {
      if (!uppercaseCharacters.some(passString)) {
        return false;
      }   
    }

    if (selectedOptions.lowercase) {
      if (!lowercaseCharacters.some(passString)) {
        return false;
      }   
    }

    if (selectedOptions.numbers) {
      if (!numbers.some(passString)) {
        return false;
      }   
    }

    if (selectedOptions.symbols) {
      if (!symbols.some(passString)) {
        return false;
      }   
    }

    return true;
  }

  slider.addEventListener('input', (event) => {
    characterLengthDisplay.innerText = event.target.value;
  });

  generateButton.addEventListener('click', generatePassword);

  setCheckboxListeners();
  setButtonState();
  // Show initial character length value
  characterLengthDisplay.innerText = slider.value;

});