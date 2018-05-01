var Word = require ("./Word.js");
var inquirer = require ("inquirer");
var chalk = requr

function Game(){
    this.startGame = function(){
        this.guessesRemaing = 10;
      
        this.createRandomword();

    }
    this.createRandomword = function() {
        var wordArray = ["dog", "apple", "ocean", "computer", "phone"];
        var randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        this.currentWord = new Word (randomWord);
        this.promptUserForLetter();

    }
    this.promptUserForLetter = function() {
        return inquirer.prompt([

            {
              type: "input",
              name: "letterGuess",
              message: "Input your letter guess"
            },
   
          ]).then(function(value) {
              var guessedCorrectly = this.currentWord.checkLetterGuess(value.letterGuess); 
              if (guessedCorrectly) {
                  console.log (chalk.green("\ncorrect\n"));
              }
              
          

          }
          
    }
}

