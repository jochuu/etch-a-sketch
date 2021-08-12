let penColour = 'black';

function generateGrid(size) {
    
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    gridContainer.setAttribute('draggable', 'false');

    for (let i = 0; i < (size*size); i++) {
        generateGridCell(gridContainer);
    }
    return document.querySelector('.container').appendChild(gridContainer);
}

function generateGridCell(container) {

    let gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.onmousedown = (e) => draw(e);
        gridCell.onmouseover = (e) => draw(e);
        return container.appendChild(gridCell);
}

function draw(event) {
    event.target.classList.add('painted-cell');
    switch (penColour) {
        case 'black':
            return event.target.style.backgroundColor = 'black';
        case 'rainbow':
            return event.target.style.backgroundColor = generateRandomColour();
        default:
            return event.target.style.backgroundColor = 'black';
    }
}

function clearGrid() {
    document.querySelectorAll('.painted-cell').forEach(cell => {
        fadeGrid(cell);
        setTimeout(function () {
            cell.classList.remove('painted-cell');
            cell.classList.remove('clear-fade-1');
            cell.classList.remove('clear-fade-2');
            cell.classList.remove('clear-fade-3');
            cell.classList.remove('clear-fade-4');
            cell.classList.remove('clear-fade-5');
            cell.style.backgroundColor = '';
          }, 1500);
    });
}

function fadeGrid(item) { // Generate number between 1 and 5, add fade class to randomise fade times.
    let fadeSpeed = Math.floor(Math.random() * 5)+1; 
    item.classList.add(`clear-fade-${fadeSpeed}`);
  }


function generateNewGrid() {
    let newGridSize = prompt('Insert new grid size');
    if (newGridSize.match(/^[0-9]+$/) === null) newGridSize = 16;
    document.querySelector('.grid-container').remove();
    
    generateGrid(newGridSize);
}

function setBlackInk() {
    return penColour = 'black';
}

function setRainbowInk() {
    return penColour = 'rainbow';
}

function generateRandomColour() {
    return `hsl(${Math.random() * 360}, 75%, 50%, 1)`;
}

(function() {
    generateGrid(16);
    document.querySelector('#clearBtn').onclick = () => clearGrid();
    document.querySelector('#newGridBtn').onclick = () => generateNewGrid();
    document.querySelector('#blackPenBtn').onclick = () => setBlackInk();
    document.querySelector('#rainbowPenBtn').onclick = () => setRainbowInk();

})();