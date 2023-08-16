import {canvas, context, house, burst, landscape, startBtn, startingPage, gameOverBtn, gameOverPage, highestScoreTag} from '/modules/elements.js'
import {Bomb} from '/modules/bomb.js'
import {drawBackground, drawScoring, drawBomb, drawBurst} from '/modules/drawing.js'
import {setNumber, setColor, setPath} from '/modules/random.js'

let b = new Bomb();
let score = 0;
let highestScore = 0;

// cuando la bomba se cancele, se dibujara una explosion permanente en su ultima posicion
let burstX = -burst.width;
let burstY = -burst.height;

// lanzar bomba
function launch()
{
    // antes de hacer cualquier animacion, se debe repintar todo de nuevo
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(canvas, house, landscape);
    drawScoring(canvas, score);
    drawBurst(canvas, burst.img, burstX, burstY);

    // El siguiente codigo es el que maneja la velocidad y repinta la bomba, este solo se ejecutara mientras ninguna bomba impacte en la casa
    if (b.speedX != 0 && b.speedY != 0)
    {
        drawBomb(canvas, b);

        // movimiento de la bomba
        b.x += b.speedX;
        b.y += b.speedY;

        // se comprueba que la pelota no haya impactado en la casa
        if (b.x >= house.x && b.y >= house.y)
        {
            // sonido al explotar
            new Audio("sounds/burst-sound.mp3").play();

            // se pasa la velocidad de la bomba a 0 y se cancela su animacion
            b.speedX = 0;
            b.speedY = 0;    

            canvas.style.display = 'none';
            gameOverPage.style.display = 'block';
        }

        // la funcion request repite el callback alrededor de 60 veces por segundo, de esta manera el ammabiente se repinta y se vuelve a dibujar la bomba en otra posicion y da la ilusion de que esta moviendose
        requestAnimationFrame(launch);
    }
}

function start()
{
    canvas.style.display = 'block';
    b.deploy(setNumber(), setColor(), setPath);
    launch();  
}

// iniciar juego
startBtn.addEventListener('click', e =>
{
    startingPage.style.display = 'none';
    start();
});

// reiniciar juego
gameOverBtn.addEventListener('click', e =>
{
    score = 0;
    burstX = -burst.width;
    burstY = -burst.height;

    gameOverPage.style.display = 'none';
    start();
});

// presionar numero -> cancelar bomba
document.addEventListener('keydown', e =>
{
    if (e.key == `${b.number}`)
    { 
        // sonido al explotar
        new Audio("sounds/burst-sound.mp3").play();

        burstX = b.x - 20;
        burstY = b.y - 20;

        // se pinta otra bomba, con otras coordenadas iniciales
        b.deploy(setNumber(), setColor(), setPath);

        score++; 
        if (score > highestScore) highestScore = score;
        highestScoreTag.innerHTML = "Mejor puntuación: " + highestScore;

        // cada vez que se cree una nueva bomba, la velocidad aumentara proporcionalmente
        if (score > 0)
        {

            b.speedX *= (1 + score/10);
            b.speedY *= (1 + score/10);
        }
    }
});