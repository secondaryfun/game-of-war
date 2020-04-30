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
            temp = this.deck[i];
            this.deck[i] = this.deck[random];
            this.deck[random] = temp;
        }
    },
    dealCards: function() {
        while (this.deck.length !== 0) {
            this.p1Deck.push(this.deck.splice(0,1))
            this.p2Deck.push(this.deck.splice(0,1))
        }
        
    }
}

zed.buildDeck()
// console.log(zed.deck)
zed.shuffle()
// console.log(zed.deck)
zed.dealCards()
console.log(zed.p1Deck + "@@@@@@@@@@@@@@@@@" + zed.p2Deck)
