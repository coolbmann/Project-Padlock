// Import modules
import { defaultWordList, uppercaseCharacters, lowercaseCharacters, numbers, symbols } from "./model.js";
import { checkPasswordStrength } from "./checkStrength.js";
import { password, slider } from "./app.js";

const uppercaseCheckbox = document.getElementById('uppercase-option');
const lowercaseCheckbox = document.getElementById('lowercase-option');
const numbersCheckbox = document.getElementById('numbers-option');
const symbolsCheckbox = document.getElementById('symbols-option');
const regularExpressionsCheckbox = document.getElementById('regular-expressions-option');

// Depending on which checkboxes are selected for password composition options, add the respective characters into an array which is used to build the password
const setCharacterArray = () => {
  const selectedArrayCharacters = []

  // Check which options are selected and return object contatining boolean key-value pairs
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

  return selectedArrayCharacters;

}

// Function to check which password options are selected
const checkSelectedOptions = () => {
  const selectedOptions = {
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
    expressions: false
  }

  // Set boolean to selectedOption object key-value pairs based on if each option is selected
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


// Generate password when Generate Password button is pressed
const generatePassword = () => {
	const passwordLength = Math.round(slider.value/10);

	// Initialise password and possible character arrays
	const randomCharacterArray = setCharacterArray();
	var generatedPasswordArray = [];    // Variable can be reassigned if common expressions are used
	
	// Check if common expressions are used, if true, use array containing regular expression
	if (checkSelectedOptions().expressions) {
		generatedPasswordArray = pushRegularExpressions();
	}

	// Push random elements into array based on selected length
	for (let i=0; i < passwordLength; i++) {
		let randomElement = Math.floor(Math.random()*randomCharacterArray.length);

		// If the position in the array is not already filled by a common expression, push a random element from the set of possible characters array, else skip
		if(generatedPasswordArray[i] == null) {
			generatedPasswordArray[i] = randomCharacterArray[randomElement];
		}
		else {
			continue;
		}
	}

	// Convert password array to string
	const passwordString = generatedPasswordArray.join("");

	// Check if password includes at least one of each selection, else generate a new password
	if (checkPassword(passwordString)) {
		displayPassword(passwordString);
		checkPasswordStrength(passwordString);
	}
	else {
		generatePassword();
	}
}


// Function to check if password contains at least one of all selected options
const checkPassword = (password) => { 
	const selectedOptions = checkSelectedOptions();

	// Check how many options are selected
	const optionsSelected = Object.values(selectedOptions).reduce((a, item) => a + item, 0);   // True values converts to 1
	
	// Only apply logic if length is >= number of true options ex.regexp
	if (optionsSelected > Math.round(slider.value/10)) {
		return true;
	}
	
	// Callback function to check if element from set is included in the password
	const passString = (character) => {return password.includes(character)};

	// Check that at least 1 character item from the set of selected options is included in the generated password array
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

/*
  Function containing logic to create an array containing common expressions
 
  Common expression array logic:

  1. Select word(s) based on length of password selected
    a. >= 17 words: 2 words of lengths 5 & 6 letters
    b. >=11 && <17: 2 words of length 4 & 5 letters
    c. >= 7 && <11: 1 word of length 4 & 6 letters
    d. =6 words: 1 word of length 4 letters
  2. Set case of word selected from common expression database based on uppercase/lowercase combination selected
    a. Pascal case if both, else uppercase or lowercase only
  3. Set position of first word so that length of both words cannot exceed the length specified while also ensuring no overlaps
    a. Randomise the start position based on the max starting position constraint and insert destructured string into array
  4. Set the position of the second word based on the end position of the last item in the array from the first word so that there are no overlaps and does not exceed length of string specified
    a. Randomise the start position based on the min and max starting position constraint and insert destructured string into array

*/
const pushRegularExpressions = () => {
	const selectedOptions = checkSelectedOptions();
	const passwordLength = parseInt(Math.round(slider.value/10));
	const tempPasswordArray = [];
	var firstExpression, secondExpression;
	let firstStartPosition;
	let secondStartPositionMin;
	let secondStartPositionMax;
	let secondStartPosition;
	
	// Add case depending on combination of uppercase/lowercase options selected
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

	// Function to select a word from database based on word length
	const selectRandomWord = (wordLength) => {
		let wordArray = defaultWordList.filter((e) => e.length === wordLength);
		let chosenWord = wordArray[Math.floor(Math.random()*wordArray.length)];
		return chosenWord;
	}

	switch (true) {
		case ((passwordLength >= 17)):

			// Randomly select either 1st expression to be 5 or 6 letter word and apply case
			if (Math.floor(Math.random()*2) == 0) {
				firstExpression = [...addCaseToWords(selectRandomWord(6))];   // Desctructure string into array
				secondExpression = [...addCaseToWords(selectRandomWord(5))];  // Desctructure string into array
			}
			else {
				firstExpression = [...addCaseToWords(selectRandomWord(5))];
				secondExpression = [...addCaseToWords(selectRandomWord(6))];
			}

			// First start position must be within the first 7 positions in the array for this switch case to ensure constraint is met
			firstStartPosition = Math.floor(Math.random()*7);

			// Insert selected word into the array based on the determined start position
			for (let i=0; i < firstExpression.length; i++) {
				let arrayPosition = firstStartPosition + i;
				tempPasswordArray[arrayPosition] = firstExpression[i];
			}

			// Second word start position must be after the end position in the array of the first word, total length of word must not exceed password length
			secondStartPositionMin = firstStartPosition + firstExpression.length;
			secondStartPositionMax = passwordLength - secondExpression.length;

			// Randomise 2nd word start position based on constraints set above
			secondStartPosition = Math.floor(Math.random()*(secondStartPositionMax - secondStartPositionMin + 1) + secondStartPositionMin);

			// Insert selected word into the array based on the determined start position
			for (let i=0; i < secondExpression.length; i++) {
				let arrayPosition = secondStartPosition + i;
				tempPasswordArray[arrayPosition] = secondExpression[i];
			}

			break;
		
		case ((passwordLength >= 11) && (passwordLength <= 16)):

			// Randomly select either 1st expression to be 4 or 5 letter word
			if (Math.floor(Math.random()*2) == 0) {
				firstExpression = [...addCaseToWords(selectRandomWord(4))]; 
				secondExpression = [...addCaseToWords(selectRandomWord(5))];
			}
			else {
				firstExpression = [...addCaseToWords(selectRandomWord(5))];  
				secondExpression = [...addCaseToWords(selectRandomWord(4))];
			}

			// First start position must be within the first 3 positions in the array for this switch case to ensure constraint is met        
			firstStartPosition = Math.floor(Math.random()*3);

			for (let i=0; i < firstExpression.length; i++) {
				let arrayPosition = firstStartPosition + i;
				tempPasswordArray[arrayPosition] = firstExpression[i];
			}

			secondStartPositionMin = firstStartPosition + firstExpression.length;
			secondStartPositionMax = passwordLength - secondExpression.length;

			secondStartPosition = Math.floor(Math.random()*(secondStartPositionMax - secondStartPositionMin + 1) + secondStartPositionMin);

			for (let i=0; i < secondExpression.length; i++) {
				let arrayPosition = secondStartPosition + i;
				tempPasswordArray[arrayPosition] = secondExpression[i];
			}

			break;

		case ((passwordLength >= 7) && (passwordLength <= 10)):

			// Choose random number to decide word length
			let chooseWordLength = Math.floor(Math.random()*3);

			if (chooseWordLength == 0) {
				firstExpression = [...addCaseToWords(selectRandomWord(4))]; 
			}
			else if (chooseWordLength == 1){
				firstExpression = [...addCaseToWords(selectRandomWord(5))];  
			}
			else if (chooseWordLength == 2) {
				firstExpression = [...addCaseToWords(selectRandomWord(6))];   // Note if both number and symbol is selected and password length is 7, commmon expression word will never be 6 letters (program will iterate with new passwords)
			}

			// Maximum first start position must be the length of password minus length of word selected
			firstStartPosition = Math.floor(Math.random()*(passwordLength - firstExpression.length));

			for (let i=0; i < firstExpression.length; i++) {
				let arrayPosition = firstStartPosition + i;
				tempPasswordArray[arrayPosition] = firstExpression[i];
			}
						
			break;

		case ((passwordLength == 6)):
			firstExpression = [...addCaseToWords(selectRandomWord(4))];
				
			firstStartPosition = Math.floor(Math.random()*(passwordLength - firstExpression.length + 1));

			for (let i=0; i < firstExpression.length; i++) {
				let arrayPosition = firstStartPosition + i;
				tempPasswordArray[arrayPosition] = firstExpression[i];
			}

			break;

		default:
			break;
	}

	return tempPasswordArray;
}

// Display generated password
const displayPassword = (pass) => {
	password.value = pass;
};

export { generatePassword, checkSelectedOptions };