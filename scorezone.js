class ScoreZone extends Square {
    constructor(x, y, width, height) {
        super(x, y, width, height, 'rgba(0, 255, 0, 0.2)');
        this.counted = false;
    }
}