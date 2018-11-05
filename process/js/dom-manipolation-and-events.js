$( document ).ready(function() {
    console.log( "ready!" );

    var totalScores, roundScore, activePlayer, dice, diceDiv;

    // element selectors
    diceDiv = document.querySelector('.dice');

    // functions
    function resetScore(){
        dice = 0;
        totalScores = [0,0];
        roundScore = 0;
        activePlayer = 0;
    }
    // activePlayer behaver
    function activePlayerFun(){

        // update activePlayer scrore result & class
        totalScores[activePlayer] += roundScore;
        document.querySelector('#total-score-' + activePlayer).textContent = totalScores[activePlayer];
        document.querySelector('#name-' + activePlayer).classList.remove("isActive");

        // reset dice & round score
        roundScore = 0;
        dice = 0;
        document.querySelector('#player-score-' + activePlayer).textContent = roundScore;

        // change player - return 0 or 1
        activePlayer = activePlayer == 0 ? activePlayer = 1 : activePlayer = 0;

        // Add active class to active player
        var isActiveClass = document.querySelector('#name-' + activePlayer);
        if(!isActiveClass.classList.contains('isActive')){
            isActiveClass.classList.add("isActive");
        }else{
            isActiveClass.classList.remove("isActive");
        }
    }

    resetScore();

    /*---- Roll dice click event ----*/
    document.querySelector('.roll').addEventListener('click', function(){
        dice = Math.floor(Math.random() * 6) + 1; // render random num from 1-6
        // Player rolling round = if not 1 then: adding dice num to round sum score, if 1: reset the score & the total score
        if (dice !== 1){

            // current player round score
            roundScore += dice;
            document.querySelector('#player-score-' + activePlayer).textContent = roundScore;
            // winner checking
            if( (totalScores[activePlayer] + roundScore ) >= 100 ){
                alert( 'player ' + (activePlayer + 1) + ' won!')
                for(var i=0; i <= totalScores.length-1; i++ ){
                    resetScore();
                    document.querySelector('#player-score-' + i).textContent = roundScore;
                    document.querySelector('#total-score-' + i).textContent = totalScores[activePlayer]
                }
            }
        }else {
            // reset all score of activePlayer to 0 if dice == 0
            roundScore = 0
            totalScores[activePlayer] = roundScore
            document.querySelector('#player-score-' + activePlayer).textContent = roundScore;
            document.querySelector('#total-score-' + activePlayer).textContent = totalScores[activePlayer];
            activePlayerFun();
        }

        // dice animation
        switch(dice) {
            case 1:
                diceDiv.className = "dice one";
                break;
            case 2:
                diceDiv.className = "dice two";
                break;
            case 3:
                diceDiv.className = "dice three";
                break;
            case 4:
                diceDiv.className = "dice four";
                break;
            case 5:
                diceDiv.className = "dice five";
                break;
            case 6:
                diceDiv.className = "dice six";
                break;
            default:
                diceDiv.className = "dice";
        }
    })
    /*-------------------------------*/

    /*---- Hold click event ----*/
    document.querySelector('.hold').addEventListener('click', function(){
        activePlayerFun();
        diceDiv.className = "dice";
        console.log(totalScores);
    })
    /*--------------------------*/
});
