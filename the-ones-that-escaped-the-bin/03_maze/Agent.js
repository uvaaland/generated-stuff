class Obstacle {
  constructor(radius) {
    this.rad = radius;
    this.pos = createVector(random(width), random(height))
  }
}

class Line {
  constructor() {
    this.pos = createVector(0, random(height));
    this.posOld = this.pos.copy();
    this.vel = createVector(1, 0);
    this.phase = 1;
    this.phaseCount = 0;
    this.weight = random();
    this.linecol;
    this.alpha;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.x > width) {
      this.pos = createVector(random(width), 0);
      this.posOld = this.pos.copy();
      this.vel = createVector(0, 1);
      this.alpha = 0;
      this.phase = 2;
      this.phaseCount++;
    } else if (this.pos.y > height) {
      this.pos = createVector(0, random(height));
      this.posOld = this.pos.copy();
      this.vel = createVector(1, 0);
      this.alpha = 255;
      this.phase = 1;
      this.phaseCount++;
    }

    if (this.phaseCount < maxPhases) {
      stroke(this.linecol, this.alpha);
      strokeWeight(this.weight);
      line(this.posOld.x, this.posOld.y, this.pos.x, this.pos.y);
      this.posOld = this.pos.copy();
    }

  }
}
