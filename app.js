class Game {
    constructor() {
        this.num_rounds = 0;
        this.num_rounds_played = 0;
        this.player_score = 0;
        this.opponent_score = 0;
    }
}
let game;

// ELEMENT CREATION
const game_over_container = document.createElement('div');
game_over_container.classList.add('game-over-container', 'center-text');

const game_over_label = document.createElement('h1');
game_over_label.classList.add('game-over-label');
game_over_label.textContent = "GAME OVER!";

const game_winner_label = document.createElement('h2');
game_winner_label.classList.add('game-winner-label');
game_over_container.append(game_over_label, game_winner_label);

const rock_button = document.createElement('button');
rock_button.classList.add('game-button', 'rps-game-button', 'rock-button');
rock_button.innerHTML = "<img src='./images/rock.png' class='rps-icon-resize'>";

const paper_button = document.createElement('button');
paper_button.classList.add('game-button', 'rps-game-button', 'paper-button');
paper_button.innerHTML = "<img src='./images/paper.png' class='rps-icon-resize'>";

const scissors_button = document.createElement('button');
scissors_button.classList.add('game-button', 'rps-game-button', 'scissors-button');
scissors_button.innerHTML = "<img src='./images/scissors.png' class='rps-icon-resize'>";

const rps_button_container = document.createElement('div');
rps_button_container.classList.add('mode-button-container');
rps_button_container.append(rock_button, paper_button, scissors_button);

const restart_button = document.createElement('button');
restart_button.textContent = 'Restart';
restart_button.classList.add('restart-button');

// QUERYING SELECTORS
const center_container = document.querySelector('.center-container');
const round_banner = document.querySelector('.round-banner');
const opponent_score_label = document.querySelector('.opponent-score-label');
const player_score_label = document.querySelector('.player-score-label');
const opponent_action_icon_container = document.querySelector('.opponent-action-icon-container');
const player_action_icon_container = document.querySelector('.player-action-icon-container');
const round_winner_label = document.querySelector('.round-winner-label');
const game_container = document.querySelector('.game-container');
const table_container = document.querySelector('.table-container');
const mode_label = document.querySelector('.mode-label');
const mode_button_container = document.querySelector('.mode-button-container');
const game_button_1 = document.querySelector('.game-button-1');
const game_button_2 = document.querySelector('.game-button-2');
const game_button_3 = document.querySelector('.game-button-3');

// EVENT LISTENERS
game_button_1.addEventListener('click', () => { startGame(1) });
game_button_2.addEventListener('click', () => { startGame(5) });
game_button_3.addEventListener('click', () => { startGame(1000) });

rock_button.addEventListener('click', () => { playTurn('rock'); });
paper_button.addEventListener('click', () => { playTurn('paper'); });
scissors_button.addEventListener('click', () => { playTurn('scissors'); });

restart_button.addEventListener('click', () => { resetGame(); });

// ELEMENT CONSTRUCTORS
function getActionIcon(action) {
    const action_icon = document.createElement('div');
    action_icon.classList.add('centered-icon-container');
    action_icon.innerHTML = `<img src='./images/${action}.png' class='action-icon-resize'>`;

    return action_icon;
}

// MAIN FUNCTIONALITY
function startGame(num_game_rounds) {
    game = new Game();
    game.num_rounds = num_game_rounds;
    
    updateRoundBanner();

    player_score_label.textContent = 'Your score: 0';
    opponent_score_label.textContent = "Opponent's score: 0";
    mode_label.textContent = "Choose your move:";

    mode_button_container.replaceWith(rps_button_container);
    game_container.appendChild(restart_button);
}

function playTurn(action) {    
    wipeTable();

    const player_action_icon = getActionIcon(action);
    player_action_icon_container.appendChild(player_action_icon);

    const opponent_action = getOpponentAction();
    const opponent_action_icon = getActionIcon(opponent_action);
    opponent_action_icon_container.appendChild(opponent_action_icon);
    
    const winner = determineWinner(action, opponent_action);
    if (winner == "Player") {
        game.num_rounds_played++;
        round_winner_label.textContent = "You won!";
        addScore(winner);

        isGameOver() ? endGame() : updateRoundBanner();
    } else if (winner == "Opponent") {
        game.num_rounds_played++;
        round_winner_label.textContent = "Opponent won!";
        addScore(winner);

        isGameOver() ? endGame() : updateRoundBanner();
    } else {
        round_winner_label.textContent = "Tie!";
    }
}

function determineWinner(player_action, opponent_action) {
    // check for tie
    if (player_action == opponent_action) { return "Tie"; }

    if (player_action == "rock") { return opponent_action == "scissors" ? "Player" : "Opponent"; }
    if (player_action == "paper") { return opponent_action == "rock" ? "Player" : "Opponent"; }
    if (player_action == "scissors") { return opponent_action == "paper" ? "Player" : "Opponent"; }
}

function updateRoundBanner() {
    const round_counter = game.num_rounds == 1000 ? "∞" : game.num_rounds;
    round_banner.textContent = `Round ${game.num_rounds_played+1} of ${round_counter}`;
}

function isGameOver() {
    return game.player_score == Math.ceil(game.num_rounds/2) || game.opponent_score == Math.ceil(game.num_rounds/2);
}

function endGame() {
    game_winner_label.textContent = game.player_score > game.opponent_score 
        ? "Congratulations, you won the game!"
        : "Sorry, you lost the game :/";

    mode_label.textContent = "";

    rps_button_container.replaceWith(game_over_container);
}

function getOpponentAction() {
    const move_set = ['rock', 'paper', 'scissors'];
    const rand_num = Math.floor(Math.random() * 3);
    
    return move_set[rand_num];
}

function addScore(winner) {
    if (winner == "Player") {
        game.player_score++;
        player_score_label.textContent = `Your score: ${game.player_score}`;
    } else {
        game.opponent_score++;
        opponent_score_label.textContent = `Opponent's score: ${game.opponent_score}`;
    }
}

function resetGame() {
    const element_to_replace = document.querySelector('.game-over-container') !== null
        ? document.querySelector('.game-over-container')
        : rps_button_container;

    element_to_replace.replaceWith(mode_button_container);

    restart_button.remove();

    resetLabels();
    wipeTable();
}

function resetLabels() {
    round_banner.textContent = "Your opponent waits patiently...";
    mode_label.textContent = "Choose a game mode:";
    opponent_score_label.textContent = "";
    player_score_label.textContent = "";
    round_winner_label.textContent = "";
}

function wipeTable() {
    const icons_to_remove = document.querySelectorAll('.action-icon-resize');
    icons_to_remove.forEach((icon) => {
        icon.remove();
    });
}
