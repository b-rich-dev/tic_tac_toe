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

let currentPlayer = 'cross';

let lastMoveIndex = null;

const winPatterns = [
    [0, 1, 2], // Reihe oben
    [3, 4, 5], // Mitte
    [6, 7, 8], // unten
    [0, 3, 6], // links
    [1, 4, 7], // Mitte
    [2, 5, 8], // rechts
    [0, 4, 8], // Diagonal ↘
    [2, 4, 6], // Diagonal ↙
];


function init() {
    render()
}


function restartGame() {
    fields = Array(9).fill(null);
    currentPlayer = 'cross';

    // Entferne ggf. vorhandene Gewinnlinie
    const winLine = document.querySelector('.win-line');
    if (winLine && winLine.parentElement) {
        winLine.parentElement.remove();
    }

    render();
}


function handleClick(index) {
    if (!fields[index]) {
        fields[index] = currentPlayer;
        lastMoveIndex = index;
        currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
        render();
    }
}


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

        // Nur klickbar, wenn das Spiel noch läuft
        if (!fields[i] && !getWinnerLine()) {
            cell.addEventListener('click', () => handleClick(i));
        }

        game.appendChild(cell);
    }

    // Gewinnerlinie rendern
    const winnerLine = getWinnerLine();
    if (winnerLine) {
        const lineSVG = getWinLineSVG(winnerLine);
        const overlay = document.createElement('div');
        overlay.innerHTML = lineSVG;
        overlay.style.position = 'absolute';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.pointerEvents = 'none';
        overlay.style.width = '300px';
        overlay.style.height = '300px';
        game.appendChild(overlay);
    }

    // Anzeige aktualisieren
    const status = document.getElementById('status');
    if (winnerLine) {
        const winner = fields[winnerLine[0]];
        const symbol = winner === 'cross' ? 'X' : 'O';
        const color = winner === 'cross' ? 'gold' : 'deepskyblue';
        status.innerHTML = `<span style="color: ${color}; font-weight: bold;">${symbol}</span> hat gewonnen!`;
    } else if (!fields.includes(null)) {
        status.textContent = 'Unentschieden!';
    } else {
        const symbol = currentPlayer === 'cross' ? 'X' : 'O';
        const color = currentPlayer === 'cross' ? 'gold' : 'deepskyblue';
        status.innerHTML = `<span style="color: ${color}; font-weight: bold;">${symbol}</span> ist am Zug.`;
    }

}




function getWinnerLine() {
    for (const [a, b, c] of winPatterns) {
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return [a, b, c]; // Rückgabe der Gewinnlinie
        }
    }
    return null;
}


function getWinLineSVG(winningCells) {
    const svgSize = 300;
    const cellSize = 100;
    const padding = 12;

    const combinations = {
        '0-1-2': [5, 50, 295, 50],   // top row
        '3-4-5': [5, 151, 295, 151], // middle row
        '6-7-8': [5, 252, 295, 252], // bottom row
        '0-3-6': [50, 5, 50, 295],   // left column
        '1-4-7': [152, 5, 152, 295], // middle column
        '2-5-8': [252, 5, 252, 295], // right column
        '0-4-8': [padding, padding, 300 - padding, 300 - padding], // diagonal ↘
        '2-4-6': [294, 8, 8, 294]  // diagonal ↙
    };

    const key = winningCells.sort((a, b) => a - b).join('-');
    const [x1, y1, x2, y2] = combinations[key];

    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2).toFixed(1);


    return `
    <svg class="win-line" width="${svgSize}" height="${svgSize}">
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
            stroke="white"
            stroke-width="10"
            stroke-linecap="round"
            stroke-dasharray="${length}"
            stroke-dashoffset="${length}">
        <animate attributeName="stroke-dashoffset"
                 from="${length}" to="0"
                 dur="0.4s" fill="freeze" />
      </line>
    </svg>
  `;
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