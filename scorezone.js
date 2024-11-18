class ScoreZone extends Square {
    constructor(x, y, width, height) {
        super(x, y, width, height, null);  // Pass null since there's no image
        this.counted = false;
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}