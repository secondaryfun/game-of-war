function Card(rank, face, frontUrl, backUrl) {
    this.rank = rank;
    this.face = face;
    this.frontUrl = frontUrl;
    this.backUrl = backUrl;
}

const zed = { 
    deck: [], //array of cards
    p1Deck: [],
    p2Deck: [],
    kitty: [],
    firstCard: null,
    secondCard: null,
    counter: 0,
    mem1: [],
    mem2: [],
    gameWinner: null,
    gameOver: false,
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
    shuffle: function() {
        let temp, random;
        for (let i = this.deck.length; i!==0; i--) {
            //pick an index at random
            random = Math.floor(Math.random() * i);        
            // And swap it with the current element.
            temp = this.deck[i-1];
            this.deck[i-1] = this.deck[random];
            this.deck[random] = temp;
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
    getCard: function(playerDeck) {return playerDeck.shift()},
    //pushes all the card in play to thedeck received (p1Deck/p2Deck) 
    winner: function(winner) {
        // console.log("winner Started")
        winner.push(this.firstCard, this.secondCard)
            if (this.kitty !== []) {
                for (let item in this.kitty)
                    winner.push(this.kitty[item])
            }
        this.firstCard = null
        this.secondCard = null
        this.kitty = []
    },
    //loads the kitty array with the first&second Card, and takes 1 card from each player deck.
    fillKitty: function () {
        // console.log("fillKitty Started")
        if (this.firstCard !== null) this.kitty.push(this.firstCard)
        if (this.secondCard !== null) this.kitty.push(this.secondCard)
        if (this.p1Deck.length > 0) this.kitty.push(this.p1Deck.shift())
        if (this.p2Deck.length > 0) this.kitty.push(this.p2Deck.shift())
        this.firstCard = null;
        this.secondCard = null;
    },
    //compare firstCard & secondCard and send to winner or to kitty if tie.
    compareCards: function() {
        // console.log("compareCards Started")
        if (this.firstCard.rank > this.secondCard.rank) this.winner(this.p1Deck)
        else if (this.secondCard.rank > this.firstCard.rank) this.winner(this.p2Deck)
        else {
            this.fillKitty()
            // console.log("There was a tie, players add one to the kitty")
        }
    },
    //check for empty player decks
    testForWin: function() {
        // console.log("testForWin Started")
        if (this.p1Deck.length === 0) return "Player One"
        else if (this.p2Deck.length === 0) return "Player Two"
        else return null
    },
    flipFight: function() {

        while (!this.gameOver) {
            this.counter++
            // console.log(`counter: ${this.counter}, p1: ${this.p1Deck.length}, p2: ${this.p2Deck.length}, kitty: ${this.kitty.length}`)
            // this.mem1.push(this.p1Deck)
            // this.mem2.push(this.p2Deck)
            if (this.counter > 10000) break
            //pull Cards from the player decks
            this.firstCard = this.getCard(this.p1Deck)
            this.secondCard = this.getCard(this.p2Deck)
            //compare them and send to winner or kitty
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
    averageCounter: 0,
    initialize: function() {
        deck = []
        p2Deck = []
        kitty = []
        firstCard = null
        secondCard = null
        counter = 0
        mem1 = []
        mem2 = []
        gameWinner = null
        gameOver = false
        this.buildDeck()
        this.shuffle()
        this.dealCards()


    }
    runGame: function(num=1) {
        for(let i = 0; i < num; i++) {
            this.initialize()
            this.flipFight()
            console.log(`count: ${this.counter} | P2: ${this.p2Deck.length} | p1: ${this.p1Deck.length}`)

        }
    }
}

zed.runGame()
//@@@@@@@@@@Run game@@@@@@@@@@@@@@@
// zed.buildDeck()
// // console.log(zed.deck)
// zed.shuffle()
// // console.log(zed.deck)
// zed.dealCards()
// // console.log(zed.p1Deck[0].rank)
// zed.flipFight()
// zed.p2Deck.length
// zed.p1Deck.length
// zed.kitty.length
// zed.counter
// // zed.getCard(zed.p1Deck)
// // console.log(zed.firstCard)

//@@@@@@@@@@TESTKITTY@@@@@@@@@
// zed.fillKitty()
// for (let x=0; x<40; x++) {zed.fillKitty()}
// console.log(JSON.stringify(zed.kitty))
// zed.winner(zed.p2Deck)
// zed.p1Deck.length
// zed.p2Deck.length
// zed.p2Deck[zed.p2Deck.length-1]


//LINE
