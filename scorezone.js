class ScoreZone extends Square {
    constructor(x, y, width, height) {
        super(x, y, width, height, null);
        this.counted = false;
    }

    draw(ctx) {
        // Save the current context state
        ctx.save();
        
        // Set glow effect
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 30;
        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        
        // Draw the score zone
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Reset shadow for additional drawing
        ctx.shadowBlur = 0;
        
        // Add border for better visibility
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        
        // Restore the context to its original state
        ctx.restore();
    }
}