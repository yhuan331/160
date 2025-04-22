
// ColoredPoint.js (c) 2012 matsuda

// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix; 
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix *  a_Position;
  }`;


// Fragment shader program
var FSHADER_SOURCE =  `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`;
  
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
let u_GlobalRotateMatrix;

function setupWebGL() {
    canvas = document.getElementById('webgl');
    gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
    if (!gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
    }
   gl.enable (gl.DEPTH_TEST);
  }


function connectVariablesToGLSL() {
    // Initialize shaders and compile the program
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }
  
    // // Get the storage location of a_Position
     a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
    }
  
    // Get the storage location of u_FragColor
     u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
      console.log('Failed to get the storage location of u_FragColor');
      return;
    }

    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (! u_ModelMatrix) {
      console.log('Failed to get the storage location of u_ModelMatrix');
      return;
    }

    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if (!u_GlobalRotateMatrix) {
      console.log('Failed to get the storage location of u_GlobalRotateMatrix');
      return;
    }
     
    var identityM = new Matrix4();
    gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  

}


const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

//globals related UI elements 
let g_selectColor = [1.0, 1.0, 1.0, 1.0]; // Default color is white
let g_selectedSize = 5;
let g_selectedType = POINT; // Default is point
let g_selectedSegments = 10; 

let g_globalAngle = 0;
let g_yellowAngle = 0;
let g_magentaAngle = 0;
let g_yellowAnimation = false; 
let g_magentaAnimation = false;

 

function addActionForHtmlUI() {
  document.getElementById("animationYellowOnButton").onclick = function() { g_yellowAnimation = true; };
  document.getElementById("animationYellowOffButton").onclick = function() { g_yellowAnimation = false; };

  document.getElementById("animationMagentaOnButton").onclick = function() { g_magentaAnimation = true; };
  document.getElementById("animationMagentaOffButton").onclick = function() { g_magentaAnimation = false; };


  //----- slides --------
  document.getElementById("angleSlide").addEventListener('mousemove', function() {
    g_globalAngle = this.value;
    renderAllShapes();
  });

  document.getElementById("yellowSlide").addEventListener('mousemove', function() {
    g_yellowAngle = this.value;
    renderAllShapes();
  });
  
  document.getElementById("magentaSlide").addEventListener('mousemove', function() {
    g_magentaAngle = this.value;
    renderAllShapes();
  });
  }

function main() {

  //call funtion to setup webgl
  setupWebGL()
  connectVariablesToGLSL()

  addActionForHtmlUI();
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  //canvas.onmousemove = click;
  canvas.onmousemove = function(ev) {if (ev.buttons == 1) {click(ev);}}; // if left button is pressed, call click function

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  //gl.clear(gl.COLOR_BUFFER_BIT);
   //renderAllShapes();
  requestAnimationFrame(tick);
}

var g_startTime = performance.now()/1000.0 ;
var g_seconds = performance.now()/1000.0 - g_startTime;

function click(ev) {} 

function tick () {
  g_seconds = performance.now()/1000.0 - g_startTime; 
  updateAnimationAngle();
  renderAllShapes();
  requestAnimationFrame(tick);
}

function updateAnimationAngle(){
  if (g_yellowAnimation){
    g_yellowAngle =  (45*Math.sin(g_seconds));
  }
  if (g_magentaAnimation){
    g_magentaAngle =  (45*Math.sin(3*g_seconds));
  }

}
 // Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check the time at the start of this function
  var startTime = performance.now();

  // Pass the matrix to u_ModelMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the body cube (red)
  var body = new Cube();
  body.color = [1.0, 0.0, 0.0, 1.0];
  body.matrix.translate(-.25, -0.75, 0.0);
  body.matrix.rotate(-5, 1, 0, 0);
  body.matrix.scale(0.5, 0.3, 0.5);
  body.render();

  // Draw a left arm (yellow)
  // AKA var yellow = new cube;
  var leftArm = new Cube();
  leftArm.color = [1, 1, 0, 1];
  leftArm.matrix.setTranslate(0, -0.5, 0.0);
  leftArm.matrix.rotate(-5, 1, 0, 0);

  leftArm.matrix.rotate(-g_yellowAngle, 0, 0,1);

  var yellowCoordinatesMat = new Matrix4 (leftArm.matrix); 
  leftArm.matrix.scale(0.25, 0.7, 0.5);
  leftArm.matrix.translate(-0.5, 0, 0);
  leftArm.render();

  // Test box (pink)  AKA var magenta = new cube; 
  var box = new Cube();
  box.color = [1, 0, 1, 1];
  box.matrix = yellowCoordinatesMat;
  box.matrix.translate(0, 0.65, 0);
  box.matrix.rotate(g_magentaAngle, 0, 0, 1);
  box.matrix.scale(0.3, 0.3, 0.3);
  box.matrix.translate(-0.5, 0, -0.001); 
  box.render();

  var k = 10;
  for (var i=1; i<k; i++){
    var c = new Cube();
    c.matrix.translate(-0.8, 1.9*i/k-1.0, 0 );
    c.matrix.rotate (g_seconds * 100, 1,1,1);
    c.matrix.scale(0.1, 0.5/k, 1/k);
    c.render();
  }


  var duration = performance.now() - startTime;
  sendTextToHTML( " ms:" + Math.floor(duration) + "fps:" + Math.floor(1000/duration)/10, "numdot");
}


function sendTextToHTML (text,htmlID){
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
     console.log ("failed to get " + htmlID + "from HTML");
     return;
    }
    htmlElm.innerHTML = text;
}


