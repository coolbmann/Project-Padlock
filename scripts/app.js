window.addEventListener('DOMContentLoaded', () => {
  const characterLengthDisplay = document.getElementById('settings_character-length-value');
  const slider = document.getElementById('settings_slider');

  slider.addEventListener('input', (event) => {
    characterLengthDisplay.innerText = event.target.value;
  });

});