// 1. Rozpoczęcie nowej gry - New Game

//wyciągamy element js-newGameButton
var newGameBtn = document.getElementById('js-newGameButton'); 
//wywołujemy zdarzenie - po kliknięciu w przycisk New Game rozpocznie się nowa gra
newGameBtn.addEventListener('click', newGame);


// 2. Gracz wybiera spośród trzech mozliwości

//określamy zmienne związane z wyborem gracza
var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

//wywołujemy zdarzenie - gracz klika i wywołana zostaje funkcja playerPick
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

// 3. Stan gry na początku (gra jeszcze się nie zaczęła)
var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

// 4. Wyświetlanie odpowiednich elementów gry na stronie

//określamy zmienne plansz gry - new game, plansza z trzema możliwościami wyboru, plansza z wynikami 
var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

//funkcja określająca co pojawi się na stronie na danym etapie gry
function setGameElements() {
  switch(gameState) {
    case 'started':// gdy gra się rozpocznie
        newGameElem.style.display = 'none';//plansza New Game niewidoczna
        pickElem.style.display = 'block';//plansza z mozliwościami wyboru widoczna
        resultsElem.style.display = 'block';//plansza z wynikami z każdej rundy widoczna
        newParagraph.innerHTML = '';
      break;
    case 'ended'://gdy gra się zakończy
        newParagraph.style.display = 'block';
        newGameBtn.innerText = 'Play again';//plansza New Game widoczna, ale zmienia się tekst na Play Again
    case 'notStarted'://gra się nie rozpoczęła
    default:
        newGameElem.style.display = 'block';//plansza New Game widoczna
        pickElem.style.display = 'none';//plansza z możliwościami wyboru niewidoczna
        resultsElem.style.display = 'none';//plansza z wynikami z kazdej rundy niewidoczna
  }
}
setGameElements();//wywołanie funkcji

// 5. Rozpoczęcie gry

//określamy zmienne, które będą się zmieniać podczas gry
var playerPointsElem = document.getElementById('js-playerPoints'),//punkty gracza
    playerNameElem = document.getElementById('js-playerName'),//imię gracza
    computerPointsElem = document.getElementById('js-computerPoints');//punkty komputera

//określamy co się zadzieje, gdy klikniemy w New Game
function newGame() {
  player.name = prompt('Please enter your name', 'name');//pytamy o imię gracza
  if (player.name) {//gdy dostaniemy imię gracza
    player.score = computer.score = 0;//wynik gracza i komputera wynosi 0
    gameState = 'started';//gra przyjmuje status started
    setGameElements();//wywołujemy funkcję, która wyświetli odpowiednie plansze na stronie
    playerNameElem.innerHTML = player.name;//imię gracza będzie takie jak to podane w prompt
    setGamePoints();//funkcja, która odpowiada za wyświetlenie wyniku
  }
}

// 6. Wybór komputera 

//funkcja odpowiada za wybór komputera, wykorzystuje metodę na generowanie losowych wyborów
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

//określamy zmienne odpowiedzialne za wybór 
var playerPickElem = document.getElementById('js-playerPick'),//wybór gracza
    computerPickElem = document.getElementById('js-computerPick'),//wybór komputera
    playerResultElem = document.getElementById('js-playerResult'),//Win lub puste pole
    computerResultElem = document.getElementById('js-computerResult');//Win lub puste pole

// 7. Wybór gracza

//funkcja, która zwraca wybór komputera i wybór gracza
function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

     checkRoundWinner(playerPick, computerPick);
}

// 8. Przyznawanie punktów 

//funkcja, która sprawdza kto wygrał, a następnie przyznaje punkty
function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';//na początku tekst o wygranej jest usunięty, dopiero sprawdzimy kto wygrał

  var winnerIs = 'player';//przyjmujemy, że gracz jest zwyciezcą

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';//zwycięża komputer
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";//pojawia się napis Win przyzwycięzcy rundy
        player.score++;//punkt dla gracza
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";//pojawia się Win przy komputerze
        computer.score++;//punkt dla komputera
    }
    setGamePoints();
    checkGameWinner();
}

//funkcja, która odpowiada za wyświetlenie wyniku gracza i komputera
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
    checkGameWinner();
}

// 9. Kto wygrał grę?

var finishResult = document.getElementById('js-finishResult');
var newParagraph = document.createElement('p')

function checkGameWinner() {
    if (player.score == 10) {
    newParagraph.innerHTML = "You won the result " + player.score + " : " + computer.score + "!";
    gameState = 'ended';
    } else if (computer.score == 10) {
        newParagraph.innerHTML = "You lost the result " + computer.score + " : " + player.score + "!";
        gameState = 'ended';   
    }
    finishResult.appendChild(newParagraph);
    setGameElements();
}

