const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const accuracyLabel = document.querySelector(".accuracy");
const wordsPerMinuteLabel = document.querySelector(".wpm");

var timer = [0,0,0,0];
var interval;
var wpmInterval;
var timerRunning = false;
var errors = 0;
var timeElapsed = 0;
var randomParagraph = 0;
var wpm;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

    timeElapsed = timer[0]*60 + timer[1];
}

// Finds words per minute
function wordsPerMinute() {
  if (timeElapsed > 0) {
    var grossWpm = Math.floor((testArea.value.length/5) / (timeElapsed/60));
    console.log(grossWpm);
    wpm = Math.floor(((testArea.value.length/5) - errors)/(timeElapsed/60));
    console.log(wpm);
    if (wpm < 0) {
      wordsPerMinuteLabel.innerHTML = 0 + " WPM";
    } else {
      wordsPerMinuteLabel.innerHTML = wpm + " WPM";
    }
    accuracy(grossWpm);
  }
}

// Finds the accuracy
function accuracy(grossWpm) {
  let accuracy = Math.floor(wpm/grossWpm*100);
  if (accuracy < 0) {
    accuracyLabel.innerHTML = 0+"%";
  } else {
    accuracyLabel.innerHTML = accuracy+"%";
  }
  console.log(accuracy);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);


    if (textEntered == originText) {
        clearInterval(interval);
        clearInterval(wpmInterval);
        testWrapper.style.borderColor = "#49C144"; //Green
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#49C144"; //before Blue present green
        } else {
            errors++;
            if (!(event.keyCode === 8)) {
              testWrapper.style.borderColor = "#D71820"; //before Orange present red
            } else {
              errors--;
            }
        }
    }
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
        wpmInterval = setInterval(wordsPerMinute, 1000);
    }
}

//Generates a new paragraph:
function randomParagraphGenerator() {
    let par1 = "I had the train compartment to myself up to Rohana, then a girl got in. The couple who saw her off were probably her parents. They seemed very anxious about her comfort and the woman gave the girl detailed instructions as to where to keep her things, when not to lean out of windows, and how to avoid speaking to strangers.";
    let par2 = "They called their goodbyes and the train pulled out of the station. As I was totally blind at the time, my eyes sensitive only to light and darkness, I was unable to tell what the girl looked like. But I knew she wore slippers from the way they slapped against her heels.";
    let par3 = "It would take me some time to discover something about her looks and perhaps I never would. But I liked the sound of her voice and even the sound of her slippers. 'Are you going all the way to Dehra? I asked.";
    let par4 = "I must have been sitting in a dark corner because my voice startled her. She gave a little exclamation and said, I didn't know anyone else was here.'Well, it often happens that people with good eyesight fail to see what is right in front of them. They have too much to take in, I suppose.";
    let par5 = "Whereas people who cannot see (or see very little) have to take in only the essentials, whatever registers tellingly on their remaining senses.I didn't see you either,' I said. 'But I heard you come in.' I wondered if I would be able to prevent her from discovering that I was blind. Provided I keep to my seat, I thought, it shouldn't be too difficult. The girl said, I am getting off at Saharanpur. My aunt is meeting me there.'";
    let par6 = "Then I had better not get too familiar/ I replied. 'Aunts are usually formidable creatures.' 'Where are you going?' she asked. 'To Dehra and then to Mussoorie.' 'Oh, how lucky you are. I wish I were going to Mussoorie. I love the hills. Especially in October.' 'Yes, this is the best time,' I said, calling on my memories. The hills are covered with wild dahlias, the sun is delicious, and at night you can sit in front of a log fire and drink a little brandy. Most of the tourists have gone and the roads are quiet and almost deserted. Yes, October is the best time.'";
    let par7 = "She was silent. I wondered if my words had touched her or whether she thought me a romantic fool. Then I made a mistake. 'What is it like outside?' I asked. She seemed to find nothing strange in the question. Had she noticed already that I could not see? But her next question removed my doubts.";
    let par8 = "'Why don't you look out of the window?' she asked.I moved easily along the berth and felt for the window ledge. The window was open and I faced it, making a pretence of studying the landscape. I heard the panting of the engine, the rumble of the wheels, and, in my mind's eye I could see telegraph posts flashing by.";
    let par9 = "'Have you noticed,' I ventured, 'that the trees seem to be moving while we seem to be standing still?' That always happens,' she said. 'Do you see any animals?' 'No,' I answered quite confidently. I knew that there were hardly any animals left in the forests near Dehra. I turned from the window and faced the girl and for a while we sat in silence.";
    let par10 = "The man who had entered the compartment broke into my reverie. 'You must be disappointed/ he said. 'I'm not nearly as attractive a travelling companion as the one who just left.' 'She was an interesting girl/ I said. 'Can you tell me—did she keep her hair long or short?' 'I don't remember/ he said sounding puzzled. 'It was her eyes I noticed, not her hair. She had beautiful eyes but they were of no use to her. She was completely blind. Didn't you notice?";

    switch (Math.floor(Math.random() * 10)) {
      case 0:
        originText = par1;
        document.querySelector("#origin-text p").innerHTML = par1;
        break;
      case 1:
        originText = par2;
        document.querySelector("#origin-text p").innerHTML = par2;
        break;
      case 2:
        originText = par3;
        document.querySelector("#origin-text p").innerHTML = par3;
        break;
      case 3:
        originText = par4;
        document.querySelector("#origin-text p").innerHTML = par4;
        break;
      case 4:
        originText = par5;
        document.querySelector("#origin-text p").innerHTML = par5;
        break;
      case 5:
        originText = par6;
        document.querySelector("#origin-text p").innerHTML = par6;
        break;
      case 6:
        originText = par7;
        document.querySelector("#origin-text p").innerHTML = par7;
        break;
      case 7:
        originText = par8;
        document.querySelector("#origin-text p").innerHTML = par8;
        break;
      case 8:
        originText = par9;
        document.querySelector("#origin-text p").innerHTML = par9;
        break;
      case 9:
        originText = par10;
        document.querySelector("#origin-text p").innerHTML = par10;
        break;
    }

}

// Reset everything:
function reset() {
    clearInterval(interval);
    clearInterval(wpmInterval);
    interval = null;
    wpmInterval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    wpm = 0 + " WPM";
    timeElapsed = 0;
    errors = 0;

    testArea.value = "";
    testArea.disabled = false;
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    accuracyLabel.innerHTML = "100%";
    wordsPerMinuteLabel.innerHTML = wpm;
    randomParagraphGenerator();
}

// Event listeners for keyboard input and the reset
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
