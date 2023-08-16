// elementos de html y del juego en general

const canvas = document.getElementById('my-canvas');
const context = canvas.getContext('2d');

const startingPage = document.getElementById('starting-page');
const gameOverPage = document.getElementById('game-over-page');

const startBtn =  document.getElementById('start-btn');
const gameOverBtn = document.getElementById('game-over-btn');
const highestScoreTag = document.getElementById('highest-score');

const landscape = document.getElementById('background');

const houseImg = new Image();
houseImg.src = "images/house.png"

const house =
{
    img: houseImg,
    x: 180,
    y: 325,
    width: 125,
    height: 125
}

const burstImg = new Image();
burstImg.src = "images/burst.png";

const burst =
{
    img: burstImg,
    width: 60,
    height: 60
}

// nota: el sonido no esta inicializado ni tomado en cuenta como elemento debido a que para poder efectuarse varias veces seguidas (interrumpiendose entre si) debe crearse un objeto en cada sonido

export {canvas, context, landscape, house, burst, startingPage, startBtn, gameOverBtn, gameOverPage, highestScoreTag}