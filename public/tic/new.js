let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let m1 = document.querySelector(".m1");
let turnO = true; //playerX, playerO
let count = 0; //To Track Draw
let c = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    m1.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        let empty_array = []
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerText === '') {
                empty_array.push(i);
            }
        }
        box.innerText = "O";
        box.style.color = 'red';
        turn = false;
        setTimeout(computerturn, 1000); // Delay computer's move for 3 seconds
        box.disabled = true;
        checkWinner();
        boxes.forEach((box) => {
            console.log(box.innerText);
        })
    })
})

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();

};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    let temp = '';
    if (winner == 'X') {
        temp = 'Computer'
    }
    else {
        if (c == 0) {
            addrecord();
            c = 1;
        }

        temp = username
    }
    msg.innerText = `Congratulations, Winner is ${temp}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    m1.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


function computerturn() {
    return new Promise((resolve, reject) => {
        let empty_array = [];
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerText === '') {
                empty_array.push(i);
            }
        }
        if (empty_array.length == 0) {
            gameDraw();
            return; // Exit function if there are no empty boxes
        }
        const randomIndex = Math.floor(Math.random() * empty_array.length);
        boxes[empty_array[randomIndex]].innerText = 'X';
        boxes[empty_array[randomIndex]].style.color = 'blue';
        setTimeout(() => {
            resolve(); // Resolve the promise after 1 second
        }, 1000);
    }).then(() => {
        checkWinner(); // Call checkWinner() after the promise is resolved
    });
}
async function addrecord() {
    try {
        const data1 = 100;
        const response = await fetch("/store_recorde", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, score: data1,game:'tic' }) // Convert JSON object to string
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
function getParameterByName(name, url) {
    // If URL is not provided, use the current window's URL
    if (!url) url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    // Define a regular expression pattern to match the parameter
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");

    // Execute the regular expression on the URL
    var results = regex.exec(url);

    if (!results) return null;

    // If the parameter value is not present, return an empty string
    if (!results[2]) return '';

    // Decode the parameter value, replacing '+' with spaces
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get the value of the 'username' query parameter from the URL
var username = getParameterByName('username');

// If 'username' parameter exists in the URL

document.addEventListener('DOMContentLoaded', () => {

    const a1 = document.querySelector('.user');
  
    a1.addEventListener('click', (event) => {
      event.preventDefault();
      addrecord();
      window.location.href = `../temp/profile/user.html?username=${username}`;
    });
  });