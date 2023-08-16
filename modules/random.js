function randomInteger(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function setNumber()
{
    return randomInteger(0,9);
}

function setColor()
{
    const colors = ['teal', 'orange', 'red', 'brown', 'chocolate', 'crimson', 'darkslateblue', 'darksalmon', 'purple', 'yellowgreen'];

    let i = randomInteger(0, colors.length-1);

    return colors[i];

}

// random path for bomb (4 are possible)
function setPath(bomb)
{
    let number = randomInteger(1,4);
    
    switch(number)
    {
        case 1:
            bomb.x = 350;
            bomb.y = -bomb.size;
            bomb.speedX = -0.3;
            bomb.speedY = 1;
            break;
        case 2:
            bomb.x = 500;
            bomb.y = -bomb.size;
            bomb.speedX = -0.7;
            bomb.speedY = 1;
            break;
        case 3:
            bomb.x = 150;
            bomb.y = -bomb.size;
            bomb.speedX = 0.2;
            bomb.speedY = 1;
            break;
        default: 
            bomb.x = 0;
            bomb.y = -bomb.size;
            bomb.speedX = 0.7;
            bomb.speedY = 1;
            break;
    }
}

export {setNumber, setColor, setPath}