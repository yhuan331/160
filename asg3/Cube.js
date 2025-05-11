// class Cube{
//     constructor(){
//        this.color = [1.0, 1.0, 1.0, 1.0];
//        this.matrix = new Matrix4();
//        this.textureNum = -2;
//     }
 
//     render() {
//        var rgba = this.color;
 
//        gl.uniform1i(u_whichTexture, this.textureNum);
 
//        // Pass the color of a point to u_FragColor variable
//        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
//        // Pass the matrix to u_ModelMatrix attribute
//        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
 
//        // Front of Cube
//        drawTriangle3DUV([0.0,1.0,0.0, 1.0,1.0,0.0, 0.0,0.0,0.0 ], [0,0, 1,0, 1,1]);
//        drawTriangle3DUV([0.0,0.0,0.0, 1.0,0.0,0.0, 1.0,1.0,0.0 ], [0,1, 1,1, 0,0]);
//        // Back
//        drawTriangle3DUV([0.0,1.0,1.0, 1.0,1.0,1.0, 0.0,0.0,1.0 ],[0,0, 1,0, 1,1]);
//        drawTriangle3DUV([0.0,0.0,1.0, 1.0,0.0,1.0, 1.0,1.0,1.0 ],[0,1, 1,1, 0,0]);
//        // Top
//        drawTriangle3D([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
//        drawTriangle3D([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
//        // Bottom
//        drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
//        drawTriangle3D([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);
//        // Left
//        drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ],[0,0, 1,0, 1,1]);
//        drawTriangle3D([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ],[0,1, 1,1, 0,0]);
//        // Right
//        drawTriangle3D([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ],[0,0, 1,0, 1,1]);
//        drawTriangle3D([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ],[0,1, 1,1, 0,0]);
 
 
//        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
//        }
 
//        renderfast() {
//           var rgba = this.color;
         
//           gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
//           gl.uniform1i(u_whichTexture, this.textureNum);

 
//           // Pass the color of a point to u_FragColor variable
 
//           // Pass the matrix to u_ModelMatrix attribute
//           gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
 
//           var allverts = [];
//           // Front of Cube
//           allverts = allverts.concat([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
//           allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
//           // Back
//           allverts = allverts.concat([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0 ]);
//           allverts = allverts.concat([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0 ]);
//           // Top
//           allverts = allverts.concat([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
//           allverts = allverts.concat([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
//           // Bottom
//           allverts = allverts.concat([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
//           allverts = allverts.concat([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);
 
//           // Left
//           allverts = allverts.concat([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ]);
//           allverts = allverts.concat([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ]);
//           // Right
//           allverts = allverts.concat([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
//           allverts = allverts.concat([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ]);
 
          
//           drawTriangle3D(allverts);
//           }
 
//  }

//  class RockBlock extends Cube {
//    constructor() {
//      super();
//      this.textureNum = 2;         // Rock texture
//      this.color = [1, 1, 1, 1];   // Use full texture
//    }
//  }

class Cube {
   constructor() {
     this.type = 'cube';
     // this.position = [0.0, 0.0, 0.0];
     this.color = [1.0, 0.7, 0.1, 1.0];
     //this.size = 5.0;
     //this.segments = 10;
     this.matrix = new Matrix4();
     this.textureNum=-1;
   }
 
   render() {
     //let rgba = this.color;
     //gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
 
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
      gl.uniform1i(u_whichTexture, this.textureNum); 
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
      if (this.textureNum === -2) {
         gl.uniform4f(u_FragColor, this.color[0], this.color[1], this.color[2], this.color[3]);
       }
      if (this.textureNum >= 0) {
        const verts = new Float32Array([
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
    
        const uv = new Float32Array([
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
    
        for (let i = 0; i < verts.length; i += 9) {
          const triVerts = verts.subarray(i, i + 9);
          const triUV = uv.subarray((i / 9) * 6, (i / 9) * 6 + 6);
          drawTriangle3DUV(triVerts, triUV);
        }
    
      } else {
        const allVerts = [
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
        ];
        drawTriangle3D(allVerts);
      }
    }
   }