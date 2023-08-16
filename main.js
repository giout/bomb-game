import {canvas, context, house, burst, landscape, startBtn, startingPage, gameOverBtn, gameOverPage, highestScoreTag} from '/modules/elements.js'
import {Bomb} from '/modules/bomb.js'
import {drawBackground, drawScoring, drawBomb, drawBurst} from '/modules/drawing.js'
import {setNumber, setColor, setPath} from '/modules/random.js'

let b = new Bomb();
let score = 0;
let highestScore = 0;

// when bomb is cancelled, a burst is drawn
let burstX = -burst.width;
let burstY = -burst.height;

// throw bomb
function launch()
{
    // everyting must be repainted before performing an animation
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(canvas, house, landscape);
    drawScoring(canvas, score);
    drawBurst(canvas, burst.img, burstX, burstY);

    // bombs will be repainted until any of them impacts the house
    if (b.speedX != 0 && b.speedY != 0)
    {
        drawBomb(canvas, b);

        // bomb movement
        b.x += b.speedX;
        b.y += b.speedY;

        // checking if bomb hasn't impact yet
        if (b.x >= house.x && b.y >= house.y)
        {
            // burst sound
            new Audio("sounds/burst-sound.mp3").play();

            // animation is cancelled
            b.speedX = 0;
            b.speedY = 0;    

            canvas.style.display = 'none';
            gameOverPage.style.display = 'block';
        }

        // request function repeats callback 60 times per second, allowing to repaint landscape and bombs in other positions, which gives the effect of movement
        requestAnimationFrame(launch);
    }
}

function start()
{
    canvas.style.display = 'block';
    b.deploy(setNumber(), setColor(), setPath);
    launch();  
}

// start game
startBtn.addEventListener('click', e =>
{
    startingPage.style.display = 'none';
    start();
});

// restart game
gameOverBtn.addEventListener('click', e =>
{
    score = 0;
    burstX = -burst.width;
    burstY = -burst.height;

    gameOverPage.style.display = 'none';
    start();
});

// press number -> cancel bomb
document.addEventListener('keydown', e =>
{
    if (e.key == `${b.number}`)
    { 
        new Audio("sounds/burst-sound.mp3").play();

        burstX = b.x - 20;
        burstY = b.y - 20;

        // another bomb is painted, with inital coords
        b.deploy(setNumber(), setColor(), setPath);

        score++; 
        if (score > highestScore) highestScore = score;
        highestScoreTag.innerHTML = "Mejor puntuación: " + highestScore;

        // each time a new bomb is created, speed proportionally increases
        if (score > 0)
        {

            b.speedX *= (1 + score/10);
            b.speedY *= (1 + score/10);
        }
    }
});