var gl;
var points;

let x = 0.0;
let y = 0.0;
let xLoc, yLoc;

let xDir = 1.0;
let yDir = 1.0;

let dirs = [null, null]; // horizontal, vertical

function getRandomArbitrary(min, max) { 
  return Math.random() * (max - min) + min;
}

function render() {

    // if (dirs[0] === true) // move right 
    //     x += 0.01;
    // else if (dirs[0] === false) // move left 
    //     x -= 0.01;
    // if (dirs[1] === true) // move up 
    //     y += 0.01;
    // else if (dirs[1] === false) // move down 
    //     y -= 0.01;

    x += 0.05 * xDir; 
    y += 0.1 * yDir;

    if (y > 0.9) { // top hit -- reverse y but keep x y = 0.9;
      yDir *= -1.0;
    }
    if (x > 0.9) { // right hit -- reverse x but keep y
      x = 0.9;
      xDir *= -1.0;
    }
    if (y < -0.9) {
      y = -0.9;
      yDir *= -1.0;
    }
    if (x < -0.9) {
      x = -0.9;
      xDir *= -1.0;
    }


    gl.uniform1f(xLoc, x);
    gl.uniform1f(yLoc, y);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    setTimeout(function() {
      window.requestAnimationFrame(render);
    }, 100);

  }


window.onload = function init() {
    // Setup our canvas and WebGL
    var canvas = document.getElementById('gl-canvas');
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert('WebGL unavailable'); }
    // Triangle vertices
    var vertices = [
      vec2(-0.25, -0.25),
      vec2(0, 0.25),
      vec2(0.25, -0.25)
    ];

    // configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    // load and initialize shaders
    var program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    xLoc = gl.getUniformLocation(program, "x");
    yLoc = gl.getUniformLocation(program, "y");

    // load data into GPU
    var bufferID = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    // set position and render
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    render();

    window.addEventListener( "keydown",
        function (e) {
        console.log("Key: " + e.key);

        if (e.key == 'ArrowLeft') {
            dirs[0] = false;
          } else if (e.key == 'ArrowRight') {
            dirs[0] = true;
          } else if (e.key == 'ArrowUp') {
            dirs[1] = true;
          } else if (e.key == 'ArrowDown') {
            dirs[1] = false;
          } else if (e.key == 'Space') {
            dirs[0] = null;
            dirs[1] = null;
          }


        },false );

       
  };

  