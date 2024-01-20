let num_rounds = 0;
let num_rounds_played = 0;
let player_score = 0;
let opponent_score = 0;

// 
let game_over_container = document.createElement('div');
game_over_container.classList.add('game-over-label');

let game_over_label = document.createElement('h1');
game_over_label.textContent = "GAME OVER!";

let game_winner_label = document.createElement('h2');
game_winner_label.classList.add('game-winner-label');
game_over_container.append(game_over_label, game_winner_label);

let rock_button = document.createElement('button');
rock_button.classList.add('game-button', 'rps-game-button', 'rock-button');
rock_button.innerHTML = "<img src='./images/rock.png' class='rps-icon-resize'>";

let paper_button = document.createElement('button');
paper_button.classList.add('game-button', 'rps-game-button', 'paper-button');
paper_button.innerHTML = "<img src='./images/paper.png' class='rps-icon-resize'>";

let scissors_button = document.createElement('button');
scissors_button.classList.add('game-button', 'rps-game-button', 'scissors-button');
scissors_button.innerHTML = "<img src='./images/scissors.png' class='rps-icon-resize'>";

let rps_button_container = document.createElement('div');
rps_button_container.classList.add('mode-button-container');
rps_button_container.append(rock_button, paper_button, scissors_button);

let restart_button = document.createElement('button');
restart_button.textContent = 'Restart';
restart_button.classList.add('restart-button');

// EXISTING SELECTORS
const game_container = document.querySelector('.center-container');
const round_banner = document.querySelector('.round-banner');
const opponent_score_label = document.querySelector('.opponent-score-label');
const player_score_label = document.querySelector('.player-score-label');
const opponent_action_icon_container = document.querySelector('.opponent-action-icon-container');
const player_action_icon_container = document.querySelector('.player-action-icon-container');
const round_winner_label = document.querySelector('.round-winner-label');
const table_container = document.querySelector('.table-container');
const mode_label = document.querySelector('.mode-label');
const mode_button_container = document.querySelector('.mode-button-container');
const game_button_1 = document.querySelector('.game-button-1');
const game_button_2 = document.querySelector('.game-button-2');
const game_button_3 = document.querySelector('.game-button-3');

// EVENT LISTENER DECLARATIONS
game_button_1.addEventListener('click', () => { playGame(1) });
game_button_2.addEventListener('click', () => { playGame(5) });
game_button_3.addEventListener('click', () => { playGame(1000) });

rock_button.addEventListener('click', function() { playTurn('rock'); });
paper_button.addEventListener('click', function() { playTurn('paper'); });
scissors_button.addEventListener('click', function() { playTurn('scissors'); });
restart_button.addEventListener('click', () => { resetGame(); });

// ELEMENT CONSTRUCTORS
function getActionIcon(action) {
    const action_icon = document.createElement('div');
    action_icon.classList.add('centered-icon-container');
    action_icon.innerHTML = `<img src='./images/${action}.png' class='action-icon-resize'>`;

    return action_icon;
}

// MAIN FUNCTIONALITY
function playGame(num_game_rounds) {
    num_rounds = num_game_rounds;
    
    changeRound();
    player_score_label.textContent = 'Your score: 0';
    opponent_score_label.textContent = "Opponent's score: 0";

    mode_button_container.replaceWith(rps_button_container);
    mode_label.textContent = "Choose your move:";
    game_container.appendChild(restart_button);
}

function playTurn(action) {
    wipeTable();

    const player_action_icon = getActionIcon(action);
    player_action_icon_container.appendChild(player_action_icon);

    const opponent_move = getComputerMove();
    const opponent_action_icon = getActionIcon(opponent_move);
    opponent_action_icon_container.appendChild(opponent_action_icon);

    result = determineWinner(action, opponent_move);
    if (result == 1) {
        num_rounds_played++;
        round_winner_label.textContent = "You won!";
        addScore(result);

        isGameOver() ? endGame() : changeRound();
    } else if (result == 0) {
        num_rounds_played++;
        round_winner_label.textContent = "Opponent won!";
        addScore(result);

        isGameOver() ? endGame() : changeRound();
    } else {
        round_winner_label.textContent = "Tie!";
    }
}

function changeRound() {
    let round_counter = num_rounds == 1000 ? "∞" : num_rounds;
    round_banner.textContent = `Round ${num_rounds_played+1} of ${round_counter}`;
}

function isGameOver() {
    return player_score == Math.ceil(num_rounds/2) || opponent_score == Math.ceil(num_rounds/2);
}

function endGame() {
    let winner_text = player_score > opponent_score 
        ? "Congratulations, you won the game!"
        : "Sorry, you lost the game :/";

    mode_label.textContent = "";
    game_winner_label.textContent = winner_text;

    rps_button_container.replaceWith(game_over_container);
}

function getComputerMove() {
    const move_set = ['rock', 'paper', 'scissors'];
    const rand_num = Math.floor(Math.random() * 3);
    
    return move_set[rand_num];
}

function determineWinner(player_action, opponent_action) {
    // check for tie
    if (player_action == opponent_action) { return 2; }

    // return 0 if player won, return 1 if computer won
    if (player_action == "rock") { return opponent_action == "scissors" ? 1 : 0; }
    if (player_action == "paper") { return opponent_action == "rock" ? 1 : 0; }
    if (player_action == "scissors") { return opponent_action == "paper" ? 1 : 0; }
}

function addScore(player_won) {
    if (player_won) {
        player_score++;
        player_score_label.textContent = `Your score: ${player_score}`;
    } else {
        opponent_score++;
        opponent_score_label.textContent = `Opponent's score: ${opponent_score}`;
    }
}

function resetGame() {
    num_rounds_played = num_rounds = player_score = opponent_score = 0;

    try { 
        document.querySelector('.game-over-label').replaceWith(mode_button_container); 
    } catch(error) { 
        rps_button_container.replaceWith(mode_button_container); 
    }

    restart_button.remove();

    resetLabels();
    wipeTable();
}

function resetLabels() {
    round_banner.textContent = "";
    mode_label.textContent = "Choose a game mode:";
    opponent_score_label.textContent = "";
    player_score_label.textContent = "";
    round_winner_label.textContent = "";
}

function wipeTable() {
    let icons_to_remove = document.querySelectorAll('.action-icon-resize');
    icons_to_remove.forEach((icon) => {
        icon.remove();
    });
}
