class Agent {
  constructor() {
    this.vector = createVector(random(width), random(height));
    this.vectorOld = this.vector.copy();
    this.stepSize = random(1, 5);
    this.isOutside = false;
    this.angle;
  }

  update(strokeWidth) {
    this.vector.x += cos(this.angle) * this.stepSize;
    this.vector.y += sin(this.angle) * this.stepSize;
    this.isOutside = this.vector.x < 0 || this.vector.x > width || this.vector.y < 0 || this.vector.y > height;
    if (this.isOutside) {
      this.vector.set(random(width), random(height));
      this.vectorOld = this.vector.copy();
    }

    strokeWeight(strokeWidth * this.stepSize);
    line(this.vectorOld.x, this.vectorOld.y, this.vector.x, this.vector.y);
    this.vectorOld = this.vector.copy();
    this.isOutside = false;
  }

  set_angle(angleMode, noiseScale, noiseStrength) {
    switch (angleMode) {
      case 1:
        this.angle = noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * noiseStrength;
        break;
      case 2:
        this.angle = noise(this.vector.x / noiseScale, this.vector.y / noiseScale) * 24;
        this.angle = (this.angle - floor(this.angle)) * noiseStrength;
        break;
      case 3:
        this.angle = radians(random(360));
        break;
    }
  }

  set_stroke(drawMode, tileScheme, colorScheme, center) {

    let color1 = colorScheme[0];
    let color2 = colorScheme[1];

    let tile1 = tileScheme[0];
    let tile2 = tileScheme[1];

    let cx = center[0];
    let cy = center[1];

    let x = this.vector.x;
    let y = this.vector.y;

    let tmp1;
    let tmp2;

    switch (drawMode) {
      case 1:
        // rectangles
        tmp1 = floor(map(x, 0, width, 0, tile1)) % 2;
        tmp2 = floor(map(y, 0, height, 0, tile2)) % 2;
        if ((tmp1 + tmp2) % 2 == 0) {
          stroke(color1);
        } else {
          stroke(color2);
        }
        break;
      case 2:
        // radial circle
        tmp1 = sqrt((x - cx)*(x - cx) + (y - cy)*(y - cy))
        tmp2 = floor(map(tmp1, 0, width, 0, tile1)) % 2;
        if (tmp2 == 0) {
          stroke(color1);
        } else {
          stroke(color2);
        }
        break;
      case 3:
        // angular circle
        if (((x - cx)*(x - cx) + (y - cy)*(y - cy)) > width/20) {
          tmp1 = degrees(atan2(y-cy, x-cx));
          tmp2 = floor(map(tmp1, -180, 180, 0, tile1)) % 2;
          if (tmp2 == 0) {
            stroke(color1);
          } else {
            stroke(color2);
          }
        } else {
          noStroke();
        }
        break;
      case 0:
        noStroke();
        break;
    }
  }
}


