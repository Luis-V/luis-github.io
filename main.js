// Step 1a - Select and store the gameboard element
var gameboardEle = document.querySelector('#gameboard');
// Step 1b - Select and store the score element
var scoreEle = document.querySelector('#score');
// Step 1c - Select and store the cards element
var cardsEle = document.querySelector('#cards');
// Step 1d - Select and store the message element
var messageEle = document.querySelector('#message');
// Step 2 - Create an array of cards
//const cardValues = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
const cardValues = ['@','$','&','#','*']; //for testing
const backSide = '?';//The backside image of cards
var deck;
// Step 3a - Create an array to store 2 players
var players = ['Player 1','Player 2'];
var scores;
// Step 3b - Create a variable to store the current player
var currentPlayer;
// Step 3c - Create a variable to store the first selected card
var currentCard;

//shuffleDeck also resets the children of .container 
function shuffleDeck () {
  //This while removes any .card previously added to #cards.
  while (cardsEle.hasChildNodes()) {
    cardsEle.removeChild(cardsEle.lastChild);
  }
  currentCard = '';
  scores = [0,0];
  currentPlayer =0;
  deck = [];
  messageEle.textContent='Player 1, please begin!';
  scoreEle.textContent="Score: "+scores.join("-");
  // Step 2b - Create a placeholder array
  let tmp;
  // Step 2c - Iterate through card values 4 times
  for(let n1 = 1; n1 <= 4; n1++) {
    //tmp = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    tmp = ['@','$','&','#','*']; //for testing
    // Step 2d - Using a conditional loop
    while (tmp.length>0) {
      // Step 2e - Select a random card from the array
      let randomIndex = Math.floor(Math.random() * tmp.length);
      let randomCard = tmp.splice(randomIndex,1);
      // Step 2f - Add the card to the deck array
      deck.push(randomCard);
    }
  }
  // Step 4 - Iterate through the deck and bind a click event to each one
  //we may be able to move this to the while loop, but maybe you wanted to see us execute
  //a separate loop
  deck.forEach( function(card) {
    //Step 4a - Create a new div element to be a card
    let cardEle = document.createElement("div");
    // Step 3b - Add a 'card' class to the class list on the new div element
    cardEle.classList.add('card');
    // Step 3c - Add a data value to the card with the card's value in it
    cardEle.dataset.value = card;
    cardEle.textContent = backSide;
    // Step 3c - Bind the cardSelected function
    // to the click event on the cardEle
    cardEle.addEventListener('click', cardSelected);
    cardsEle.appendChild(cardEle);
  });
}

// Step 2g - Call the shuffleDeck function
shuffleDeck();

// Step 5 - Create a function to store the logic
// for when a card is selected
function cardSelected(event){
  // Step 5a - Check if there is already a card selected
  
  event.target.textContent = event.target.dataset.value;
  event.target.removeEventListener('click', cardSelected);
  if (currentCard!=='') {
    // Step 6 - Compare the cards
    if (currentCard.dataset.value===event.target.dataset.value) {
      // Step 6b - Add a class to the 2 card elements
      // flipping them over
      event.target.classList.add('flipped');
      currentCard.classList.add('flipped');

      // Step 6c - Add a point to the score for this player
      scores[currentPlayer] += 1;
      scoreEle.textContent="Score: "+scores.join("-");

      // Step 6d - Tell the player to go again
      // (use string interpolation to show which player you're addressing)
      messageEle.innerHTML = `Congratulations! ${players[currentPlayer]}, please go again!`;
    } else {
      // Step 6e - Provide a fail message to the player
      messageEle.innerHTML = "Whoops!";

      // Step 6f - Using a ternary, change players
      currentPlayer = (currentPlayer==0)? 1 : 0;

      // Step 6g - Concatenate a message to the message element
      // advising player 2 that it's their turn now
      // (use string interpolation to show which player you're addressing)
      messageEle.innerHTML += `<br />${players[currentPlayer]}, your turn!`;
      let oldCurrentCard = currentCard;
      setTimeout(function(){
        oldCurrentCard.textContent = backSide;
        event.target.textContent = backSide;
        oldCurrentCard.addEventListener('click', cardSelected);
        event.target.addEventListener('click', cardSelected);
      },880);
    }
    currentCard='';
  } else {
    // Step 5b - Assign the card to currentCard
    currentCard = event.target;

    // Step 5c - Tell the player to select another card
    // (use string interpolation to show which player you're addressing)
    messageEle.textContent = `${players[currentPlayer]}, please select another card`;
  }

  // Step 7 - Check if the board is full
  function isFlipped(card){
    return card.classList.contains('flipped');
  }
  var cardsNodeList = document.querySelectorAll('.card');
  var allCards = [];
  for(var i = 0, thisCard; thisCard = cardsNodeList[i]; ++i) {
    allCards.push(thisCard);
  }
  if (allCards.every(isFlipped)) {
    //Step 7a - Check if one of the players has won
    if (scores[0]!=scores[1]) {
      //Step 7b - Tell the player they've won
      // (use string interpolation to show which player you're addressing)
      messageEle.textContent = `${(scores[0]>scores[1])?players[0]:players[1]}, you won!!! Congratulations!`;
    } else {
      // Step 7c - Tell the players that the game has ended in a tie
      messageEle.textContent = "The game was a tie! Nice try!";
    }
  }
}

// Take it further - Reset the board allowing the user to play again (Worth 20% of the final grade)

//  Step 1 - You will need a reset button in index.html
//  -Done, index.html line 22

/*  Step 2 - You will need to bind an event listener
that detects the click and executes a function*/
document.querySelector('button').addEventListener('click',buttonClicked);
function buttonClicked(event){
//I feel like location.reload() may have sufficed for this use-case.
/*  Step 3 - You will need to reset all the pieces on the
board
can also be done with:

let cardsNodeList = document.querySelectorAll('.card');
   for(let n=0; n<cardsNodeList.length; n++){
     cardsNodeList[n].classList.remove('flipped');
     cardsNodeList[n].textContent = backSide;
   }

Step 4 - You will need to reset the messages
Step 5 - You will need to reset the players
*/
//done inside shuffledeck to also generate a set  of cards with a new order
shuffleDeck();
}