import { password } from "./app.js";

// Initialise variable to HTML element
const tooltip = document.getElementById('tooltip');

// Timeout variable for copy action tooltip
var timeout;

// Set timeout for tooltip when copy button is clicked
const tooltipTimeout = (action) => {

// If there is no tooltip timeout already initialised, initialise with a delay of 650ms. Else, clear existing timeout and reset the delay
if (action === 'normal') {
    timeout = setTimeout(() => {
    tooltip.classList.remove('active');
    }, 650);
}
else if (action === 'clear') {
    clearTimeout(timeout);
}
}

// Function to copy password to clipboard
const copyText = async () => {
try {
    await navigator.clipboard.writeText(password.value);

    // Reset existing timeout
    tooltipTimeout('clear');
    tooltipTimeout('normal');

    tooltip.classList.add('active');

}
catch {
    console.log('error');
}
}

export { copyText };