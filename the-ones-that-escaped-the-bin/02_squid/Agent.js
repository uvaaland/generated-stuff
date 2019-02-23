class Agent {
  constructor(x ,y, stepSize, dotMode, dotColor, dotSize) {
    // Position
    this.vector = createVector(x, y);
    this.stepSize = stepSize;
    this.radius = sqrt(x*x + y*y);
    this.angle = atan2(y, x);

    // Dots
    this.dotMode = dotMode;
    this.size = dotSize;
    this.color = dotColor;
    this.rate = random();
    this.noise;
    this.alpha;
  }

  update() {
    this.angle += this.stepSize;
    this.vector.x = this.radius * cos(this.angle);
    this.vector.y = this.radius * sin(this.angle);

    this.noise = noise(0.02*frameCount, 0.03*frameCount);
    let rad = radians(this.rate*frameCount);
    let size = this.size * (1 + cos(rad) + this.noise);
    this.alpha = map(size, this.size/4, this.size, 0, 255);

    this.drawAgent(size);
  }

  drawAgent(size) {
    this.color.setAlpha(this.alpha);
    fill(this.color);
      ellipse(this.vector.x, this.vector.y, size, size);
    
    if (this.dotMode == 2) {
      fill(color(0,255));
      ellipse(this.vector.x, this.vector.y, size*0.65, size*0.65);
    } else if (this.dotMode == 3) {
      fill(color(0,255));
      rect(this.vector.x, this.vector.y, size*0.5, size*0.5);
    }
  }
}
