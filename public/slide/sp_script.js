function swapTiles(cell1, cell2) {
  var temp = document.getElementById(cell1).className;
  document.getElementById(cell1).className = document.getElementById(cell2).className;
  document.getElementById(cell2).className = temp;
}

function shuffle() {
  //Use nested loops to access each cell of the 3x3 grid
  for (var row = 1; row <= 3; row++) { //For each row of the 3x3 grid
    for (var column = 1; column <= 3; column++) { //For each column in this row

      var row2 = Math.floor(Math.random() * 3 + 1); //Pick a random row from 1 to 3
      var column2 = Math.floor(Math.random() * 3 + 1); //Pick a random column from 1 to 3

      swapTiles("cell" + row + column, "cell" + row2 + column2); //Swap the look & feel of both cells
    }
  }
}

function clickTile(row, column) {
  var cell = document.getElementById("cell" + row + column);
  var tile = cell.className;
  if (tile != "tile9") {
    //Checking if white tile on the right
    if (column < 3) {
      if (document.getElementById("cell" + row + (column + 1)).className == "tile9") {
        swapTiles("cell" + row + column, "cell" + row + (column + 1));
        return;
      }
    }
    //Checking if white tile on the left
    if (column > 1) {
      if (document.getElementById("cell" + row + (column - 1)).className == "tile9") {
        swapTiles("cell" + row + column, "cell" + row + (column - 1));
        return;
      }
    }
    //Checking if white tile is above
    if (row > 1) {
      if (document.getElementById("cell" + (row - 1) + column).className == "tile9") {
        swapTiles("cell" + row + column, "cell" + (row - 1) + column);
        return;
      }
    }
    //Checking if white tile is below
    if (row < 3) {
      if (document.getElementById("cell" + (row + 1) + column).className == "tile9") {
        swapTiles("cell" + row + column, "cell" + (row + 1) + column);
        return;
      }
    }
  }

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

document.addEventListener("DOMContentLoaded", function() {
  // This code will run after the DOM is fully loaded
  document.querySelector('.nav3').addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = `../temp/profile/user.html?username=${username}`;
  });
});

