
let randomNum=parseInt(Math.random() * 100 + 1)

const submit=document.querySelector('#submitBtn')
const userInput=document.querySelector('#inputNumber')
const guessSlot=document.querySelector('#ourGuesses')
const remaining=document.querySelector('#remainGuess')

const lowOrHi=document.querySelector('#lowHigh')
const startOver=document.querySelector('.info')
const mainImg=document.querySelector('#mainImg')

const p=document.createElement('p')

let prevGuess=[]
let numGuess=1

let playGame=true
startOver.style.display='none'

if(playGame){
    submit.addEventListener('click',(e)=>{
        e.preventDefault()
        const guess=parseInt(userInput.value)
        validateGuess(guess)
    })
}


function validateGuess(guess){
    if(isNaN(guess) || guess < 0 || guess >100){
        alert('Please enter the valid value')
        userInput.value=""
    }
    else{
        startOver.style.display='block'
        prevGuess.push(guess)

        if(numGuess>10){
            displayGuess(guess)
            displayMessage(`<span id="loosing">GAME OVER!</span>😵‍💫 Correct number is <span>${randomNum}</span>`)
            endGame()
        }else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess===randomNum){
        displayMessage(`WOW! You guessed it right😃`)
        mainImg.setAttribute('src','/smile.png')
        endGame()
    }else if(guess < randomNum){
        displayMessage(`your guess is low😬`)
    }else if(guess > randomNum){
        displayMessage(`your guess is high😬`)
    }
}

function displayGuess(guess){
    userInput.value=''
    guessSlot.innerHTML +=` ${guess}`
    numGuess++;
    remaining.innerHTML=`${11-numGuess}`
}

function displayMessage(message){
    lowOrHi.innerHTML=`<h2>${message}</h2>`
}

function endGame(){
    userInput.value=''
    userInput.setAttribute('disabled',"")
    p.classList.add('button')
    p.innerHTML=`<h2 id="newGame">Start new Game</h2>`
    startOver.appendChild(p)
    playGame=false
    newGame()
}

function newGame(){
    const newGameButton=document.querySelector('#newGame')
    newGameButton.addEventListener('click',(e)=>{
        randomNum=parseInt(Math.random() * 100 + 1)
        prevGuess=[]
        numGuess=1
        guessSlot.innerHTML=''
        remaining.innerHTML=`${11-numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        startOver.style.display='none'
        mainImg.setAttribute('src','/confused.png')

        playGame=true
    })
}