window.addEventListener('DOMContentLoaded', () => {
  const password = document.getElementById('password_input-text');
  const characterLengthDisplay = document.getElementById('settings_character-length-value');
  const slider = document.getElementById('settings_slider');
  const generateButton = document.getElementById('action_button');
  const copyButton = document.getElementById('password_copy-button');
  const tooltip = document.getElementById('tooltip');

  const uppercaseCheckbox = document.getElementById('uppercase-option');
  const lowercaseCheckbox = document.getElementById('lowercase-option');
  const numbersCheckbox = document.getElementById('numbers-option');
  const symbolsCheckbox = document.getElementById('symbols-option');
  const regularExpressionsCheckbox = document.getElementById('regular-expressions-option');

  const strengthLabel = document.getElementById('settings_strength-label');
  const strengthBar1 = document.getElementById('bar-1');
  const strengthBar2 = document.getElementById('bar-2');
  const strengthBar3 = document.getElementById('bar-3');
  const strengthBar4 = document.getElementById('bar-4');

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
  const wordlist = ['able',	'about',	'account',	'acid',	'across',	'act',	'after',	'again',	'against',	'air',	'all',	'almost',	'among',	'amount',	'and',	'angle', 
    'angry',	'animal',	'answer',	'ant',	'any',	'apple',	'arch',	'arm',	'army',	'art',	'attack',	'attempt',	'awake',	'baby',	'back',	'bad',	'bag',	'balance',	'ball',	'band',	'base',	'basin',	'basket',	'bath',	'because',	'bed',	'bee',	'before',	'belief',	'bell',	'bent',	'berry',	'between',	'bird',	'birth',	'bit',	'bite',	'bitter',	'black',	'blade',	'blood',	'blow',	'blue',	'board',	'boat',	'body',	'boiling',	'bone',	'book',	'boot',	'bottle',	'box',	'boy',
  	'brain',	'brake',	'branch',	'brass',	'bread',	'breath',	'brick',	'bridge',	'bright',	'broken',	'brother',	'brown',	'brush',	'bucket',	'bulb',	'burn',	'burst',	'but',	'butter',	'button',	'cake',	'camera',	'canvas',	'card',	'care',	'cart',	'cat',	'cause',	'certain',	'chain',	'chalk',	'chance',	'change',	'cheap',	'cheese',	'chest',	'chief',	'chin',	'church',	'circle',	'clean',	'clear',	'clock',	'cloth',	'cloud',	'coal',	'coat',	'cold',	'collar',	'colour',	'comb',	'come',	'comfort',	'common',	'company',	'complex',	'control',	'cook',	'copper',	'copy',	'cord',	'cork',	'cotton',	'cough',	'country',	'cover',	'cow',	'crack',	'credit',	'crime',	'cruel',	'crush',
  	'cry',	'cup',	'current',	'curtain',	'curve',	'cushion',	'cut',	'damage',	'danger',	'dark',	'day',	'dead',	'dear',	'death',	'debt',	'deep',	'degree',	'design',	'desire',	'detail',	'dirty',	'disease',	'disgust',	'dog',	'door',	'doubt',	'down',	'drain',	'drawer',	'dress',	'drink',	'driving',	'drop',	'dry',	'dust',	'ear',	'early',	'earth',	'east',	'edge',	'effect',	'egg',	'elastic',	'end',	'engine',	'enough',	'equal',	'error',	'even',	'event',	'ever',	'every',	'example',	'expert',	'eye',	'face',	'fact',	'fall',	'FALSE',	'family',	'far',	'farm',	'fat',	'father',	'fear',	'feather',	'feeble',	'feeling',	'female',	'fertile',	'fiction',	'field',	'fight',	'finger',	'fire',	'first',	'fish',	'fixed',	'flag',	'flame',	'flat',	'flight',	'floor',	'flower',	'fly',	'fold',	'food',	'foolish',	'foot',	'for',	'force',	'fork',	'form',	'forward',	'fowl',	'frame',	'free',	'friend',	'from',	'front',	'fruit',	'full',	'future',	'garden',	'general',	'get',	'girl',	'give',	'glass',	'glove',	'goat',	'gold',	'good',	'grain',	'grass',	'great',	'green',	'grey',	'grip',	'group',	'growth',	'guide',	'gun',	'hair',	'hammer',	'hand',	'hanging',	'happy',	'harbour',	'hard',	'harmony',	'hat',	'hate',	'have',	'head',	'healthy',	'hearing',	'heart',	'heat',	'help',	'here',	'high',	'history',	'hole',	'hollow',	'hook',	'hope',	'horn',	'horse',	'hour',	'house',	'how',	'humour',	'ice',	'idea',	'ill',	'impulse',	'ink',	'insect',	'iron',	'island',	'jelly',	'jewel',	'join',	'journey',	'judge',	'jump',	'keep',	'kettle',	'key',	'kick',	'kind',	'kiss',	'knee',	'knife',	'knot',	'land',	'last',	'late',	'laugh',	'law',	'lead',	'leaf',	'leather',	'left',	'leg',	'let',	'letter',	'level',	'library',	'lift',	'light',	'like',	'limit',	'line',	'linen',	'lip',	'liquid',	'list',	'little',	'living',	'lock',	'long',	'look',	'loose',	'loss',	'loud',	'love',	'low',	'machine',	'make',	'male',	'man',
  	'manager',	'map',	'mark',	'market',	'married',	'mass',	'match',	'may',	'meal',	'measure',	'meat',	'medical',	'meeting',	'memory',	'metal',	'middle',	'milk',	'mind',	'mine',	'minute',	'mist',	'mixed',	'money',	'monkey',	'month',	'moon',	'morning',	'mother',	'motion',	'mouth',	'move',	'much',	'muscle',	'music',	'nail',	'name',	'narrow',	'nation',	'natural',	'near',	'neck',	'need',	'needle',	'nerve',	'net',	'new',	'news',	'night',	'noise',	'normal',	'north',	'nose',	'not',	'note',	'now',	'number',	'nut',	'off',	'offer',	'office',	'oil',	'old',	'only',	'open',	'opinion',	'orange',	'order',	'other',	'out',	'oven',	'over',	'owner',	'page',	'pain',	'paint',	'paper',	'parcel',	'part',	'past',	'paste',	'payment',	'peace',	'pen',	'pencil',	'person',	'picture',	'pig',	'pin',	'pipe',	'place',	'plane',	'plant',	'plate',	'play',	'please',	'plough',	'pocket',	'point',	'poison',	'polish',	'poor',	'porter',	'pot',	'potato',	'powder',	'power',	'present',	'price',	'print',	'prison',	'private',	'process',	'produce',	'profit',	'prose',	'protest',	'public',	'pull',	'pump',	'purpose',	'push',	'put',	'quality',	'quick',	'quiet',	'quite',	'rail',	'rain',	'range',	'rat',	'rate',	'ray',	'reading',	'ready',	'reason',	'receipt',	'record',	'red',	'regret',	'regular',	'request',	'respect',	'rest',	'reward',	'rhythm',	'rice',	'right',	'ring',	'river',	'road',	'rod',	'roll',
    'roof',	'room',	'root',	'rough',	'round',	'rub',	'rule',	'run',	'sad',	'safe',	'sail',	'salt',	'same',	'sand',	'say',	'scale',	'school',	'science',	'screw',	'sea',	'seat',	'second',	'secret',	'see',	'seed',	'seem',	'self',	'send',	'sense',	'serious',	'servant',	'sex',	'shade',	'shake',	'shame',	'sharp',	'sheep',	'shelf',	'ship',	'shirt',	'shock',	'shoe',	'short',	'shut',	'side',	'sign',	'silk',	'silver',	'simple',	'sister',	'size',	'skin',	'skirt',	'sky',	'sleep',	'slip',	'slope',	'slow',	'small',	'smash',	'smell',	'smile',	'smoke',	'smooth',	'snake',	'sneeze',	'snow',	'soap',	'society',	'sock',	'soft',	'solid',	'some',	'son',	'song',	'sort',	'sound',	'soup',	'south',	'space',	'spade',	'special',	'sponge',	'spoon',	'spring',	'square',	'stage',	'stamp',	'star',	'start',	'station',	'steam',	'steel',	'stem',	'step',	'stick',	'sticky',	'stiff',	'still',	'stitch',	'stomach',	'stone',	'stop',	'store',	'story',	'strange',	'street',	'stretch',	'strong',	'such',	'sudden',	'sugar',	'summer',	'sun',	'support',	'sweet',	'swim',	'system',	'table',	'tail',	'take',	'talk',	'tall',	'taste',	'tax',	'test',	'than',	'that',	'the',	'then',	'theory',	'there',	'thick',	'thin',	'thing',	'this',	'though',	'thought',	'thread',	'throat',	'through',	'thumb',	'thunder',	'ticket',	'tight',	'till',	'time',	'tin',	'tired',	'toe',	'tongue',	'tooth',	'top',	'touch',	'town',	'trade',	'train',	'tray',	'tree',	'trick',	'trouble',	'TRUE',	'turn',	'twist',	'under',	'unit',	'use',	'value',	'verse',	'very',	'vessel',	'view',	'violent',	'voice',	'waiting',	'walk',	'wall',	'war',	'warm',	'wash',	'waste',	'watch',	'water',	'wave',	'wax',	'way',	'weather',	'week',	'weight',	'well',	'west',	'wet',	'wheel',	'when',	'where',	'while',	'whip',	'whistle',	'white',	'who',	'why',	'wide',	'will',	'wind',	'window',	'wine',	'wing',	'winter',	'wire',	'wise',	'with',	'woman',	'wood',	'wool',	'word',	'work',	'worm',	'wound',	'writing',	'wrong',	'year',	'yellow',	'yes',	'you',	'young']
  
    const defaultWordList = [...fourLetterWords, ...fiveLetterWords, ...sixLetterWords, ...wordlist];

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
    
    if (selectedOptions && Math.round(slider.value/10) > 0) {
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
    const passwordLength = Math.round(slider.value/10);

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
      checkPasswordStrength(passwordString);
    }
    else {
      generatePassword();
    }
  }

  const checkPassword = (password) => { 
    // Check how many options are selected
    const optionsSelected = Object.values(checkSelectedOptions()).reduce((a, item) => a + item, 0)
    
    // Only apply logic if length is >= number of true options ex.regexp
    if (optionsSelected > Math.round(slider.value/10)) {
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

  const pushRegularExpressions = () => {
    const selectedOptions = checkSelectedOptions();
    const passwordLength = parseInt(Math.round(slider.value/10));
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

        for (i=0; i < firstExpression.length; i++) {
          let arrayPosition = firstStartPosition + i;
          tempPasswordArray[arrayPosition] = firstExpression[i];
        }

        secondStartPositionMin = firstStartPosition + firstExpression.length;
        secondStartPositionMax = passwordLength - secondExpression.length;

        secondStartPosition = Math.floor(Math.random()*(secondStartPositionMax - secondStartPositionMin + 1) + secondStartPositionMin);

        for (i=0; i < secondExpression.length; i++) {
          let arrayPosition = secondStartPosition + i;
          tempPasswordArray[arrayPosition] = secondExpression[i];
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

        for (i=0; i < firstExpression.length; i++) {
          let arrayPosition = firstStartPosition + i;
          tempPasswordArray[arrayPosition] = firstExpression[i];
        }

        secondStartPositionMin = firstStartPosition + firstExpression.length;
        secondStartPositionMax = passwordLength - secondExpression.length;

        secondStartPosition = Math.floor(Math.random()*(secondStartPositionMax - secondStartPositionMin + 1) + secondStartPositionMin);

        for (i=0; i < secondExpression.length; i++) {
          let arrayPosition = secondStartPosition + i;
          tempPasswordArray[arrayPosition] = secondExpression[i];
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

        firstStartPosition = Math.floor(Math.random()*(passwordLength - firstExpression.length));

        for (i=0; i < firstExpression.length; i++) {
          let arrayPosition = firstStartPosition + i;
          tempPasswordArray[arrayPosition] = firstExpression[i];
        }
            
        break;

      case ((passwordLength == 6)):
        firstExpression = [...addCaseToWords(selectRandomWord(4))]; //insert filter to pull word from model 
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

    return tempPasswordArray;
  }

  var timeout;

  const tooltipTimeout = (action) => {
    if (action === 'normal') {
      timeout = setTimeout(() => {
        tooltip.classList.remove('active');
      }, 650);
    }
    else if (action === 'clear') {
      clearTimeout(timeout);
    }
  }

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(password.value);

      tooltipTimeout('clear');

      tooltip.classList.remove('active');
      tooltip.classList.add('active');

      tooltipTimeout('normal');
    }
    catch {
      console.log('error');
    }
  }

  const checkPasswordStrength = (password) => {
    let strongPassword = RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{14,})');
    let mediumPassword = RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,13})|(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{14,})|(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{14,})|(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{14,})|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{14,}))');
    let lowPassword = RegExp('(?=.{6,18})');
    let weakPassword = RegExp('(?=.{1,5})');

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

  slider.addEventListener('input', (event) => {
    characterLengthDisplay.innerText = Math.round(event.target.value/10);
    setExpressionsOption();
    setButtonState();
  });
  
  generateButton.addEventListener('click', generatePassword);
  copyButton.addEventListener('click', copyText);
  password.addEventListener('input', (event) => {
    checkPasswordStrength(event.target.value);
  });
  

  setCheckboxListeners();
  setButtonState();
  setExpressionsOption();
  // Show initial character length value
  characterLengthDisplay.innerText = Math.round(slider.value/10);

});