// ColoredPoint.js (c) 2012 matsuda

// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    //gl_PointSize = 10.0;
    gl_PointSize = u_Size;
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
let u_Size;

function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = getWebGLContext(canvas);
    if (!gl) {
      console.log('Failed to get the rendering context for WebGL');
      return;
    }
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


    u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    if (!u_Size) {
      console.log('Failed to get the storage location of u_Size');
      return;
    }

}

//globals related UI elements 
let g_selectColor = [1.0, 1.0, 1.0, 1.0]; // Default color is white
let g_selectedSize = 5;

function addActionForHtmlUI() {
  document.getElementById("green").onclick = function() {g_selectColor = [0.0, 1.0, 0.0, 1.0]; };
  document.getElementById("red").onclick = function() {g_selectColor = [1.0, 0.0 , 0.0, 1.0]; };

  document.getElementById('redSlide').addEventListener('mouseup', function() { g_selectColor[0] = this.value/100; });
  document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectColor[1] = this.value/100; });
  document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selectColor[2] = this.value/100; });

  document.getElementById ('sizeSlide').addEventListener('mouseup', function() {g_selectedSize = this.value;});
}
function main() {

  //call funtion to setup webgl
  setupWebGL()
  connectVariablesToGLSL()

  addActionForHtmlUI();
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}


class Point {
  constructor() {
    this.type = 'point';
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.size = 5.0;
  }
}
var g_shapesList = [];
// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point
// var g_size =[];

function click(ev) {

    let [x,y] = convertCoordinatesEventToGL(ev);

    //creat and store new point
    let point = new Point();
    point.position = [x,y];
    point.color = g_selectColor.slice();
    point.size = g_selectedSize;
    g_shapesList.push(point);

    // g_points.push([x, y]);

    // g_colors.push(g_selectColor.slice());

    // g_size.push(g_selectedSize);


    // Store the coordinates to g_points array
    // if (x >= 0.0 && y >= 0.0) {      // First quadrant
    //   g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
    // } else if (x < 0.0 && y < 0.0) { // Third quadrant
    //   g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
    // } else {                         // Others
    //   g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
    // }
    renderAllShapes();
  }

function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return [x, y];
}

function renderAllShapes() {
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  //var len = g_points.length;

  var len = g_shapesList.length; // The number of vertices
  for(var i = 0; i < len; i++) {
    var xy = g_shapesList[i].position;
    var rgba = g_shapesList[i].color;
    var size = g_shapesList[i].size;
    // var xy = g_points[i];
    // var rgba = g_colors[i];
    // var size = g_size[i];

    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    gl.uniform1f(u_Size, size);
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
