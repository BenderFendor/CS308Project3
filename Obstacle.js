class Obstacle {
    constructor(x, y, width, height, imgSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = imgSrc;
    }

    draw(ctx) {
        if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
            const pattern = ctx.createPattern(this.img, 'repeat-y');
            ctx.fillStyle = pattern;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        } else {
            ctx.fillStyle = 'gray'; // This was the pre texture function
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}