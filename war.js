function Card(rank, face, frontUrl, backUrl) {
    this.rank = rank;
    this.face = face;
    this.frontUrl = frontUrl;
    this.backUrl = backUrl;
}

const zed = { 
    deck: [], //array of cards
    buildDeck: function () {
        const suits = ['clubs','spades','hearts','diamonds']
        //add 13 ranks to array
        const ranks = []
        for (let i=1;i<=13;i++) {  
            ranks.push(i)
        }
        for (let i=0; i<suits.length; i++) {
            for (let j=0;j<ranks.length;j++) {
                this.deck.push(new card(j, suits[i]))
            }
        }        
    }
}
zed.buildDeck()
