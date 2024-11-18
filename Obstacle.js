class Obstacle extends Square {
    constructor(x, y, width, height) {
        super(x, y, width, height, 'gray');
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}