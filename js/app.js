const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const phraseUl = document.querySelector('#phrase ul');
const startGame = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
let missed = 0;
//Create a phrases array that contains at least 5 different phrases as strings.
const phrases = [
    'Luigi is the tallest Mario Brother',
    'Sonic is the best Sega Game',
    'Its a me Mario',
    'Welcome to your doom',
    'Mega man is one of my favorites',
    'Space invaders is a cool game to build',
    'Link is the hero in zelda',
    'Sports games are a waste of time',
    'I mean just play a sport or a game dude'
];

// add event listener on click of start button, overlay hidden and empty phrase appears
startGame.addEventListener('click', () => {
  if (startGame.textContent === 'Start Game') {
  overlay.setAttribute('style', 'display:none');
  addPhraseToDisplay(getRandomPhrase(phrases)); 
  }       
});

// return a random phrase from the phrases array
const getRandomPhrase = arr => {
   let randomPhrase = Math.floor(Math.random() *phrases.length);
   for(let value of arr) return arr[randomPhrase];
}

// adds the letters of a string to the display
function addPhraseToDisplay(arr) {
  for( let i = 0; i < arr.length; i++) {
    let li = document.createElement('li');
    li.textContent = arr[i];
    if (arr[i] === ' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
  phraseUl.appendChild(li);
  }  
}

// Checking for letter
function checkLetter(letter) {
  let checkLetter = document.getElementsByClassName('letter');
  let match = null;
  for( let i = 0; i < checkLetter.length; i++){
  if( letter.textContent.toLowerCase() === checkLetter[i].textContent.toLowerCase()) {
    checkLetter[i].classList.add('show');
    match = checkLetter[i];
  }
 }
 return match;
}

// listen of the onscreen keyboard to be clicked and remove hearts 
qwerty.addEventListener('click', (e) => {
   if(e.target.tagName === 'BUTTON') {
    const button = e.target;
    button.disabled = true;
    button.classList.add('chosen');
    const letterCheck = checkLetter(button);
    if(letterCheck === null) {
      missed += 1;
      heart = document.querySelector('.tries');
      let scoreboard = document.querySelector('#scoreboard ol');
      scoreboard.removeChild(heart);
      const lostHeart = document.createElement('li');
      lostHeart.innerHTML = '<img src="svgs/asteroids-galaga-golden-age-of-arcade-video-games-super-nintendo-arcade-game-png-900_1700.jpg" height="35px" width="30px">';
      lostHeart.style.marginRight = '4px';
      scoreboard.appendChild(lostHeart);
    } 
  }   
  checkWin();
});

// Check the condition of whether the user won or lost
const checkWin = () => {
  let total = document.getElementsByClassName('letter').length;
  let correctLetters = document.getElementsByClassName('show').length;
  if ( correctLetters === total) {
    overlay.classList.add('win');
    overlay.textContent = 'Congratulations, You are an arcade Wizard!!!';
    overlay.style.display = 'flex';
  } else if (missed > 4) {
    overlay.classList.add('lose');
    overlay.textContent = 'GAME OVER DUDE!! You are just a novice. Keep Gaming! '
    overlay.style.display = 'flex';
  }
}