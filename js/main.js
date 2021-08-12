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
        gridCell.onmouseover = (e) =>  e.target.classList.add('painted-cell');
        return container.appendChild(gridCell);
}

function clearGrid() {
    
    document.querySelectorAll('.painted-cell').forEach(cell => cell.classList.remove('painted-cell'));
}


function generateNewGrid() {
    
    let newGridSize = prompt('Insert new grid size');
    if (newGridSize.match(/^[0-9]+$/) === null) newGridSize = 16;
    document.querySelector('.grid-container').remove();
    
    generateGrid(newGridSize);
}

(function() {
    generateGrid(16);
    document.querySelector('#clearBtn').onclick = () => clearGrid();
    document.querySelector('#newGridBtn').onclick = () => generateNewGrid();
})();