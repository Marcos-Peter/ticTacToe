// flip the main card
const card = document.querySelector("#card");

function btn() {
    card.classList.toggle("flip");
}

card.addEventListener("click", (event) => {
  if(event.target.matches('.cell'))
  {
    logic(event.target.id);
  }
});

// The game Logic
// Getting all the cells of the html document
const cells = document.querySelectorAll('.cell');
let shiftCheck = true;
let playerOne = 'X';
let playerTwo = 'O';

const conditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function logic(id) {
    const cell = document.getElementById(id);
    shift = shiftCheck ? playerOne : playerTwo;
    if(cell.textContent === "")
    {
        cell.classList.toggle("cellFlip");
        cell.textContent = shift;
    }
    cell.classList.add(shift);
    winnerCheck(shift);
}

function winnerCheck(shift) {

    const winner = conditions.some((cond) => {
        return cond.every((index) => {
            return cells[index].classList.contains(shift);
        })
    });

    if(winner) {
        gameOver(shift);
    } else if(tieCheck()) {
        gameOver();
    } else {
        shiftCheck = !shiftCheck;
    }
}

function tieCheck() {
    let x = 0;
    let o = 0;

    for(index in cells) {
        if(!isNaN(index)) {
            if(cells[index].classList.contains(playerOne)) {
                x++;
            }
            if(cells[index].classList.contains(playerTwo)) {
                o++;
            }
        }
    }

    return x + o === 9 ? true : false;
}

function gameOver(winner = null) {
    if(winner) {
        console.log("Winner: "+winner);
    } else {
        console.log("We have a tie!");
    }
}
