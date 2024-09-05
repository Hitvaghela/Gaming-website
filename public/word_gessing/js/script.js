const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");
score=0;
let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
   
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
    
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(correctLetters.length === word.length) {
            score=score+10;
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            addrecord();
            return randomWord();
            
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
async function addrecord() {
    try {
        const data1 = 100;
        const response = await fetch("/store_recorde", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, score: data1 ,game:'word_gessing'}) // Convert JSON object to string
        });
        const data = await response; 
        if(data.status===200){
            alert("Record stored")
        }
    }

    catch (error) {
        console.log('Error :', error);
    }
}
function getParameterByName(name, url) {
    
    if (!url) url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");

    
    var results = regex.exec(url);

    if (!results) return null;

   
    if (!results[2]) return '';

  
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get the value of the 'username' query parameter from the URL
var username = getParameterByName('username');

// If 'username' parameter exists in the URL
document.addEventListener("DOMContentLoaded", function() {
    // This code will run after the DOM is fully loaded
    document.querySelector('.nav3').addEventListener('click', (event) => {
        event.preventDefault();
        addrecord();
        window.location.href = `../temp/profile/user.html?username=${username}`;
    });
  });
  