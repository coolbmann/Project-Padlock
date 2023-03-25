// Initialize possible set characters, symbols and numbers dataset to be used in the password
const uppercaseCharacters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
const lowercaseCharacters = [...'abcdefghijklmnopqrstuvwxyz']
const numbers = [...'0123456789']
const symbols = [...'!@#$%^&*']

// Initialize dataset containing 3-7 letter words used when 'Common Expressions' checkbox is selected
const fourLetterWords = ['Bake', 'Word', 'List', 'Four', 'Five', 'Nine', 'Good', 'Best', 'Cute', 'Zero',	'Huge', 'Cool', 'Tree', 'Race', 'Rice', 'Keep',	'Lace', 'Beam', 'Game', 'Mars', 'Tide', 'Ride', 'Hide', 'Exit', 'Hope', 'Cold', 'From', 'Need',	'Stay', 'Come'];
const fiveLetterWords = ['clock', 'block' ,'beach', 'award', 'judge' ,'clean' ,'fresh', 'front' ,'round', 'slash' ,'chook' ,'brine' ,'basic', 'floor', 'glass' ,'entry', 'drama' ,'cycle'];
const sixLetterWords = ['course', 'school', 'labour', 'street', 'nature', 'figure', 'doctor' ,'season', 'summer' ,'region', 'degree' ,'profit' ,'flight', 'palace' ,'driver', 'branch', 'volume', 'studio', 'butter', 'talent']
const wordlist = ['able',	'about',	'account',	'acid',	'across',	'act',	'after',	'again',	'against',	'air',	'all',	'almost',	'among',	'amount',	'and',	'angle', 
  'angry',	'animal',	'answer',	'ant',	'any',	'apple',	'arch',	'arm',	'army',	'art',	'attack',	'attempt',	'awake',	'baby',	'back',	'bad',	'bag',	'balance',	'ball',	'band',	'base',	'basin',	'basket',	'bath',	'because',	'bed',	'bee',	'before',	'belief',	'bell',	'bent',	'berry',	'between',	'bird',	'birth',	'bit',	'bite',	'bitter',	'black',	'blade',	'blood',	'blow',	'blue',	'board',	'boat',	'body',	'boiling',	'bone',	'book',	'boot',	'bottle',	'box',	'boy', 
  'brain',	'brake',	'branch',	'brass',	'bread',	'breath',	'brick',	'bridge',	'bright',	'broken',	'brother',	'brown',	'brush',	'bucket',	'bulb',	'burn',	'burst',	'but',	'butter',	'button',	'cake',	'camera',	'canvas',	'card',	'care',	'cart',	'cat',	'cause',	'certain',	'chain',	'chalk',	'chance',	'change',	'cheap',	'cheese',	'chest',	'chief',	'chin',	'church',	'circle',	'clean',	'clear',	'clock',	'cloth',	'cloud',	'coal',	'coat',	'cold',	'collar',	'colour',	'comb',	'come',	'comfort',	'common',	'company',	'complex',	'control',	'cook',	'copper',	'copy',	'cord',	'cork',	'cotton',	'cough',	'country',	'cover',	'cow',	'crack',	'credit',	'crime',	'cruel',	'crush', 
  'cry',	'cup',	'current',	'curtain',	'curve',	'cushion',	'cut',	'damage',	'danger',	'dark',	'day',	'dead',	'dear',	'death',	'debt',	'deep',	'degree',	'design',	'desire',	'detail',	'dirty',	'disease',	'disgust',	'dog',	'door',	'doubt',	'down',	'drain',	'drawer',	'dress',	'drink',	'driving',	'drop',	'dry',	'dust',	'ear',	'early',	'earth',	'east',	'edge',	'effect',	'egg',	'elastic',	'end',	'engine',	'enough',	'equal',	'error',	'even',	'event',	'ever',	'every',	'example',	'expert',	'eye',	'face',	'fact',	'fall',	'FALSE',	'family',	'far',	'farm',	'fat',	'father',	'fear',	'feather',	'feeble',	'feeling',	'female',	'fertile',	'fiction',	'field',	'fight',	'finger',	'fire',	'first',	'fish',	'fixed',	'flag',	'flame',	'flat',	'flight',	'floor',	'flower',	'fly',	'fold',	'food',	'foolish',	'foot',	'for',	'force',	'fork',	'form',	'forward',	'fowl',	'frame',	'free',	'friend',	'from',	'front',	'fruit',	'full',	'future',	'garden',	'general',	'get',	'girl',	'give',	'glass',	'glove',	'goat',	'gold',	'good',	'grain',	'grass',	'great',	'green',	'grey',	'grip',	'group',	'growth',	'guide',	'gun',	'hair',	'hammer',	'hand',	'hanging',	'happy',	'harbour',	'hard',	'harmony',	'hat',	'hate',	'have',	'head',	'healthy',	'hearing',	'heart',	'heat',	'help',	'here',	'high',	'history',	'hole',	'hollow',	'hook',	'hope',	'horn',	'horse',	'hour',	'house',	'how',	'humour',	'ice',	'idea',	'ill',	'impulse',	'ink',	'insect',	'iron',	'island',	'jelly',	'jewel',	'join',	'journey',	'judge',	'jump',	'keep',	'kettle',	'key',	'kick',	'kind',	'kiss',	'knee',	'knife',	'knot',	'land',	'last',	'late',	'laugh',	'law',	'lead',	'leaf',	'leather',	'left',	'leg',	'let',	'letter',	'level',	'library',	'lift',	'light',	'like',	'limit',	'line',	'linen',	'lip',	'liquid',	'list',	'little',	'living',	'lock',	'long',	'look',	'loose',	'loss',	'loud',	'love',	'low',	'machine',	'make',	'male',	'man', 
  'manager',	'map',	'mark',	'market',	'married',	'mass',	'match',	'may',	'meal',	'measure',	'meat',	'medical',	'meeting',	'memory',	'metal',	'middle',	'milk',	'mind',	'mine',	'minute',	'mist',	'mixed',	'money',	'monkey',	'month',	'moon',	'morning',	'mother',	'motion',	'mouth',	'move',	'much',	'muscle',	'music',	'nail',	'name',	'narrow',	'nation',	'natural',	'near',	'neck',	'need',	'needle',	'nerve',	'net',	'new',	'news',	'night',	'noise',	'normal',	'north',	'nose',	'not',	'note',	'now',	'number',	'nut',	'off',	'offer',	'office',	'oil',	'old',	'only',	'open',	'opinion',	'orange',	'order',	'other',	'out',	'oven',	'over',	'owner',	'page',	'pain',	'paint',	'paper',	'parcel',	'part',	'past',	'paste',	'payment',	'peace',	'pen',	'pencil',	'person',	'picture',	'pig',	'pin',	'pipe',	'place',	'plane',	'plant',	'plate',	'play',	'please',	'plough',	'pocket',	'point',	'poison',	'polish',	'poor',	'porter',	'pot',	'potato',	'powder',	'power',	'present',	'price',	'print',	'prison',	'private',	'process',	'produce',	'profit',	'prose',	'protest',	'public',	'pull',	'pump',	'purpose',	'push',	'put',	'quality',	'quick',	'quiet',	'quite',	'rail',	'rain',	'range',	'rat',	'rate',	'ray',	'reading',	'ready',	'reason',	'receipt',	'record',	'red',	'regret',	'regular',	'request',	'respect',	'rest',	'reward',	'rhythm',	'rice',	'right',	'ring',	'river',	'road',	'rod',	'roll', 
  'roof',	'room',	'root',	'rough',	'round',	'rub',	'rule',	'run',	'sad',	'safe',	'sail',	'salt',	'same',	'sand',	'say',	'scale',	'school',	'science',	'screw',	'sea',	'seat',	'second',	'secret',	'see',	'seed',	'seem',	'self',	'send',	'sense',	'serious',	'servant',	'sex',	'shade',	'shake',	'shame',	'sharp',	'sheep',	'shelf',	'ship',	'shirt',	'shock',	'shoe',	'short',	'shut',	'side',	'sign',	'silk',	'silver',	'simple',	'sister',	'size',	'skin',	'skirt',	'sky',	'sleep',	'slip',	'slope',	'slow',	'small',	'smash',	'smell',	'smile',	'smoke',	'smooth',	'snake',	'sneeze',	'snow',	'soap',	'society',	'sock',	'soft',	'solid',	'some',	'son',	'song',	'sort',	'sound',	'soup',	'south',	'space',	'spade',	'special',	'sponge',	'spoon',	'spring',	'square',	'stage',	'stamp',	'star',	'start',	'station',	'steam',	'steel',	'stem',	'step',	'stick',	'sticky',	'stiff',	'still',	'stitch',	'stomach',	'stone',	'stop',	'store',	'story',	'strange',	'street',	'stretch',	'strong',	'such',	'sudden',	'sugar',	'summer',	'sun',	'support',	'sweet',	'swim',	'system',	'table',	'tail',	'take',	'talk',	'tall',	'taste',	'tax',	'test',	'than',	'that',	'the',	'then',	'theory',	'there',	'thick',	'thin',	'thing',	'this',	'though',	'thought',	'thread',	'throat',	'through',	'thumb',	'thunder',	'ticket',	'tight',	'till',	'time',	'tin',	'tired',	'toe',	'tongue',	'tooth',	'top',	'touch',	'town',	'trade',	'train',	'tray',	'tree',	'trick',	'trouble',	'TRUE',	'turn',	'twist',	'under',	'unit',	'use',	'value',	'verse',	'very',	'vessel',	'view',	'violent',	'voice',	'waiting',	'walk',	'wall',	'war',	'warm',	'wash',	'waste',	'watch',	'water',	'wave',	'wax',	'way',	'weather',	'week',	'weight',	'well',	'west',	'wet',	'wheel',	'when',	'where',	'while',	'whip',	'whistle',	'white',	'who',	'why',	'wide',	'will',	'wind',	'window',	'wine',	'wing',	'winter',	'wire',	'wise',	'with',	'woman',	'wood',	'wool',	'word',	'work',	'worm',	'wound',	'writing',	'wrong',	'year',	'yellow',	'yes',	'you',	'young']
  
// Destructure the arrays above into a sigle array
const defaultWordList = [...fourLetterWords, ...fiveLetterWords, ...sixLetterWords, ...wordlist];

export {defaultWordList, uppercaseCharacters, lowercaseCharacters, numbers, symbols};