function generateGrid(size) {
    
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (size*size); i++) {
        let gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.addEventListener('mouseover', function (e) {
            gridCell.classList.add('painted-cell');
          });;
        gridContainer.appendChild(gridCell);
    }
    document.querySelector('.container').appendChild(gridContainer);
}

function resetGrid() {
    document.querySelectorAll('.painted-cell').forEach(cell => cell.classList.remove('painted-cell'));
}

(function() {
    generateGrid(16);
    document.querySelector('#resetBtn').addEventListener('click', function(e) {
        resetGrid();
    });
})();