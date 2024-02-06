document.querySelector('#ttt').addEventListener('click', onClickMethode);

let turn = true;

const turnDisplay = document.getElementById('turn');

const cells = [];
cells[0] = ['', '', ''];
cells[1] = ['', '', ''];
cells[2] = ['', '', ''];

class cell {
    constructor(col, row) {
        this.col = col;
        this.row = row;
        this.clicked = false;
        this.owner = '';
    }

    setOwner(owner) {
        this.owner = owner;
    }

    setClicked() {
        this.clicked = true;
    }
}



function onClickMethode(e) {
    const clickedCell = e.target;
    if (clickedCell.nodeName === 'TD' && clickedCell.textContent !== '') {
        if (turn) {
            clickedCell.className = 'xDisplay';
            clickedCell.innerHTML = '<svg><use xlink:href="#cross"/></svg>';
        } else {
            clickedCell.className = 'oDisplay';
            clickedCell.innerHTML = '<svg><use xlink:href="#circle"/></svg>';
        }
        const cellPosition = clickedCell.id.split(',');
        cells[cellPosition[0]][cellPosition[1]] = turn ? 'x' : 'o';
        turn = !turn;
        turnDisplay.innerHTML = turn ? 'X ist drann!' : 'O ist drann!';
        testIfWon();
    }
}

function resetGame() {
    cells[0] = ['', '', ''];
    cells[1] = ['', '', ''];
    cells[2] = ['', '', ''];
    const allCells = document.querySelectorAll('td');
    allCells.forEach(cell => {
        cell.className = '';
        cell.innerHTML = '';
    });
    turn = true;
    turnDisplay.innerHTML = 'X ist drann!';
}

function testIfWon() {
    let hasWon = false;
    if (cells[0][0] === 'x' && cells[0][1] === 'x' && cells[0][2] === 'x') { //rows x
        alert('x won');
        hasWon = true;
    } else if (cells[1][0] === 'x' && cells[1][1] === 'x' && cells[1][2] === 'x') {
        alert('x won');
        hasWon = true;
    } else if (cells[2][0] === 'x' && cells[2][1] === 'x' && cells[2][2] === 'x') {
        alert('x won');
        hasWon = true;
    } else if (cells[0][0] === 'x' && cells[1][0] === 'x' && cells[2][0] === 'x') { //columns x
        alert('x won');
        hasWon = true;
    } else if (cells[0][1] === 'x' && cells[1][1] === 'x' && cells[2][1] === 'x') {
        alert('x won');
        hasWon = true;
    } else if (cells[0][2] === 'x' && cells[1][2] === 'x' && cells[2][2] === 'x') {
        alert('x won');
        hasWon = true;
    } else if (cells[0][0] === 'x' && cells[1][1] === 'x' && cells[2][2] === 'x') { //diagonal x
        alert('x won');
        hasWon = true;
    } else if (cells[0][2] === 'x' && cells[1][1] === 'x' && cells[2][0] === 'x') {
        alert('x won');
        hasWon = true;
    } else if (cells[0][0] === 'o' && cells[0][1] === 'o' && cells[0][2] === 'o') { //rows o
        alert('o won');
        hasWon = true;
    } else if (cells[1][0] === 'o' && cells[1][1] === 'o' && cells[1][2] === 'o') {
        alert('o won');
        hasWon = true;
    } else if (cells[2][0] === 'o' && cells[2][1] === 'o' && cells[2][2] === 'o') {
        alert('o won');
        hasWon = true;
    } else if (cells[0][0] === 'o' && cells[1][0] === 'o' && cells[2][0] === 'o') { //columns o
        alert('o won');
        hasWon = true;
    } else if (cells[0][1] === 'o' && cells[1][1] === 'o' && cells[2][1] === 'o') {
        alert('o won');
        hasWon = true;
    } else if (cells[0][2] === 'o' && cells[1][2] === 'o' && cells[2][2] === 'o') {
        alert('o won');
        hasWon = true;
    } else if (cells[0][0] === 'o' && cells[1][1] === 'o' && cells[2][2] === 'o') {  //diagonal o
        alert('o won');
        hasWon = true;
    } else if (cells[0][2] === 'o' && cells[1][1] === 'o' && cells[2][0] === 'o') {
        alert('o won');
        hasWon = true;
    }
    if(hasWon){
        //todo: resetGame();
    }
}