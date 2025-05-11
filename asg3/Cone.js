class Cone {
    constructor() {
        this.type = 'cone';
        this.color = [1.0, 0.6, 0.7, 1.0]; // Default color: pink
        this.segments = 20; // Number of segments (smoothness)
        this.matrix = new Matrix4(); // Support full 3D transforms
        this.height = 1.25;  // Height of the cone (tip height)
        this.radius = 0.5;  // Radius of the base
    }

    render() {
        var rgba = this.color;
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        let angleStep = 360 / this.segments;

        for (var angle = 0; angle < 360; angle += angleStep) {
            let rad1 = angle * Math.PI / 180;
            let rad2 = (angle + angleStep) * Math.PI / 180;

            let x1 = this.radius * Math.cos(rad1);
            let y1 = this.radius * Math.sin(rad1);

            let x2 = this.radius * Math.cos(rad2);
            let y2 = this.radius * Math.sin(rad2);

            // Draw side triangle (sharp cone)
            drawTriangle3D([
                0.0, 0.0, this.height,  // Tip at top (sharp point)
                x1, y1, 0.0,            // Base point 1
                x2, y2, 0.0             // Base point 2
            ]);
        }
    }
}
