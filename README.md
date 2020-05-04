# Project Title

Game of War the Card Game

## Getting Started

Go to {link}(https://secondaryfun.github.io/game-of-war/) to try the game.  The game is automated. Specify how many games to run in your browser's console.

### Rules

The rules for the game can be found [here:] (https://bicyclecards.com/how-to-play/war/)

Objective:  The winning player takes all the cards.

To Start:  The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. Anyone may deal first. Each player places their stack of cards face down, in front of them.

THE TURN: Each player turns up a card at the same time and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack.

If the cards are the same rank, it is War. Each player turns up two cards face down and one card face up. The player with the higher cards takes both piles (8 cards). If the turned-up cards are again the same rank, each player places another two cards face down and turns another card face up. The player with the higher card takes all 14 cards, and so on.

The game ends when one player has won all the cards.

### Directions

To play, enter the command: 
```war.runGame()```

To see the turns, enter: 
```war.runGame(true)```

To run more than one game, enter: 
```war.runGame(true/false,# of games)```

For example: 
```war.runGame(false,10)``` 
will run 10 games and output the results.

## Run One Game and Show Turns

```war.runGame(true)```

### The Project

This game was written a part of a project for the Software Engineering Immersive course at General Assembly.

#### Project Requirements

Requirements
To play, each player reveals the top card in their stack. The player who played the card with the higher rank (Aces high) takes both cards and puts them at the bottom of their stack in an arbitrary order.

If there is a tie, then it's War! In the card game each player adds places the top three cards of their stack face down, and then each player reveals the top card again. Whoever wins out of the second reveal takes all of the cards, and if there is another tie the process repeats until there is a winner.

Technical Requirements
For this project, we'd like you to make it so we can play the game through the console in the browser. You'll therefore need an index.html file that includes the scripts for your game.

Additionally, your project should meet the following requirements:

Your game should run without errors
The game should start when the player loads the page. Create your two players and start the rounds!
Print a message for each "round" of the game showing the cards played by each user, who won the round, and how many cards each player now has.
Include a README written in well formatted Markdown (hint: look up README templates)
Show a good commit history with frequent commits (We're looking for lots of small commits)
## Built With

* javascript, html, css

## Contributing

Feel free to contribute if you find errors or identify a better way to solve the game. 

## Authors

* **Christopher Birkenhagen** - [secondaryfun](https://github.com/secondaryfun)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Much thanks to sharnol / Satish Harnol for his [shuffle function](https://gist.github.com/sharnol/364f01f49ab68f1a127a1b35368eee47). 
