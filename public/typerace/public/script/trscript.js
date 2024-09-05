document.addEventListener("DOMContentLoaded", function() {
    const passageElement = document.getElementById("passage");
    const racestartElement = document.getElementById("racestart");
    const inputElement = document.getElementById("input");
    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    const resultElement = document.getElementById("result");
    const carElement = document.getElementById("car");
    const pathElement = document.getElementById("path");

    // Sample passage
    let passage;
    let words;
    let currentWordIndex = 0;
    let startTime;
    
    async function fetchRandomPassage() {
        try {
            const response = await fetch('/passage'); // Fetching from the '/passage' endpoint
            const data = await response.json();
            return data.passage; // Assuming the passage text is stored in a field named 'text'
        } catch (error) {
            console.error('Error fetching passage:', error);
            return null;
        }
    }

    
    const racenotice = "The race is on! Type the text below:";

    startButton.addEventListener("click", async function() {
        try {
            passage = await fetchRandomPassage();
            if (typeof passage === 'string') { // Check if passage is a string
                words = passage.split(" ");
                racestartElement.textContent = racenotice;
                passageElement.textContent = passage;
                inputElement.focus();
                startButton.style.display = "none"; // Hide start button
                startTime = Date.now(); // Start time for WPM calculation
                promptNextWord();
            } else {
                console.error("Failed to fetch passage or invalid passage format.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    });
    
    
//     restartButton.addEventListener("click", async function() {
//         passage = await fetchRandomPassage(); // Fetch random passage
//        if (passage) {
//         words = passage.split(" ");
//        racestartElement.textContent = racenotice;
//        passageElement.textContent = passage;
//        inputElement.focus();
//        startButton.style.display = "none"; // Hide start button
//        startTime = Date.now(); // Start time for WPM calculation
//        promptNextWord();}
//        else{ console.error("Failed to fetch passage.")}
//    });
    function promptNextWord() {
        if (currentWordIndex < words.length) {
            inputElement.value = '';
            inputElement.placeholder = `Type "${words[currentWordIndex]}"`;
        } else {
            inputElement.value = '';
            inputElement.placeholder = '';
            inputElement.disabled = true;
            const endTime = Date.now();
            const timeInSeconds = (endTime - startTime) / 1000;
            const wpm = Math.round((passage.length / 5) / (timeInSeconds / 60));//passage->words
         // Calculate WPM (5 words per line)
         restartButton.style.display = "block";
            
            resultElement.textContent = `Your WPM: ${wpm}`;
            addrecord(wpm);
        }
    }

    inputElement.addEventListener("input", function() {
        const typedWord = inputElement.value.trim();
        const currentWord = words[currentWordIndex];
        // currentWord+= " ";

        if (typedWord === currentWord) {
            // words[currentWordIndex] = `<span class="correct">${currentWord}</span>`;
            currentWordIndex++;
            promptNextWord();
            moveCar();
        } else if (currentWord.startsWith(typedWord)) {
            inputElement.classList.remove("wrong");
            inputElement.classList.add("correct");
        } else {
            inputElement.classList.add("wrong");
        }
    });

    function moveCar() {
        const containerWidth = document.querySelector('.container').offsetWidth;
        const pathWidth = pathElement.offsetWidth;
        const step = pathWidth / words.length;
        const carPosition = currentWordIndex * step;
        carElement.style.left = `${carPosition}px`;
    }
});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
  
    name = name.replace(/[\[\]]/g, "\\$&");
  
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  
    var results = regex.exec(url);
  
    if (!results) return null;
  
    if (!results[2]) return '';
  
    // Decode the parameter value, replacing '+' with spaces
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  var username = getParameterByName('username');
  
document.addEventListener("DOMContentLoaded", function() {
    // This code will run after the DOM is fully loaded
    document.querySelector('.nav3').addEventListener('click', (event) => {
        addrecord();
        event.preventDefault();
        window.location.href = `../../temp/profile/user.html?username=${username}`;
    });
  });
  
  async function addrecord(score) {
    try {
        // console.log(score);
        console.log("hello");
        // const data1 = score;
        const response = await fetch("/store_recorde", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, score: score,game:'typeracer' }) // Convert JSON object to string
        });
        const data = await response;    
        if(data.status===200){
            alert("Record stored")
        }
        else{
            console.log("error");
        }
    }

    catch (error) {
        console.log('Error :', error);
    }
}