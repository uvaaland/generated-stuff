// SQUID

/**
 * noisy agents moving in two-dimensional space.
 *
 * KEYS
 * s                   : save png
 */

'use strict';

let agents = [];

let geoMode;
let stepMode;
let colorMode;
let dotMode;

let n1;
let n2;
let agentCount;

const colors = [
  [200, 0, 0],
  [0, 200, 0],
  [0, 0, 200],
  [200, 200, 0],
  [200, 0, 200],
  [0, 200, 200],
  [200, 200, 200],
];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 255);

  noStroke();

  geoMode = floor(random(1, 3));
  stepMode = floor(random(1, 3));
  colorMode = floor(random(1, 5));
  dotMode = floor(random(1, 4));

  if (geoMode == 1) {
    n1 = floor(random(1, 50));
    n2 = floor(random(1, n1));
  } else if (geoMode == 2) {
    n2 = floor(random(10, 50));
    n1 = floor(random(10, n2));
  }

  agentCount = n1*n2;

  let d1, d2;
  let stepSize, dotColor, dotSize;

  if (geoMode == 1) {
    d1 = width/(n1 + 1);
    d2 = height/(n2 + 1);
    stepSize = 0.0;
  } else if(geoMode == 2) {
    d1 = 3*width/(4*(n1 + 1));
    d2 = 360/n2;
    stepSize = 0.002;
  }

  let x, y;
  let idx, c1, c2;

  idx = randomIndex(0, colors.length - 1, -1);
  c1 = color(colors[idx]);
  idx = randomIndex(0, colors.length - 1, idx);
  c2 = color(colors[idx]);

  for (let i = 0; i < n1; i++){
    if (stepMode == 2 && colorMode != 3) {
      stepSize = -stepSize;
    }
    for (let j = 0; j < n2; j++) {
      if (geoMode == 1) {
        x = (i+1)*d1;
        y = (j+1)*d2;
        dotSize = height/(4*n1);
      } else if (geoMode == 2) {
        x = ((i+1)*d1)*cos(radians(j*d2));
        y = ((i+1)*d1)*sin(radians(j*d2));
        dotSize = 5 + (i+1)*d1/50;
      }

      if (colorMode == 1) {
        dotColor = c1;
      } else if (colorMode == 2) {
        dotColor = lerpColor(c1, c2, i % 2);
      } else if (colorMode == 3) {
        dotColor = lerpColor(c1, c2, j % 2);
      } else if (colorMode == 4) {
        if (geoMode == 1) {
          dotColor = color(colors[floor(random(colors.length))]);
        } else if (geoMode == 2) {
          dotColor = lerpColor(c1, c2, 2*(i+1)*d1/width);
        }
      }
      agents[i*n2 + j] = new Agent(x, y, stepSize, dotMode, dotColor, dotSize);
    }
  }
};


function draw() {
  background(0, 255);

  if (geoMode == 2) {
    translate(width/2, height/2);
  }

  for (let i = 0; i < agentCount; i++) {
    agents[i].update();
  }
};


function randomIndex(min, max, except) {
  let num = floor(random() * (max - min + 1)) + min;
  return (num == except) ? randomIndex(min, max, except) : num;
};


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(timestamp(), 'png');
};
