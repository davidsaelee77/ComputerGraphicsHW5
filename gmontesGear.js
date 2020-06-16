/**
 * Build the object, including geometry (triangle vertices)
 * and colors and normals for each vertex
 * @param numTeeth, the number of teeth the gear should have
 * @param numSpokes, the number of spokes the gear should have
 * @param circleRad, OPTIONAL (defaults to 1) the radius of the gear if it didn't have any teeth.
 * @param toothWidth, OPTIONAL (defaults to 0.2) the size of the teeth.
 *  Gets added to the circleRad for a total tooth radius.
 * @param thickness, OPTIONAL (defaults to 0.2) the thickness of the gear
 * @param shaftSize, OPTIONAL (defaults to 0) the thickness of the shaft of the gear (think cylindrical height)
 *  Gets added to the thickness
 *
 *  None of the parameters should be negative, attempt at you own risk!
 *
 * @returns {[][]} a list of vertices, colors, and normals in that order
 */
function gmontesGear(numTeeth, numSpokes,
                     circleRad = 1.0,
                     toothWidth = 0.2,
                     thickness = 0.2,
                     shaftSize = 0) {
    const vertices = [];
    const colors = [];
    const normals = [];

    // Number of outer sections
    var n = numTeeth * 2;

    // Number of inner sections
    var m = numSpokes * 2;

    // The radius of the most inner cylinder
    // (The inner edge of the spokes
    var coinRad = 0.2 * circleRad;
    // The radius of the outer edge of the spokes
    var spokeRad = 0.8 * circleRad;
    // The radius of the gear before the teeth
    // The radius of the teeth
    var toothRad = circleRad * (1.0 + toothWidth);
    var outerInc = 2 * 3.14159 / n;
    var innerInc = 2 * 3.14159 / m;
    var ang = 0;
    // Thickness of the gear
    var z = thickness / 2;
    shaftSize = (shaftSize/2) + z;
    // Thickness of the teeth
    var innerZ = z / 3;
    var drawTooth = false;
    var drawSpoke = false;

    var i;
    var side;
    var angle;
    // Teeth and gear body
    for (i = 0; i < n; i++) {
        for (side = -1; side <= 1; side += 2) { // Side will be 1 or -1 (to scale z by)
            // Mid face
            vertices.push(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z * side,
                spokeRad * Math.cos(ang + outerInc), spokeRad * Math.sin(ang + outerInc), z * side,
                circleRad * Math.cos(ang + outerInc), circleRad * Math.sin(ang + outerInc), z * side);
            colors.push(0.53, 0.03, 0.09, 0.53, 0.03, 0.09, 0.53, 0.03, 0.09);
            normals.push(0, 0, side, 0, 0, side, 0, 0, side);
            vertices.push(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z * side,
                circleRad * Math.cos(ang + outerInc), circleRad * Math.sin(ang + outerInc), z * side,
                circleRad * Math.cos(ang), circleRad * Math.sin(ang), z * side);
            colors.push(0.53, 0.03, 0.09, 0.53, 0.03, 0.09, 0.53, 0.03, 0.09);
            normals.push(0, 0, side, 0, 0, side, 0, 0, side);
        }

        var edgeNorm;

        if (drawTooth) {
            drawTooth = false;
            // Tooth face
            for (side = -1; side <= 1; side += 2) { // Side will be 1 or -1 (to scale z by)
                var toothFaceNorm = calcNormal(circleRad * Math.cos(ang), circleRad * Math.sin(ang), z * side,
                    circleRad * Math.cos(ang + outerInc), circleRad * Math.sin(ang + outerInc), z * side,
                    toothRad * Math.cos(ang + outerInc), toothRad * Math.sin(ang + outerInc), innerZ * side);
                vertices.push(circleRad * Math.cos(ang), circleRad * Math.sin(ang), z * side,
                    circleRad * Math.cos(ang + outerInc), circleRad * Math.sin(ang + outerInc), z * side,
                    toothRad * Math.cos(ang + outerInc), toothRad * Math.sin(ang + outerInc), innerZ * side);
                colors.push(0.57, 0.48, 0.3, 0.57, 0.48, 0.3, 0.57, 0.48, 0.3);
                normals.push(toothFaceNorm[0], toothFaceNorm[1], toothFaceNorm[2],
                    toothFaceNorm[0], toothFaceNorm[1], toothFaceNorm[2],
                    toothFaceNorm[0], toothFaceNorm[1], toothFaceNorm[2]);
                vertices.push(circleRad * Math.cos(ang), circleRad * Math.sin(ang), z * side,
                    toothRad * Math.cos(ang + outerInc), toothRad * Math.sin(ang + outerInc), innerZ * side,
                    toothRad * Math.cos(ang), toothRad * Math.sin(ang), innerZ * side);
                colors.push(0.57, 0.48, 0.3, 0.57, 0.48, 0.3, 0.57, 0.48, 0.3);
                normals.push(toothFaceNorm[0], toothFaceNorm[1], toothFaceNorm[2],
                    toothFaceNorm[0], toothFaceNorm[1], toothFaceNorm[2],
                    toothFaceNorm[0], toothFaceNorm[1], toothFaceNorm[2]);
            }

            //Tooth roof
            edgeNorm = [toothRad * Math.cos(ang + outerInc / 2), toothRad * Math.sin(ang + outerInc / 2), 0];
            vertices.push(
                toothRad * Math.cos(ang), toothRad * Math.sin(ang), -innerZ,
                toothRad * Math.cos(ang + outerInc), toothRad * Math.sin(ang + outerInc), -innerZ,
                toothRad * Math.cos(ang + outerInc), toothRad * Math.sin(ang + outerInc), innerZ);
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            normals.push(edgeNorm[0], edgeNorm[1], edgeNorm[2],
                edgeNorm[0], edgeNorm[1], edgeNorm[2],
                edgeNorm[0], edgeNorm[1], edgeNorm[2]);

            vertices.push(
                toothRad * Math.cos(ang), toothRad * Math.sin(ang), -innerZ,
                toothRad * Math.cos(ang + outerInc), toothRad * Math.sin(ang + outerInc), innerZ,
                toothRad * Math.cos(ang), toothRad * Math.sin(ang), innerZ);
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            normals.push(edgeNorm[0], edgeNorm[1], edgeNorm[2],
                edgeNorm[0], edgeNorm[1], edgeNorm[2],
                edgeNorm[0], edgeNorm[1], edgeNorm[2]);

            // Tooth walls
            for (angle = ang; angle <= ang + outerInc; angle += outerInc) {
                var wallNorm = calcNormal(circleRad * Math.cos(angle), circleRad * Math.sin(angle), -z,
                    toothRad * Math.cos(angle), toothRad * Math.sin(angle), -innerZ,
                    toothRad * Math.cos(angle), toothRad * Math.sin(angle), innerZ
                );
                vertices.push(
                    circleRad * Math.cos(angle), circleRad * Math.sin(angle), -z,
                    toothRad * Math.cos(angle), toothRad * Math.sin(angle), -innerZ,
                    toothRad * Math.cos(angle), toothRad * Math.sin(angle), innerZ);
                colors.push(0.57, 0.48, 0.3, 0.57, 0.48, 0.3, 0.57, 0.48, 0.3);
                normals.push(wallNorm[0], wallNorm[1], wallNorm[2],
                    wallNorm[0], wallNorm[1], wallNorm[2],
                    wallNorm[0], wallNorm[1], wallNorm[2]);
                vertices.push(
                    circleRad * Math.cos(angle), circleRad * Math.sin(angle), -z,
                    toothRad * Math.cos(angle), toothRad * Math.sin(angle), innerZ,
                    circleRad * Math.cos(angle), circleRad * Math.sin(angle), z);
                colors.push(0.57, 0.48, 0.3, 0.57, 0.48, 0.3, 0.57, 0.48, 0.3);
                normals.push(wallNorm[0], wallNorm[1], wallNorm[2],
                    wallNorm[0], wallNorm[1], wallNorm[2],
                    wallNorm[0], wallNorm[1], wallNorm[2]);
            }
        } else {
            drawTooth = true;
            //Coin edge
            edgeNorm = [circleRad * Math.cos(ang + outerInc / 2), circleRad * Math.sin(ang + outerInc / 2), 0];
            vertices.push(
                circleRad * Math.cos(ang), circleRad * Math.sin(ang), -z,
                circleRad * Math.cos(ang + outerInc), circleRad * Math.sin(ang + outerInc), -z,
                circleRad * Math.cos(ang + outerInc), circleRad * Math.sin(ang + outerInc), z);
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            normals.push(edgeNorm[0], edgeNorm[1], edgeNorm[2],
                edgeNorm[0], edgeNorm[1], edgeNorm[2],
                edgeNorm[0], edgeNorm[1], edgeNorm[2]);

            vertices.push(
                circleRad * Math.cos(ang), circleRad * Math.sin(ang), -z,
                circleRad * Math.cos(ang + outerInc), circleRad * Math.sin(ang + outerInc), z,
                circleRad * Math.cos(ang), circleRad * Math.sin(ang), z);
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            normals.push(edgeNorm[0], edgeNorm[1], edgeNorm[2],
                edgeNorm[0], edgeNorm[1], edgeNorm[2],
                edgeNorm[0], edgeNorm[1], edgeNorm[2]);
        }

        ang += outerInc;
    }

    // Create the gear's spokes
    for (i = 0; i < m; i++) {
        for (side = -1; side <= 1; side += 2) { // Side will be 1 or -1 (to scale z by)
            // coin face
            vertices.push(0, 0, shaftSize * side,
                coinRad * Math.cos(ang), coinRad * Math.sin(ang), shaftSize * side,
                coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), shaftSize * side);
            colors.push(0.53, 0.03, 0.09, 0.53, 0.03, 0.09, 0.53, 0.03, 0.09);
            normals.push(0, 0, side, 0, 0, side, 0, 0, side);
        }

        // Shaft walls
        edgeNorm = [coinRad * Math.cos(ang + innerInc / 2), coinRad * Math.sin(ang + innerInc / 2), 0];
        vertices.push(
            coinRad * Math.cos(ang), coinRad * Math.sin(ang), -shaftSize,
            coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), -shaftSize,
            coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), shaftSize);
        colors.push(0.53, 0.03, 0.09, 0.53, 0.03, 0.09, 0.53, 0.03, 0.09);
        normals.push(edgeNorm[0], edgeNorm[1], edgeNorm[2],
            edgeNorm[0], edgeNorm[1], edgeNorm[2],
            edgeNorm[0], edgeNorm[1], edgeNorm[2]);

        vertices.push(
            coinRad * Math.cos(ang), coinRad * Math.sin(ang), -shaftSize,
            coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), shaftSize,
            coinRad * Math.cos(ang), coinRad * Math.sin(ang), shaftSize);
        colors.push(0.53, 0.03, 0.09, 0.53, 0.03, 0.09, 0.53, 0.03, 0.09);
        normals.push(edgeNorm[0], edgeNorm[1], edgeNorm[2],
            edgeNorm[0], edgeNorm[1], edgeNorm[2],
            edgeNorm[0], edgeNorm[1], edgeNorm[2]);

        if (drawSpoke) {
            drawSpoke = false;

            for (side = -1; side <= 1; side += 2) { // Side will be 1 or -1 (to scale z by)
                // Spoke face
                vertices.push(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z * side,
                    spokeRad * Math.cos(ang + innerInc), spokeRad * Math.sin(ang + innerInc), z * side,
                    coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), z * side);
                colors.push(0.57, 0.48, 0.3, 0.57, 0.48, 0.3, 0.57, 0.48, 0.3);
                normals.push(0, 0, side, 0, 0, side, 0, 0, side);
                vertices.push(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z * side,
                    coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), z * side,
                    coinRad * Math.cos(ang), coinRad * Math.sin(ang), z * side);
                colors.push(0.57, 0.48, 0.3, 0.57, 0.48, 0.3, 0.57, 0.48, 0.3);
                normals.push(0, 0, side, 0, 0, side, 0, 0, side);
            }

            for (angle = ang; angle <= ang + innerInc; angle += innerInc) {
                wallNorm = calcNormal(coinRad * Math.cos(angle), coinRad * Math.sin(angle), -z,
                    spokeRad * Math.cos(angle), spokeRad * Math.sin(angle), -z,
                    spokeRad * Math.cos(angle), spokeRad * Math.sin(angle), z
                );
                vertices.push(
                    coinRad * Math.cos(angle), coinRad * Math.sin(angle), -z,
                    spokeRad * Math.cos(angle), spokeRad * Math.sin(angle), -z,
                    spokeRad * Math.cos(angle), spokeRad * Math.sin(angle), z);
                colors.push(0.57, 0.48, 0.3, 0.57, 0.48, 0.3, 0.57, 0.48, 0.3);
                normals.push(wallNorm[0], wallNorm[1], wallNorm[2],
                    wallNorm[0], wallNorm[1], wallNorm[2],
                    wallNorm[0], wallNorm[1], wallNorm[2]);
                vertices.push(
                    coinRad * Math.cos(angle), coinRad * Math.sin(angle), -z,
                    spokeRad * Math.cos(angle), spokeRad * Math.sin(angle), z,
                    coinRad * Math.cos(angle), coinRad * Math.sin(angle), z);
                colors.push(0.57, 0.48, 0.3, 0.57, 0.48, 0.3, 0.57, 0.48, 0.3);
                normals.push(wallNorm[0], wallNorm[1], wallNorm[2],
                    wallNorm[0], wallNorm[1], wallNorm[2],
                    wallNorm[0], wallNorm[1], wallNorm[2]);
            }
        }
        else {
            drawSpoke = true;
            // var innerEdgeNorm = calcNormal(coinRad * Math.cos(ang), coinRad * Math.sin(ang), -z,
            //     coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), z,
            //     coinRad * Math.cos(ang), coinRad * Math.sin(ang), z);
            // vertices.push(
            //     coinRad * Math.cos(ang), coinRad * Math.sin(ang), -z,
            //     coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), z,
            //     coinRad * Math.cos(ang), coinRad * Math.sin(ang), z);
            // colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            // normals.push(innerEdgeNorm[0], innerEdgeNorm[1], innerEdgeNorm[2],
            //     innerEdgeNorm[0], innerEdgeNorm[1], innerEdgeNorm[2],
            //     innerEdgeNorm[0], innerEdgeNorm[1], innerEdgeNorm[2]);
            // vertices.push(
            //     coinRad * Math.cos(ang), coinRad * Math.sin(ang), -z,
            //     coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), -z,
            //     coinRad * Math.cos(ang + innerInc), coinRad * Math.sin(ang + innerInc), z);
            // colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            // normals.push(innerEdgeNorm[0], innerEdgeNorm[1], innerEdgeNorm[2],
            //     innerEdgeNorm[0], innerEdgeNorm[1], innerEdgeNorm[2],
            //     innerEdgeNorm[0], innerEdgeNorm[1], innerEdgeNorm[2]);

            var midEdgeNorm = calcNormal(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), -z,
                spokeRad * Math.cos(ang + innerInc), spokeRad * Math.sin(ang + innerInc), z,
                spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z);
            vertices.push(
                spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), -z,
                spokeRad * Math.cos(ang + innerInc), spokeRad * Math.sin(ang + innerInc), z,
                spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z);
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            normals.push(midEdgeNorm[0], midEdgeNorm[1], midEdgeNorm[2],
                midEdgeNorm[0], midEdgeNorm[1], midEdgeNorm[2],
                midEdgeNorm[0], midEdgeNorm[1], midEdgeNorm[2]);
            vertices.push(
                spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), -z,
                spokeRad * Math.cos(ang + innerInc), spokeRad * Math.sin(ang + innerInc), -z,
                spokeRad * Math.cos(ang + innerInc), spokeRad * Math.sin(ang + innerInc), z);
            colors.push(0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5);
            normals.push(midEdgeNorm[0], midEdgeNorm[1], midEdgeNorm[2],
                midEdgeNorm[0], midEdgeNorm[1], midEdgeNorm[2],
                midEdgeNorm[0], midEdgeNorm[1], midEdgeNorm[2]);
        }

        // Cover face
        for (side = -1; side <= 1; side += 2) { // Side will be 1 or -1 (to scale z by)
            vertices.push(spokeRad * Math.cos(ang), spokeRad * Math.sin(ang), z * side,
                circleRad * Math.cos(ang + innerInc/2), circleRad * Math.sin(ang + innerInc/2), z * side,
                spokeRad * Math.cos(ang + innerInc), spokeRad * Math.sin(ang + innerInc), z * side);
            colors.push(0.53, 0.03, 0.09, 0.53, 0.03, 0.09, 0.53, 0.03, 0.09);
            normals.push(0, 0, side, 0, 0, side, 0, 0, side);
        }


        ang += innerInc;
    }


    return [vertices, colors, normals];
}


function calcNormal(x1, y1, z1,
                    x2, y2, z2,
                    x3, y3, z3) {

    var ux = x2 - x1, uy = y2 - y1, uz = z2 - z1;
    var vx = x3 - x1, vy = y3 - y1, vz = z3 - z1;

    return [uy * vz - uz * vy,
        uz * vx - ux * vz,
        ux * vy - uy * vx];
}