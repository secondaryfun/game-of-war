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
    buildDeck: function () {
        const suits = ['clubs','spades','hearts','diamonds']
        //add 13 ranks to array
        const ranks = []
        for (let i=1;i<=13;i++) {  
            ranks.push(i)
        }
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
    dealCards: function() {
        while (this.deck.length !== 0) {
            this.p1Deck.push(this.deck.pop())
            this.p2Deck.push(this.deck.pop())
        }
        
    },
    getCard: function(playerDeck) {return playerDeck.shift()},
    winner: function(winner) {
        winner.push(this.firstCard, this.secondCard)
        //@@@@@@@@@@@@@@@LEAVING OFF HERE@@@@@@@@@@@@@@@@@@@
        //winner.push(edit:  this.kitty.pop() for each)
            if (this.kitty !== []) winner.push(this.kitty)

        this.firstCard = null
        this.secondCard = null
        this.kitty = []
    },
    fillKitty: function () {
        this.kitty.push(this.firstCard, this.secondCard)
    },
    flipFight: function() {
        this.firstCard = this.getCard(this.p1Deck)
        this.secondCard = this.getCard(this.p2Deck)
        console.log(this.firstCard.rank + "@@@@" + this.secondCard.rank)
        if (this.firstCard.rank > this.secondCard.rank) this.winner(this.p1Deck)
        else if (this.secondCard.rank > this.firstCard.rank) this.winner(this.p2Deck)
        else {
            this.fillKitty()
        }
    }
}

zed.buildDeck()
// console.log(zed.deck)
zed.shuffle()
// console.log(zed.deck)
zed.dealCards()
console.log(zed.p1Deck[0].rank)
zed.flipFight()
zed.p2Deck.length
zed.p1Deck.length
// zed.getCard(zed.p1Deck)
console.log(zed.firstCard)


//LINE
