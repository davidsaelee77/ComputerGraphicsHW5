/**
 * Patrick Moy
 * TCSS 458
 * HW4 - Gear
 */

//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function patrickMoyGear(numTeeth, numSpokes) {

    const vertices = [];
    const colors = [];
    const normals = [];

    const COLOR_RED = 204;
    const COLOR_GREEN = 211;
    const COLOR_BLUE = 216;
    const colorArray = [];

    setupColors(colorArray, COLOR_RED, COLOR_GREEN, COLOR_BLUE);
    // Having set this up, we can just call [].push.apply(colors, colorArray/colorArray) to push our vertex colors.

    const CENTER_R = 0.35;
    const INNER_R = 0.65;
    const SLANT_Z = .5;

////////////////////////////
// Making gear triangles

    const n = 2 * numTeeth;
    const m = 2 * numSpokes;

    const rad = 1.0;
    const outRad = rad * 1.15;
    const angInc = 2 * 3.14159 / n;
    const spokeAngInc = 2 * 3.14159 / m;
    let ang = 0;
    let z = 0.1;

    let shaftLength = 2;

    let i;
    for (i = 0; i < n; i++) {

        // Inner coin, front face
        createTrianglePM(vertices, colors, normals, colorArray,
            0, 0, shaftLength ,
            CENTER_R * rad * Math.cos(ang),
            CENTER_R * rad * Math.sin(ang), shaftLength ,
            CENTER_R * rad * Math.cos(ang + angInc),
            CENTER_R * rad * Math.sin(ang + angInc), shaftLength );

        // Inner coin, back face (old)
        // createTrianglePM(vertices, colors, normals, colorArray2, 0,0, -z,
        //     CENTER_R * rad * Math.cos(ang), CENTER_R * rad * Math.sin(ang), -z,
        //     CENTER_R * rad * Math.cos(ang + angInc), CENTER_R * rad * Math.sin(ang+angInc), -z);
        // TODO: Normal seems wrong here? Or am I misinterpreting specular

        // Inner coin, back face
        vertices.push(0, 0, -shaftLength ,
            CENTER_R * rad * Math.cos(ang), CENTER_R * rad * Math.sin(ang), -shaftLength ,
            CENTER_R * rad * Math.cos(ang + angInc), CENTER_R * rad * Math.sin(ang + angInc), -shaftLength);
        [].push.apply(colors, colorArray);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        // Outer coin, front face
        createRectanglePM(vertices, colors, normals, colorArray,
            INNER_R * rad * Math.cos(ang + angInc), INNER_R * rad * Math.sin(ang + angInc), z,
            INNER_R * rad * Math.cos(ang), INNER_R * rad * Math.sin(ang), z,
            rad * Math.cos(ang), rad * Math.sin(ang), z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);

        // Outer coin, back face
        vertices.push(
            INNER_R * rad * Math.cos(ang), INNER_R * rad * Math.sin(ang), -z,
            INNER_R * rad * Math.cos(ang + angInc), INNER_R * rad * Math.sin(ang + angInc), -z,
            rad * Math.cos(ang), rad * Math.sin(ang), -z);
        [].push.apply(colors, colorArray);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        vertices.push(
            INNER_R * rad * Math.cos(ang + angInc), INNER_R * rad * Math.sin(ang + angInc), -z,
            rad * Math.cos(ang), rad * Math.sin(ang), -z,
            rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z);
        [].push.apply(colors, colorArray);
        normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

        // Inner coin, edge
        createRectanglePM(vertices, colors, normals, colorArray,
            CENTER_R * rad * Math.cos(ang),
            CENTER_R * rad * Math.sin(ang),
            -shaftLength,
            CENTER_R * rad * Math.cos(ang + angInc),
            CENTER_R * rad * Math.sin(ang + angInc),
            -shaftLength,
            CENTER_R * rad * Math.cos(ang + angInc),
            CENTER_R * rad * Math.sin(ang + angInc),
            shaftLength,
            CENTER_R * rad * Math.cos(ang),
            CENTER_R * rad * Math.sin(ang),
            shaftLength);

        // Outer coin, inner edge
        createRectanglePM(vertices, colors, normals, colorArray, INNER_R * rad * Math.cos(ang), INNER_R * rad * Math.sin(ang), z,
            INNER_R * rad * Math.cos(ang + angInc), INNER_R * rad * Math.sin(ang + angInc), z,
            INNER_R * rad * Math.cos(ang + angInc), INNER_R * rad * Math.sin(ang + angInc), -z,
            INNER_R * rad * Math.cos(ang), INNER_R * rad * Math.sin(ang), -z);

        ang += angInc;
    }

    ang = 0;

    let r;
    for (r = 0; r < 2; r++) {
        ang = 0;
        let drawTooth = false;

        // Teeth faces
        for (i = 0; i < n; i++) {
            drawTooth = !drawTooth;
            if (drawTooth) {

                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang),
                    z, rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z);
                [].push.apply(colors, colorArray);
                if (z > 0) {
                    let norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), z,
                        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z);
                    normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2]);
                } else {
                    let norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), z,
                        rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                        outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z);
                    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
                }
                vertices.push(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z * SLANT_Z);
                [].push.apply(colors, colorArray);
                let norm = calcNormal(rad * Math.cos(ang), rad * Math.sin(ang), z,
                    outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z,
                    outRad * Math.cos(ang), outRad * Math.sin(ang), z * SLANT_Z);
                if (z > 0) {
                    normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2]);
                } else {
                    normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);
                }

                // createTrianglePM(vertices, colors, normals, colorArray2, rad*Math.cos(ang), rad*Math.sin(ang), z,
                //     rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                //     outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * SLANT_Z);
                //
                // createTrianglePM(vertices, colors, normals, colorArray2, rad*Math.cos(ang), rad*Math.sin(ang), z,
                //     outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), z * SLANT_Z,
                //     outRad*Math.cos(ang), outRad*Math.sin(ang), z * SLANT_Z);

                // One face not normalized properly? createTrianglePM may be bugged... use manually set normals??
            }
            ang += angInc;
        }
        z = -z;
    }

    ang = 0;
    let drawTooth = true;
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        let norm = [rad * Math.cos(ang + angInc / 2), rad * Math.sin(ang + angInc / 2), 0];
        if (drawTooth) {
            // createTrianglePM(vertices, colors, normals, colorArray2, rad*Math.cos(ang),rad*Math.sin(ang),-z,
            //     rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),-z,
            //     rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z);
            // Reverting to manual normals? Calling calcNormal within triangle function wonky SOMETIMES...but not all
            // the time.

            // Outer coin, outer edge
            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);
            [].push.apply(colors, colorArray);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2]);

            // createTrianglePM(vertices, colors, normals, colorArray2,  rad*Math.cos(ang),rad*Math.sin(ang),-z,
            //     rad*Math.cos(ang+angInc),rad*Math.sin(ang+angInc),z,
            //     rad*Math.cos(ang),rad*Math.sin(ang),z );

            vertices.push(
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z,
                rad * Math.cos(ang), rad * Math.sin(ang), z);
            [].push.apply(colors, colorArray);
            normals.push(norm[0], norm[1], norm[2], norm[0], norm[1], norm[2], norm[0], norm[1], norm[2])
        }
        ang += angInc;
    }


    ang = 0;
    drawTooth = false;

    // Tooth roof
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {

            let norm = [outRad * Math.cos(ang + angInc / 2), outRad * Math.sin(ang + angInc / 2), 0];
            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * SLANT_Z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), -z * SLANT_Z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z);
            [].push.apply(colors, colorArray);
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2]);

            vertices.push(
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * SLANT_Z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * SLANT_Z);

            [].push.apply(colors, colorArray);
            normals.push(-norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2], -norm[0], -norm[1], -norm[2])

        }
        ang += angInc;
    }

    ang = 0;

    drawTooth = false;
    // Tooth wall
    for (i = 0; i < n; i++) {
        drawTooth = !drawTooth;
        if (drawTooth) {
            createTrianglePM(vertices, colors, normals, colorArray, rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), -z * SLANT_Z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * SLANT_Z);

            createTrianglePM(vertices, colors, normals, colorArray, rad * Math.cos(ang), rad * Math.sin(ang), -z,
                outRad * Math.cos(ang), outRad * Math.sin(ang), z * SLANT_Z,
                rad * Math.cos(ang), rad * Math.sin(ang), z);

            createTrianglePM(vertices, colors, normals, colorArray, rad * Math.cos(ang + angInc),
                rad * Math.sin(ang + angInc), -z, outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc),
                -z * SLANT_Z, outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z);

            createTrianglePM(vertices, colors, normals, colorArray, rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), -z,
                outRad * Math.cos(ang + angInc), outRad * Math.sin(ang + angInc), z * SLANT_Z,
                rad * Math.cos(ang + angInc), rad * Math.sin(ang + angInc), z);

        }
        ang += angInc;
    }

    ang = 0;

    let drawSpoke = false;
    // Spokes
    for (i = 0; i < m; i++) {
        if (drawSpoke) {

            // Spoke faces, front and back
            vertices.push(0, 0, z,
                (INNER_R + rad) / 2 * Math.cos(ang), (INNER_R + rad) / 2 * Math.sin(ang), z,
                (INNER_R + rad) / 2 * Math.cos(ang + spokeAngInc), (INNER_R + rad) / 2 * Math.sin(ang + spokeAngInc), z);
            [].push.apply(colors, colorArray);
            normals.push(0, 0, 1, 0, 0, 1, 0, 0, 1);

            vertices.push(0, 0, -z,
                rad * Math.cos(ang), rad * Math.sin(ang), -z,
                rad * Math.cos(ang + spokeAngInc), rad * Math.sin(ang + spokeAngInc), -z);

            [].push.apply(colors, colorArray);
            normals.push(0, 0, -1, 0, 0, -1, 0, 0, -1);

            // Spoke walls
            createRectanglePM(vertices, colors, normals, colorArray, CENTER_R * rad * Math.cos(ang), CENTER_R * rad * Math.sin(ang), z,
                CENTER_R * rad * Math.cos(ang), CENTER_R * rad * Math.sin(ang), -z,
                INNER_R * rad * Math.cos(ang), INNER_R * rad * Math.sin(ang), -z,
                INNER_R * rad * Math.cos(ang), INNER_R * rad * Math.sin(ang), z);
            createRectanglePM(vertices, colors, normals, colorArray, CENTER_R * rad * Math.cos(ang + angInc), CENTER_R * rad * Math.sin(ang + spokeAngInc), z,
                INNER_R * rad * Math.cos(ang + spokeAngInc), INNER_R * rad * Math.sin(ang + spokeAngInc), z,
                INNER_R * rad * Math.cos(ang + spokeAngInc), INNER_R * rad * Math.sin(ang + spokeAngInc), -z,
                CENTER_R * rad * Math.cos(ang + spokeAngInc), CENTER_R * rad * Math.sin(ang + spokeAngInc), -z);

        }
        drawSpoke = !drawSpoke;

        ang += spokeAngInc;

    }
    return [vertices, colors, normals]
}

/**
 * Abstracting creation of a triangle (pushing vertices, colors, normals).
 * Unsure because at times, normal seems to be incorrect (although console logs look reasonable?)
 */
function createTrianglePM(vertices, colors, normals, colorChoice, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    vertices.push(x1, y1, z1, x2, y2, z2, x3, y3, z3);
    [].push.apply(colors, colorChoice);
    const normal = calcNormal(x1, y1, z1, x2, y2, z2, x3, y3, z3);
    normals.push(normal[0], normal[1], normal[2], normal[0], normal[1], normal[2], normal[0], normal[1], normal[2]);
}

/**
 * Calls createTrianglePM twice to create a rectangle. Normals are the same.
 */
function createRectanglePM(vertices, colors, normals, colorChoice, x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4) {
    createTrianglePM(vertices, colors, normals, colorChoice, x1, y1, z1, x2, y2, z2, x3, y3, z3);
    createTrianglePM(vertices, colors, normals, colorChoice, x1, y1, z1, x3, y3, z3, x4, y4, z4);
}

/**
 * Setup function for [].push.apply
 */
function setupColors(array, red, green, blue) {
    if (array.length === 0) {
        const r = red / 255;
        const g = green / 255;
        const b = blue / 255;
        array.push(r, g, b, r, g, b, r, g, b);
    }
}

function calcNormal(x1, y1, z1,
                    x2, y2, z2,
                    x3, y3, z3) {

    var ux = x2 - x1, uy = y2 - y1, uz = z2 - z1;
    var vx = x3 - x1, vy = y3 - y1, vz = z3 - z1;

    let result = [uy * vz - uz * vy,
        uz * vx - ux * vz,
        ux * vy - uy * vx];
    return result;
}