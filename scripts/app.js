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
  // const selectedArrayCharacters = [...uppercaseCharacters, ...lowercaseCharacters, ...numbers, ...symbols];

  const fourLetterWords = ['Bake', 'Word', 'List', 'Four', 'Five', 'Nine', 'Good', 'Best', 'Cute', 'Zero',	'Huge', 'Cool', 'Tree', 'Race', 'Rice', 'Keep',	'Lace', 'Beam', 'Game', 'Mars', 'Tide', 'Ride', 'Hide', 'Exit', 'Hope', 'Cold', 'From', 'Need',	'Stay', 'Come'];
  const fiveLetterWords = ['clock', 'block' ,'beach', 'award', 'judge' ,'clean' ,'fresh', 'front' ,'round', 'slash' ,'chook' ,'brine' ,'basic', 'floor', 'glass' ,'entry', 'drama' ,'cycle'];
  const sixLetterWords = ['course', 'school', 'labour', 'street', 'nature', 'figure', 'doctor' ,'season', 'summer' ,'region', 'degree' ,'profit' ,'flight', 'palace' ,'driver', 'branch', 'volume', 'studio', 'butter', 'talent']
  const defaultWordList = [...fourLetterWords, ...fiveLetterWords, ...sixLetterWords];

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
    }

    // Push random elements into array
    for (i=0; i < passwordLength; i++) {
      let randomElement = Math.floor(Math.random()*randomCharacterArray.length);
      if(generatedPasswordArray[i] == null) {
        generatedPasswordArray[i] = randomCharacterArray[randomElement];
      }
      else {
        continue;
      }
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
    const selectedOptions = checkSelectedOptions();
    const passwordLength = parseInt(slider.value);
    const tempPasswordArray = [];
    var firstExpression, secondExpression;
    let firstStartPosition;
    let secondStartPositionMin;
    let secondStartPositionMax;
    let secondStartPosition;

    const addCaseToWords = (string) => {
      if (selectedOptions.uppercase && selectedOptions.lowercase) {
        string = string[0].toUpperCase() + string.substring(1);
      }
      else if (selectedOptions.uppercase) {
        string = string.toUpperCase();
      }
      else if (selectedOptions.lowercase){
        string = string.toLowerCase();
      }

      return string;
    }

    const selectRandomWord = (wordLength) => {
      let wordArray = defaultWordList.filter((e) => e.length === wordLength);
      let chosenWord = wordArray[Math.floor(Math.random()*wordArray.length)];
      console.log(chosenWord);
      return chosenWord;
    }

    switch (true) {
      case ((passwordLength >= 17)):

        if (Math.floor(Math.random()*2) == 0) {
          // Randomly select either 1st expression to be 5 or 6 letter word
          firstExpression = [...addCaseToWords(selectRandomWord(6))]; //insert filter to pull word from model 
          secondExpression = [...addCaseToWords(selectRandomWord(5))];
        }
        else {
          firstExpression = [...addCaseToWords(selectRandomWord(5))]; //insert filter to pull word from model 
          secondExpression = [...addCaseToWords(selectRandomWord(6))];
        }

        firstStartPosition = Math.floor(Math.random()*7);

        for (character of firstExpression) {
          let arrayPosition = firstStartPosition + firstExpression.indexOf(character); 
          tempPasswordArray[arrayPosition] = character;
        }

        secondStartPositionMin = firstStartPosition + firstExpression.length;
        secondStartPositionMax = passwordLength - secondExpression.length;

        secondStartPosition = Math.floor(Math.random()*(secondStartPositionMax - secondStartPositionMin + 1) + secondStartPositionMin);

        for (character of secondExpression) {
          let arrayPosition = secondStartPosition + secondExpression.indexOf(character);
          tempPasswordArray[arrayPosition] = character;
        }

        break;
    
      case ((passwordLength >= 11) && (passwordLength <= 16)):

        // Randomly select either 1st expression to be 4 or 5 letter word
        if (Math.floor(Math.random()*2) == 0) {
          firstExpression = [...addCaseToWords(selectRandomWord(4))]; //insert filter to pull word from model 
          secondExpression = [...addCaseToWords(selectRandomWord(5))];

        }
        else {
          firstExpression = [...addCaseToWords(selectRandomWord(5))]; //insert filter to pull word from model 
          secondExpression = [...addCaseToWords(selectRandomWord(4))];
        }

        firstStartPosition = Math.floor(Math.random()*3);

        for (character of firstExpression) {
          let arrayPosition = firstStartPosition + firstExpression.indexOf(character); 
          tempPasswordArray[arrayPosition] = character;
        }

        secondStartPositionMin = firstStartPosition + firstExpression.length;
        secondStartPositionMax = passwordLength - secondExpression.length;

        secondStartPosition = Math.floor(Math.random()*(secondStartPositionMax - secondStartPositionMin + 1) + secondStartPositionMin);

        for (character of secondExpression) {
          let arrayPosition = secondStartPosition + secondExpression.indexOf(character);
          tempPasswordArray[arrayPosition] = character;
        }

        break;

      case ((passwordLength >= 7) && (passwordLength <= 10)):

        // Choose random number to decide word length
        let chooseWordLength = Math.floor(Math.random()*3);

        if (chooseWordLength == 0) {
          firstExpression = [...addCaseToWords(selectRandomWord(4))]; //insert filter to pull word from model 
        }
        else if (chooseWordLength == 1){
          firstExpression = [...addCaseToWords(selectRandomWord(5))]; //insert filter to pull word from model 
        }
        else if (chooseWordLength == 2) {
          firstExpression = [...addCaseToWords(selectRandomWord(6))];
        }

        console.log(firstExpression);
        firstStartPosition = Math.floor(Math.random()*(passwordLength - firstExpression.length));

        for (character of firstExpression) {
          let arrayPosition = firstStartPosition + firstExpression.indexOf(character); 
          tempPasswordArray[arrayPosition] = character;
        }
            
        break;

      case ((passwordLength == 6)):
        firstExpression = [...'Offi']; //insert filter to pull word from model 
        firstStartPosition = Math.floor(Math.random()*(passwordLength - firstExpression.length + 1));

        // cant use for of loop since there are repeating duplicate elements which breaks indexOf logic
        for (i=0; i < firstExpression.length; i++) {
          let arrayPosition = firstStartPosition + i;
          tempPasswordArray[arrayPosition] = firstExpression[i];
        }

        break;

      default:
        break;
    }

    console.log(tempPasswordArray);
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