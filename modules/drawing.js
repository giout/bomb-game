function drawBackground(canvas, house, landscape)
{
    const context = canvas.getContext('2d');

    context.beginPath();

    // landscape and house
    context.drawImage(landscape, 0, 0, canvas.width, canvas.height);
    context.drawImage(house.img, house.x, house.y, house.width, house.height);

    context.closePath();
}

function drawScoring(canvas, score)
{
    const context = canvas.getContext('2d');
    
    // la coordenada en x del texto que representa el puntaje varia. De esta forma, cuando el puntaje sea de dos cifras, se reducira para que se vea alineado el texto
    // x coord of text that represents game score varies. This wat, when score number is 2 digits, it will be reduced so text looks aligned
    let textX = 234;
    if (score > 9) textX = 230;

    context.beginPath();
    context.fillStyle = 'green';
    context.rect(215, 435, 50, 50);
    context.fill();
    context.closePath();

    context.beginPath();
    context.fillStyle = 'white';
    context.font = "20px Arial";
    context.fillText(score, textX, 465);
    context.fill();
    context.closePath();
}

function drawBomb(canvas, bomb)
{
    const context = canvas.getContext('2d');

    // bomb is drawn
    context.fillStyle = bomb.color,
    context.arc(bomb.x, bomb.y, bomb.size, 0, Math.PI*2, true);
    context.fill();

    // number is drawn sticked to bomb
    context.fillStyle = 'white'; 
    context.font = '20px Arial'
    context.fillText(`${bomb.number}`, bomb.x - 5, bomb.y + 5);
}

function drawBurst(canvas, burst, x, y)
{
    const context = canvas.getContext('2d');

    context.beginPath();
    context.drawImage(burst, x, y, 60, 60);
    context.closePath();
}

export {drawBackground, drawScoring, drawBomb, drawBurst}