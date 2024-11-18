class Square {
    constructor(x, y, width, height,img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.img = new Image();
        this.img.src = img;
    }

    startDrag(mouseX, mouseY) {
        this.isDragging = true;
        this.startX = this.x + this.width / 2;
        this.startY = this.y + this.height / 2;
    }

    drag(mouseX, mouseY) {
        this.endX = mouseX;
        this.endY = mouseY;
    }

    endDrag(mouseX, mouseY) {
        // Calculate velocity based on the distance and direction from mouse to square
        let dx = mouseX - (this.x + this.width/2);  // Reversed the subtraction order
        let dy = mouseY - (this.y + this.height/2);  // Reversed the subtraction order
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        this.vx = (dx / distance) * Math.min(distance/10, 20);
        this.vy = (dy / distance) * Math.min(distance/10, 20);
        this.isDragging = false;
    }

    update(canvas) {
        if (!this.isDragging) {
            this.x += this.vx;
            this.y += this.vy;
    
            this.vx *= 0.98;
            this.vy *= 0.98;
    
            // Collision detection with canvas boundaries
            if (this.x < 0) {
                this.x = 0;
                this.vx = -this.vx;
                bounceSound.play();
            }
            if (this.x + this.width > canvas.width) {
                this.x = canvas.width - this.width;
                this.vx = -this.vx;
                bounceSound.play();
            }
            if (this.y < 0) {
                this.y = 0;
                this.vy = -this.vy;
                bounceSound.play();
            }
            if (this.y + this.height > canvas.height) {
                this.y = canvas.height - this.height;
                this.vy = -this.vy;
                bounceSound.play();
            }
        }
    }

    draw(ctx) {
        if (this.isDragging) {
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.endX, this.endY);
            ctx.stroke();
            ctx.setLineDash([]);
        }
        if (this.img.complete) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
    collidesWith(other) {
        // Check if the other object is a ScoreZone
        if (other instanceof ScoreZone) {
            // Only check for intersection, no physics response
            return (this.x < other.x + other.width &&
                    this.x + this.width > other.x &&
                    this.y < other.y + other.height &&
                    this.y + this.height > other.y);
        }

        // First check if there's a collision
        if (!(this.x < other.x + other.width &&
              this.x + this.width > other.x &&
              this.y < other.y + other.height &&
              this.y + this.height > other.y)) {
            return false;
        }

        // Calculate collision response for non-ScoreZone objects
        const overlapX = Math.min(
            this.x + this.width - other.x,
            other.x + other.width - this.x
        );
        const overlapY = Math.min(
            this.y + this.height - other.y,
            other.y + other.height - this.y
        );

        // Determine collision side (smallest overlap)
        if (overlapX < overlapY) {
            // Horizontal collision
            if (this.x < other.x) {
                this.x = other.x - this.width;
            } else {
                this.x = other.x + other.width;
            }
            this.vx = -this.vx * 0.8; // Bounce with dampening
            bounceSound.play();
        } else {
            // Vertical collision
            if (this.y < other.y) {
                this.y = other.y - this.height;
            } else {
                this.y = other.y + other.height;
            }
            this.vy = -this.vy * 0.8; // Bounce with dampening
            bounceSound.play();
        }

        return true;
    }
}