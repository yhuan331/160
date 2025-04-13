// // ColoredPoint.js (c) 2012 matsuda

// // Vertex shader program
// var VSHADER_SOURCE = `
//   attribute vec4 a_Position;
//   uniform float u_Size;
//   void main() {
//     gl_Position = a_Position;
//     //gl_PointSize = 10.0;
//     gl_PointSize = u_Size;
//   }`;


// // Fragment shader program
// var FSHADER_SOURCE =  `
//   precision mediump float;
//   uniform vec4 u_FragColor;
//   void main() {
//     gl_FragColor = u_FragColor;
//   }`;
  
// let canvas;
// let gl;
// let a_Position;
// let u_FragColor;
// let u_Size;

// function setupWebGL() {
//     // Retrieve <canvas> element
//     canvas = document.getElementById('webgl');

//     // Get the rendering context for WebGL
//     //gl = getWebGLContext(canvas);
//     gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
//     if (!gl) {
//       console.log('Failed to get the rendering context for WebGL');
//       return;
//     }
//   }


// function connectVariablesToGLSL() {
//     // Initialize shaders and compile the program
//     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//       console.log('Failed to intialize shaders.');
//       return;
//     }
  
//     // // Get the storage location of a_Position
//      a_Position = gl.getAttribLocation(gl.program, 'a_Position');
//     if (a_Position < 0) {
//       console.log('Failed to get the storage location of a_Position');
//       return;
//     }
  
//     // Get the storage location of u_FragColor
//      u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
//     if (!u_FragColor) {
//       console.log('Failed to get the storage location of u_FragColor');
//       return;
//     }


//     u_Size = gl.getUniformLocation(gl.program, 'u_Size');
//     if (!u_Size) {
//       console.log('Failed to get the storage location of u_Size');
//       return;
//     }

// }

// // const POINT = 0;
// // const TRIANGLE = 1;

// //globals related UI elements 
// let g_selectColor = [1.0, 1.0, 1.0, 1.0]; // Default color is white
// let g_selectedSize = 5;
// // let g_selectedType = POINT; // Default is point

// function addActionForHtmlUI() {
//   document.getElementById("green").onclick = function() {g_selectColor = [0.0, 1.0, 0.0, 1.0]; };
//   document.getElementById("red").onclick = function() {g_selectColor = [1.0, 0.0 , 0.0, 1.0]; };

//   document.getElementById('redSlide').addEventListener('mouseup', function() { g_selectColor[0] = this.value/100; });
//   document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectColor[1] = this.value/100; });
//   document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selectColor[2] = this.value/100; });

//   document.getElementById ('sizeSlide').addEventListener('mouseup', function() {g_selectedSize = this.value;});

//   document.getElementById ('clearButton').onclick = function() {g_shapesList = []; renderAllShapes();};
  
//   // document.getElementById ('pointButton').onclick = function() {g_selectedType = POINT};
//   // document.getElementById ('triangleButton').onclick = function() {g_selectedType = TRIANGLE};
// }


// function main() {

//   //call funtion to setup webgl
//   setupWebGL()
//   connectVariablesToGLSL()

//   addActionForHtmlUI();
//   // Register function (event handler) to be called on a mouse press
//   canvas.onmousedown = click;
//   //canvas.onmousemove = click;
//   canvas.onmousemove = function(ev) {if (ev.buttons == 1) {click(ev);}}; // if left button is pressed, call click function

//   // Specify the color for clearing <canvas>
//   gl.clearColor(0.0, 0.0, 0.0, 1.0);

//   // Clear <canvas>
//   gl.clear(gl.COLOR_BUFFER_BIT);
// }




// var g_shapesList = [];
// // var g_points = [];  // The array for the position of a mouse press
// // var g_colors = [];  // The array to store the color of a point
// // var g_size =[];

// function click(ev) {

//     let [x,y] = convertCoordinatesEventToGL(ev);
//     let point = new Point(); // Create a new point object
//     //creat and store new point
//     // let point;
//     // if (g_selectedType == POINT) {
//     //   point = new Point();
//     // } else {
//     //   point = new Triangle();
//     // }


//     point.position = [x,y];
//     point.color = g_selectColor.slice();
//     point.size = g_selectedSize;
//     g_shapesList.push(point);

//     // g_points.push([x, y]);

//     // g_colors.push(g_selectColor.slice());

//     // g_size.push(g_selectedSize);


//     // Store the coordinates to g_points array
//     // if (x >= 0.0 && y >= 0.0) {      // First quadrant
//     //   g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
//     // } else if (x < 0.0 && y < 0.0) { // Third quadrant
//     //   g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
//     // } else {                         // Others
//     //   g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
//     // }
//     renderAllShapes();
//   }

// function convertCoordinatesEventToGL(ev) {
//   var x = ev.clientX; // x coordinate of a mouse pointer
//   var y = ev.clientY; // y coordinate of a mouse pointer
//   var rect = ev.target.getBoundingClientRect();

//   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
//   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

//   return [x, y];
// }

// function renderAllShapes() {
//   var startTime = performance.now();
//   // Clear <canvas>
//   gl.clear(gl.COLOR_BUFFER_BIT);

//   //var len = g_points.length;

//   var len = g_shapesList.length; // The number of vertices
//   for(var i = 0; i < len; i++) {
//     g_shapesList[i].render();
//   }

//   var duration = performance.now() - startTime;
//   sendTextToHTML("numdot:" + len + " ms:" + Math.floor(duration) + "fps:" + Math.floor(1000/duration)/10, "numdot");
// }

// function sendTextToHTML (text,htmlID){
//     var htmlElm = document.getElementById(htmlID);
//     if (!htmlElm) {
//      console.log ("failed to get " + htmlID + "from HTML");
//      return;
//     }
//     htmlElm.innerHTML = text;
// }




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
    //gl = getWebGLContext(canvas);
    gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
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


const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

//globals related UI elements 
let g_selectColor = [1.0, 1.0, 1.0, 1.0]; // Default color is white
let g_selectedSize = 5;
let g_selectedType = POINT; // Default is point
let g_selectedSegments = 10; 
let g_sprayMode = false; // spray mode toggle



function addActionForHtmlUI() {
  document.getElementById("green").onclick = function() {g_selectColor = [0.0, 1.0, 0.0, 1.0]; };
  document.getElementById("red").onclick = function() {g_selectColor = [1.0, 0.0 , 0.0, 1.0]; };

  document.getElementById('redSlide').addEventListener('mouseup', function() { g_selectColor[0] = this.value/100; });
  document.getElementById('greenSlide').addEventListener('mouseup', function() { g_selectColor[1] = this.value/100; });
  document.getElementById('blueSlide').addEventListener('mouseup', function() { g_selectColor[2] = this.value/100; });

  document.getElementById ('sizeSlide').addEventListener('mouseup', function() {g_selectedSize = this.value;});

  document.getElementById ('clearButton').onclick = function() {g_shapesList = []; renderAllShapes();};
  document.getElementById ('undo').onclick = function() {g_shapesList.pop(); renderAllShapes();};
  document.getElementById("sprayButton").onclick = function () {
    g_sprayMode = !g_sprayMode; // toggle on/off
    sendTextToHTML(g_sprayMode ? "Spray mode ON" : "Spray mode OFF", "numdot");
  };


  document.getElementById ('pointButton').onclick = function() {g_selectedType = POINT; g_sprayMode = false;};
  document.getElementById ('triangleButton').onclick = function() {g_selectedType = TRIANGLE;g_sprayMode = false;};
  document.getElementById ('circleButton').onclick = function() {g_selectedType = CIRCLE; g_sprayMode = false;};

  document.getElementById('segmentSlide').addEventListener('mouseup', function() {g_selectedSegments = this.value;});
  document.getElementById("drawTreeScene").onclick = function () {
    drawTreeScene();
  };
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
  gl.clear(gl.COLOR_BUFFER_BIT);
}



var g_shapesList = [];
// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point
// var g_size =[];

function click(ev) {
  let [x, y] = convertCoordinatesEventToGL(ev);

  // ✅ Handle Spray Mode first
  if (g_sprayMode) {
    for (let i = 0; i < 10; i++) {
      let dx = (Math.random() - 0.5) * 0.05;
      let dy = (Math.random() - 0.5) * 0.05;

      let p = new Point();
      p.position = [x + dx, y + dy];
      p.color = g_selectColor.slice();
      p.size = g_selectedSize;
      g_shapesList.push(p);
    }

    renderAllShapes();
    return; 
  }

  let point;
  if (g_selectedType == POINT) {
    point = new Point();
  } else if (g_selectedType == TRIANGLE) {
    point = new Triangle();
  } else if (g_selectedType == CIRCLE) {
    point = new Circle();
  }

  point.position = [x, y];
  point.color = g_selectColor.slice();
  point.size = g_selectedSize;
  point.segments = g_selectedSegments;
  g_shapesList.push(point);

  renderAllShapes();



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
  var startTime = performance.now();
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  //var len = g_points.length;

  var len = g_shapesList.length; // The number of vertices
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }

  var duration = performance.now() - startTime;
  sendTextToHTML("numdot:" + len + " ms:" + Math.floor(duration) + "fps:" + Math.floor(1000/duration)/10, "numdot");
}

function sendTextToHTML (text,htmlID){
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
     console.log ("failed to get " + htmlID + "from HTML");
     return;
    }
    htmlElm.innerHTML = text;
}

function drawTreeScene() {
  g_shapesList = []; // clear old drawings

  const pushTri = (x, y, scale, color) => {
    g_shapesList.push(new StaticTriangle(x, y, scale * 200.0, color)); // scale * 200 matches Triangle logic
  };

  // 🌿 Grass ground
  for (let i = -1; i <= 1; i += 0.3) {
    pushTri(i, -0.9, 0.25, [0.2, 0.8, 0.2, 1.0]);
  }

  
  const drawPineTree = (x, y) => {
    const color = [0.0, 0.5, 0.0, 1.0];
    const scale = 0.3;
  
    // Tree foliage (green triangles)
    pushTri(x, y + 0.18, scale, color); // top triangle
    pushTri(x, y + 0.02, scale, color); // middle triangle
    pushTri(x, y - 0.14, scale, color); // bottom triangle
  
    // Tree trunk (brown)
    const brown = [0.4, 0.2, 0.1, 1.0];
    const trunkScale = 0.15;
    pushTri(x - 0.07, y - 0.35, trunkScale, brown); // left triangle of trunk
    pushTri(x + 0.07, y - 0.35, trunkScale, brown); // right triangle of trunk
  };
  
  

   // Pine Trees
  drawPineTree(-0.9, -0.5);
  drawPineTree(-0.7, -0.5);
  drawPineTree(-0.3, -0.5);
  // drawPineTree(0.0, -0.5);
  // drawPineTree(0.3, -0.5);
  // drawPineTree(0.6, -0.5);
  // drawPineTree(0.9, -0.5);

  // moon cluster
  pushTri(0.8, 0.8, 0.3, [1.0, 0.9, 0.1, 1.0]);
  pushTri(0.9, 0.9, 0.3, [1.0, 0.9, 0.1, 1.0]);
  pushTri(0.7, 0.9, 0.3, [1.0, 0.9, 0.1, 1.0]);

  // ☁️ Clouds (light gray)
  pushTri(-0.8, 0.7, 0.2, [0.9, 0.9, 0.9, 1.0]);
  pushTri(-0.7, 0.75, 0.2, [0.9, 0.9, 0.9, 1.0]);
  pushTri(-0.6, 0.7, 0.2, [0.9, 0.9, 0.9, 1.0]);

  pushTri(0.4, 0.65, 0.2, [0.9, 0.9, 0.9, 1.0]);
  pushTri(0.5, 0.7, 0.2, [0.9, 0.9, 0.9, 1.0]);
  pushTri(0.6, 0.68, 0.2, [0.9, 0.9, 0.9, 1.0]);

  // ✨ Stars (white, small)
  pushTri(-0.9, 0.95, 0.05, [1.0, 1.0, 1.0, 1.0]);
  pushTri(-0.4, 0.85, 0.04, [1.0, 1.0, 1.0, 1.0]);
  pushTri(0.1, 0.95, 0.03, [1.0, 1.0, 1.0, 1.0]);
  pushTri(0.6, 0.85, 0.04, [1.0, 1.0, 1.0, 1.0]);

  for (let i = 0; i < 10; i++) {
    let x = Math.random() * 2 - 1;        // from -1 to 1
    let y = Math.random() * 0.5 + 0.5;    // from 0.5 to 1.0 (top half of canvas)
    let size = Math.random() * 0.03 + 0.02; // between 0.02 and 0.05
    pushTri(x, y, size, [1.0, 1.0, 1.0, 1.0]);
  }
  

  // renderAllShapes();


  // pushTri(x, y + 0.25, 0.3, [0.0, 0.5, 0.0, 1.0]);
  // pushTri(x, y, 0.3, [0.0, 0.5, 0.0, 1.0]);
  // pushTri(x, y - 0.25, 0.3, [0.0, 0.5, 0.0, 1.0]);



  renderAllShapes();
  sendTextToHTML("A peaceful nighttime forest with pine trees, moon, clouds, and stars.", "numdot");
}

