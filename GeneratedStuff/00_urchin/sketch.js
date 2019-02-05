// URCHIN

/**
 * noisy agents moving in two-dimensional space.
 *
 * KEYS
 * s                   : save png
 */

'use strict';

let agents = [];
let drawMode;
let colorScheme;
let agentCount;
let overlayAlpha;
let agentAlpha;
let strokeWidth;
let noiseScale;
let noiseStrength;


function setup() {
  createCanvas(1000, 600);
  background(0, 255);

  drawMode = floor(random(1, 4));
  colorScheme = floor(random(1, 6));
  
  agentCount = 5000;
  overlayAlpha = 0;
  strokeWidth = 0.1;

  if (drawMode == 1) {
    // drawMode 1
    agentAlpha = (x2, y2) => map(x2 + y2, 0, height*height/8, 0, 255);
    noiseScale = 50.0;
    noiseStrength = 15.0;
  } else if (drawMode == 2) {
    // drawMode 2
    agentAlpha = (x2, y2) => map(x2 + y2, 0, height*height/8, 0, 255);
    noiseScale = 100.0;
    noiseStrength = 75.0;
  } else if (drawMode == 3) {
    // drawMode 3
    agentAlpha = (x2, y2) => 220;
    noiseScale = 10.0;
    noiseStrength = 1.0;
  }

  for (let i = 0; i < agentCount; i++) {
    agents[i] = new Agent();
  }
}


function draw() {
  background(0, overlayAlpha);

  if (frameCount % 500 == 0) {
    let newNoiseSeed = floor(random(10000));
    noiseSeed(newNoiseSeed);
  }

  translate(width/2, height/2);

  for (let i = 0; i < agentCount; i++) {
    agents[i].update(colorScheme, agentAlpha, strokeWidth, noiseScale, noiseStrength);
  }
}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(timestamp(), 'png');
}
