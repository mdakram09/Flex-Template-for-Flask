window.document.getElementById('button').addEventListener('click', Game);

// difficulty level
var level = {
  easy: 8
}

//  current level
var currentLevel = level.easy;

// global variables
var time = currentLevel;
var score = 0;
var isPlaying;

// variable elements
var seconds = document.getElementById('seconds');
var typeTag = document.getElementById('typeTag');
var timeDisplay = document.getElementById('time');
var message = document.getElementById('message');
var scoreDisplay = document.getElementById('score');
var Tag = document.getElementById('Tag');

// html tags
var htmlTags = [ '&lt;p&gt;','&lt;html&gt;', '&lt;head&gt;', '&lt;title&gt;', '&lt;section&gt;', '&lt;span&gt;', '&lt;br&gt;', '&lt;hr&gt;', '&lt;aside&gt;', '&lt;body&gt;', '&lt;img&gt;', '&lt;table&gt;', '&lt;h1&gt;', '&lt;h2&gt;', '&lt;h3&gt;', '&lt;h4&gt;', '&lt;h5&gt;', '&lt;h6&gt;', '&lt;header&gt;', '&lt;label&gt;', '&lt;legend&gt;', '&lt;font&gt;', '&lt;form&gt;', '&lt;framset&gt;', '&lt;footer&gt;', '&lt;embed&gt;', '&lt;div&gt;', '&lt;dialog&gt;', '&lt;center&gt;', '&lt;blockquote&gt;', '&lt;basefont&gt;', '&lt;article&gt;', '&lt;a&gt;', '&lt;cite&gt;', '&lt;source&gt;', '&lt;textarea&gt;', '&lt;input&gt;', '&lt;tbody&gt;', '&lt;td&gt;', '&lt;tr&gt;', '&lt;tfoot&gt;', '&lt;thead&gt;', '&lt;time&gt;', '&lt;video&gt;', '&lt;style&gt;', '&lt;/h6&gt;', '&lt;/header&gt;', '&lt;/label&gt;', '&lt;/legend&gt;', '&lt;/font&gt;', '&lt;/form&gt;', '&lt;/framset&gt;', '&lt;/footer&gt;', '&lt;/embed&gt;', '&lt;/div&gt;', '&lt;/dialog&gt;', '&lt;/center&gt;', '&lt;/blockquote&gt;', '&lt;/html&gt;', '&lt;/head&gt;', '&lt;/title&gt;', '&lt;/section&gt;', '&lt;/span&gt;'
];

// start game
function Game() {
  seconds.innerHTML = currentLevel;  
  showTags(htmlTags);
  typeTag.addEventListener('input', startGame);
  setInterval(countdown, 1000);
  setInterval(checkStatus,50);
} 

// check if tag is the same
function startGame() {
  if(sameTags()) {
    isPlaying = true;
    time = currentLevel;
    showTags(htmlTags);
    typeTag.value = '';
    score++;
  }
  // if the score is -1 it shows 0
  if(score === -1 ) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }  
}

// when tag is equal to current one
function sameTags() {
  var typedTag = typeTag.value.replace("<","&lt;").replace(">","&gt;")
  if(typedTag === Tag.innerHTML) {
    message.innerHTML = 'Correct 👍';
    message.style.color='Green';
    return true;
  } else {
    message.innerHTML = 'Incorrect';
    message.style.color='Orange';
    return false;
  }
}

// shows a random tags
function showTags(htmlTags) {
  var randIndex = Math.floor(Math.random() * htmlTags.length);
  Tag.innerHTML = htmlTags[randIndex];
}

// countdown timer
function countdown() {
  if(time > 0) {
    time--;
  } else if(time === 0) {
    isPlaying = false;
  } 
  timeDisplay.innerHTML = time;
}

// check status of game
function checkStatus() {
  if(!isPlaying && time === 0) {
    message.innerHTML = 'Game Over ❌ Try Again';
    message.style.color='Red';
    score = -1;
  }
}

