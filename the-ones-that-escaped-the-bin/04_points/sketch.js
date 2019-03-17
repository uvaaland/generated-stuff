// POINTS

/**
 * points are used to color an image. The points
 * cluster in either light or dark areas.
 *
 * images:
 * source0.jpg - Thiago Schlemper
 * source1.jpg - Ivandrei Pretorius
 * source2.jpg - Úrsula Madariaga
 * source3.jpg - Thaís Sarmento
 * source4.jpg - Ricael Sousa
 * source5.jpg - Myicahel Tamburini
 * source6.jpg - Pixabay
 * source7.jpg - Luis Quintero
 * source8.jpg - Oleksandr Pidvalnyi
 * source9.jpg - Matheus Bertelli
 *
 *
 * KEYS
 * n                   : generate new points
 * s                   : save png
 */

'use strict';

let img;
let npoints;
let threshold;
let lightMode;


function preload() {
  let tmp = floor(random(10));
  img = loadImage("images/source" + tmp + ".jpg");
}


function setup() {
  createCanvas(img.width, img.height);
  background(img.get(0, 0));
  noStroke();
  noFill();

  img.loadPixels();

  npoints = random(40000, 60000);
  threshold = random(0.2, 0.8);
  lightMode = floor(random(2));

  const points = gen_points();

  draw_points(points);
}


function gen_points() {
  let points = [];
  while (points.length < npoints) {
    let x = int(random(img.width));
    let y = int(random(img.height));
    let p = 4*(x + y*img.width);

    let r = img.pixels[p];
    let g = img.pixels[p + 1];
    let b = img.pixels[p + 2];
    let cval = map(r + g + b, 0, 765, 0, 1);

    let condition;

    if (lightMode == 0) {
      condition = cval < threshold;
    } else if (lightMode == 1) {
      condition = cval > threshold;
    }

    if (condition) {
      points.push([x, y]);
    }
  }
  return points;
}


function draw_points(points) {
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0];
    let y = points[i][1];
    let c = get_color(x, y);

    fill(c);
    ellipse(x, y, 2, 2);
  }
}


function get_color(x, y) {
    let p = 4*(x + y*img.width);
    let r = img.pixels[p];
    let g = img.pixels[p + 1];
    let b = img.pixels[p + 2];
    return [r, g, b];
}


function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(timestamp(), 'png');
  if (key == 'n' || key == 'N') setup();
};
