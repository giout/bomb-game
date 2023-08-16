// prototipo de la bomba
export class Bomb
{
    constructor()
    {
        this.number;
        this.size = 25;
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY =  0;
        this.color;
    }

    deploy(number, color, changePath)
    {
        this.number = number;
        this.color = color;
        changePath(this);
    }
}