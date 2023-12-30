const GRID_DIMENSION = 3;
const CELL_SIZE = 100;
const MARGIN = 30;

// Helper function for creating a straight line in SVG, given its coordinates.
function createSVGLine([x1, y1], [x2, y2]) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    return line;
}

// Helper function to create a cross symbol from 2 SVG lines, given its intended size. The cross is centered on [0, 0].
function createSVGCross(size) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const line1 = createSVGLine([-size, -size], [size, size]);
    const line2 = createSVGLine([-size, size], [size, -size]);
    g.appendChild(line1);
    g.appendChild(line2);
    return g;
}

class TicTacToe {

    constructor() {
        // 2-dimensional array to store the ID of the player whose symbol is in each grid cell. Initially all are null.
        this.boardState = new Array(GRID_DIMENSION).fill(null).map(column => new Array(GRID_DIMENSION).fill(null));
        // Which player's turn it is. 1 = cross, 2 = circle.
        this.turn = 1;
        this.gameOver = false;
        this.filledSquares = 0;
        this.boardView = this.initializeBoardView();
        this.displayMessage('Spieler 1 beginnt');
        this.boardView.addEventListener('click', event => {
            // Figure out which grid square was clicked on in this turn, and then handle that turn.
            const gridX = Math.floor((event.pageX - MARGIN) / CELL_SIZE);
            const gridY = Math.floor((event.pageY - MARGIN) / CELL_SIZE);
            this.handleTurn(gridX, gridY);
        });
    }

    // Set up the basic SVG for the board, including the grid lines.
    initializeBoardView() {
        const div = document.getElementById('game');
        const boardSize = GRID_DIMENSION * CELL_SIZE;
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', boardSize + (MARGIN * 2));
        svg.setAttribute('height', boardSize + (MARGIN * 2));
        div.appendChild(svg);
        const board = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        board.setAttribute('transform', 'translate(' + MARGIN + ',' + MARGIN + ')');
        svg.appendChild(board);
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', boardSize);
        rect.setAttribute('height', boardSize);
        rect.setAttribute('fill', 'white');
        board.appendChild(rect);
        for (let i = 1; i < GRID_DIMENSION; i++) {
            let line1 = createSVGLine([CELL_SIZE * i, 0], [CELL_SIZE * i, boardSize]);
            let line2 = createSVGLine([0, CELL_SIZE * i], [boardSize, CELL_SIZE * i]);
            line1.setAttribute('class', 'grid');
            board.appendChild(line1);
            line2.setAttribute('class', 'grid');
            board.appendChild(line2);
        }
        return board;
    }

    // Core game logic: deal with a click on the square [gridX, gridY].
    handleTurn(gridX, gridY) {
        // If the game is already over, or this square already contains a symbol, do nothing.
        if (this.gameOver || this.boardState[gridX][gridY] !== null) {
            return;
        }
        // Otherwise, add the current player's symbol to this square.
        const symbol = this.createPlayerSymbol(gridX, gridY);
        this.boardView.appendChild(symbol);
        this.boardState[gridX][gridY] = this.turn;
        this.filledSquares++;
        // Check whether this symbol means that the current player has won, or the game has ended in a draw.
        if (this.playerHasWon()) {
            this.gameOver = true;
            this.displayMessage('Spieler ' + this.turn + ' gewinnt!');
        } else if (this.filledSquares === GRID_DIMENSION * GRID_DIMENSION) {
            this.gameOver = true;
            this.displayMessage('Das Spiel endete unentschieden!');
        } else {
            // It's the other player's turn.
            this.changeTurn();
        }
    }

    changeTurn() {
        this.turn = this.turn % 2 + 1;
        this.displayMessage('Spieler ' + this.turn);
    }

    // Create the SVG for the symbol corresponding to the current player (1 = cross, 2 = circle).
    createPlayerSymbol(gridX, gridY) {
        const offset = CELL_SIZE / 2;
        const symbolSize = CELL_SIZE / 5;
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', 'translate(' + (gridX * CELL_SIZE + offset) + ',' + (gridY * CELL_SIZE + offset) + ')');
        g.setAttribute('class', 'player' + this.turn);
        if (this.turn === 1) {
            const cross = createSVGCross(symbolSize);
            g.appendChild(cross);
        } else {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('r', symbolSize);
            g.appendChild(circle);
        }
        return g;
    }

    // Returns true if there is any row, column, or diagonal where every cell matches the current player ID.
    playerHasWon() {
        // Check rows
        if (this.boardState[0].some((cell, i) => this.boardState.every(row => row[i] === this.turn))) {
            return true;
        }
        // Check columns
        if (this.boardState.some(column => column.every(cell => cell === this.turn))) {
            return true;
        }
        // Check the main diagonal
        if (this.boardState.every((column, i) => this.boardState[i][i] === this.turn)) {
            return true;
        }
        // Check the other diagonal
        if (this.boardState.every((column, i) => this.boardState[i][GRID_DIMENSION - 1 - i] === this.turn)) {
            return true;
        }

        return false;
    }

    displayMessage(message) {
        document.getElementById('info').textContent = message;
    }
}

new TicTacToe();