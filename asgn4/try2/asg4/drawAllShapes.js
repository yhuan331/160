var g_map=[
   
]

function drawMap(){
   for(x=0; x<32; x++){
      for(y=0; y<32; y++){
         if ((x == 0 || x == 31) && y%4 == 0){
            var wall = new Cube();
            wall.color = [.80, .70, .40, 1.0];
            wall.textureNum = -2;
            wall.matrix.scale(0.25,0.25,0.25);
            wall.matrix.translate(x-16,-.25,y-16);
            wall.render();
         }
         if ((x == 0 || x == 31) && y%4 != 0){
            var wall = new Cube();
            wall.color = [.60, .40, .20, 1.0];
            wall.textureNum = -2;
            wall.matrix.scale(0.25,0.73,0.25);
            wall.matrix.translate(x-16,-.25,y-16);
            wall.render();
         }
         if ((y == 0 || y == 31) && x%4 == 0){
            var wall = new Cube();
            wall.color = [.80, .70, .50, 1.0];
            wall.textureNum = -2;
            wall.matrix.scale(0.25,0.25,0.25);
            wall.matrix.translate(x-16,-.25,y-16);
            wall.render();
         }
         if ((y == 0 || y == 31) && x%4 != 0){
            var wall = new Cube();
            wall.color = [.60, .40, .20, 1.0];
            wall.textureNum = -2;
            wall.matrix.scale(0.25,0.73,0.25);
            wall.matrix.translate(x-16,-.25,y-16);
            wall.render();
         }
        
      }
   }
}
// Helper function 
function makePigPart(color) {
   const cube = new Cube();
   cube.color = color;
   cube.textureNum = -2;
   return cube;
 }
 
 
 function drawAnimal() {
   let pigBaseMatrix = new Matrix4().rotate(180, 0, 1, 0); // rotates pig to face forward

   // Pig Colors
   const bodyColor = [0.97, 0.73, 0.73, 1.0];  // Body
   const skinColor = [1.0, 0.8, 0.8, 1.0];     // Face/Ears
   const snoutColor = [0.93, 0.65, 0.65, 1.0]; // Snout
   const hoofColor = [0.85, 0.6, 0.6, 1.0];    // Lower legs
   const footColor = [0.4, 0.2, 0.2, 1.0];     // Feet
 

   // body =====================================
  // Body and Head
  let body = makePigPart(bodyColor);
  body.matrix = new Matrix4(pigBaseMatrix);
  body.matrix.scale(.25, 0.25, 0.35);
  body.matrix.translate(-.5, 0, -0.25);
  body.renderfast();
   // head =====================================

   let head = makePigPart(bodyColor);
   head.matrix = new Matrix4(pigBaseMatrix); 
  head.matrix.rotate(-head_animation, 1, 0, 0);
  head.matrix.scale(0.35, 0.35, 0.35);
  head.matrix.translate(-.5, 0.25, -1.25);
  head.renderfast();

  let face = makePigPart(snoutColor);
  face.matrix = new Matrix4(pigBaseMatrix);
  face.matrix.rotate(-head_animation, 1, 0, 0);
  face.matrix.scale(0.30, 0.30, 0.03);
  face.matrix.translate(-.5, 0.35, -15.5);
  face.renderfast();

  let leftEar = makePigPart(skinColor);
  leftEar.matrix = new Matrix4(pigBaseMatrix);
  leftEar.matrix.rotate(-head_animation, 1, 0, 0);
  leftEar.matrix.scale(0.12, 0.12, 0.03);
  leftEar.matrix.translate(-1.5, 3.0, -11.95);
  leftEar.renderfast();

  let rightEar = makePigPart(skinColor);
  rightEar.matrix = new Matrix4(pigBaseMatrix);
  rightEar.matrix.rotate(-head_animation, 1, 0, 0);
  rightEar.matrix.scale(0.12, 0.12, 0.03);
  rightEar.matrix.translate(0.5, 3.0, -11.95);
  rightEar.renderfast();

  let lefteye = makePigPart([1, 1, 1, 1]);
  lefteye.matrix = new Matrix4(pigBaseMatrix);
  lefteye.matrix.rotate(-head_animation, 1, 0, 0);
  lefteye.matrix.scale(0.1, 0.061, 0.04);
  lefteye.matrix.translate(-1.5, 3.5, -11.95);
  lefteye.renderfast();

  let lefteyeblack = makePigPart([0, 0, 0, 1]);
   lefteyeblack.matrix = new Matrix4(pigBaseMatrix);
  lefteyeblack.matrix.rotate(-head_animation, 1, 0, 0);
  lefteyeblack.matrix.scale(0.05, 0.061, 0.04);
  lefteyeblack.matrix.translate(-3.001, 3.5, -12);
  lefteyeblack.renderfast();

  let righteye = makePigPart([1, 1, 1, 1]);
   righteye.matrix = new Matrix4(pigBaseMatrix);
  righteye.matrix.rotate(-head_animation, 1, 0, 0);
  righteye.matrix.scale(0.1, 0.061, 0.04);
  righteye.matrix.translate(0.5, 3.5, -11.95);
  righteye.renderfast();

  let righteyeblack = makePigPart([0, 0, 0, 1]);
   righteyeblack.matrix = new Matrix4(pigBaseMatrix);
  righteyeblack.matrix.rotate(-head_animation, 1, 0, 0);
  righteyeblack.matrix.scale(0.05, 0.061, 0.04);
  righteyeblack.matrix.translate(2.001, 3.5, -12.05);
  righteyeblack.renderfast();

  let snout = makePigPart(snoutColor);
   snout.matrix =new Matrix4(pigBaseMatrix);
  snout.matrix.rotate(-head_animation, 1, 0, 0);
  snout.matrix.scale(0.15, 0.09, 0.06);
  snout.matrix.translate(-0.47, 1.5, -8.76);
  snout.renderfast();

  let leftNostril = makePigPart([0.7, 0.4, 0.4, 1.0]);
   leftNostril.matrix = new Matrix4(pigBaseMatrix);
  leftNostril.matrix.rotate(-head_animation, 1, 0, 0);
  leftNostril.matrix.scale(0.03, 0.03, 0.01);
  leftNostril.matrix.translate(-2, 5.2, -53);
  leftNostril.renderfast();

  let rightNostril = makePigPart([0.7, 0.4, 0.4, 1.0]);
   rightNostril.matrix = new Matrix4(pigBaseMatrix);
  rightNostril.matrix.rotate(-head_animation, 1, 0, 0);
  rightNostril.matrix.scale(0.03, 0.03, 0.01);
  rightNostril.matrix.translate(1.15, 5.2, -53);
  rightNostril.renderfast();

   // upper legs ============================
   var frontleft = new Cube();
   frontleft.matrix = new Matrix4(pigBaseMatrix);
    frontleft.color = bodyColor;
    frontleft.textureNum = -2;
    frontleft.matrix.setTranslate(0, 0, 0);
    frontleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
    var frontleftCoord = new Matrix4(frontleft.matrix);
    frontleftCoord.matrix = new Matrix4(pigBaseMatrix);
    frontleft.matrix.scale(.10, -0.10, 0.10);
    frontleft.matrix.translate(-1.15, -.25, -0.75);
    frontleft.renderfast();
 
    var frontright = new Cube();
    frontleftCoord.matrix =new Matrix4(pigBaseMatrix);
    frontright.color = bodyColor;
    frontright.textureNum = -2;
    frontright.matrix.setTranslate(0, 0, 0);
    frontright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
    var frontrightCoord = new Matrix4(frontright.matrix);
      frontrightCoord.matrix = new Matrix4(pigBaseMatrix);
    frontright.matrix.scale(.10, -0.10, 0.10);
    frontright.matrix.translate(.2, -.25, -0.75);
    frontright.renderfast();
 
    var backleft = new Cube();
      backleft.matrix = new Matrix4(pigBaseMatrix);
    backleft.color = bodyColor;
    backleft.textureNum = -2;
    backleft.matrix.setTranslate(0, 0, 0);
    backleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
    var backleftCoord = new Matrix4(backleft.matrix);
      backleftCoord.matrix = new Matrix4(pigBaseMatrix);
    backleft.matrix.scale(.10, -0.10, 0.10);
    backleft.matrix.translate(-1.15, -.25, 1.5);
    backleft.renderfast();
 
    var backright = new Cube();
      backright.matrix = new Matrix4(pigBaseMatrix);
    backright.color = bodyColor;
    backright.textureNum = -2;
    backright.matrix.setTranslate(0, 0, 0);
    backright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
    var backrightCoord = new Matrix4(backright.matrix);
      backrightCoord.matrix = new Matrix4(pigBaseMatrix);
    backright.matrix.scale(.10, -0.10, 0.10);
    backright.matrix.translate(.2, -.25, 1.5);
    backright.renderfast();

   // lower leg =======================================
   var frontleftlow = new Cube();
      frontleftlow.matrix = new Matrix4(pigBaseMatrix);
    frontleftlow.color = hoofColor;  // Use hoof color for legs
    frontleftlow.textureNum = -2;
    frontleftlow.matrix = frontleftCoord;
    frontleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
    frontleftlow.matrix.scale(0.08, 0.08, 0.08);
    frontleftlow.matrix.translate(-1.25, -1.75, -.8);
    frontleftlow.renderfast();
 
    var frontrightlow = new Cube();
      frontrightlow.matrix =new Matrix4(pigBaseMatrix);
    frontrightlow.color = hoofColor;  // Use hoof color for legs
    frontrightlow.textureNum = -2;
    frontrightlow.matrix = frontrightCoord;
    frontrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
    frontrightlow.matrix.scale(0.08, 0.08, 0.08);
    frontrightlow.matrix.translate(.37, -1.75, -.8);
    frontrightlow.renderfast();
 
    var backleftlow = new Cube();
      backleftlow.matrix = new Matrix4(pigBaseMatrix);
    backleftlow.color = hoofColor;  // Use hoof color for legs
    backleftlow.textureNum = -2;
    backleftlow.matrix = backleftCoord;
    backleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
    backleftlow.matrix.scale(0.08, 0.08, 0.08);
    backleftlow.matrix.translate(-1.25, -1.75, 2);
    backleftlow.renderfast();
 
    var backrightlow = new Cube();
    backrightlow.matrix = new Matrix4(pigBaseMatrix);
    backrightlow.color = hoofColor;  // Use hoof color for legs
    backrightlow.textureNum = -2;
    backrightlow.matrix = backrightCoord;
    backrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
    backrightlow.matrix.scale(0.08, 0.08, 0.08);
    backrightlow.matrix.translate(.37, -1.75, 2);
    backrightlow.renderfast();
    

}

function drawAllShapes(){
   // Pass light pos to GLSL
   gl.uniform3f(u_lightPos, g_lightPos[0], g_lightPos[1], g_lightPos[2]);
   gl.uniform3f(u_cameraPos, g_camera.eye.elements[0], g_camera.eye.elements[1], g_camera.eye.elements[2]);
   gl.uniform1i(u_lightOn, g_lightOn);

   // Draw Map=================================
   // drawMap();

   // Draw animal===============================
   drawAnimal();

   // Sphere ==================================
   var sphere = new Sphere();
   sphere.color = [.9, .6, .95, 1];
   sphere.textureNum = 0;
   if(g_normalOn) sphere.textureNum = -3;
   sphere.matrix.scale(.5, .5, .5);
   sphere.matrix.translate(3, .75, -1.25);
   sphere.render();

   // Point Light ==================================

   var light = new Cube();
   light.color=[2,2,0,1];
   light.matrix.translate(g_lightPos[0], g_lightPos[1],g_lightPos[2]);
   light.matrix.scale(-.1,-.1,-.1);
   light.matrix.translate(-.5, -.5,-.5);
   light.renderfast();

   // Sky =====================================
   var sky = new Cube();
   sky.color = [.6, .9, .95, 1];
   // sky.textureNum = 1;
   if(g_normalOn) sky.textureNum = -3;
   sky.matrix.scale(-10,-10,-10);
   sky.matrix.translate(-.5, -.5, -.5);
   sky.render();


   // Floor ===================================
   var floor = new Cube();
   floor.color = [.2, .9, .4, 1];
   floor.textureNum = 1;
   floor.matrix.translate(0,-.25,0);
   floor.matrix.scale(10,0,10);
   floor.matrix.translate(-.5, 0, -.5);
   floor.render();

}
