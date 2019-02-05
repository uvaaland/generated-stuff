class Agent {
  constructor() {
    this.vector = createVector(0, 0);
    this.vectorOld = this.vector.copy();
    this.stepSize = random(1, 10)/10;
    this.isOutside = false;
    this.angle = random(360);
    this.radius = height/4 + random(height/4);
    this.xDir = random() < 0.5 ? -1 : 1;
    this.yDir = random() < 0.5 ? -1 : 1;
    this.noise;
  }

  update(colorScheme, agentAlpha, strokeWidth, noiseScale, noiseStrength) {
    this.noise = (2*noise(this.vector.x/noiseScale, this.vector.y/noiseScale) - 1)* noiseStrength;
    this.vector.x += cos(this.angle) * this.stepSize + this.xDir*this.noise;
    this.vector.y += sin(this.angle) * this.stepSize + this.yDir*this.noise;
    this.isOutside = this.vector.x < -width/2 || this.vector.x > width/2 || this.vector.y < -height/2 || this.vector.y > height/2;

    if (this.isOutside) {
      this.vector.set(0, 0);
      this.vectorOld = this.vector.copy();
      this.stepSize = random(1, 10)/10;
      this.angle = random(360);
    }

    let tmp;
    let x2 = (this.vector.x)*(this.vector.x);
    let y2 = (this.vector.y)*(this.vector.y);
    switch (colorScheme) {
      case 1:
        tmp = map(x2 + y2, 0, height*height/4, 0, 255);
        stroke(255, 255-tmp, 0, agentAlpha(x2, y2));
        break;
      case 2:
        tmp = map(x2 + y2, 0, height*height/4, 0, 255);
        stroke(255-tmp, 0, tmp, agentAlpha(x2, y2));
        break;
      case 3:
        tmp = map(x2 + y2, 0, height*height/4, 0, 255);
        stroke(255, tmp, 255-tmp, agentAlpha(x2, y2));
        break;
      case 4:
        tmp = map(x2 + y2, 0, height*height/4, 0, 255);
        stroke(255-tmp, tmp, 0, agentAlpha(x2, y2));
        break;
      case 5:
        tmp = map(x2 + y2, 0, height*height/4, 0, 255);
        stroke(0, 255-tmp, 255, agentAlpha(x2, y2));
        break;
      case 0:
        stroke(0, 0);
        break;
    }
    strokeWeight(strokeWidth * this.stepSize);
    line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
    this.vectorOld = this.vector.copy();
    this.isOutside = false;
  }
}
