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

let lastMoveIndex = null;

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
      cell.innerHTML = (i === lastMoveIndex) ? getAnimatedCircleSVG() : getStaticCircleSVG();
    } else if (fields[i] === 'cross') {
      cell.classList.add('cross');
      cell.innerHTML = (i === lastMoveIndex) ? getAnimatedCrossSVG() : getStaticCrossSVG();
    }

    cell.addEventListener('click', () => handleClick(i));
    game.appendChild(cell);
  }
}

function handleClick(index) {
  if (!fields[index]) {
    fields[index] = currentPlayer;
    lastMoveIndex = index;
    currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
    render();
  }
}


function getAnimatedCircleSVG() {
  return `
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="25"
              stroke="deepskyblue"
              stroke-width="8"
              fill="none"
              stroke-dasharray="157.08"
              stroke-dashoffset="157.08"
              transform="rotate(-90 50 50)">
        <animate attributeName="stroke-dashoffset"
                 from="157.08" to="0" dur="0.3s" fill="freeze" />
      </circle>
    </svg>
  `;
}


function getAnimatedCrossSVG() {
  return `
    <svg viewBox="0 0 100 100">
      <line x1="30" y1="30" x2="70" y2="70"
            stroke="gold"
            stroke-width="8"
            stroke-linecap="round"
            stroke-dasharray="56.6"
            stroke-dashoffset="56.6">
        <animate attributeName="stroke-dashoffset"
                 from="56.6" to="0" dur="0.2s" fill="freeze" />
      </line>
      <line x1="70" y1="30" x2="30" y2="70"
            stroke="gold"
            stroke-width="8"
            stroke-linecap="round"
            stroke-dasharray="56.6"
            stroke-dashoffset="56.6">
        <animate attributeName="stroke-dashoffset"
                 from="56.6" to="0" dur="0.2s" fill="freeze" begin="0.2s" />
      </line>
    </svg>
  `;
}


function getStaticCircleSVG() {
  return `
    <svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="25"
              stroke="deepskyblue"
              stroke-width="8"
              fill="none" />
    </svg>
  `;
}

function getStaticCrossSVG() {
  return `
    <svg viewBox="0 0 100 100">
      <line x1="30" y1="30" x2="70" y2="70"
            stroke="gold"
            stroke-width="8"
            stroke-linecap="round" />
      <line x1="70" y1="30" x2="30" y2="70"
            stroke="gold"
            stroke-width="8"
            stroke-linecap="round" />
    </svg>
  `;
}




let currentPlayer = 'cross'; // X beginnt das Spiel
render();


