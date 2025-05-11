
// class Cube {
//    constructor() {
//      this.type = 'cube';
//      // this.position = [0.0, 0.0, 0.0];
//      this.color = [1.0, 0.7, 0.1, 1.0];
//      //this.size = 5.0;
//      //this.segments = 10;
//      this.matrix = new Matrix4();
//      this.textureNum=-1;
//    }
 
//    render() {
//      //let rgba = this.color;
//      //gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
//      gl.uniform1i(u_whichTexture, this.textureNum);
 
//      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
 
//      // FRONT
//      drawTriangle3DUV(
//        [0, 0, 0,   1, 1, 0,   1, 0, 0],
//        [0, 0,      1, 1,      1, 0]
//      );
//      drawTriangle3DUV(
//        [0, 0, 0,   0, 1, 0,   1, 1, 0],
//        [0, 0,      0, 1,      1, 1]
//      );
 
//      // TOP
//      drawTriangle3DUV(
//        [0, 1, 0,   0, 1, 1,   1, 1, 1],
//        [0, 0,      0, 1,      1, 1]
//      );
//      drawTriangle3DUV(
//        [0, 1, 0,   1, 1, 1,   1, 1, 0],
//        [0, 0,      1, 1,      1, 0]
//      );
 
//      // BOTTOM
//      drawTriangle3DUV(
//        [0, 0, 0,   1, 0, 0,   1, 0, 1],
//        [0, 0,      1, 0,      1, 1]
//      );
//      drawTriangle3DUV(
//        [0, 0, 0,   1, 0, 1,   0, 0, 1],
//        [0, 0,      1, 1,      0, 1]
//      );
 
//      // LEFT
//      drawTriangle3DUV(
//        [0, 0, 0,   0, 0, 1,   0, 1, 1],
//        [0, 0,      1, 0,      1, 1]
//      );
//      drawTriangle3DUV(
//        [0, 0, 0,   0, 1, 1,   0, 1, 0],
//        [0, 0,      1, 1,      0, 1]
//      );
 
//      // RIGHT
//      drawTriangle3DUV(
//        [1, 0, 0,   1, 1, 0,   1, 1, 1],
//        [0, 0,      0, 1,      1, 1]
//      );
//      drawTriangle3DUV(
//        [1, 0, 0,   1, 1, 1,   1, 0, 1],
//        [0, 0,      1, 1,      1, 0]
//      );
 
//      // BACK
//      drawTriangle3DUV(
//        [0, 0, 1,   1, 0, 1,   1, 1, 1],
//        [0, 0,      1, 0,      1, 1]
//      );
//      drawTriangle3DUV(
//        [0, 0, 1,   1, 1, 1,   0, 1, 1],
//        [0, 0,      1, 1,      0, 1]
//      );
//    }
//    renderfast() {
//       gl.uniform1i(u_whichTexture, this.textureNum); 
//       gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
//       if (this.textureNum === -2) {
//          gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
//        }
//       if (this.textureNum >= 0) {
//         const verts = new Float32Array([
//           // FRONT
//           0, 0, 0,   1, 1, 0,   1, 0, 0,
//           0, 0, 0,   0, 1, 0,   1, 1, 0,
//           // TOP
//           0, 1, 0,   0, 1, 1,   1, 1, 1,
//           0, 1, 0,   1, 1, 1,   1, 1, 0,
//           // RIGHT
//           1, 0, 0,   1, 1, 0,   1, 1, 1,
//           1, 0, 0,   1, 1, 1,   1, 0, 1,
//           // LEFT
//           0, 0, 0,   0, 0, 1,   0, 1, 1,
//           0, 0, 0,   0, 1, 1,   0, 1, 0,
//           // BOTTOM
//           0, 0, 0,   0, 0, 1,   1, 0, 1,
//           0, 0, 0,   1, 0, 1,   1, 0, 0,
//           // BACK
//           0, 0, 1,   1, 0, 1,   1, 1, 1,
//           0, 0, 1,   1, 1, 1,   0, 1, 1,
//         ]);
    
//         const uv = new Float32Array([
//           // FRONT
//           0, 0,  1, 1,  1, 0,
//           0, 0,  0, 1,  1, 1,
//           // TOP
//           0, 0,  0, 1,  1, 1,
//           0, 0,  1, 1,  1, 0,
//           // RIGHT
//           0, 0,  0, 1,  1, 1,
//           0, 0,  1, 1,  1, 0,
//           // LEFT
//           0, 0,  0, 1,  1, 1,
//           0, 0,  1, 1,  1, 0,
//           // BOTTOM
//           0, 0,  0, 1,  1, 1,
//           0, 0,  1, 1,  1, 0,
//           // BACK
//           0, 0,  1, 0,  1, 1,
//           0, 0,  1, 1,  0, 1,
//         ]);
    
//         for (let i = 0; i < verts.length; i += 9) {
//           const triVerts = verts.subarray(i, i + 9);
//           const triUV = uv.subarray((i / 9) * 6, (i / 9) * 6 + 6);
//           drawTriangle3DUV(triVerts, triUV);
//         }
    
//       } else {
//         const allVerts = [
//           // FRONT
//           0, 0, 0,   1, 1, 0,   1, 0, 0,
//           0, 0, 0,   0, 1, 0,   1, 1, 0,
//           // TOP
//           0, 1, 0,   0, 1, 1,   1, 1, 1,
//           0, 1, 0,   1, 1, 1,   1, 1, 0,
//           // RIGHT
//           1, 0, 0,   1, 1, 0,   1, 1, 1,
//           1, 0, 0,   1, 1, 1,   1, 0, 1,
//           // LEFT
//           0, 0, 0,   0, 0, 1,   0, 1, 1,
//           0, 0, 0,   0, 1, 1,   0, 1, 0,
//           // BOTTOM
//           0, 0, 0,   0, 0, 1,   1, 0, 1,
//           0, 0, 0,   1, 0, 1,   1, 0, 0,
//           // BACK
//           0, 0, 1,   1, 0, 1,   1, 1, 1,
//           0, 0, 1,   1, 1, 1,   0, 1, 1,
//         ];
//         drawTriangle3D(allVerts);
//       }
//     }
//    }
// Global WebGL buffers for vertex and UV data
// Global WebGL buffers for vertex and UV data
let g_vertexBuffer = null;
let g_uvBuffer = null;

// Track which attributes are enabled to avoid redundant state changes
let g_positionEnabled = false;
let g_uvEnabled = false;

// Initialize buffers once
function initBuffers() {
  if (g_vertexBuffer === null) {
    g_vertexBuffer = gl.createBuffer();
  }
  
  if (g_uvBuffer === null) {
    g_uvBuffer = gl.createBuffer();
  }
}

class Cube {
  constructor() {
    this.type = 'cube';
    this.color = [1.0, 0.7, 0.1, 1.0];
    this.matrix = new Matrix4();
    this.textureNum = -1;
    
    // Pre-compute vertex data
    this.vertices32 = new Float32Array([
      // FRONT
      0, 0, 0,   1, 1, 0,   1, 0, 0,
      0, 0, 0,   0, 1, 0,   1, 1, 0,
      // TOP
      0, 1, 0,   0, 1, 1,   1, 1, 1,
      0, 1, 0,   1, 1, 1,   1, 1, 0,
      // RIGHT
      1, 0, 0,   1, 1, 0,   1, 1, 1,
      1, 0, 0,   1, 1, 1,   1, 0, 1,
      // LEFT
      0, 0, 0,   0, 0, 1,   0, 1, 1,
      0, 0, 0,   0, 1, 1,   0, 1, 0,
      // BOTTOM
      0, 0, 0,   0, 0, 1,   1, 0, 1,
      0, 0, 0,   1, 0, 1,   1, 0, 0,
      // BACK
      0, 0, 1,   1, 0, 1,   1, 1, 1,
      0, 0, 1,   1, 1, 1,   0, 1, 1,
    ]);
    
    // Pre-compute UV data
    this.uv32 = new Float32Array([
      // FRONT
      0, 0,  1, 1,  1, 0,
      0, 0,  0, 1,  1, 1,
      // TOP
      0, 0,  0, 1,  1, 1,
      0, 0,  1, 1,  1, 0,
      // RIGHT
      0, 0,  0, 1,  1, 1,
      0, 0,  1, 1,  1, 0,
      // LEFT
      0, 0,  0, 1,  1, 1,
      0, 0,  1, 1,  1, 0,
      // BOTTOM
      0, 0,  0, 1,  1, 1,
      0, 0,  1, 1,  1, 0,
      // BACK
      0, 0,  1, 0,  1, 1,
      0, 0,  1, 1,  0, 1,
    ]);
  }

  render() {
    // Keep the original render method for sky and floor
    gl.uniform1i(u_whichTexture, this.textureNum);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // FRONT
    drawTriangle3DUV(
      [0, 0, 0,   1, 1, 0,   1, 0, 0],
      [0, 0,      1, 1,      1, 0]
    );
    drawTriangle3DUV(
      [0, 0, 0,   0, 1, 0,   1, 1, 0],
      [0, 0,      0, 1,      1, 1]
    );

    // TOP
    drawTriangle3DUV(
      [0, 1, 0,   0, 1, 1,   1, 1, 1],
      [0, 0,      0, 1,      1, 1]
    );
    drawTriangle3DUV(
      [0, 1, 0,   1, 1, 1,   1, 1, 0],
      [0, 0,      1, 1,      1, 0]
    );

    // BOTTOM
    drawTriangle3DUV(
      [0, 0, 0,   1, 0, 0,   1, 0, 1],
      [0, 0,      1, 0,      1, 1]
    );
    drawTriangle3DUV(
      [0, 0, 0,   1, 0, 1,   0, 0, 1],
      [0, 0,      1, 1,      0, 1]
    );

    // LEFT
    drawTriangle3DUV(
      [0, 0, 0,   0, 0, 1,   0, 1, 1],
      [0, 0,      1, 0,      1, 1]
    );
    drawTriangle3DUV(
      [0, 0, 0,   0, 1, 1,   0, 1, 0],
      [0, 0,      1, 1,      0, 1]
    );

    // RIGHT
    drawTriangle3DUV(
      [1, 0, 0,   1, 1, 0,   1, 1, 1],
      [0, 0,      0, 1,      1, 1]
    );
    drawTriangle3DUV(
      [1, 0, 0,   1, 1, 1,   1, 0, 1],
      [0, 0,      1, 1,      1, 0]
    );

    // BACK
    drawTriangle3DUV(
      [0, 0, 1,   1, 0, 1,   1, 1, 1],
      [0, 0,      1, 0,      1, 1]
    );
    drawTriangle3DUV(
      [0, 0, 1,   1, 1, 1,   0, 1, 1],
      [0, 0,      1, 1,      0, 1]
    );
  }

  renderfast() {
    // Set uniforms once per cube
    gl.uniform1i(u_whichTexture, this.textureNum);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    
    if (this.textureNum === -2) {
      gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
    }
    
    // Initialize buffers if needed
    initBuffers();
    
    // Enable position attribute if not already enabled
    if (!g_positionEnabled) {
      gl.enableVertexAttribArray(a_Position);
      g_positionEnabled = true;
    }
    
    // Set up vertex data
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices32, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
    // Handle UV data for textured objects
    if (this.textureNum >= 0) {
      // Enable UV attribute if not already enabled
      if (!g_uvEnabled) {
        gl.enableVertexAttribArray(a_UV);
        g_uvEnabled = true;
      }
      
      // Set up UV data
      gl.bindBuffer(gl.ARRAY_BUFFER, g_uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.uv32, gl.STATIC_DRAW);
      gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    } else {
      // Disable UV attribute if it's enabled but not needed
      if (g_uvEnabled) {
        gl.disableVertexAttribArray(a_UV);
        g_uvEnabled = false;
      }
    }
    
    // Draw all triangles at once
    gl.drawArrays(gl.TRIANGLES, 0, this.vertices32.length / 3);
  }
}