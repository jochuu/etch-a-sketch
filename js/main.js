let penType = '';
let drag = false;

function generateGrid(size) {
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < (size*size); i++) {
        generateGridCell(gridContainer);
    }
    return document.querySelector('.container').appendChild(gridContainer);
}

function generateGridCell(container) {
    let gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        return container.appendChild(gridCell);
}

function clearGrid() {
    let root = document.documentElement;
    let backgroundPicker = document.querySelector('#background');

    // set background colour on css for fade
    root.style.setProperty('--grid-bg-color', backgroundPicker.value);

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
    document.querySelector('.grid-container').style.backgroundColor = backgroundPicker.value;
}

function fadeGrid(item) { // Generate number between 1 and 5, add fade class to randomise fade times.
    let fadeSpeed = Math.floor(Math.random() * 5)+1; 
    item.classList.add(`clear-fade-${fadeSpeed}`);
  }


function generateNewGrid() {
    let newGridSize = prompt('Insert new grid size');
    if (newGridSize.match(/^[0-9]+$/) === null) newGridSize = 16;
    if (newGridSize > 100) newGridSize = 16;
    document.querySelector('.grid-container').remove();
    generateGrid(newGridSize);
    setupEventListeners();
}
function setupEventListeners() {
    let penType = '';
    document.querySelector('#clearBtn').onclick = () => clearGrid();
    document.querySelector('#newGridBtn').onclick = () => generateNewGrid();
    document.querySelector('#penBtn').onclick = () => penType = 'default';
    document.querySelector('#rainbowPenBtn').onclick = () => penType = 'rainbow';
    // document.querySelector('#shadePenBtn').onclick = () => penType = 'shade';
    document.querySelector('#eraserBtn').onclick = () => penType = 'eraser';
    document.querySelector('#background').oninput = (e) => {
        document.querySelectorAll('.grid-cell').forEach(cell => {
            if(!cell.classList.contains('painted-cell')) {
            cell.style.backgroundColor = document.querySelector('#background').value;
        }});
    };
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.onmousedown = (e) => draw(e, penType);
        cell.onmouseover = (e) => draw(e, penType);
        cell.oncontextmenu = (e) => draw(e, 'eraser');
    });
}

function draw(event, penType) {
    event.preventDefault();
    if (event.buttons > 0) {
        event.target.classList.add('painted-cell');
        switch (penType) {
            case 'rainbow':
                return event.target.style.backgroundColor = generateRandomColour();
            case 'eraser':
                event.target.classList.remove('painted-cell');
                return event.target.style.backgroundColor = document.querySelector('#background').value;
            default:
                return event.target.style.backgroundColor = document.querySelector('#pen').value;
        }
    }
}

function setPenType(type) {
    penType = type;
}

function generateRandomColour() {
    return `hsl(${Math.random() * 360}, 75%, 50%, 1)`;
}

function initialise() { 
    generateGrid(16);
    setupEventListeners();
}

initialise();