let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]


function render() {
  const game = document.getElementById('game');
  game.innerHTML = ''; // Reset

  for (let i = 0; i < fields.length; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    if (!fields[i]) {
      cell.setAttribute('data-player-symbol', currentPlayer === 'cross' ? '✕' : '◯');
    }

    if (fields[i] === 'circle') {
      cell.classList.add('circle');
      cell.innerHTML = '◯';
    } else if (fields[i] === 'cross') {
      cell.classList.add('cross');
      cell.innerHTML = '✕';
    }

    cell.addEventListener('click', () => handleClick(i));
    game.appendChild(cell);
  }
}

function handleClick(index) {
  if (!fields[index]) {
    fields[index] = currentPlayer;
    currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross'; // X startet zuerst
    render();
  }
}


let currentPlayer = 'cross'; // X beginnt das Spiel
render();


