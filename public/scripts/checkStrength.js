
// Initialize variables and assign HTML elements

const strengthLabel = document.getElementById('settings_strength-label');
const strengthBar1 = document.getElementById('bar-1');
const strengthBar2 = document.getElementById('bar-2');
const strengthBar3 = document.getElementById('bar-3');
const strengthBar4 = document.getElementById('bar-4');

/* 
Function to test password strength

Password strength logic:
1. Strong: Contains uppercase, lowercase, number, symbol and is at least 14 characters long
2. Medium: Contains uppercase, lowercase, number, symbol and is at least between 8-13 characters long OR at least 14 characters long and contains 3/4 of options selected
3. Low: At least 6 letters long and does not meet any of the above conditions
4. Weak: Less than 6 characters long

*/
const checkPasswordStrength = (password) => {
	let strongPassword = RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{14,})');
	let mediumPassword = RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,13})|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{14,})|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{14,})|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{14,})|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{14,}))');
	let lowPassword = RegExp('(?=.{6,18})');
	let weakPassword = RegExp('(?=.{1,5})');

	// Check passowrd against regexp and display appropriate UI
	if (strongPassword.test(password)) {
		strengthBar1.style.backgroundColor = "#3fc380";
		strengthBar1.style.borderColor = "#3fc380";

		strengthBar2.style.backgroundColor = "#3fc380";
		strengthBar2.style.borderColor = "#3fc380";

		strengthBar3.style.backgroundColor = "#3fc380";
		strengthBar3.style.borderColor = "#3fc380";

		strengthBar4.style.backgroundColor = "#3fc380";
		strengthBar4.style.borderColor = "#3fc380";

		strengthLabel.textContent = 'STRONG';
	}
	else if (mediumPassword.test(password)) {
		strengthBar1.style.backgroundColor = "#fef160";
		strengthBar1.style.borderColor = "#fef160";

		strengthBar2.style.backgroundColor = "#fef160";
		strengthBar2.style.borderColor = "#fef160";

		strengthBar3.style.backgroundColor = "#fef160";
		strengthBar3.style.borderColor = "#fef160";

		strengthBar4.style.backgroundColor = "#131218";
		strengthBar4.style.borderColor = "#e2dfdf";

		strengthLabel.textContent = 'MEDIUM';
	}
	else if (lowPassword.test(password)) {
		strengthBar1.style.backgroundColor = "orange";
		strengthBar1.style.borderColor = "orange";

		strengthBar2.style.backgroundColor = "orange";
		strengthBar2.style.borderColor = "orange";

		strengthBar3.style.backgroundColor = "#131218";
		strengthBar3.style.borderColor = "#e2dfdf";

		strengthBar4.style.backgroundColor = "#131218";
		strengthBar4.style.borderColor = "#e2dfdf";

		strengthLabel.textContent = 'LOW';
	}
	else if (weakPassword.test(password)) {
		strengthBar1.style.backgroundColor = "#d91e18";
		strengthBar1.style.borderColor = "#d91e18";

		strengthBar2.style.backgroundColor = "#131218";
		strengthBar2.style.borderColor = "#e2dfdf";

		strengthBar3.style.backgroundColor = "#131218";
		strengthBar3.style.borderColor = "#e2dfdf";

		strengthBar4.style.backgroundColor = "#131218";
		strengthBar4.style.borderColor = "#e2dfdf";

		strengthLabel.textContent = 'WEAK';
	}
	else {
		strengthBar1.style.backgroundColor = "#131218";
		strengthBar1.style.borderColor = "#e2dfdf";

		strengthBar2.style.backgroundColor = "#131218";
		strengthBar2.style.borderColor = "#e2dfdf";

		strengthBar3.style.backgroundColor = "#131218";
		strengthBar3.style.borderColor = "#e2dfdf";

		strengthBar4.style.backgroundColor = "#131218";
		strengthBar4.style.borderColor = "#e2dfdf";

		strengthLabel.textContent = '';
	}
}

export { checkPasswordStrength };