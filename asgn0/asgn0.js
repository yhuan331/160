// // DrawTriangle.js (c) 2012 matsuda
// function main() {  
//   // Retrieve <canvas> element
//   var canvas = document.getElementById('example');  
//   if (!canvas) { 
//     console.log('Failed to retrieve the <canvas> element');
//     return false; 
//   } 

//   // Get the rendering context for 2DCG
//   var ctx = canvas.getContext('2d');

//   // Draw a blue rectangle
//   ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set color to blue
//   ctx.fillRect(120, 10, 150, 150);        // Fill a rectangle with the color
// }

// //---------- above code is for drawing a blue rectangle ----------

function main() {  
    var canvas = document.getElementById('example');  
    if (!canvas) {
      console.log('Failed to retrieve the <canvas> element');
      return false; 
    } 
  
    window.canvas = canvas;
    window.ctx = canvas.getContext('2d');
  
    // Fill background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Initial test vector
    let v1 = new Vector3([2.25, 2.25, 0]);
    drawVector(v1, "red");
  }
  
  function drawVector(v, color) {
    const ctx = window.ctx;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
  
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + v.elements[0] * 20, centerY - v.elements[1] * 20);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  function handleDrawOperationEvent() {
    const x1 = parseFloat(document.getElementById("xInput1").value);
    const y1 = parseFloat(document.getElementById("yInput1").value);
    const v1 = new Vector3([x1, y1, 0]);
  
    const x2 = parseFloat(document.getElementById("xInput2").value);
    const y2 = parseFloat(document.getElementById("yInput2").value);
    const v2 = new Vector3([x2, y2, 0]);
  
    const op = document.getElementById("operation").value;
    const scalar = parseFloat(document.getElementById("scalar").value);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    drawVector(v1, "red");
    drawVector(v2, "blue");
  
    if (op === "add") {
      const v3 = new Vector3([x1, y1, 0]).add(v2);
      drawVector(v3, "green");

    } else if (op === "sub") {
      const v3 = new Vector3([x1, y1, 0]).sub(v2);
      drawVector(v3, "green");

    } else if (op === "mul") {
      const v3 = new Vector3([x1, y1, 0]).mul(scalar);
      const v4 = new Vector3([x2, y2, 0]).mul(scalar);
      drawVector(v3, "green");
      drawVector(v4, "green");

    } else if (op === "div") {
      const v3 = new Vector3([x1, y1, 0]).div(scalar);
      const v4 = new Vector3([x2, y2, 0]).div(scalar);
      drawVector(v3, "green");
      drawVector(v4, "green");

    } else if (op === "magnitude") {
      console.log("Magnitude of v1:", v1.magnitude().toFixed(3));
      console.log("Magnitude of v2:", v2.magnitude().toFixed(3));

    } else if (op === "normalize") {
      const v3 = new Vector3([x1, y1, 0]).normalize();
      const v4 = new Vector3([x2, y2, 0]).normalize();
      drawVector(v3, "green");
      drawVector(v4, "green");
    

    } else if (op === "angle") {
        const angle = angleBetween(v1, v2);
        console.log("Angle between v1 and v2:", angle.toFixed(2), "degrees");

    } else if (op === "area") {
        const area = areaTriangle(v1, v2);
        console.log("Area of triangle formed by v1 and v2:", area.toFixed(3));
      
    
  }

  function handleDrawEvent() {
    // Read v1 values
    const x1 = parseFloat(document.getElementById("xInput1").value);
    const y1 = parseFloat(document.getElementById("yInput1").value);
    const v1 = new Vector3([x1, y1, 0]);
  
    // Read v2 values
    const x2 = parseFloat(document.getElementById("xInput2").value);
    const y2 = parseFloat(document.getElementById("yInput2").value);
    const v2 = new Vector3([x2, y2, 0]);
  
    // Clear canvas and background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw both vectors
    drawVector(v1, "red");
    drawVector(v2, "blue");
  }

  function angleBetween(other1, other2) {
    const dotProd = Vector3.dot(other1, other2);
    const mag1 = other1.magnitude();
    const mag2 = other2.magnitude();
    const angleRad = Math.acos(dotProd / (mag1 * mag2));
    const angleDeg = angleRad * (180 / Math.PI);
    return angleDeg;
  }

  function areaTriangle(v1, v2) {
    const crossProd = Vector3.cross(v1, v2);
    return crossProd.magnitude() / 2;
  }

}
  