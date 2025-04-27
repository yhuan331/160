
function drawAnimal(){
    //Define pig colors
    var bodyColor = [0.97, 0.73, 0.73, 1.0];    // Slightly brighter pink
    var skinColor = [1.0, 0.8, 0.8, 1.0];       // Lighter pink for face
    var snoutColor = [0.93, 0.65, 0.65, 1.0];   // Darker pink for snout
    var hoofColor = [0.85, 0.6, 0.6, 1.0];      // Darker for hoofs
    
    // body 
    var body = new Cube();
    body.color = bodyColor;
    body.matrix.scale(.25, 0.25, 0.35);
    body.matrix.translate(-.5, 0, -0.25);
    body.render();
    
  


    // head 
    var head = new Cube();
    head.color = bodyColor;
    head.matrix.rotate(-g_headAnimation, 1, 0, 0);
    head.matrix.scale(0.35, 0.35, 0.35);
    head.matrix.translate(-.5, 0.25, -1.25);
    head.render();
 

    var face = new Cube();
    face.color = snoutColor;
    face.matrix.rotate(-g_headAnimation, 1, 0, 0);
    face.matrix.scale(0.30, 0.30, 0.03);
    face.matrix.translate(-.5, 0.35, -15.5);
    face.render();
 

    var leftEar = new Cube();
    leftEar.color = skinColor;
    leftEar.matrix.rotate(-g_headAnimation, 1, 0, 0);
    leftEar.matrix.scale(0.12, 0.12, 0.03);
    leftEar.matrix.translate(-1.5, 3.0, -11.95);
    leftEar.render();
 
    var rightEar = new Cube();
    rightEar.color = skinColor;
    rightEar.matrix.rotate(-g_headAnimation, 1, 0, 0);
    rightEar.matrix.scale(0.12, 0.12, 0.03);
    rightEar.matrix.translate(0.5, 3.0, -11.95);
    rightEar.render();
    
 
    var lefteye = new Cube();
    lefteye.color = [1,1,1,1];
    lefteye.matrix.rotate(-g_headAnimation, 1, 0, 0);
    lefteye.matrix.scale(0.1, 0.061, 0.04);
    lefteye.matrix.translate(-1.5, 3.5, -11.95);
    lefteye.render();
 
    var lefteyeblack = new Cube();
    lefteyeblack.color = [0,0,0,1];
    lefteyeblack.matrix.rotate(-g_headAnimation, 1, 0, 0);
    lefteyeblack.matrix.scale(0.05, 0.061, 0.04);
    lefteyeblack.matrix.translate(-3.001, 3.5, -12);
    lefteyeblack.render();
 
    var righteye = new Cube();
    righteye.color = [1,1,1,1];
    righteye.matrix.rotate(-g_headAnimation, 1, 0, 0);
    righteye.matrix.scale(0.1, 0.061, 0.04);
    righteye.matrix.translate(0.5, 3.5, -11.95);
    righteye.render();
 
    var righteyeblack = new Cube();
    righteyeblack.color = [0,0,0,1];
    righteyeblack.matrix.rotate(-g_headAnimation, 1, 0, 0);
    righteyeblack.matrix.scale(0.05, 0.061, 0.04);
    righteyeblack.matrix.translate(2.001, 3.5, -12.05);
    righteyeblack.render();
 
    var snout = new Cube();
    snout.color = snoutColor;
    snout.matrix.rotate(-g_headAnimation, 1, 0, 0);
    snout.matrix.scale(0.15, 0.09, 0.06); 
    snout.matrix.translate(-0.47, 1.5, -8.76);
    snout.render();
    

    // Left Nostril
    var leftNostril = new Cube();
    leftNostril.color = [0.7, 0.4, 0.4, 1.0]; // Dark pink
    leftNostril.matrix.rotate(-g_headAnimation, 1, 0, 0);
    leftNostril.matrix.scale(0.03, 0.03, 0.01);  // Bigger nostril (was 0.02)
    leftNostril.matrix.translate(-2, 5.2, -53); // Move up (6.5) and center better
    leftNostril.render();

    // Right Nostril
    var rightNostril = new Cube();
    rightNostril.color = [0.7, 0.4, 0.4, 1.0];
    rightNostril.matrix.rotate(-g_headAnimation, 1, 0, 0);
    rightNostril.matrix.scale(0.03, 0.03, 0.01);  // Bigger nostril
    rightNostril.matrix.translate(1.15, 5.2, -53); // Move up too
    rightNostril.render();
    // upper legs ============================
    var frontleft = new Cube();
    frontleft.color = bodyColor;
    frontleft.matrix.setTranslate(0, 0, 0);
    frontleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
    var frontleftCoord = new Matrix4(frontleft.matrix);
    frontleft.matrix.scale(.10, -0.10, 0.10);
    frontleft.matrix.translate(-1.15, -.25, -0.75);
    frontleft.render();
 
    var frontright = new Cube();
    frontright.color = bodyColor;
    frontright.matrix.setTranslate(0, 0, 0);
    frontright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
    var frontrightCoord = new Matrix4(frontright.matrix);
    frontright.matrix.scale(.10, -0.10, 0.10);
    frontright.matrix.translate(.2, -.25, -0.75);
    frontright.render();
 
    var backleft = new Cube();
    backleft.color = bodyColor;
    backleft.matrix.setTranslate(0, 0, 0);
    backleft.matrix.rotate(-g_jointAngle, 0, 0, 1); // Joint 1
    var backleftCoord = new Matrix4(backleft.matrix);
    backleft.matrix.scale(.10, -0.10, 0.10);
    backleft.matrix.translate(-1.15, -.25, 1.5);
    backleft.render();
 
    var backright = new Cube();
    backright.color = bodyColor;
    backright.matrix.setTranslate(0, 0, 0);
    backright.matrix.rotate(g_jointAngle, 0, 0, 1); // Joint 1
    var backrightCoord = new Matrix4(backright.matrix);
    backright.matrix.scale(.10, -0.10, 0.10);
    backright.matrix.translate(.2, -.25, 1.5);
    backright.render();
 
    // lower leg =======================================
    var frontleftlow = new Cube();
    frontleftlow.color = hoofColor;  // Use hoof color for legs
    frontleftlow.matrix = frontleftCoord;
    frontleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
    frontleftlow.matrix.scale(0.08, 0.08, 0.08);
    frontleftlow.matrix.translate(-1.25, -1.75, -.8);
    frontleftlow.render();
 
    var frontrightlow = new Cube();
    frontrightlow.color = hoofColor;  // Use hoof color for legs
    frontrightlow.matrix = frontrightCoord;
    frontrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
    frontrightlow.matrix.scale(0.08, 0.08, 0.08);
    frontrightlow.matrix.translate(.37, -1.75, -.8);
    frontrightlow.render();
 
    var backleftlow = new Cube();
    backleftlow.color = hoofColor;  // Use hoof color for legs
    backleftlow.matrix = backleftCoord;
    backleftlow.matrix.rotate(-g_jointAngle2, 0, 0, 1);
    backleftlow.matrix.scale(0.08, 0.08, 0.08);
    backleftlow.matrix.translate(-1.25, -1.75, 2);
    backleftlow.render();
 
    var backrightlow = new Cube();
    backrightlow.color = hoofColor;  // Use hoof color for legs
    backrightlow.matrix = backrightCoord;
    backrightlow.matrix.rotate(g_jointAngle2, 0, 0, 1);
    backrightlow.matrix.scale(0.08, 0.08, 0.08);
    backrightlow.matrix.translate(.37, -1.75, 2);
    backrightlow.render();
    

    var tail = new Cone();
    tail.color = hoofColor;
    tail.matrix.setIdentity();
    tail.matrix.translate(0.0, 0.14, 0.26);  // back of pig (adjust Y, Z carefully)
    tail.matrix.scale(0.1,0.1,0.1);     // SMALL tail: width tiny, height moderate
    tail.segments = 30; // smoother
    tail.render();


}
