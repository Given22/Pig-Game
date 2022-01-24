'use strict'

const cube = {
    1: '/image/dice-1.png',
    2: '/image/dice-2.png',
    3: '/image/dice-3.png',
    4: '/image/dice-4.png',
    5: '/image/dice-5.png',
    6: '/image/dice-6.png'
}

const playerOne = document.querySelector('.One')
const playerTwo = document.querySelector('.Two')

const dice = document.querySelector('.diceCube')

const scoreOneElement = document.querySelector('.score_One')
const scoreTwoElement = document.querySelector('.score_Two')

const currentOneElement = document.querySelector('.current_One')
const currentTwoElement = document.querySelector('.current_Two')

const page = document.querySelector('.page');
const overlay = document.querySelector('.overlay')
const btnClosePage = document.querySelector('.close-page')
const p = document.querySelector('.p-page')

let roll,
    scoreOne = 0,
    scoreTwo = 0,
    current = 0;

let whichPlayer = true //false - Player One, true - Player Two

function changePlayer(Player) {
    if(Player){
        playerOne.classList.add("Cplayer")
        playerTwo.classList.remove("Cplayer")
        whichPlayer = false
    } else {
        playerOne.classList.remove("Cplayer")
        playerTwo.classList.add("Cplayer")
        whichPlayer = true
    }
    current = 0
}

function resetCurrent() {
    currentOneElement.textContent = 0
    currentTwoElement.textContent = 0
}

function reset() {
    resetCurrent()
    scoreTwo = 0
    scoreOne = 0
    scoreTwoElement.textContent = scoreTwo
    scoreOneElement.textContent = scoreOne
    dice.src = '/image/dice-0.png'
}

const hidden = (player) => {
    page.classList.toggle('hidden')
    overlay.classList.toggle('hidden')
    p.textContent = !player ? 'Congratulations! Player One Win!' : 'Congratulations! Player Two Win!'
}

document.querySelector('.menu_btnRoll').addEventListener('click', () => {
    roll = Math.trunc(Math.random() * 6) + 1
    dice.src = cube[roll]
    dice.classList.remove('hidden')
    if(roll === 1){
        changePlayer(whichPlayer)
        resetCurrent()
    }else{
        if(!whichPlayer){
            current += roll
            currentOneElement.textContent = current
        }else{
            current += roll
            currentTwoElement.textContent = current
        }
    }
})

document.querySelector('.menu_btnHold').addEventListener('click', ()=> {
    if(!whichPlayer){
        scoreOne += current
        scoreOneElement.textContent = scoreOne
        if(scoreOne >= 100){
            hidden(whichPlayer)
        }
    }else{
        scoreTwo += current
        scoreTwoElement.textContent = scoreTwo
        if(scoreTwo >= 100){
            hidden(whichPlayer)
        }
    }
    changePlayer(whichPlayer)
    dice.src = '/image/dice-0.png'
    resetCurrent()
})

document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
        hidden()
    }
})

overlay.addEventListener('click', hidden)
document.querySelector('.close-page').addEventListener('click', hidden)

document.querySelector('.menu_btnNewGame').addEventListener('click', reset)