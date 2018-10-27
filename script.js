function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function finOn() {
    document.getElementById("finOverlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById('pickNum').focus();
}

function finOff() {
    document.getElementById("finOverlay").style.display = "none";
    document.getElementById('pickNum').focus();
}

// function shuffle(array) {
//     var m = array.length,
//         t, i;
//     while (m) {
//         i = Math.floor(Math.random() * m--);
//         t = array[m];
//         array[m] = array[i];
//         array[i] = t;
//     }
//     return array;
// }

class Game {
    constructor() {
        console.log('were inside Game constructor')
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        this.numLeft = 5;
    }
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    isLower() {
        if (this.playersGuess < this.winningNumber) {
            document.getElementById('lowerOrHigher').classList = '';
            document.getElementById('lowerOrHigher').className = 'UParrow_box';
        } else {
            document.getElementById('lowerOrHigher').classList = '';
            document.getElementById('lowerOrHigher').className = 'DOWNarrow_box';
        }
        return (this.playersGuess < this.winningNumber) ? 'Guess higher!' : 'Guess lower!';
    }
    playersGuessSubmission(guess) {
        let feedback = document.getElementById('guess-feedback');
        if (guess < 1 || guess > 100 || isNaN(guess)) {
            feedback.innerHTML = `Invalid guess.<br>Try again!`;
        } else {
            this.playersGuess = guess;
            return this.checkGuess();
        }
    }
    checkGuess() {
        let result = '';
        let feedback = document.getElementById('guess-feedback');
        if (this.playersGuess === this.winningNumber) {
            finOn();
            document.getElementById('winOrLose').innerHTML = `Brilliant!<br>The number was: ${this.winningNumber}`;
            document.getElementById('numLeft').innerHTML = '';
            document.getElementById('lowerOrHigher').innerHTML = '';
            document.getElementById('lowerOrHigher').classList = '';
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            result = 'You already guessed that, silly!';
            document.getElementById('lowerOrHigher').classList = '';
            document.getElementById('lowerOrHigher').innerHTML = '';
        } else {
            this.numLeft--;
            if (this.numLeft > 1) {
                document.getElementById('numLeft').innerHTML = `You have ${this.numLeft} guesses left.`;
            } else {
                document.getElementById('numLeft').innerHTML = `You have ${this.numLeft} guess left!`;
            }
            let diff = this.difference();
            if (this.pastGuesses.length < 4) {
                document.getElementById('lowerOrHigher').innerHTML = this.isLower();
                console.log(this.pastGuesses);
                if (diff < 10) {
                    document.getElementById('guess-feedback').className = 'burningUp';
                    result = `You\'re burning up!`;
                } else if (diff < 25) {
                    document.getElementById('guess-feedback').className = 'lukewarm';
                    result = `You\'re lukewarm.`;
                } else if (diff < 50) {
                    document.getElementById('guess-feedback').className = 'chilly';
                    result = `You\'re a bit chilly.`;
                } else if (diff < 100) {
                    document.getElementById('guess-feedback').className = 'cold';
                    result = `You\'re ice cold!`;
                }
                document.getElementById('pickNum').focus();
            } else {
                document.getElementById('winOrLose').innerHTML = `Nice try!<br>The number was: ${this.winningNumber}`;
                document.getElementById('lowerOrHigher').style.visibility = 'hidden';
                document.getElementById('numLeft').style.visibility = 'hidden';
                document.getElementById('guess-feedback').style.visibility = 'hidden';
                finOn();
                this.pastGuesses = [];
            }
        }
        feedback.innerHTML = result;
        this.pastGuesses.push(this.playersGuess);
        debugger
        document.querySelector(`#prevGuess p:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;
        //return result;
    }
    // provideHint() {
    //     let arr = [];
    //     arr.push(generateWinningNumber());
    //     arr.push(generateWinningNumber());
    //     return shuffle(arr);
    // }
}

function newGame() {
    on();
    // this.playersGuess = null;
    // this.pastGuesses = [];
    // this.winningNumber = generateWinningNumber();
    // this.numLeft = 5;
    for(let i = 0; i < 5; i++){
        document.getElementsByClassName('guess')[i].innerHTML = '';
    }
    document.getElementById('numLeft').style.visibility = 'visible';
    playGame();
}

function playGame() {
    let game = new Game();
    console.log('game', game)
    document.getElementById('pickNum').focus();
    document.getElementById('numLeft').innerHTML = `You have ${game.numLeft} guesses left.`;
    console.log(game.winningNumber);
    const submit = document.getElementById('submit');
    document.querySelector('input').addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            document.getElementById('pick').style.visibility = 'hidden';
            game.playersGuessSubmission(parseInt(document.querySelector('input').value));
            document.querySelector('input').value = '';
        }
    });
    submit.addEventListener('click', function () {
        document.getElementById('pick').style.visibility = 'hidden';
        game.playersGuessSubmission(parseInt(document.querySelector('input').value));
        document.querySelector('input').value = '';
    });
}

let start = document.getElementById('start');
start.addEventListener('click', newGame());

// let playAgain = document.getElementById('newGame');
// newGame.addEventListener('click', newGame());
