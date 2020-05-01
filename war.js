//@@@@@@@@@@@@@@@@@@@@@@ Classes @@@@@@@@@@@@@@@@@@@@@@@@@@@
function Card(rank, face, frontUrl, backUrl) {
    this.rank = rank;
    this.face = face;
    this.frontUrl = frontUrl;
    this.backUrl = backUrl;
}
function Game(gameNum, count, p1Length, p2Length, kittyLength) {
        this.gameNum = gameNum;
        this.counter = count;
        this.playerONE = p1Length;
        this.playerTWO = p2Length;
        this.kittyLength = kittyLength;
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

    //fill 'deck' with cards specified by suits & numRanks
    buildDeck: function () {
        //specify the suits
        const suits = ['clubs','spades','hearts','diamonds']
        //add ranks to array
        const numRanks = 13  //specify the number of ranks
        const ranks = []
        for (let i=1;i<=numRanks;i++) {  
            ranks.push(i)
        }
        //add Cards to 'deck', one for each 'rank' in each 'suit'
        for (let i=0; i<suits.length; i++) {
            for (let j=0;j<ranks.length;j++) {
                this.deck.push(new Card(j+1, suits[i]))
            }
        }        
    },
    //shuffle the array indices from received array
    // shuffle: function() {
    //     let temp, random;
    //     for (let i = this.deck.length; i!==0; i--) {
    //         //pick an index at random
    //         random = Math.floor(Math.random() * i);        
    //         // And swap it with the current element.
    //         temp = this.deck[i-1];
    //         this.deck[i-1] = this.deck[random];
    //         this.deck[random] = temp;
    //     }
    // },
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
    //split the deck between p1Deck and p2Deck, dealing from the end.
    dealCards: function() {
        while (this.deck.length !== 0) {
            this.p1Deck.push(this.deck.pop())
            this.p2Deck.push(this.deck.pop())
        }
        
    },
    //returns a Card from the front of an array of Cards
    getCard: function(playerDeck) {return playerDeck.shift()
    },
    //pushes all the card in play to thedeck received (p1Deck/p2Deck) 
    winner: function(turnWinner) {
        // console.log("winner Started")
        // winner.push(this.firstCard, this.secondCard)
        //     if (this.kitty !== []) {
        //         for (let item in this.kitty)
        //             winner.push(this.kitty[item])
        //     }
        this.fillKitty()
        this.shuffle(this.kitty)
        for (let item in this.kitty) turnWinner.push(this.kitty[item])
        this.firstCard = null
        this.secondCard = null
        this.kitty = []
    },
    //loads the kitty array with the first&second Card, if 'switch=true' takes 1 card from each player deck.
    fillKitty: function (takeExtraCard=0) {
        // console.log("fillKitty Started")
        if (this.firstCard !== null) this.kitty.push(this.firstCard)
        if (this.secondCard !== null) this.kitty.push(this.secondCard)
        if (takeExtraCard) {
            if (this.p1Deck.length > 0) this.kitty.push(this.p1Deck.shift())
            if (this.p2Deck.length > 0) this.kitty.push(this.p2Deck.shift())
        }
        this.firstCard = null;
        this.secondCard = null;
    },
    //compare firstCard & secondCard and send to winner or to kitty if tie.
    compareCards: function() {
        // console.log("compareCards Started")
        let turnWinner, takeExtraCard = false
        if (this.firstCard.rank > this.secondCard.rank) this.winner(this.p1Deck)
        else if (this.secondCard.rank > this.firstCard.rank) this.winner(this.p2Deck)
        else {
            takeExtraCard = true
            console.log("There was a tie, players add one to the kitty")
            this.numTies++
            this.fillKitty(takeExtraCard)
        }
    },
    //check for empty player decks
    testForWin: function() {
        // console.log("testForWin Started")
        if (this.p1Deck.length === 0) return "Player One"
        else if (this.p2Deck.length === 0) return "Player Two"
        else return null
    },
    //The actual turn mechanic. Flips cards to compare until one player has zero cards remaining.
    flipFight: function() {

        while (!this.gameOver) {
            this.counter++
            
            //break at 10k iterations.  No one has time for that.
            if (this.counter > 5000) break

            //pull Cards from the player decks
            this.firstCard = this.getCard(this.p1Deck)
            this.secondCard = this.getCard(this.p2Deck)
            
            //output Turn info
            this.printGameState()

            //compare the cards and send to winner or kitty
            this.compareCards()

            //end while loop if a player deck is empty
            this.gameWinner = this.testForWin()
            if (this.gameWinner) {
                console.log("@@@@@@@@@@@@@@@@@@@WINNER@@@@@@@@@@@@@@@@@@")
                console.log(`........CONGRATULATIONS ${this.gameWinner}`)
                this.gameOver = true
            }
            else this.gameOver = false
        }
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
    printGameState: function() {
        console.log(`game: ${this.gameNum} counter: ${this.counter}, ${this.firstCard.rank} v ${this.secondCard.rank}, Total Cards: ${this.p1Deck.length + this.p2Deck.length}, p1: ${this.p1Deck.length}, p2: ${this.p2Deck.length}, kitty: ${this.kitty.length},`)
    },
    //saves the game information to 'savedGames'
    logGame: function() {
        //game, count, p1Length, p2Length, kittyLength
        let game = new Game(this.gameNum, this.counter, this.p1Deck.length, this.p2Deck.length, this.kitty.length)
        this.savedGames.push(game)
        console.log(JSON.stringify(game))
    },
    //function to start the game. Receives # of games & boolean. 
    runGame: function(numGames=1) {
        //ready game counter
        this.savedGames = []
        for(this.gameNum = 0; this.gameNum < numGames; this.gameNum++) {
            this.initialize()
            this.flipFight()
            // console.log(`{game#: ${i+1}} count: ${this.counter} | P2: ${this.p2Deck.length} | p1: ${this.p1Deck.length}`)
            this.logGame()
        }
        console.log(`Average # of turns to win over ${numGames} games: ${this.averageCounter/numGames}`)
        this.runStats();
        console.log(`Game Results:`)
        console.log(JSON.stringify(this.savedGames))
        
    },
    runStats: function() {
        let median, mean, totalNumTurns, numTies
    }
}

war.runGame(3)
//@@@@@@@@@@Run game@@@@@@@@@@@@@@@
// war.buildDeck()
// // console.log(war.deck)
// war.shuffle()
// // console.log(war.deck)
// war.dealCards()
// // console.log(war.p1Deck[0].rank)
// war.flipFight()
// war.p2Deck.length
// war.p1Deck.length
// war.kitty.length
// war.counter
// // war.getCard(war.p1Deck)
// // console.log(war.firstCard)

//@@@@@@@@@@TESTKITTY@@@@@@@@@
// war.fillKitty()
// for (let x=0; x<40; x++) {war.fillKitty()}
// console.log(JSON.stringify(war.kitty))
// war.winner(war.p2Deck)
// war.p1Deck.length
// war.p2Deck.length
// war.p2Deck[war.p2Deck.length-1]


//Test the shuffle function
// let anArray = [1,2,3,4,5]
// war.shuffle(anArray)
