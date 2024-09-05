const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    console.log(card);
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
      <img class="front-image" src="assets/${card.image}" />

      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  store()
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
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

var username = getParameterByName('username');

// If 'username' parameter exists in the URL

function testing(){
	store();
	console.log(score);
}
async function store(){
  try {
    const data1=score;
    console.log(data1)
    const response = await fetch("/store_recorde", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, score:data1,game:'memory'}) // Convert JSON object to string
    });
    const data = await response;
    
    if(data.status===200){
      alert("Record stored");
    }
  }

  catch (error) {
    console.log('Error :', error);
  }
}
document.addEventListener('DOMContentLoaded', () => {

	const a1 = document.querySelector('.user');

a1.addEventListener('click', (event) => {
		event.preventDefault(); 
		store();
		window.location.href=`../temp/profile/user.html?username=${username}`;
	});
});