'use strict';

let bet = 0;
var hasBeenClicked = 'false';
let cards = [];
let playerCounter = 0;
let hitCount = 0;
let currentScorePlayer = 0;
let currentScoreDealer = 0;
let bankroll = 1000;
let currentBet = 0;

$(document).ready(function () {

    $('#betvalue').html('$0');
    $('#bankroll').html('$' + bankroll);

    $('#startgame').on('click', function () {
        $('.blackjackboard').css('display', 'block');
        $('#startgame').css('display', 'none');
        $('#newgame').css('display', 'block');
        cards = generate_cards();
        shuffle_array(cards);
        placeBet();
    });

    $('#hit').on('click', function () {
        if (hitCount < 1) {
            drawPlayer();
            drawDelear();
            hitCount++;
        } else {
            drawPlayer();
            setTimeout(function () {
                hasLost();
            }, 100);
        }
    });

    $('#stand').on('click', function () {
        while (currentScoreDealer <= 17) {
            drawDelear();
        }

        setTimeout(function () {
            determinWinner();
        }, 100);
        setTimeout(function () {
            resetTurn();
        }, 3000);

    });

    $('#newgame').on('click', function () {
        gameReset();
    });
});

function placeBet() {
    $('.chip').on('click', function () {
        if (hasBeenClicked == 'false') {
            currentBet = parseInt($(this).html());
            bet += currentBet;
            $('#betvalue').html('$' + bet);
        }
        betCheck();
    });
    $('#placeBet').on('click', function () {
        $('#betvalue').css('background-color', 'red');
        hasBeenClicked = 'true';
        bankroll -= bet;
        $('#bankroll').html('$' + bankroll);
    });
}

function drawPlayer() {
    let imgURL = 'img/' + cards[playerCounter].suit + '-' + cards[playerCounter].rank + '.png';
    let currScore = scoreCounter(currentScorePlayer);
    currentScorePlayer += currScore;
    $('#playerScore').html(currentScorePlayer);
    let drawnCard = $('<div>')
        .addClass('card')
        .css('background-image', 'url(' + imgURL + ')');
    $('#playersCards').append(drawnCard);
    playerCounter++;

}

function drawDelear() {
    let imgURL = 'img/' + cards[playerCounter].suit + '-' + cards[playerCounter].rank + '.png';
    let currScore = scoreCounter(currentScorePlayer);
    currentScoreDealer += currScore;
    $('#dealerScore').html(currentScoreDealer);
    let drawnCard = $('<div>')
        .addClass('card')
        .css('background-image', 'url(' + imgURL + ')');
    $('#dealerCards').append(drawnCard);
    playerCounter++;

}

function scoreCounter(currentScore) {
    if ($.isNumeric(parseInt(cards[playerCounter].rank))) {
        currentScore = parseInt(cards[playerCounter].rank);
    } else if (cards[playerCounter].rank == 'ace') {
        currentScore = 11;
    } else {
        currentScore = 10;
    }
    return currentScore;
}

function hasLost() {
    if (currentScorePlayer > 21) {
        $('#winner').html('You lose');
    }
}

function determinWinner() {
    if (currentScorePlayer > currentScoreDealer && currentScorePlayer < 22 || currentScoreDealer > 21) {
        $('#winner').html('You win');
        bankroll += bet * 2;
        $('#bankroll').html('$' + bankroll);
    } else if (currentScorePlayer == currentScoreDealer) {
        bankroll += bet;
        $('#winner').html('Draw');
    } else {
        $('#winner').html('You lose');
    }

    if (bankroll == 0) {
        alert('Game over loser');
    }
}

function gameReset() {
    currentBet = 0;
    bet = 0;
    hasBeenClicked = 'false';
    cards = [];
    playerCounter = 0;
    hitCount = 0;
    currentScorePlayer = 0;
    currentScoreDealer = 0;
    cards = generate_cards();
    shuffle_array(cards);
    $('.card').remove();
    $('#playerScore').html('');
    $('#dealerScore').html('');
    $('#bankroll').html('1000');
    $('#betvalue').html('$0');
    $('#winner').html('');
}

function resetTurn() {
    currentBet = 0;
    bet = 0;
    hasBeenClicked = 'false';
    cards = [];
    playerCounter = 0;
    hitCount = 0;
    currentScorePlayer = 0;
    currentScoreDealer = 0;
    cards = generate_cards();
    shuffle_array(cards);
    $('.card').remove();
    $('#playerScore').html('');
    $('#dealerScore').html('');
    $('#betvalue').html('$0');
    $('#winner').html('');
    $('#secretMessage').html('');    
    $('#betvalue').css('background-color', '');
}

function betCheck() {
    c(bet);
    if (bet > bankroll) {
        $('#secretMessage').html('Place lower bet than $' + bankroll);
        $('#betvalue').html('$0');
        setTimeout(function () {
            resetTurn();
        }, 1000);
        

    }
}

function c(msg) {
    console.log(msg);
}