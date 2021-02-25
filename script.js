let pixelCount = 144;
let canvasWidth = 144 * 4;
let canvasHeight = 10;
let pixelWidth = Math.round(canvasWidth / pixelCount);
let pixelHeight = canvasHeight;
let timing=0.1;
let waveCount=10;
let currentPixel = 0;
let currentContext;

function interval(ms) {
  
}

function time(interval) {
  return (performance.now() % (65536 * interval)) / (65536 * interval);
}

function wave(v) {
  return (1 + Math.sin(v * Math.PI * 2)) / 2;
}

// todo: add more waveform functions
// todo: add more render functions

function hsv(h, s, v) {
  currentContext.fillStyle = hsvToRgb(h, s, v);
  currentContext.fillRect(
    pixelWidth * currentPixel,
    0,
    pixelWidth,
    pixelHeight
  );
}

function hsvToRgb(h, s, v) {
  h = h % 1;
  h = h * 6;
  let i = Math.floor(h),
    f = h - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s),
    mod = i % 6,
    r = [v, q, p, p, t, v][mod],
    g = [t, v, v, q, p, p][mod],
    b = [p, p, t, v, v, q][mod];

  return `rgb(${(r * 255) | 0}, ${(g * 255) | 0}, ${(b * 255) | 0})`;
}

function addStrip(beforeRenderFn, renderFn) {
  const strip = document.createElement("canvas");
  document.body.appendChild(strip);
  strip.className = "canvas";
  strip.setAttribute("width", canvasWidth + "px");
  strip.setAttribute("height", canvasHeight + "px");

  const ctx = strip.getContext("2d");
  
  // Recompile from source to escape strict mode and let them reference
  // undeclared variables, and add Math to the top of the scope chain.
  // This lets us avoid redeclaring all the math functions/constants.
  beforeRenderFn = Function(
    "with (Math) { return ( " + beforeRenderFn + ")() }"
  );
  renderFn = Function(
    ["index"],
    "with (Math) { return (" + renderFn + ")(index) }"
  );

  function update() {
    currentContext = ctx;
    beforeRenderFn(); // todo: add 'delta'
    for (currentPixel = 0; currentPixel < pixelCount; currentPixel++) {
      renderFn(currentPixel);
    }

    requestAnimationFrame(update);
  }

  update();
}



function init() {
  // Add a bunch of strips!
 let canv= document.querySelectorAll("canvas");
  if(canv.length>0){
    canv.forEach(element => {
      element.remove();
    });
  }
  for (let i = 0; i < waveCount; i++) {
    addStrip(
      delta => {
        hl = pixelCount / 2;
        t = time(0.1);
        v = 0.01 + wave(time(timing));
      },
      index => {
        c1 = 1 - abs(index - hl) / hl;
        hsv(c1 + t, 1, v);
      }
    );
    
   
  }
}
function changeTime(value){
  console.log(value);
  timing=value;
  init();
}
function changeCount(value){
  console.log(value);
  pixelCount=value;
  init();
}
function changeWave(value){
  console.log(value);
  waveCount=value;
  init();
}

init();