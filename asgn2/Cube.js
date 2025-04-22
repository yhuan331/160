class Cube{
    constructor(){
      this.type='cube';
    //   this.position = [0.0, 0.0, 0.0];
      this.color = [1.0,1.0,1.0,1.0];
    //   this.size = 5.0;
    //   this.segments = 10;
    this.matrix = new Matrix4();
    }
  
    render(){
      //var xy = this.position;
      var rgba = this.color;
    //   var size = this.size;
  
      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      gl.uniformMatrix4fv(u_ModelMatrix, false,  this.matrix.elements);
  
      //front of the cube
      drawTriangle3D([0,0,0, 1,1,0 , 1,0,0])
      drawTriangle3D([0,0,0 , 0,1,0 , 1,1,0])

//lighting ?
     gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);

      //top of the cube 
      drawTriangle3D([0,1,0, 0,1,1, 1,1,1])
      drawTriangle3D([0,1,0, 1,1,1, 1,1,0])
    }
  }
    