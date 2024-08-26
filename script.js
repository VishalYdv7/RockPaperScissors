document.addEventListener('DOMContentLoaded', () => {
    const choices = document.getElementById('choices');
    const choicesContainer=document.getElementById('all-choices');
    const playerScoreEl = document.getElementById('player-score');
    const computerScoreEl = document.getElementById('computer-score');
    const resultText = document.getElementById('result-text');
    const resultTextExtra = document.getElementById('result-text-extra');
    const playerChoiceEl = document.getElementById('player-choice');
    const computerChoiceEl = document.getElementById('computer-choice');
    const resultContainer = document.getElementById('result');
    const playAgainBtn = document.getElementById('play-again');
    const nextBtn = document.getElementById('next');
    const goBackBtn =document.getElementById('play-again-celebrations');
    const closeBtn=document.getElementById('close');
    const openRulesBtn=document.getElementById('rules');
    const fullGameRules=document.getElementById('full-game-rules'); 
    const fullCelebrationGameRules=document.getElementById('celebration-full-game-rules'); 
    const openCelebrationRulesBtn=document.getElementById('celebration-rules');
    const closeCelebrationBtn=document.getElementById('celebration-close')


    let playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
    let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

    if(document.getElementById('player-score')){
        playerScoreEl.textContent = playerScore;
        computerScoreEl.textContent = computerScore;
    
        const winConditions = {
            'rock': 'scissors',
            'paper': 'rock',
            'scissors': 'paper'
        };
        choices.addEventListener('click', (e) => {
            let playerChoice;
            if (e.target.id) {
                playerChoice = e.target.id;
            } else {
                playerChoice = e.target.parentElement.id;
            }
            const computerChoice = getComputerChoice();
            const winner = determineWinner(playerChoice, computerChoice);
            displayResult(playerChoice, computerChoice, winner);
        });

        function getComputerChoice() {
            const choices = ['rock', 'paper', 'scissors'];
            return choices[Math.floor(Math.random() * choices.length)];
        }
        function determineWinner(player, computer) {
            if (player === computer) return 'draw';
            return winConditions[player] === computer ? 'player' : 'computer';
        }

        function displayResult(player, computer, winner) {
            playerChoiceEl.innerHTML = `<img src="./images/${player}-icon.png">`;
            computerChoiceEl.innerHTML = `<img src="./images/${computer}-icon.png">`;
            if (winner === 'player') {
                playerScore++;
                localStorage.setItem('playerScore', playerScore);
                resultText.textContent = 'YOU WIN';
                resultTextExtra.textContent = 'AGAINST PC';
                playerChoiceEl.classList.add('winner');
                nextBtn.classList.remove('hidden');
                playAgainBtn.textContent= 'PLAY AGAIN';
            } else if (winner === 'computer') {
                computerScore++;
                localStorage.setItem('computerScore', computerScore);
                resultText.textContent = 'YOU LOST';
                resultTextExtra.textContent = 'AGAINST PC';
                playAgainBtn.textContent= 'PLAY AGAIN';
                computerChoiceEl.classList.add('winner');
            } else {
                resultText.textContent = 'TIE UP';
                resultTextExtra.textContent = '';
                playAgainBtn.textContent= 'REPLAY';
            }

            playerScoreEl.textContent = playerScore;
            computerScoreEl.textContent = computerScore;
            playerChoiceEl.classList.add(player);
            computerChoiceEl.classList.add(computer);
            resultContainer.classList.remove('hidden');
            playAgainBtn.classList.remove('hidden');
            choicesContainer.classList.add('hidden');
        }

        playAgainBtn.addEventListener('click', resetGame);

        function resetGame() {
            console.log("triggred home page");
            window.location.href='./index.html';
            // playerChoiceEl.classList.remove(laterPlayer);
            // computerChoiceEl.classList.remove(laterComputer);
            // playerChoiceEl.classList.remove('winner');
            // computerChoiceEl.classList.remove('winner');
            // resultContainer.classList.add('hidden');
            // playAgainBtn.classList.add('hidden');
            // nextBtn.classList.add('hidden');
            // choicesContainer.classList.remove('hidden');
        }

        nextBtn.addEventListener('click', nextPage);
        function nextPage(){
            window.location.href='./celeb.html';
        }
    }

    if(document.getElementById('play-again-celebrations')){
        goBackBtn.addEventListener('click', homePage);
        function homePage(){
            window.location.href='./index.html';
        }
    }

    if(document.getElementById('close')){
        closeBtn.addEventListener('click',closeRules);
        function closeRules(){
            fullGameRules.classList.add('hidden');
        }
    }
    if(document.getElementById('rules')){
        openRulesBtn.addEventListener('click',openRules);
        function openRules(){
            fullGameRules.classList.remove('hidden');
        }
    }
    if(document.getElementById('celebration-close')){
        closeCelebrationBtn.addEventListener('click',closeCelebrationRules);
        function closeCelebrationRules(){
            fullCelebrationGameRules.classList.add('hidden');
        }
    }
    if(document.getElementById('celebration-rules')){
        openCelebrationRulesBtn.addEventListener('click',openCelebrationRules);
        function openCelebrationRules(){
            fullCelebrationGameRules.classList.remove('hidden');
        }
    }

});
