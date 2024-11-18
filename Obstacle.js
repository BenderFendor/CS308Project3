class Obstacle extends Square {
    constructor(x, y, width, height, img) {
        super(x, y, width, height, img);
    }
    
    draw(ctx) {
        if (this.img && this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
}