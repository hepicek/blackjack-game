'use strict';

let bet = 0;
var hasBeenClicked = 'false';
let cards = [];
let playerCounter = 0;
let hitCount = 0;
let currentScorePlayer = 0;
let currentScoreDealer = 0;

$(document).ready(function () {

    $('#startgame').on('click', function () {
        $('.blackjackboard').css('display', 'block');
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
            setTimeout(function () {
                drawDelear();
            }, 100);
            
        }

    });

    $('#endgame').on('click', function () {
        bet = 0;
        hasBeenClicked = 'false';
        cards = [];
        playerCounter = 0;
        hitCount = 0;
        currentScorePlayer = 0;
        currentScoreDealer = 0;
    });
});

function placeBet() {
    $('.chip').on('click', function () {
        if (hasBeenClicked == 'false') {
            let currentBet = parseInt($(this).html());
            bet += currentBet;
            $('#betvalue').html('$' + bet);
        }
    });
    $('#placeBet').on('click', function () {
        $('#betvalue').css('background-color', 'red');
        hasBeenClicked = 'true';
        let currentBankroll = $('#bankroll').html();
        currentBankroll -= bet;
        $('#bankroll').html('$' + currentBankroll);
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
        alert('you lost')
    }
}


function c(msg) {
    console.log(msg);
}