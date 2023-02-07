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
      checkboxes[i].addEventListener('click', () => {
        setButtonState();
        setExpressionsOption()
      }
      );
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
    
    if (selectedOptions && slider.value > 0) {
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
    var generatedPasswordArray = [];
    
    if (checkSelectedOptions().expressions) {
      generatedPasswordArray = pushRegularExpressions();
      console.log(generatedPasswordArray);
      return
    }

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

  const setExpressionsOption = () => {
  const selectedOptions = checkSelectedOptions();

    if (selectedOptions.uppercase || selectedOptions.lowercase) {
      if (slider.value >= 6) {
        regularExpressionsCheckbox.disabled = false;
      }
      else {
        regularExpressionsCheckbox.disabled = true
        regularExpressionsCheckbox.checked = false;
      }
    }
    else {
      regularExpressionsCheckbox.disabled = true
      regularExpressionsCheckbox.checked = false;
    }
  }

  const pushRegularExpressions = () => {
    const passwordLength = parseInt(slider.value);
    const tempPasswordArray = [];
    var firstExpression, secondExpression;

    

    switch (true) {
      case ((passwordLength >= 17)):

        console.log('test1');

        if (Math.floor(Math.random()*2) == 0) {
          // Randomly select either 1st expression to be 5 or 6 letter word
          firstExpression = [...'sixlet']; //insert filter to pull word from model 
          secondExpression = [...'fivel'];

        }
        else {
          firstExpression = [...'fivel']; //insert filter to pull word from model 
          secondExpression = [...'sixlet'];
        }


        let firstStartPosition = Math.floor(Math.random()*7);

        for (character of firstExpression) {
          let arrayPosition = firstStartPosition + firstExpression.indexOf(character); 
          tempPasswordArray[arrayPosition] = character;
        }

        let secondStartPositionMin = firstStartPosition + firstExpression.length;
        let secondStartPositionMax = passwordLength - secondExpression.length;

        let secondStartPosition = Math.floor(Math.random()*(secondStartPositionMax - secondStartPositionMin + 1) + secondStartPositionMin);

        for (character of secondExpression) {
          let arrayPosition = secondStartPosition + secondExpression.indexOf(character);
          tempPasswordArray[arrayPosition] = character;
        }
        
        
        
        break;
    
      default:
        break;
    }

    return tempPasswordArray;
  }

  slider.addEventListener('input', (event) => {
    characterLengthDisplay.innerText = event.target.value;
    setExpressionsOption();
    setButtonState();
  });

  generateButton.addEventListener('click', generatePassword);

  setCheckboxListeners();
  setButtonState();
  setExpressionsOption();
  // Show initial character length value
  characterLengthDisplay.innerText = slider.value;

});