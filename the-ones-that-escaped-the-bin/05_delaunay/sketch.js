// DELAUNAY

/**
 * delaunay triangles are used to color an image. The triangles
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
 * n                   : generate new triangles
 * s                   : save png
 */


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

  npoints = random(1000, 20000);
  threshold = random(0.2, 0.8);
  lightMode = floor(random(2));

  const points = gen_points();

  // Delaunay
  const delaunay = Delaunator.from(points);

  draw_triangles(delaunay.triangles, points);
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


function draw_triangles(triangles, points) {
  for (let i = 0; i < triangles.length; i += 3) {
    let p0 = points[triangles[i]];
    let p1 = points[triangles[i+1]];
    let p2 = points[triangles[i+2]];
    let center = circumcenter(p0, p1, p2);

    let x = constrain(int(center[0]), 0, img.width);
    let y = constrain(int(center[1]), 0, img.height);
    let c = get_color(x, y);
    
    fill(c);
    stroke(c);
    triangle(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]);
  }
}


function circumcenter(a, b, c) {
  const ad = a[0] * a[0] + a[1] * a[1];
  const bd = b[0] * b[0] + b[1] * b[1];
  const cd = c[0] * c[0] + c[1] * c[1];
  const D = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  return [
      1 / D * (ad * (b[1] - c[1]) + bd * (c[1] - a[1]) + cd * (a[1] - b[1])),
      1 / D * (ad * (c[0] - b[0]) + bd * (a[0] - c[0]) + cd * (b[0] - a[0])),
  ];
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
