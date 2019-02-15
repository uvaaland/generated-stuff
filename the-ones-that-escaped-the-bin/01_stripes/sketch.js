// TMP

/**
 * noisy agents moving and coloring background pattern
 * in two-dimensional space.
 *
 * KEYS
 * s                   : save png
 */

'use strict';

let agents = [];
let center = [];
let colorScheme = [];
let tileScheme = [];

let drawMode;
let angleMode;

const agentCount = 4000;
const overlayAlpha = 0;
const agentAlpha = 5;
const strokeWidth = 0.5;
const noiseScale = 3000;
const noiseStrength = 30;

const colors = [
  [255, 0, 0, agentAlpha],
  [0, 255, 0, agentAlpha],
  [0, 0, 255, agentAlpha],
  [255, 255, 0, agentAlpha],
  [255, 0, 255, agentAlpha],
  [0, 255, 255, agentAlpha],
];

const tiles = [1, 2, 4, 8, 16, 32, 64, 128];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 255);
  
  drawMode = floor(random(1, 4));
  angleMode = floor(random(1, 4));

  tileScheme[0] = tiles[floor(random(tiles.length))]; 
  tileScheme[1] = tiles[floor(random(tiles.length))]; 

  let colorIndex1 = randomIndex(0, colors.length - 1, -1);
  let colorIndex2 = randomIndex(0, colors.length - 1, colorIndex1);

  colorScheme[0] = color(colors[colorIndex1]);
  colorScheme[1] = color(colors[colorIndex2]);

  center = [random(width), random(height)];

  for (let i = 0; i < agentCount; i++) {
    agents[i] = new Agent();
  }
};


function draw() {
  fill(0, overlayAlpha);
  noStroke();
  rect(0, 0, width, height);

  if (frameCount % 500 == 0) {
    let newNoiseSeed = floor(random(10000));
    noiseSeed(newNoiseSeed);
  }

  // Draw agents
  for (var i = 0; i < agentCount; i++) {
    agents[i].set_stroke(drawMode, tileScheme, colorScheme, center);
    agents[i].set_angle(angleMode, noiseScale, noiseStrength);
    agents[i].update(strokeWidth);
  }
};


function randomIndex(min, max, except) {
  let num = floor(random() * (max - min + 1)) + min;
  return (num == except) ? randomIndex(min, max, except) : num;
};


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(timestamp(), 'png');
};
