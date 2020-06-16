//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex

//Overwrote create gear function to take two parameters to
//build user specified gear.
function dSaeleeGear(numTeeth, numSpokes) {
    let drawTooth;
    let norm;
    const vertices = [];
    const colors = [];
    const normals = [];

// Making gear triangles

    const n = numTeeth * 2;
    const rad = 1.0;
    const outRad = rad * 1.2;
    const angInc = 2 * 3.14159 / n;
    let ang = 0;
    let z = 0.1;
    const teethMover = .2;
    const spokeIncrement = n / numSpokes;

    const shaftSize = 3;

    //  coin face, front
    let i;
    for (i = 0; i < n; i++) {

        if (!(i % spokeIncrement === 0)) {

            //Coin face outer rim.
            drawingRectangle(vertices, colors, normals,
                .8 * rad * Math.cos(ang + angInc), .8 * rad * Math.sin(ang + angInc), z,
                .8 * rad * Math.cos(ang), .8 * rad * Math.sin(ang), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);

            //Coin face outer rim walls.
            drawingRectangle(vertices, colors, normals,
                .8 * rad * Math.cos(ang), .8 * rad * Math.sin(ang), z,
                .8 * rad * Math.cos(ang + angInc), .8 * rad * Math.sin(ang + angInc), z,
                .8 * rad * Math.cos(ang + angInc), .8 * rad * Math.sin(ang + angInc), -z,
                .8 * rad * Math.cos(ang), .8 * rad * Math.sin(ang), -z);


        } else {

            //Creates Spokes
            vertices.push(0, 0, z,
                rad * Math.cos(ang), rad * Math.sin(ang), z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

            pushColor(colors);
            normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

            //Spoke side wall 1
            drawingRectangle(vertices, colors, normals,
                .2 * rad * Math.cos(ang), .2 * rad * Math.sin(ang), z,
                .2 * rad * Math.cos(ang), .2 * rad * Math.sin(ang), -z,
                .8 * rad * Math.cos(ang), .8 * rad * Math.sin(ang), -z,
                .8 * rad * Math.cos(ang), .8 * rad * Math.sin(ang), z);

            //Spoke side wall 2
            drawingRectangle(vertices, colors, normals,
                .2 * rad * Math.cos(ang + angInc), .2 * rad * Math.sin(ang + angInc), z,
                .8 * rad * Math.cos(ang + angInc), .8 * rad * Math.sin(ang + angInc), z,
                .8 * rad * Math.cos(ang + angInc), .8 * rad * Math.sin(ang + angInc), -z,
                .2 * rad * Math.cos(ang + angInc), .2 * rad * Math.sin(ang + angInc), -z);


        }
        //Draw shaft walls
        drawingRectangle(vertices, colors, normals,
            .2 * rad * Math.cos(ang), .2 * rad * Math.sin(ang), -shaftSize,
            .2 * rad * Math.cos(ang + angInc), .2 * rad * Math.sin(ang + angInc), -shaftSize,
            .2 * rad * Math.cos(ang + angInc), .2 * rad * Math.sin(ang + angInc), shaftSize,
            .2 * rad * Math.cos(ang), .2 * rad * Math.sin(ang), shaftSize);

        vertices.push(0, 0, shaftSize,
            .2 * rad * Math.cos(ang), .2 * rad * Math.sin(ang), shaftSize,
            .2 * rad * Math.cos(ang + angInc), .2 * rad * Math.sin(ang + angInc), shaftSize);

        pushColor(colors);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        vertices.push(0, 0, -shaftSize,
            .2 * rad * Math.cos(ang), .2 * rad * Math.sin(ang), -shaftSize,
            .2 * rad * Math.cos(ang + angInc), .2 * rad * Math.sin(ang + angInc), -shaftSize);

        pushColor(colors);
        normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

        ang += angInc;
    }

    ang = 0;
    for (i = 0; i < n; i++) {

        if (!(i % spokeIncrement === 0)) {

            //Coin face outer rim (back)
            vertices.push(
                .8 * rad * Math.cos(ang), .8 * rad * Math.sin(ang), -z,
                .8 * rad * Math.cos(ang + angInc), .8 * rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang), rad * Math.sin(ang), -z);
            pushColor(colors);
            normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

            //Coin face outer rim (back)
            vertices.push(
                .8 * rad * Math.cos(ang + angInc), .8 * rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z);

            pushColor(colors);
            normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        } else {
            vertices.push(0, 0, -z,
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z);

            pushColor(colors);
            normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        }
        ang += angInc;
    }

    let r;
    for (r = 0; r < 2; r++) {
        ang = 0;
        drawTooth = false;

        // face of the teeth
        for (i = 0; i < n; i++) {
            drawTooth = !drawTooth;
            if (drawTooth) {

                //inner right
                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    //inner left (top of right)
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    //outer left (top of outer right)
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover);

                pushColor(colors);

                norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover
                );

                if (z > 0) {

                    normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2]);

                } else {
                    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
                }

                //inner right
                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    //outer left (top of outer right)
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover,
                    //outer right (bottom of outer left)
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z * teethMover);


                pushColor(colors);


                norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z * teethMover);


                if (z > 0) {

                    normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2]);

                } else {
                    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
                }

            }
            ang += angInc;
        }
        z = -z;
    }

    // coin edge
    ang = 0;
    drawTooth = true;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z)

            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z)

            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }

        ang += angInc;
    }

    // tooth roof
    ang = 0;
    drawTooth = false;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * teethMover,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z * teethMover,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover)

            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * teethMover,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * teethMover)

            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])

        }
        ang += angInc;
    }

    // tooth walls
    ang = 0;
    drawTooth = false;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {


            norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * teethMover,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * teethMover);

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * teethMover,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * teethMover);
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])


            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * teethMover,
                rad * Math.cos(ang), rad * Math.sin(ang), z);
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);


            norm = calcNormal(rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z * teethMover);

            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z * teethMover,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover);
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);


            vertices.push(
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * teethMover,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);
            pushColor(colors);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

        }
        ang += angInc;
    }
    return [vertices, colors, normals]
}


//Helper method to calculate normals.
function calcNormal(x1, y1, z1, x2, y2, z2, x3, y3, z3) {

    const ux = x2 - x1, uy = y2 - y1, uz = z2 - z1;
    const vx = x3 - x1, vy = y3 - y1, vz = z3 - z1;

    return [uy * vz - uz * vy,
        uz * vx - ux * vz,
        ux * vy - uy * vx];
}

//Helper method to change the color of the gear.
function pushColor(colors) {

    const r = 212 / 255;
    const g = 175 / 255;
    const b = 55 / 255;
    colors.push(r, g, b, r, g, b, r, g, b);
}

//Helper method to draw two triangles.
function drawingRectangle(vertices, colors, normals, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {

    const norm = calcNormal(x1, y1, z1, x2, y2, z2, x3, y3, z3);

    vertices.push(x1, y1, z1, x2, y2, z2, x3, y3, z3);
    pushColor(colors);
    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

    vertices.push(x1, y1, z1, x3, y3, z3, x4, y4, z4);
    pushColor(colors);
    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
}

//Helper method to test code.
// function createGear() {
//
//     return dSaeleeGear(20, 8);
//
// }