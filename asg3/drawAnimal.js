var g_map=[]

let g_cachedMap = [];

 
function drawMap(){
   if (g_cachedMap.length === 0) {
     for (let x = 0; x < 32; x++) {
       for (let y = 0; y < 32; y++) {
         let wall = new Cube();
         wall.textureNum = -2;
         wall.matrix.scale(0.25, (x % 4 === 0 || y % 4 === 0) ? 0.25 : 0.73, 0.25);
         wall.matrix.translate(x - 16, -0.25, y - 16);
 
         if ((x === 0 || x === 31) || (y === 0 || y === 31)) {
           if ((x === 0 || x === 31) && y % 4 === 0) {
             wall.color = [0.80, 0.70, 0.40, 1.0];
           } else if ((x === 0 || x === 31)) {
             wall.color = [0.60, 0.40, 0.20, 1.0];
           } else if (x % 4 === 0) {
             wall.color = [0.80, 0.70, 0.50, 1.0];
           } else {
             wall.color = [0.60, 0.40, 0.20, 1.0];
           }
           g_cachedMap.push(wall);
         }
       }
     }
   }
 
   for (const cube of g_cachedMap) {
     cube.renderfast();
   }

 }
 
 
//  function drawAnimal(){
//     // Colors
//     var bodyColor = [0.97, 0.73, 0.73, 1.0];    // Slightly brighter pink
//     var skinColor = [1.0, 0.8, 0.8, 1.0];       // Lighter pink for face
//     var snoutColor = [0.93, 0.65, 0.65, 1.0];   // Darker pink for snout
//     var hoofColor = [0.85, 0.6, 0.6, 1.0];      // Darker for hoofs
//     var footColor = [0.4, 0.2, 0.2, 1.0];       // Darker brown for foot
    
 
//     // Draw Map
//     drawMap();
//    //draw user-added blocks
//    for (const key of g_userBlocks.keys()) {
//       const [x, y, z] = key.split(',').map(Number);
//       const cube = new Cube();
//       cube.matrix.scale(0.25, 0.25, 0.25);
//       cube.color = [0.6, 0.4, 0.2, 1.0]; // brown dirt-like color
//       cube.matrix.translate(x, y, z);
//       cube.renderfast();
//    }

//    function makePigPart(color) {
//     let cube = new Cube();
//     cube.color = color;
//     cube.textureNum = -2;
//     return cube;
//   }
  
//     // body 
//     var body = new Cube();
//     let body = makePigPart(bodyColor);
//     body.matrix.scale(.25, 0.25, 0.35);
//     body.matrix.translate(-.5, 0, -0.25);
//     body.renderfast();
    
  


//     // head 
//     var head = new Cube();
  
//     let head = makePigPart(bodyColor);
//     head.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     head.matrix.scale(0.35, 0.35, 0.35);
//     head.matrix.translate(-.5, 0.25, -1.25);
//     head.renderfast();
 

//     var face = new Cube();
//     let face = makePigPart(snoutColor);
//     face.textureNum = -2;
//     face.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     face.matrix.scale(0.30, 0.30, 0.03);
//     face.matrix.translate(-.5, 0.35, -15.5);
//     face.renderfast();
 

//     var leftEar = new Cube();
//     leftEar.color = skinColor;
//     leftEar.textureNum = -2;
//     leftEar.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     leftEar.matrix.scale(0.12, 0.12, 0.03);
//     leftEar.matrix.translate(-1.5, 3.0, -11.95);
//     leftEar.renderfast();
 
//     var rightEar = new Cube();
//     rightEar.color = skinColor;
//     rightEar.textureNum = -2;
//     rightEar.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     rightEar.matrix.scale(0.12, 0.12, 0.03);
//     rightEar.matrix.translate(0.5, 3.0, -11.95);
//     rightEar.renderfast();
    
 
//     var lefteye = new Cube();
//     lefteye.color = [1,1,1,1];
//     lefteye.textureNum = -2;
//     lefteye.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     lefteye.matrix.scale(0.1, 0.061, 0.04);
//     lefteye.matrix.translate(-1.5, 3.5, -11.95);
//     lefteye.renderfast();
 
//     var lefteyeblack = new Cube();
//     lefteyeblack.color = [0,0,0,1];
//     lefteyeblack.textureNum = -2;
//     lefteyeblack.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     lefteyeblack.matrix.scale(0.05, 0.061, 0.04);
//     lefteyeblack.matrix.translate(-3.001, 3.5, -12);
//     lefteyeblack.renderfast();
 
//     var righteye = new Cube();
//     righteye.color = [1,1,1,1];
//     righteye.textureNum = -2;
//     righteye.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     righteye.matrix.scale(0.1, 0.061, 0.04);
//     righteye.matrix.translate(0.5, 3.5, -11.95);
//     righteye.renderfast();
 
//     var righteyeblack = new Cube();
//     righteyeblack.color = [0,0,0,1];
//     righteyeblack.textureNum = -2;
//     righteyeblack.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     righteyeblack.matrix.scale(0.05, 0.061, 0.04);
//     righteyeblack.matrix.translate(2.001, 3.5, -12.05);
//     righteyeblack.renderfast();
 
//     var snout = new Cube();
//     snout.color = snoutColor;
//     snout.textureNum = -2;
//     snout.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     snout.matrix.scale(0.15, 0.09, 0.06); 
//     snout.matrix.translate(-0.47, 1.5, -8.76);
//     snout.renderfast();
    

//     // Left Nostril
//     var leftNostril = new Cube();
//     leftNostril.color = [0.7, 0.4, 0.4, 1.0]; // Dark pink
//     leftNostril.textureNum = -2;
//     leftNostril.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     leftNostril.matrix.scale(0.03, 0.03, 0.01);  // Bigger nostril (was 0.02)
//     leftNostril.matrix.translate(-2, 5.2, -53); // Move up (6.5) and center better
//     leftNostril.renderfast();

//     // Right Nostril
//     var rightNostril = new Cube();
//     rightNostril.color = [0.7, 0.4, 0.4, 1.0];
//     rightNostril.textureNum = -2;
//     rightNostril.matrix.rotate(-g_headAnimation, 1, 0, 0);
//     rightNostril.matrix.scale(0.03, 0.03, 0.01);  // Bigger nostril
//     rightNostril.matrix.translate(1.15, 5.2, -53); // Move up too
//     rightNostril.renderfast();

//     // upper legs ============================
//     var frontleft = new Cube();
//     frontleft.color = bodyColor;
//     frontleft.textureNum = -2;
//     frontleft.matrix.setTranslate(0, 0, 0);
//     frontleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
//     var frontleftCoord = new Matrix4(frontleft.matrix);
//     frontleft.matrix.scale(.10, -0.10, 0.10);
//     frontleft.matrix.translate(-1.15, -.25, -0.75);
//     frontleft.renderfast();
 
//     var frontright = new Cube();
//     frontright.color = bodyColor;
//     frontright.textureNum = -2;
//     frontright.matrix.setTranslate(0, 0, 0);
//     frontright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
//     var frontrightCoord = new Matrix4(frontright.matrix);
//     frontright.matrix.scale(.10, -0.10, 0.10);
//     frontright.matrix.translate(.2, -.25, -0.75);
//     frontright.renderfast();
 
//     var backleft = new Cube();
//     backleft.color = bodyColor;
//     backleft.textureNum = -2;
//     backleft.matrix.setTranslate(0, 0, 0);
//     backleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
//     var backleftCoord = new Matrix4(backleft.matrix);
//     backleft.matrix.scale(.10, -0.10, 0.10);
//     backleft.matrix.translate(-1.15, -.25, 1.5);
//     backleft.renderfast();
 
//     var backright = new Cube();
//     backright.color = bodyColor;
//     backright.textureNum = -2;
//     backright.matrix.setTranslate(0, 0, 0);
//     backright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
//     var backrightCoord = new Matrix4(backright.matrix);
//     backright.matrix.scale(.10, -0.10, 0.10);
//     backright.matrix.translate(.2, -.25, 1.5);
//     backright.renderfast();
 
//     // lower leg =======================================
//     var frontleftlow = new Cube();
//     frontleftlow.color = hoofColor;  // Use hoof color for legs
//     frontleftlow.textureNum = -2;
//     frontleftlow.matrix = frontleftCoord;
//     frontleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
//     frontleftlow.matrix.scale(0.08, 0.08, 0.08);
//     frontleftlow.matrix.translate(-1.25, -1.75, -.8);
//     frontleftlow.renderfast();
 
//     var frontrightlow = new Cube();
//     frontrightlow.color = hoofColor;  // Use hoof color for legs
//     frontrightlow.textureNum = -2;
//     frontrightlow.matrix = frontrightCoord;
//     frontrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
//     frontrightlow.matrix.scale(0.08, 0.08, 0.08);
//     frontrightlow.matrix.translate(.37, -1.75, -.8);
//     frontrightlow.renderfast();
 
//     var backleftlow = new Cube();
//     backleftlow.color = hoofColor;  // Use hoof color for legs
//     backleftlow.textureNum = -2;
//     backleftlow.matrix = backleftCoord;
//     backleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
//     backleftlow.matrix.scale(0.08, 0.08, 0.08);
//     backleftlow.matrix.translate(-1.25, -1.75, 2);
//     backleftlow.renderfast();
 
//     var backrightlow = new Cube();
//     backrightlow.color = hoofColor;  // Use hoof color for legs
//     backrightlow.textureNum = -2;
//     backrightlow.matrix = backrightCoord;
//     backrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
//     backrightlow.matrix.scale(0.08, 0.08, 0.08);
//     backrightlow.matrix.translate(.37, -1.75, 2);
//     backrightlow.renderfast();
    
//     //======== 3rd joint =====
//     var frontleftfoot = new Cube();
//     frontleftfoot.color = footColor;
//     frontleftfoot.matrix = new Matrix4(frontleftlow.matrix);
//     frontleftfoot.textureNum = -2;
//     frontleftfoot.matrix.rotate(0, 0, 0, 1); // (optional extra movement later)
//     frontleftfoot.matrix.scale(0.99,0.5,0.99); // make foot small and flat
//     frontleftfoot.matrix.translate(0, -1.0, 0); // move foot down from calf
//     frontleftfoot.renderfast();

//     // Front Right Foot
//     var frontrightfoot = new Cube();
//     frontrightfoot.color = footColor;
//     frontrightfoot.textureNum = -2;
//     frontrightfoot.matrix = new Matrix4(frontrightlow.matrix); // inherit calf matrix
//     frontrightfoot.matrix.rotate(0, 0, 0, 1);
//     frontrightfoot.matrix.scale(0.99, 0.5, 0.99);
//     frontrightfoot.matrix.translate(0, -1.0, 0);
//     frontrightfoot.renderfast();

//     // Back Left Foot
//     var backleftfoot = new Cube();
//     backleftfoot.color = footColor;
//     backleftfoot.textureNum = -2;
//     backleftfoot.matrix = new Matrix4(backleftlow.matrix); // inherit calf matrix
//     backleftfoot.matrix.rotate(0, 0, 0, 1);
//     backleftfoot.matrix.scale(0.99, 0.5, 0.99);
//     backleftfoot.matrix.translate(0, -1.0, 0);
//     backleftfoot.renderfast();

//     // Back Right Foot
//     var backrightfoot = new Cube();
//     backrightfoot.color = footColor;
//     backrightfoot.textureNum = -2;
//     backrightfoot.matrix = new Matrix4(backrightlow.matrix); // inherit calf matrix
//     backrightfoot.matrix.rotate(0, 0, 0, 1);
//     backrightfoot.matrix.scale(0.99, 0.5, 0.99);
//     backrightfoot.matrix.translate(0, -1.0, 0);
//     backrightfoot.renderfast();
// //======== tail =============
//     var tail = new Cone();
//     tail.color = hoofColor;
//     tail.textureNum = -2;
//     tail.matrix.setIdentity();
//     tail.matrix.translate(0.0, 0.14, 0.26);  // back of pig (adjust Y, Z carefully)
//     tail.matrix.scale(0.1,0.1,0.1);     // SMALL tail: width tiny, height moderate
//     tail.segments = 30; // smoother
//     tail.render();

//     //enviorment 
//    var sky = new Cube();
//    sky.color = [.6, .9, .95, 1];
//    sky.textureNum = 1;
//    sky.matrix.scale(20,20,20);
//    sky.matrix.translate(-.5, -.5, -.5);
//    sky.render();

//    var floor = new Cube();
//   floor.textureNum = 0; // Use grass texture
//   floor.color = [1, 1, 1, 1]; // Texture only
//   floor.matrix.translate(0, -0.26, 0);
//   floor.matrix.scale(20, 0.01, 20); // Give it a tiny thickness
//   floor.matrix.translate(-0.5, 0, -0.5);
//   floor.render();

// // === Scattered rock blocks (textured using rock.png) ===

// let rockPositions = [
//   [2, 0, -2],
//   [-1, 0, 3],
//   [0, 0, 0],
//   [1, 0, 1]
// ];

// for (let pos of rockPositions) {
//   let rock = new Cube();
//   rock.textureNum = 2;            // rock.png
//   rock.color = [1, 1, 1, 1];      // full texture
//   rock.matrix.translate(pos[0], 0, pos[2]);
//   rock.matrix.scale(0.25, 0.25, 0.25);
//   rock.renderfast();
// }





// }

// Helper function (place this ABOVE drawAnimal)
function makePigPart(color) {
  const cube = new Cube();
  cube.color = color;
  cube.textureNum = -2;
  return cube;
}

function drawAnimal() {
  // Pig Colors
  const bodyColor = [0.97, 0.73, 0.73, 1.0];  // Body
  const skinColor = [1.0, 0.8, 0.8, 1.0];     // Face/Ears
  const snoutColor = [0.93, 0.65, 0.65, 1.0]; // Snout
  const hoofColor = [0.85, 0.6, 0.6, 1.0];    // Lower legs
  const footColor = [0.4, 0.2, 0.2, 1.0];     // Feet

  // Draw map and user-added blocks
  drawMap();
  for (const key of g_userBlocks.keys()) {
    const [x, y, z] = key.split(',').map(Number);
    const cube = new Cube();
    cube.color = [0.6, 0.4, 0.2, 1.0];
    cube.textureNum = -2;
    cube.matrix.translate(x, y, z);
    cube.matrix.scale(0.25, 0.25, 0.25);
    cube.renderfast();
  }

  // Body and Head
  let body = makePigPart(bodyColor);
  body.matrix.scale(.25, 0.25, 0.35);
  body.matrix.translate(-.5, 0, -0.25);
  body.renderfast();

  let head = makePigPart(bodyColor);
  head.matrix.rotate(-g_headAnimation, 1, 0, 0);
  head.matrix.scale(0.35, 0.35, 0.35);
  head.matrix.translate(-.5, 0.25, -1.25);
  head.renderfast();

  let face = makePigPart(snoutColor);
  face.matrix.rotate(-g_headAnimation, 1, 0, 0);
  face.matrix.scale(0.30, 0.30, 0.03);
  face.matrix.translate(-.5, 0.35, -15.5);
  face.renderfast();

  let leftEar = makePigPart(skinColor);
  leftEar.matrix.rotate(-g_headAnimation, 1, 0, 0);
  leftEar.matrix.scale(0.12, 0.12, 0.03);
  leftEar.matrix.translate(-1.5, 3.0, -11.95);
  leftEar.renderfast();

  let rightEar = makePigPart(skinColor);
  rightEar.matrix.rotate(-g_headAnimation, 1, 0, 0);
  rightEar.matrix.scale(0.12, 0.12, 0.03);
  rightEar.matrix.translate(0.5, 3.0, -11.95);
  rightEar.renderfast();

  let lefteye = makePigPart([1, 1, 1, 1]);
  lefteye.matrix.rotate(-g_headAnimation, 1, 0, 0);
  lefteye.matrix.scale(0.1, 0.061, 0.04);
  lefteye.matrix.translate(-1.5, 3.5, -11.95);
  lefteye.renderfast();

  let lefteyeblack = makePigPart([0, 0, 0, 1]);
  lefteyeblack.matrix.rotate(-g_headAnimation, 1, 0, 0);
  lefteyeblack.matrix.scale(0.05, 0.061, 0.04);
  lefteyeblack.matrix.translate(-3.001, 3.5, -12);
  lefteyeblack.renderfast();

  let righteye = makePigPart([1, 1, 1, 1]);
  righteye.matrix.rotate(-g_headAnimation, 1, 0, 0);
  righteye.matrix.scale(0.1, 0.061, 0.04);
  righteye.matrix.translate(0.5, 3.5, -11.95);
  righteye.renderfast();

  let righteyeblack = makePigPart([0, 0, 0, 1]);
  righteyeblack.matrix.rotate(-g_headAnimation, 1, 0, 0);
  righteyeblack.matrix.scale(0.05, 0.061, 0.04);
  righteyeblack.matrix.translate(2.001, 3.5, -12.05);
  righteyeblack.renderfast();

  let snout = makePigPart(snoutColor);
  snout.matrix.rotate(-g_headAnimation, 1, 0, 0);
  snout.matrix.scale(0.15, 0.09, 0.06);
  snout.matrix.translate(-0.47, 1.5, -8.76);
  snout.renderfast();

  let leftNostril = makePigPart([0.7, 0.4, 0.4, 1.0]);
  leftNostril.matrix.rotate(-g_headAnimation, 1, 0, 0);
  leftNostril.matrix.scale(0.03, 0.03, 0.01);
  leftNostril.matrix.translate(-2, 5.2, -53);
  leftNostril.renderfast();

  let rightNostril = makePigPart([0.7, 0.4, 0.4, 1.0]);
  rightNostril.matrix.rotate(-g_headAnimation, 1, 0, 0);
  rightNostril.matrix.scale(0.03, 0.03, 0.01);
  rightNostril.matrix.translate(1.15, 5.2, -53);
  rightNostril.renderfast();


    // upper legs ============================
    var frontleft = new Cube();
    frontleft.color = bodyColor;
    frontleft.textureNum = -2;
    frontleft.matrix.setTranslate(0, 0, 0);
    frontleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
    var frontleftCoord = new Matrix4(frontleft.matrix);
    frontleft.matrix.scale(.10, -0.10, 0.10);
    frontleft.matrix.translate(-1.15, -.25, -0.75);
    frontleft.renderfast();
 
    var frontright = new Cube();
    frontright.color = bodyColor;
    frontright.textureNum = -2;
    frontright.matrix.setTranslate(0, 0, 0);
    frontright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
    var frontrightCoord = new Matrix4(frontright.matrix);
    frontright.matrix.scale(.10, -0.10, 0.10);
    frontright.matrix.translate(.2, -.25, -0.75);
    frontright.renderfast();
 
    var backleft = new Cube();
    backleft.color = bodyColor;
    backleft.textureNum = -2;
    backleft.matrix.setTranslate(0, 0, 0);
    backleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
    var backleftCoord = new Matrix4(backleft.matrix);
    backleft.matrix.scale(.10, -0.10, 0.10);
    backleft.matrix.translate(-1.15, -.25, 1.5);
    backleft.renderfast();
 
    var backright = new Cube();
    backright.color = bodyColor;
    backright.textureNum = -2;
    backright.matrix.setTranslate(0, 0, 0);
    backright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
    var backrightCoord = new Matrix4(backright.matrix);
    backright.matrix.scale(.10, -0.10, 0.10);
    backright.matrix.translate(.2, -.25, 1.5);
    backright.renderfast();
 
    // lower leg =======================================
    var frontleftlow = new Cube();
    frontleftlow.color = hoofColor;  // Use hoof color for legs
    frontleftlow.textureNum = -2;
    frontleftlow.matrix = frontleftCoord;
    frontleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
    frontleftlow.matrix.scale(0.08, 0.08, 0.08);
    frontleftlow.matrix.translate(-1.25, -1.75, -.8);
    frontleftlow.renderfast();
 
    var frontrightlow = new Cube();
    frontrightlow.color = hoofColor;  // Use hoof color for legs
    frontrightlow.textureNum = -2;
    frontrightlow.matrix = frontrightCoord;
    frontrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
    frontrightlow.matrix.scale(0.08, 0.08, 0.08);
    frontrightlow.matrix.translate(.37, -1.75, -.8);
    frontrightlow.renderfast();
 
    var backleftlow = new Cube();
    backleftlow.color = hoofColor;  // Use hoof color for legs
    backleftlow.textureNum = -2;
    backleftlow.matrix = backleftCoord;
    backleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
    backleftlow.matrix.scale(0.08, 0.08, 0.08);
    backleftlow.matrix.translate(-1.25, -1.75, 2);
    backleftlow.renderfast();
 
    var backrightlow = new Cube();
    backrightlow.color = hoofColor;  // Use hoof color for legs
    backrightlow.textureNum = -2;
    backrightlow.matrix = backrightCoord;
    backrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
    backrightlow.matrix.scale(0.08, 0.08, 0.08);
    backrightlow.matrix.translate(.37, -1.75, 2);
    backrightlow.renderfast();
    
    //======== 3rd joint =====
    var frontleftfoot = new Cube();
    frontleftfoot.color = footColor;
    frontleftfoot.matrix = new Matrix4(frontleftlow.matrix);
    frontleftfoot.textureNum = -2;
    frontleftfoot.matrix.rotate(0, 0, 0, 1); // (optional extra movement later)
    frontleftfoot.matrix.scale(0.99,0.5,0.99); // make foot small and flat
    frontleftfoot.matrix.translate(0, -1.0, 0); // move foot down from calf
    frontleftfoot.renderfast();

    // Front Right Foot
    var frontrightfoot = new Cube();
    frontrightfoot.color = footColor;
    frontrightfoot.textureNum = -2;
    frontrightfoot.matrix = new Matrix4(frontrightlow.matrix); // inherit calf matrix
    frontrightfoot.matrix.rotate(0, 0, 0, 1);
    frontrightfoot.matrix.scale(0.99, 0.5, 0.99);
    frontrightfoot.matrix.translate(0, -1.0, 0);
    frontrightfoot.renderfast();

    // Back Left Foot
    var backleftfoot = new Cube();
    backleftfoot.color = footColor;
    backleftfoot.textureNum = -2;
    backleftfoot.matrix = new Matrix4(backleftlow.matrix); // inherit calf matrix
    backleftfoot.matrix.rotate(0, 0, 0, 1);
    backleftfoot.matrix.scale(0.99, 0.5, 0.99);
    backleftfoot.matrix.translate(0, -1.0, 0);
    backleftfoot.renderfast();

    // Back Right Foot
    var backrightfoot = new Cube();
    backrightfoot.color = footColor;
    backrightfoot.textureNum = -2;
    backrightfoot.matrix = new Matrix4(backrightlow.matrix); // inherit calf matrix
    backrightfoot.matrix.rotate(0, 0, 0, 1);
    backrightfoot.matrix.scale(0.99, 0.5, 0.99);
    backrightfoot.matrix.translate(0, -1.0, 0);
    backrightfoot.renderfast();
//======== tail =============
    var tail = new Cone();
    tail.color = hoofColor;
    tail.textureNum = -2;
    tail.matrix.setIdentity();
    tail.matrix.translate(0.0, 0.14, 0.26);  // back of pig (adjust Y, Z carefully)
    tail.matrix.scale(0.1,0.1,0.1);     // SMALL tail: width tiny, height moderate
    tail.segments = 30; // smoother
    tail.render();

  // Sky and Grass
  let sky = new Cube();
  sky.textureNum = 1;
  sky.color = [0.6, 0.9, 0.95, 1];
  sky.matrix.scale(20, 20, 20);
  sky.matrix.translate(-0.5, -0.5, -0.5);
  sky.render();

  let floor = new Cube();
  floor.textureNum = 0;
  floor.color = [1, 1, 1, 1];
  floor.matrix.translate(0, -0.26, 0);
  floor.matrix.scale(20, 0.01, 20);
  floor.matrix.translate(-0.5, 0, -0.5);
  floor.render();

  // Rocks
  let rockPositions = [
    [2, 0, -2],
    [-1, 0, 3],
    [0, 0, 0],
    [1, 0, 1]
  ];

  for (let pos of rockPositions) {
    let rock = new Cube();
    rock.textureNum = 2; // Try grass texture instead
    rock.matrix.translate(pos[0], 0, pos[2]);
    rock.matrix.scale(0.25, 0.25, 0.25);
    rock.render();
  }
}
