// TMP

/**
 * lines interacting with obstacles in two-dimensional space.
 *
 * KEYS
 * s                   : save png
 */

'use strict';


let obstacles = [];
let lines = [];

let drawMode;
let colorMode;
let obstacleMode;

let obstacleCount;
let lineCount;
let maxPhases;


function setup() {
  createCanvas(windowWidth, windowHeight);

  // Set modes
  drawMode = random() < 0.5 ? 0 : 1;
  colorMode = random() < 0.5 ? 0 : 1;
  obstacleMode = random() < 0.5 ? 0 : 1;

  // Set colors
  let lineColor;
  if (colorMode == 0) {
    background(0);
    lineColor = 255;
  } else {
    background(255);
    lineColor = 0;
  }

  // Set draw parameters
  let minSize, maxSize;
  if (drawMode == 0) {
    obstacleCount = floor(random(1, 10));
    lineCount = floor(random(500, 1000));
    maxPhases = floor(random(1, 10));
    minSize = 100;
    maxSize = 250;
  } else {
    obstacleCount = floor(random(10, 100));
    lineCount = floor(random(100, 500));
    maxPhases = floor(random(4, 16));
    minSize = 10;
    maxSize = 50;
  }

  // Create obstacles
  for (let i = 0; i < obstacleCount; i++) {
    obstacles[i] = new Obstacle(random(minSize, maxSize));
  }

  // Create lines
  for (let i = 0; i < lineCount; i++) {
    lines[i] = new Line();
    lines[i].linecol = lineColor;
  }
};


function draw() {
  for (let i = 0; i < lineCount; i++) {
    let phase = lines[i].phase; 
    let inside = checkInside(obstacleMode, lines[i]);

    // Set line alpha
    if (inside) {
      if (phase == 1) {
        lines[i].alpha = 0;
      } else if (phase == 2) {
        lines[i].alpha = 255;
      }
    } else {
      if (phase == 1) {
        lines[i].alpha = 255;
      } else if (phase == 2) {
        lines[i].alpha = 0;
      }
    }

    // Update line
    lines[i].update()

  }
};


function checkInside(obstacleMode, _line) {
  let inside = false;
  let xl = _line.pos.x;
  let yl = _line.pos.y;
  for (let i = 0; i < obstacleCount; i++) {
    let xc = obstacles[i].pos.x;
    let yc = obstacles[i].pos.y;

    if (obstacleMode == 0) {
      inside = dist(xl, yl, xc, yc) < obstacles[i].rad*2;
    } else {
      inside = abs(xl - xc) < obstacles[i].rad && abs(yl - yc) < obstacles[i].rad;
    }
    if (inside) {
      break;
    }
  }
  return inside;
};


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(timestamp(), 'png');
};
