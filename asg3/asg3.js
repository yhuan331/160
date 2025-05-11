
var gl;
var canvas;
var a_Position;
var a_UV;
var u_FragColor;
var u_Size;
var u_ModelMatrix;
var u_ProjectionMatrix;
var u_ViewMatrix;
var u_GlobalRotateMatrix;
var u_Sampler0;
var u_Sampler1;
var u_Sampler2;   
var u_whichTexture;
var u_Clicked;

// Camera Movement
var g_camera;

// UI
var gAnimalGlobalRotation = 0; // Camera
var g_jointAngle = 0; // Joint 1
//var head_animation = 0;
var g_jointAngle2 = 0; // Joint 2
var g_Animation = false; // Joint 2
var g_headAnimation = 0; // Head Animation

// Animation
var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;
var g_lastFrameTime = performance.now(); 

let g_userBlocks = new Map(); // Store user blocks

const rockPositions = [
    [2, 0, -2],
    [-1, 0, 3],
   //  [0, 0, 0],
  [1, 0, 1]
  ];
  
  let collectedRocks = new Set();
  const totalRocks = rockPositions.length;



// Vertex shader program ==========================================
var VSHADER_SOURCE =`
   precision mediump float;
   attribute vec4 a_Position;
   attribute vec2 a_UV;
   varying vec2 v_UV;
   uniform mat4 u_ModelMatrix;
   uniform mat4 u_GlobalRotateMatrix;
   uniform mat4 u_ViewMatrix;
   uniform mat4 u_ProjectionMatrix;
   uniform bool u_Clicked; // Mouse is pressed
   void main() {
      if(u_Clicked){
         vec4(1,1,1,1);
      }
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
     v_UV = a_UV;

      
   }`

// Fragment shader program ========================================
var FSHADER_SOURCE =`
    precision mediump float;
    varying vec2 v_UV;
    uniform vec4 u_FragColor;
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;
    uniform sampler2D u_Sampler2;
    uniform int u_whichTexture;
    void main() {
      if(u_whichTexture == -2){
         gl_FragColor = u_FragColor;                  // Use color
      } else if (u_whichTexture == -1){
         gl_FragColor = vec4(v_UV, 1.0, 1.0);         // Use UV debug color
      } else if(u_whichTexture == 0){
         gl_FragColor = texture2D(u_Sampler0, v_UV);  // Use texture0
      } else if(u_whichTexture == 1){
         gl_FragColor = texture2D(u_Sampler1, v_UV);  // Use texture1
      } else if(u_whichTexture == 2){
         gl_FragColor = texture2D(u_Sampler2, v_UV);
      } else {
         gl_FragColor = vec4(1,.2,.2,1);              // Error, Red
      }
    }`

// HTML ============================================================
function addActionsForHtmlUI(){
   // Color Slider Events
   document.getElementById('camera').addEventListener('mousemove', function() { gAnimalGlobalRotation = this.value; renderScene();});
   document.getElementById('joint').addEventListener('mousemove', function() { g_jointAngle = this.value; renderScene();});
   document.getElementById('joint2').addEventListener('mousemove', function() { g_jointAngle2 = this.value; renderScene();});
   document.getElementById("headSlide").addEventListener('mousemove', function() { g_headAnimation = this.value; renderScene();});
   document.getElementById('animate_on').onclick = function() {g_Animation = true;};
   document.getElementById('animate_off').onclick = function() {g_Animation = false;};

}
//obj loader ======
let objMesh;

function loadOBJModel() {
  fetch('cube.obj')
    .then(res => res.text())
    .then(data => {
      objMesh = new OBJ.Mesh(data);
      OBJ.initMeshBuffers(gl, objMesh);

      console.log("✅ OBJ loaded:");
console.log("Vertices:", objMesh.vertices.length);
console.log("UVs:", objMesh.textures?.length || 0);
console.log("Normals:", objMesh.vertexNormals?.length || 0);
console.log("Indices:", objMesh.indices?.length || 0);
console.log("Index Buffer:", objMesh.indexBuffer);

    });
}


// Get Canvas and GL Context ======================================
function setupWebGL(){
   // Retrieve <canvas> element
   canvas = document.getElementById('asg3');
   if (!canvas) {
       console.log('Failed to retrieve the <canvas> element');
       return;
   }

   // Rendering context for WebGL
   gl = getWebGLContext(canvas);
   if(!gl){
       console.log('Failed to get the rendering context for WebGL');
       return;
   }

   gl.enable(gl.DEPTH_TEST);
}

// Compile Shader Programs and connect js to GLSL =================
function connectVariablesToGLSL(){
   // Initialize shaders ==========================================
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
       console.log('Failed to intialize shaders.');
       return;
   }

   // Get the storage location of attribute variable ==============
   a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   if (a_Position < 0) {
       console.log('Failed to get the storage location of a_Position');
       return;
   }

   a_UV = gl.getAttribLocation(gl.program, 'a_UV');
   console.log("a_UV location:", a_UV);

   if (a_UV < 0) {
       console.log('Failed to get the storage location of a_UV');
       return;
   }

   // Get the storage location of attribute variable ==============
   u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
   if (!u_whichTexture) {
       console.log('Failed to get u_whichTexture');
       return;
   }

   u_Clicked = gl.getUniformLocation(gl.program, 'u_Clicked');
   if (!u_Clicked) {
       console.log('Failed to get u_Clicked');
       return;
   }

   // Get the storage location of attribute variable ==============
   u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
   if (!u_FragColor) {
       console.log('Failed to get u_FragColor');
       return;
   }

   u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
   if (!u_ModelMatrix) {
       console.log('Failed to get u_ModelMatrix');
       return;
   }

   u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
   if (!u_GlobalRotateMatrix) {
       console.log('Failed to get u_GlobalRotateMatrix');
       return;
   }

   u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
   if (!u_ViewMatrix) {
       console.log('Failed to get u_ViewMatrix');
       return;
   }

   u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
   if (!u_ProjectionMatrix) {
       console.log('Failed to get u_ProjectionMatrix');
       return;
   }

   // Get the storage location of u_Sampler0
   u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
   if (!u_Sampler0) {
   console.log('Failed to get the storage location of u_Sampler0');
   return false;
   }

   u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
   if (!u_Sampler1) {
   console.log('Failed to get the storage location of u_Sampler1');
   return false;
   }

   u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
   if (!u_Sampler2) {
   console.log('Failed to get the storage location of u_Sampler2');
   return false;
}


   var identityM = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);

}

// Texture Stuff ==================================================
function initTextures() {
   var image = new Image();  // Create the image object
   var image1 = new Image();  // Create the image object
   var image2 = new Image();

   if (!image) {
      console.log('Failed to create the image object');
      return false;
   }
   if (!image1) {
      console.log('Failed to create the image1 object');
      return false;
   }
   // Register the event handler to be called on loading an image
   image.onload = function(){ sendTextureToTEXTUREgrass(image); };
   image1.onload = function(){ sendTextureToTEXTUREsky(image1); };
   image2.onload = function() { sendTextureToTEXTURERock(image2); };


   // Tell the browser to load an image
   image.src = 'grass.png';
   image1.src = 'sky.jpg';
   image2.src = 'rock4.jpg';

   // Add more texture loading here // DEBUG:
   return true;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

function sendTextureToTEXTUREgrass(image) {
   var texture = gl.createTexture();
   if(!texture){
      console.log('Failed to create the texture object');
      return false;
   }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
     gl.generateMipmap(gl.TEXTURE_2D);
  } else {
     // Set the texture parameters
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);


  console.log("Finished loadTexture Grass");
}
// ================================SKY
function sendTextureToTEXTUREsky(image) {
   var texture = gl.createTexture();
   if(!texture){
      console.log('Failed to create the texture object');
      return false;
   }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0
  gl.activeTexture(gl.TEXTURE1);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
     gl.generateMipmap(gl.TEXTURE_2D);
  } else {
     // Set the texture parameters
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
     gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }

  // Set the texture unit 1 to the sampler
  gl.uniform1i(u_Sampler1, 1);


  console.log("Finished loadTexture Sky");
}

function sendTextureToTEXTURERock(image) {
   var texture = gl.createTexture();
   if (!texture) {
     console.log('Failed to create rock texture');
     return;
   }
 
   gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
   gl.activeTexture(gl.TEXTURE2);
   gl.bindTexture(gl.TEXTURE_2D, texture);
   gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
 
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
 
   gl.uniform1i(u_Sampler2, 2);
   console.log("Finished loadTexture rock");
 }
 

// Main ===========================================================
function main() {
   setupWebGL();
   connectVariablesToGLSL();
   addActionsForHtmlUI();

   g_camera = new Camera();
   document.onkeydown = keydown;
   canvas.onmousemove = function(ev){
      mouseCam(ev);
   }
   canvas.onmousedown = function(ev){
      check(ev);
   }

   initTextures();
   loadOBJModel();


   // Specify the color for clearing <canvas>
   gl.clearColor(0.0, 0.0, 0.0, 1.0);

   requestAnimationFrame(tick);
} // end of main

function check(ev) {
  var picked = false;
  var x = ev.clientX, y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();
  if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) { // inside canvas
     var x_in_canvas = x - rect.left, y_in_canvas = rect.bottom - y;
     gl.uniform1i(u_Clicked, 1);  // Pass true to u_Clicked
     // Read pixel at the clicked position
     var pixels = new Uint8Array(4); // Array for storing the pixel value
     gl.readPixels(x_in_canvas, y_in_canvas, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
     console.log(pixels[0]);
     if (pixels[0] == 255) // The mouse in on cube if R(pixels[0]) is 255
       picked = true;

     gl.uniform1i(u_Clicked, 0);  // Pass false to u_Clicked(rewrite the cube)
  }

}

// Movement =======================================================
function convertCoordinatesEventToGL(ev){
   var x = ev.clientX; 
   var y = ev.clientY; 
   var rect = ev.target.getBoundingClientRect() ;

   // set coordinates based on origin
   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

   return [x,y];
}

function mouseCam(ev){
   // Update camera look direction (after rotation)
let lookDir = new Vector3([
   Math.sin(gAnimalGlobalRotation * Math.PI / 180),
   0,
   Math.cos(gAnimalGlobalRotation * Math.PI / 180)
 ]);
 g_camera.at = new Vector3(g_camera.eye.elements).add(lookDir);
 
   coord = convertCoordinatesEventToGL(ev);
   if(coord[0] < 0.5){ // left side
      g_camera.panLeft(coord[0]*-10);
   } else{
      g_camera.panRight(coord[0]*-10);
   }
}

function getBlockInFront(distance = 1) {
   // Convert raw array to Vector3 explicitly
   const eye = new Vector3([g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]]);
   const at = new Vector3([g_camera.at.elements[0], g_camera.at.elements[1], g_camera.at.elements[2]]);
 
   const dir = at;  // will modify directly
   dir.sub(eye);    // this is how cuon-matrix subtracts
   dir.normalize();
 
   const target = new Vector3(eye.elements);
   target.add(dir.mul(distance));  // move forward
 
   const x = Math.round(target.elements[0]);
   const y = 0;
   const z = Math.round(target.elements[2]);
 

console.log("eye:", eye.elements, "at:", at.elements, "dir:", dir.elements);
console.log("Added block at:", x, y, z);

   return [x, y, z];
 }
 
 
 function addBlock() {
   const [x, y, z] = getBlockInFront();
   const key = `${x},${y},${z}`;
   if (!g_userBlocks.has(key)) {
     g_userBlocks.set(key, true);
   }
   console.log("Added block at: ", key);
 }
 
 function removeBlock() {
   const [x, y, z] = getBlockInFront();
   const key = `${x},${y},${z}`;
   g_userBlocks.delete(key);
   console.log("Removed block at: ", key);
 }

 function tryCollectRock() {
   for (let i = 0; i < rockPositions.length; i++) {
     if (collectedRocks.has(i)) continue;
 
     let [rx, _, rz] = rockPositions[i];
     let dx = g_camera.eye.elements[0] - rx;
     let dz = g_camera.eye.elements[2] - rz;
 
     if (Math.sqrt(dx * dx + dz * dz) < 1.5) {  // Made radius bigger
       collectedRocks.add(i);
       console.log(`Collected rock at index ${i}`);
       sendTextToHTML(`Rocks Collected: ${collectedRocks.size}/${totalRocks}`, "rockCount");
       break;
     }
   }
 
 
 
   // Update rock counter
   document.getElementById('rockCount').innerText =
     `🪨 Rocks Collected: ${collectedRocks.size} / ${totalRocks}`;
 
   if (collectedRocks.size === totalRocks) {
     document.getElementById('gameMessage').innerText = "🎉 You Win!";
   }
}


 function keydown(ev) {
	if (ev.key === 'w') g_camera.moveForward();
	else if (ev.key === 's') g_camera.moveBackward();
	else if (ev.key === 'a') g_camera.moveLeft();
	else if (ev.key === 'd') g_camera.moveRight();
	else if (ev.key === 'q') g_camera.panLeft();
	else if (ev.key === 'e') g_camera.panRight();
   else if (ev.key === 'z') { // Z to add a bzlock
      addBlock();
   } else if (ev.key === 'x') { // X to remove a block
      removeBlock();
   }
   else if (ev.key === 'c') {
      tryCollectRock();  // Press C to collect
    }
    

   renderScene();
}

// TICK ===========================================================
function tick(){
   let now = performance.now();
   let duration = now - g_lastFrameTime;
   g_lastFrameTime = now;

   g_seconds = now / 1000.0 - g_startTime;
   updateAnimationAngles();
   renderScene();

   if (duration > 0) {
     let fps = Math.floor(1000 / duration * 10) / 10;
     sendTextToHTML("fps: " + fps, "numdot");
   }

   requestAnimationFrame(tick);
}


function renderOBJ() {
   if (!objMesh) return;
 
   // Bind vertices
   gl.bindBuffer(gl.ARRAY_BUFFER, objMesh.vertexBuffer);
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray(a_Position);
 
   // Bind UVs if needed
   if (a_UV !== -1 && objMesh.textures && objMesh.textures.length > 0) {
      gl.bindBuffer(gl.ARRAY_BUFFER, objMesh.textureBuffer);
      gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(a_UV);
   } else {
      gl.disableVertexAttribArray(a_UV); // Optional
   }
   
    
    
 
   // Identity model matrix (or customize)
   let modelMatrix = new Matrix4();
   gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
 
   gl.uniform1i(u_whichTexture, -2);  // Plain color mode
   gl.uniform4f(u_FragColor, 0.8, 0.2, 0.2, 1.0);  // Red color
 
   // Draw
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, objMesh.indexBuffer);
   gl.drawElements(gl.TRIANGLES, objMesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
 }
 
// renderScene ====================================================
function renderScene(){
   let lookDir = new Vector3([
      Math.sin(gAnimalGlobalRotation * Math.PI / 180),
      0,
      Math.cos(gAnimalGlobalRotation * Math.PI / 180)
    ]);
   g_camera.at = new Vector3(g_camera.eye.elements).add(lookDir);

   var projMat = g_camera.projectionMatrix;
   var viewMat = g_camera.viewMatrix;

   // ✅ These two lines are essential:
   gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);
   gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

   var globalRotMat = new Matrix4().rotate(gAnimalGlobalRotation, 0,1,0);
   gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

   drawAnimal();
   //console.log("eye:", g_camera.eye.elements, "at:", g_camera.at.elements);
   renderOBJ(); 

   

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


function updateAnimationAngles(){
   if(g_Animation){
      g_jointAngle = 10*Math.sin(g_seconds);
      g_headAnimation = 15*Math.sin(g_seconds);
   }
}