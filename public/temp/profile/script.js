async function test() {
    let response = fetch('/get_data', {

    })
}

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

let user = document.querySelector('.user');
user.textContent = username;


let user1 = document.querySelector('#user');
user1.textContent = username;

{store(username)}

async function store(username) {
    try {
        
        const response = await fetch(`/get_recorde?username=${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json(); // Assuming the response is JSON

        if (response.ok) {
            // first:foundDocument[0].first_2048,
            // memory:foundDocument[0].memory,
            // quiz:foundDocument[0].quiz,
            // r_p_s:foundDocument[0].r_p_s,
            // snakegame:foundDocument[0].snakegame,
            // tic:foundDocument[0].tic,
            // word:foundDocument[0].word_gessing
            let first = document.querySelector('#first');
            first.textContent = data.first;
            let memory = document.querySelector('#memory');
            memory.textContent = data.memory;
            let quiz = document.querySelector('#quiz');
            quiz.textContent = data.quiz;
            let r_p_s = document.querySelector('#r_p_s');
            r_p_s.textContent = data.r_p_s;
            let snake = document.querySelector('#snake');
            snake.textContent = data.snakegame;
            let tic = document.querySelector('#tic');
            tic.textContent = data.tic;
            let word = document.querySelector('#word');
            word.textContent = data.word;
            let type = document.querySelector('#type');
            type.textContent = data.type;
      
        } else {
            console.log("Error:", data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



document.addEventListener("DOMContentLoaded", function() {
    // This code will run after the DOM is fully loaded
    document.querySelector('.home').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = `../../index.html?username=${username}`;
    });
  });
  
  
  document.getElementById('upload-photo-btn').addEventListener('click', function() {
    document.getElementById('profile-photo-input').click();
});

document.getElementById('profile-photo-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        // Use FileReader to read the file
        const reader = new FileReader();
        reader.onload = function(e) {
            // Set the src attribute of the image element to the data URL
            document.getElementById('profile-photo').setAttribute('src', e.target.result);
            // Save the image URL in localStorage
            localStorage.setItem('profilePhoto', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Check if there's a saved profile photo in localStorage
    const savedProfilePhoto = localStorage.getItem('profilePhoto');
    if (savedProfilePhoto) {
        // Set the src attribute of the image element to the saved URL
        document.getElementById('profile-photo').setAttribute('src', savedProfilePhoto);
    }
});

