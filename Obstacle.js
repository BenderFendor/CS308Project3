class Obstacle extends Square {
    constructor(x, y, width, height, imgSrc) {
        super(x, y, width, height, imgSrc);
    }

    draw(ctx) {
        if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
            const pattern = ctx.createPattern(this.img, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}