var Letter = function(theletter) {
    
    this.theletter = theletter;
    this.guessed = false;

    this.toString = function() {
        return this.guessed ? this.theletter : '_';
    }

    this.makeGuess = function(newGuess) {
        if (this.theletter.toLowerCase() === newGuess.toLowerCase()) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;

