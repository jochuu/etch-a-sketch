function generateGrid(size) {
    let gridSize = Math.sqrt(size);
    if (gridSize % 1 !== 0) return false; //Check to see if value can be made into a grid.
    
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < size; i++) {
        let gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.textContent = '.';
        gridCell.addEventListener('mouseover', function (e) {
            gridCell.classList.add('painted-cell');
          });;
        gridContainer.appendChild(gridCell);
    }
    document.querySelector('.container').appendChild(gridContainer);
}

(function() {
    generateGrid(400);
})();