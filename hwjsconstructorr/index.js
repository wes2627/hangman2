var Word = require('../hwjsconstructor/gamefiles/Word');
var inquirer = require('inquirer');

var letteranswer;
var answerWord;
var guesses;
var guessesLeft;

var wordsList = ["wicker park", "evanston", "humbolt park", "south loop", "bronzeville", "pilsen", "loop"];

function randomWord(wordsList) {
    var index = Math.floor(Math.random() * wordsList.length);
    return wordsList[index];
}

var questions = [
    {
        name: 'letterGuessed',
        message: 'guess a letter',
        validate: function (value) {
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1); // fix letter logic later
            return valid;
        },
        when: function () {
            return (!letteranswer.allGuessed() && guessesLeft > 0);
        }
    },
    {

        when: function () {
            return (letteranswer.allGuessed() || guessesLeft <= 0);
        }
    },

];

function resetGame() {
    answerWord = randomWord(wordsList);
    letteranswer = new Word(answerWord);
    letteranswer.makeGuess(' ');
    guesses = [];
    guessesLeft = 9;
}

function ask() {
    if (!letteranswer.allGuessed() && guessesLeft > 0) {
        console.log(letteranswer + '');
    }

    inquirer.prompt(questions).then(answers => {

        if ('playAgain' in answers && !answers.playAgain) {
            console.log('thanks for playing');
            process.exit();
        }
        if (answers.playAgain) {
            resetGame();
        }


        var currentGuess = answers.letterGuessed.toLowerCase();

        if (guesses.indexOf(currentGuess) === -1) {
            guesses.push(currentGuess);
            letteranswer.makeGuess(currentGuess);
            if (answerWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                guessesLeft--;


            } else {
                console.log('guesses so far:', guesses.join(' '));
                console.log('guesses remaining:', guessesLeft);
            }

        } else {
            console.log(answerWord, 'is correct!');

        }

        ask();

    });
};
resetGame();
ask();