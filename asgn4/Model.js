// class Model {
//   constructor(filePath) {
//     this.ready = false;
//     this.vertexBuffer = null;
//     this.normalBuffer = null;
//     this.colorBuffer = null;
//     this.numVertices = 0;
    
//     console.log("Loading model from:", filePath);
    
//     // Create OBJLoader with the file path
//     const loader = new OBJLoader(filePath);
    
//     // Start the loading process
//     loader.parseModel()
//       .then(() => {
//         // Check if the model is fully loaded
//         if (loader.isFullyLoaded) {
//           // Get the model data
//           const info = loader.getModelData();
//           this.numVertices = info.vertices.length / 3;
          
//           console.log(`Model data received: ${this.numVertices} vertices`);
          
//           if (this.numVertices > 0) {
//             // Create and bind vertex buffer
//             this.vertexBuffer = gl.createBuffer();
//             gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
//             gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.vertices), gl.STATIC_DRAW);
            
//             // Create and bind normal buffer
//             this.normalBuffer = gl.createBuffer();
//             gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
//             gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.normals), gl.STATIC_DRAW);
            
//             // Create and bind color buffer
//             this.colorBuffer = gl.createBuffer();
//             gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
//             gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.colors), gl.STATIC_DRAW);
            
//             // Mark as ready
//             this.ready = true;
//             console.log(`✅ Model ready with ${this.numVertices} vertices!`);
            
//             // Force a render to show the model
//             renderScene();
//           } else {
//             console.error("⚠️ Model has 0 vertices. Check the OBJ file format.");
//           }
//         } else {
//           console.error("⚠️ Model loading incomplete - check OBJ and MTL files.");
//         }
//       })
//       .catch(error => {
//         console.error("Error loading model:", error);
//       });
//   }

//   render() {
//     if (!this.ready || this.numVertices === 0) {
//       // Don't try to render if not ready
//       return;
//     }

//     // Set up for rendering
//     gl.uniform1i(u_whichTexture, -2);
//     gl.uniform4f(u_FragColor, 1, 1, 1, 1);

//     // Set up vertex buffer
//     gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
//     gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Position);

//     // Set up normal buffer
//     gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
//     gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Normal);

//     // Set up model matrix
//     let modelMatrix = new Matrix4();
//     modelMatrix.setIdentity(); // reset transform
//     modelMatrix.translate(0, 0, 0); // center it
//     modelMatrix.scale(0.5, 0.5, 0.5); // scale it to a reasonable size
    
//     gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

//     // Set up normal matrix
//     let normalMatrix = new Matrix4();
//     normalMatrix.setInverseOf(modelMatrix);
//     normalMatrix.transpose();
//     gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

//     // Draw the model
//     gl.drawArrays(gl.TRIANGLES, 0, this.numVertices);
//     console.log("Rendering model with", this.numVertices, "vertices");
//   }
// }
class Model {
  constructor(filePath) {
    this.ready = false;
    this.vertexBuffer = null;
    this.normalBuffer = null;
    this.colorBuffer = null;
    this.numVertices = 0;
    
    console.log("Loading model from:", filePath);
    
    // Create OBJLoader with the file path
    const loader = new OBJLoader(filePath);
    
    // Start the loading process
    loader.parseModel()
      .then(() => {
        // Check if the model is fully loaded
        if (loader.isFullyLoaded) {
          // Get the model data
          const info = loader.getModelData();
          this.numVertices = info.vertices.length / 3;
          
          console.log(`Model data received: ${this.numVertices} vertices`);
          
          if (this.numVertices > 0) {
            // Enable WebGL extension for large element indices if needed
            gl.getExtension('OES_element_index_uint');
            
            // Create and bind vertex buffer
            this.vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, info.vertices, gl.STATIC_DRAW);
            
            // Create and bind normal buffer
            this.normalBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, info.normals, gl.STATIC_DRAW);
            
            // Create and bind color buffer
            this.colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, info.colors, gl.STATIC_DRAW);
            
            // Set up texture coordinates if needed (UV)
            this.hasUV = false;
            if (a_UV >= 0) {
              // Set up dummy UV coordinates if your shader requires them
              this.uvBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
              const dummyUVs = new Float32Array(this.numVertices * 2);
              for (let i = 0; i < this.numVertices * 2; i++) {
                dummyUVs[i] = 0.0; // Default UV coordinate
              }
              gl.bufferData(gl.ARRAY_BUFFER, dummyUVs, gl.STATIC_DRAW);
              this.hasUV = true;
            }
            
            // Mark as ready
            this.ready = true;
            console.log(`✅ Model ready with ${this.numVertices} vertices!`);
            
            // Force a render to show the model
            renderScene();
          } else {
            console.error("⚠️ Model has 0 vertices. Check the OBJ file format.");
          }
        } else {
          console.error("⚠️ Model loading incomplete - check OBJ and MTL files.");
        }
      })
      .catch(error => {
        console.error("Error loading model:", error);
      });
  }

  render() {
    if (!this.ready || this.numVertices === 0) {
      // Don't try to render if not ready
      return;
    }

    // Set up for rendering
    gl.uniform1i(u_whichTexture, -2);
    gl.uniform4f(u_FragColor, 1, 1, 1, 1);

    // Set up vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    // Set up normal buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Normal);

    // Set up UV if needed
    if (this.hasUV && a_UV >= 0) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
      gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(a_UV);
    } else if (a_UV >= 0) {
      // Disable UV attribute if not used
      gl.disableVertexAttribArray(a_UV);
    }

    // Set up model matrix
    let modelMatrix = new Matrix4();
    modelMatrix.setIdentity(); // reset transform
    modelMatrix.translate(-1.0, 0, 0); // Move 1 unit to the left (negative X)
    modelMatrix.rotate(50, 0, 1, 0);     // Rotate 90 degrees around Y-axis (turn right)
    modelMatrix.scale(0.5, 0.5, 0.5); // Scale it appropriately
    
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    // Set up normal matrix
    let normalMatrix = new Matrix4();
    normalMatrix.setInverseOf(modelMatrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

    // Use a safer vertex count to avoid errors
    const safeCount = Math.min(this.numVertices, 65535); // WebGL's standard limit
    
    // Draw the model
    try {
      gl.drawArrays(gl.TRIANGLES, 0, safeCount);
     // console.log("Rendering model with", safeCount, "vertices");
    } catch (e) {
      console.error("Error rendering:", e);
    }
  }
}