import { generatePassword, checkSelectedOptions} from "./generatePassword.js";
import { copyText } from "./copyText.js";

export { password, slider };

// Initialize variables and assign HTML elements
const password = document.getElementById('password_input-text');
const characterLengthDisplay = document.getElementById('settings_character-length-value');
const slider = document.getElementById('settings_slider');
const generateButton = document.getElementById('action_button');
const copyButton = document.getElementById('password_copy-button');

const regularExpressionsCheckbox = document.getElementById('regular-expressions-option');

// Initialise event listeners
const setCheckboxListeners = () => {
  const checkboxes = document.querySelectorAll('.settings_checkbox');

  for (let i=0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', () => {
      setButtonState();
      setExpressionsOption()
    }
    );
  }
}

slider.addEventListener('input', (event) => {
  characterLengthDisplay.innerText = Math.round(event.target.value/10);
  setExpressionsOption();
  setButtonState();
});

generateButton.addEventListener('click', generatePassword);
copyButton.addEventListener('click', copyText);
password.addEventListener('input', (event) => {
  (event.target.value);
});


/* Set the states of buttons */

// Check if the criteria is met for a password to be generated and set button state
const setButtonState = () => {
  
  // Variable reference to a check of if at least 1 option is selected
  const selectedOptions = Object.values(checkSelectedOptions()).includes(true);
  
  // If at least 1 option to select the character composition of the password must be selected and password length > 0, toggle button and set CSS class
  if (selectedOptions && Math.round(slider.value/10) > 0) {
    generateButton.className = "action_button_enabled";
    generateButton.disabled = false;
  }
  else {
    generateButton.className = "action_button_disabled";
    generateButton.disabled = true;
  }
}

// Function to determine if the user can select the option to include regular expressions
const setExpressionsOption = () => {
  const selectedOptions = checkSelectedOptions();

  // Check that at least an alphabet character option is selected, else disable common expression checkbox
  if (selectedOptions.uppercase || selectedOptions.lowercase) {
    if (Math.round(slider.value/10) >= 6) {
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

// Call initial functions on page load (Modules are deferred by default)
setCheckboxListeners();
setButtonState();
setExpressionsOption();

// Show initial character length value on page load
characterLengthDisplay.innerText = Math.round(slider.value/10);