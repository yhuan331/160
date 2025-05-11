class Triangle{
    constructor(){
       this.color = [1.0, 1.0, 1.0, 1.0];
       this.matrix = new Matrix4();
    }
 
    render() {
       var rgba = this.color;
 
       // Pass the color of a point to u_FragColor variable
       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
       // Pass the matrix to u_ModelMatrix attribute
       gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
 
       // Front Triangle
       drawTriangle3D([-0.5,0.0,0.0, 0.0,1.0,0.0, 0.5,0.0,0.0 ]);
       //Back Triangle
       drawTriangle3D([-0.5,0.0,0.25, 0.0,1.0,0.25, 0.5,0.0,0.25 ]);
       // Left
       drawTriangle3D([-0.5,0.0,0.25, 0.0,1.0,0.25, 0.0,1.0,0.0 ]);
       drawTriangle3D([-0.5,0.0,0.25, -0.5,0.0,0.0, 0.0,1.0,0.0 ]);
       // Right
       drawTriangle3D([0.5,0.0,0.25, 0.0,1.0,0.25, 0.0,1.0,0.0 ]);
       drawTriangle3D([0.5,0.0,0.25, 0.5,0.0,0.0, 0.0,1.0,0.0 ]);
       // Bottom
       drawTriangle3D([0.5,0.0,0.0, 0.5,0.0,0.25, -0.5,0.0,0.0 ]);
       drawTriangle3D([-0.5,0.0,0.25, -0.5,0.0,0.0, 0.5,0.0,0.0 ]);
 
       gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
       }
 }
 
 function drawTriangle(vertices){
    var n = 3;
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
       console.log('Failed to create the buffer object');
       return -1;
    }
 
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
 
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
 
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
 
    gl.drawArrays(gl.TRIANGLES, 0, n);
 }
 // Modified helper functions to maintain attribute state
function drawTriangle3D(vertices) {
   // Enable position attribute if needed
   if (!g_positionEnabled) {
     gl.enableVertexAttribArray(a_Position);
     g_positionEnabled = true;
   }
   
   // Disable UV attribute if needed
   if (g_uvEnabled) {
     gl.disableVertexAttribArray(a_UV);
     g_uvEnabled = false;
   }
   
   // Set up buffers
   if (g_vertexBuffer === null) {
     g_vertexBuffer = gl.createBuffer();
   }
   
   gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
   gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
 }
 
 function drawTriangle3DUV(vertices, uvs) {
   // Enable position attribute if needed
   if (!g_positionEnabled) {
     gl.enableVertexAttribArray(a_Position);
     g_positionEnabled = true;
   }
   
   // Enable UV attribute if needed
   if (!g_uvEnabled) {
     gl.enableVertexAttribArray(a_UV);
     g_uvEnabled = true;
   }
   
   // Initialize buffers if needed
   if (g_vertexBuffer === null) {
     g_vertexBuffer = gl.createBuffer();
   }
   if (g_uvBuffer === null) {
     g_uvBuffer = gl.createBuffer();
   }
   
   // Set up vertex data
   gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
   
   // Use Float32Array if not already
   if (vertices instanceof Float32Array) {
     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
   } else {
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
   }
   
   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
   
   // Set up UV data
   gl.bindBuffer(gl.ARRAY_BUFFER, g_uvBuffer);
   
   // Use Float32Array if not already
   if (uvs instanceof Float32Array) {
     gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
   } else {
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
   }
   
   gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
   
   // Draw
   gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
 }