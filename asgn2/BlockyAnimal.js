
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
//--- my animal 
let g_jointAngle = 0;
let g_headAnimation = 0;
var gAnimalGlobalRotation = 0; // Camera
var head_animation = 0;
var g_jointAngle2 = 0; // Joint 2
var g_Animation = false; // Joint 2
//---- mouse movement
var g_mouseRotateX = 0;
var g_mouseRotateY = 0;
var g_mouseLastX = null;
var g_mouseLastY = null;
var g_mouseDragging = false;
//------ poke animaiton
var g_pokeAnimation = false;
var g_pokeStartTime = null;



 

function addActionForHtmlUI() {
  // document.getElementById("animationYellowOnButton").onclick = function() { g_yellowAnimation = true; };
  // document.getElementById("animationYellowOffButton").onclick = function() { g_yellowAnimation = false; };

  // document.getElementById("animationMagentaOnButton").onclick = function() { g_magentaAnimation = true; };
  // document.getElementById("animationMagentaOffButton").onclick = function() { g_magentaAnimation = false; };


  //----- slides --------
  document.getElementById("angleSlide").addEventListener('mousemove', function() { g_globalAngle = this.value; renderAllShapes();});
  document.getElementById('joint').addEventListener('mousemove', function() { g_jointAngle = this.value; renderScene();});
  document.getElementById('joint2').addEventListener('mousemove', function() { g_jointAngle2 = this.value; renderScene();});
  document.getElementById("headSlide").addEventListener('mousemove', function() { g_headAnimation = this.value; renderAllShapes();});
  document.getElementById('animate_on').onclick = function() {g_Animation = true;};
  document.getElementById('animate_off').onclick = function() {g_Animation = false;};
  }

  //=== main function ===
function main() {

  setupWebGL()
  connectVariablesToGLSL()

  addActionForHtmlUI();

  canvas.onmousedown = click;

  // canvas.onmousemove = function(ev) {if (ev.buttons == 1) {click(ev);}}; 
  canvas.onmousedown = function(ev) {
    if (ev.shiftKey) {
      g_pokeAnimation = true;
      g_pokeStartTime = performance.now()/1000.0;
    } else {
      g_mouseDragging = true;
      g_mouseLastX = ev.clientX;
      g_mouseLastY = ev.clientY;
    }
  };
  
  
  canvas.onmouseup = function(ev) {
    g_mouseDragging = false;
  };
  
  canvas.onmousemove = function(ev) {
    if (g_mouseDragging) {
      var dx = ev.clientX - g_mouseLastX;
      var dy = ev.clientY - g_mouseLastY;
      g_mouseRotateX += dx * 0.5;  // Sensitivity control
      g_mouseRotateY += dy * 0.5;
      g_mouseLastX = ev.clientX;
      g_mouseLastY = ev.clientY;
      renderAllShapes(); // Redraw immediately after moving mouse
    }
  };
//-------------  

  gl.clearColor(0.5, 0.8, 1.0, 1.0);

  requestAnimationFrame(tick);
}


var g_startTime = performance.now()/1000.0 ;
var g_seconds = performance.now()/1000.0 - g_startTime;

function click(ev) {} 

//====== Tick Function ======
function tick () {
  g_seconds = performance.now()/1000.0 - g_startTime; 

  updateAnimationAngle();

  if (g_pokeAnimation) {
    g_headAnimation = 20 * Math.sin(5 * g_seconds); 
    g_mouseRotateX += 1; 
    if (performance.now()/1000.0 - g_pokeStartTime > 3.0) {
      g_pokeAnimation = false;
      console.log("Poke animation ended.");
    }
  }

  renderAllShapes();
  requestAnimationFrame(tick);
}

//====== Update Animation Angle ======
function updateAnimationAngle(){
  if (g_Animation){
    g_jointAngle =  (10*Math.sin(3*g_seconds));
    g_headAnimation =  (10*Math.sin(g_seconds));
  }
}

//==== render all shapes ====
function renderAllShapes() {
  var startTime = performance.now();

  var globalRotMat = new Matrix4();
  globalRotMat.rotate(g_mouseRotateX, 0, 1, 0); 
  globalRotMat.rotate(g_mouseRotateY, 1, 0, 0); 
  globalRotMat.rotate(g_globalAngle, 0, 1, 0);  

  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  drawAnimal(); 

  var duration = performance.now() - startTime; // <-- THEN measure time

  // Protect against divide-by-zero
  if (duration > 0) {
    let fps = Math.floor(1000/duration * 10) / 10;
    sendTextToHTML("fps: " + fps, "numdot");
  } 
}

 


// ====== Send Text to HTML ======
function sendTextToHTML (text,htmlID){
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
     console.log ("failed to get " + htmlID + "from HTML");
     return;
    }
    htmlElm.innerHTML = text;
}


