//@@@@@@@@@@@@@@@@@@@@@@ Classes @@@@@@@@@@@@@@@@@@@@@@@@@@@
function Card(score, suit, rank, frontUrl, backUrl) {
    this.score = score;
    this.rank = rank;
    this.suit = suit;
    this.frontUrl = frontUrl;
    this.backUrl = backUrl;
}
function Game(gameNum, count, p1Length, p2Length, kittyLength, numTies, winner) {
        this.gameNum = gameNum;
        this.count = count;
        this.p1Length = p1Length;
        this.p2Length = p2Length;
        this.kittyLength = kittyLength;
        this.numTies = numTies;
        this.winner = winner;
}

//@@@@@@@@@@@@@@@@@@@@@@@ Game Object @@@@@@@@@@@@@@@@@@@@@@@@@@@
const war = { 
    deck: [], //array of cards
    p1Deck: [],  //first player's cards
    p2Deck: [],  //second player's cards
    kitty: [],  //side deck to fill with ties
    firstCard: null,  //flipped first player's card
    secondCard: null,  //flipped second player's card
    counter: 0,  //counts number of turns (each tie breaker counts as one)
    gameWinner: null,  //holds the winning player - player one or player two
    gameOver: false,  //break switch for turns.  true = one player has zero cards
    savedGames: [],  //holds the stats on each game run
    gameNum: 0,  //the game currently running
    numTies: 0,
    numTurns: 0,
    numCardsInTie: 2, //

    //--------======= INITIALIZE THE GAME =========---------


    //FILL THE DECK: fill 'deck' with cards specified by suits & numRanks
    buildDeck: function () {
        //specify the card inputs
        const suits = ['clubs','spades','hearts','diamonds']
        const scores = [2,3,4,5,6,7,8,9,10,11,12,13,14]
        const ranks = ['2 ','3 ','4 ','5 ','6 ','7 ','8 ','9 ','10','J ','Q ','K ','A ']
                
        //add Cards to 'deck', one for each 'rank' in each 'suit'
        for (let i=0; i<suits.length; i++) {
            for (let j=0;j<scores.length;j++) {
                this.deck.push(new Card(scores[j], suits[i], ranks[j]))
            }
        }        
    },

    //SHUFFLE AN ARRAY
    shuffle: function(arrayToShuffle) {
        let temp, random;
        for (let i = arrayToShuffle.length; i!==0; i--) {
            //pick an index at random
            random = Math.floor(Math.random() * i);        
            // And swap it with the current element.
            temp = arrayToShuffle[i-1];
            arrayToShuffle[i-1] = arrayToShuffle[random];
            arrayToShuffle[random] = temp;
        }
    },

    //DEAL CARDS TO EACH PLAYER: split the deck between p1Deck and p2Deck, dealing from the end.
    dealCards: function() {
        while (this.deck.length !== 0) {
            this.p1Deck.push(this.deck.pop())
            this.p2Deck.push(this.deck.pop())
        }
        
    },

    //--------======= INITIALIZE THE GAME =========---------

    //PULL A CARD FROM PLAYER DECK: returns a Card from the front of an array of Cards
    getCard: function(playerDeck) {return playerDeck.shift()
    },

    //GIVE WINNER ALL CARDS ON THE TABLE: pushes all the card in play to thedeck received (p1Deck/p2Deck) 
    winner: function(turnWinner) {
        
        this.fillKitty()
        this.shuffle(this.kitty)
        for (let item in this.kitty) turnWinner.push(this.kitty[item])
        this.firstCard = null
        this.secondCard = null
        this.kitty = []
    },

   

    //COMPARE THE CARDS FOR WIN/LOSS/TIE: compare firstCard & secondCard and send to winner or to kitty if tie.
    compareCards: function(showTurns) {
        // console.log("compareCards Started")
        let turnWinner, takeExtraCard = false
        if (this.firstCard.score > this.secondCard.score) this.winner(this.p1Deck)
        else if (this.secondCard.score > this.firstCard.score) this.winner(this.p2Deck)
        else {
            takeExtra = true
            if (showTurns) console.log("<<<<<<<<<<<<<<<<<<<<<< WAR!  TIME TO TAKE NAMES AND CHEW BUBBLEGUM!!! >>>>>>>>>>>>>>>>>>>>>>>>>")
            this.numTies++
            this.fillKitty(takeExtra)
        }
    },
    //GATHER UP TABLE CARDS: loads the kitty array with the first&second Card, if 'switch=true' takes 1 card from each player deck.
    fillKitty: function (takeExtraCard=0) {
        // console.log("fillKitty Started")
        if (this.firstCard !== null) this.kitty.push(this.firstCard)
        if (this.secondCard !== null) this.kitty.push(this.secondCard)
        if (takeExtraCard) {
            for (let i=0; i<this.numCardsInTie; i++) {
                if (this.p1Deck.length > 0) this.kitty.push(this.p1Deck.shift())
                if (this.p2Deck.length > 0) this.kitty.push(this.p2Deck.shift())
            }
        }
        this.firstCard = null;
        this.secondCard = null;
    },

    //CHECK IF PLAYER DECKS ARE EMPTY
    testForWin: function() {
        // console.log("testForWin Started")
        if (this.p1Deck.length === 0) return "Player One"
        else if (this.p2Deck.length === 0) return "Player Two"
        else return null
    },
    //clears all values in preparation for a game
    initialize: function() {
        this.deck = []
        this.p1Deck = []
        this.p2Deck = []
        this.kitty = []
        this.firstCard = null
        this.secondCard = null
        this.counter = 0
        this.numTies = 0
        this.gameWinner = null
        this.gameOver = false
        this.buildDeck()
        this.shuffle(this.deck)
        this.dealCards()
    },

    //---------------===================== REPORTING ================-----------------

    printWinner: function() {
        console.log("---------==============@@@@@@@@@@@@@@@@ WINNER @@@@@@@@@@@@@@@==============---------")
        console.log(`---------==============   CONGRATULATIONS  ${this.gameWinner.toUpperCase()}     ==============---------`)
        console.log(`---------==============     Turns: ${this.counter} | # Wars: ${this.numTies}    ==============---------`)
    },

    printGameState: function() {
        console.log(`== ${this.gameNum} ---TURN ${this.counter} | P1 CARD: ${this.firstCard.rank} | P2 CARD: ${this.secondCard.rank} | CARDS: P1 / P2 - Kitty: ${this.p1Deck.length} / ${this.p2Deck.length} - ${this.kitty.length}`)
    },
    //saves the game information to 'savedGames'
    logGame: function() {

        //game, count, p1Length, p2Length, kittyLength
        let game = new Game(this.gameNum, this.counter, this.p1Deck.length, this.p2Deck.length, this.kitty.length, this.numTies, this.gameWinner)
        this.savedGames.push(game)
        this.numTurns += this.counter
        // console.log(JSON.stringify(game))
    },
    //generates stats on the game set
    runStats: function() {
        let aveTies = Math.floor(this.numTurns/this.numTies)
        let mean = this.numTurns/this.gameNum

        console.log("------------============== GAME SET METRICS ==============------------")
        console.log(`GAMES: ${this.gameNum} | TOTAL TURNS ${this.numTurns} | AVE TURNS/GAME ${mean},`)
        console.log(`TOTAL TIES: ${this.numTies} | AVE TURN PER TIE ${aveTies}`) 
        
        for (let each in this.savedGames) {
            console.log(`@@@ GAME: ${this.savedGames[each].gameNum} | # TURNS: ${this.savedGames[each].count} | CARDS: P1 / P2 - Kitty: ${this.savedGames[each].p1Length} / ${this.savedGames[each].p2Length} - ${this.savedGames[each].kittyLength} | # WARS ${this.savedGames[each].numTies} | WINNER ${this.savedGames[each].winner} @@@`)
        }

    },
    //-----------------------================ GAME PLAY ===============--------------------------

    //THE TURN MECHANIC: Flips cards to compare until one player has zero cards remaining.
    flipFight: function(showTurns) {

        while (!this.gameOver) {
            this.counter++
            
            //break at 10k iterations.  No one has time for that.
            if (this.counter > 5000) break

            //pull Cards from the player decks
            this.firstCard = this.getCard(this.p1Deck)
            this.secondCard = this.getCard(this.p2Deck)
            
            //output Turn info if 'showTurns'
            if (showTurns) this.printGameState()

            //compare the cards and send to winner or kitty
            this.compareCards(showTurns)

            //end while loop if a player deck is empty
            this.gameWinner = this.testForWin()
            if (this.gameWinner) {
                this.printWinner()
                this.gameOver = true
            }
            else this.gameOver = false
        }
    },
    
    //THE GAME WRAPPER:  CALL TO START GAME: Receives # of games & boolean. 
    runGame: function(showTurns=false, numGames=1) {
        //ready game counter
        this.savedGames = []
        for(this.gameNum = 0; this.gameNum < numGames; this.gameNum++) {
            this.initialize()
            this.flipFight(showTurns)
            this.logGame()
        }
        this.runStats();
    }
}

//@@@@@@@@@@@@@@@@@@@@@@ Console Output Instructions to Play @@@@@@@@@@@@@@@@@@@@@
console.log("Welcome to the game of WAR!")
console.log("To play, enter the command: war.runGame()")
console.log("To see the turns, enter: war.runGame(true)")
console.log("To run more than one game, enter: war.runGame(true/false,# of games)")
console.log("For example: war.runGame(false,10)")
