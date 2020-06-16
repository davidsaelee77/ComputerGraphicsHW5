/*
 * Creates a gear customized by Steven Tran
 * @param numTeeth {number} number of teeth on the gear, must be greater than 1
 * @param numSpokes {number} number of spokes on the gear
 * @param width {number} width of the gear, remember the clipping cube
 * @return three lists: vertices, vertex colors, and vertex normals
 */
function stran(numTeeth, numSpokes, width)
{
	if(numTeeth < 2)
	{
		console.error("Number of teeth is too small");
		return;
	}
	const vertices = [];
	const colors = [];
	const normals = [];

	// Defining constant gear properties
	const n = numTeeth * 2;
	const teethProportion = 0.1;
	const coinRadius = 1;
	const teethRadius = coinRadius * (1 + teethProportion);
	const innerSolidRadius = coinRadius * 0.1;
	const angleIncrement = Math.PI * 2 / n;
	const z = width;
	const outerSolidRadius = coinRadius * 0.9;

	var angle = 0;

	for (var i = 0; i < n; i++)
	{
		// Used to for the next vertex
		const newAngle = angle + angleIncrement;

		// Creates coin face inner solids
		const innerSolid = createTriangle(innerSolidRadius, angle, newAngle, z);

		for (var j = 0; j < innerSolid[0].length; j++)
		{
			vertices.push(innerSolid[0][j]);
			colors.push(innerSolid[1][j]);
			normals.push(innerSolid[2][j]);
		}

		// Create edge for the coin face inner solid
		const innerRoofs = createRoof(innerSolidRadius, angle, angleIncrement, z, 1);
		for (var j = 0; j < innerRoofs[0].length; j++)
		{
			vertices.push(innerRoofs[0][j]);
			colors.push(innerRoofs[1][j]);
			normals.push(innerRoofs[2][j]);
		}

		const middleRingFaces = createFace(outerSolidRadius * 0.5, coinRadius * 0.5, angle, angleIncrement, z, 1);
		for (var j = 0; j < middleRingFaces[0].length; j++)
		{
			vertices.push(middleRingFaces[0][j]);
			colors.push(middleRingFaces[1][j]);
			normals.push(middleRingFaces[2][j]);
		}

		const middleRingFirstRoof = createRoof(outerSolidRadius * 0.5, angle, angleIncrement, z, 1);
		for (var j = 0; j < middleRingFirstRoof[0].length; j++)
		{
			vertices.push(middleRingFirstRoof[0][j]);
			colors.push(middleRingFirstRoof[1][j]);
			normals.push(middleRingFirstRoof[2][j]);
		}

		const outerFaces = createFace(outerSolidRadius, coinRadius, angle, angleIncrement, z, 1)
		// Create edge for the coin face inner solid
		for (var j = 0; j < outerFaces[0].length; j++)
		{
			vertices.push(outerFaces[0][j]);
			colors.push(outerFaces[1][j]);
			normals.push(outerFaces[2][j]);
		}

		const outerRoofs = createRoof(outerSolidRadius, angle, angleIncrement, z, 1);
		for (var j = 0; j < outerRoofs[0].length; j++)
		{
			vertices.push(outerRoofs[0][j]);
			colors.push(outerRoofs[1][j]);
			normals.push(outerRoofs[2][j]);
		}

		if (i % 2 === 0)
		{
			// Create teeth
			const toothLists = createTooth(coinRadius, teethRadius, angle, angleIncrement, z, 0.75);
			for (var j = 0; j < toothLists[0].length; j++)
			{
				vertices.push(toothLists[0][j]);
				colors.push(toothLists[1][j]);
				normals.push(toothLists[2][j]);
			}
		}
		else
		{
			const coinRoofLists = createRoof(coinRadius, angle, angleIncrement, z, 1);
			for (var j = 0; j < coinRoofLists[0].length; j++)
			{
				vertices.push(coinRoofLists[0][j]);
				colors.push(coinRoofLists[1][j]);
				normals.push(coinRoofLists[2][j]);
			}
		}

		angle = newAngle;
	}

	// Reset angle
	angle = 0;

	// Create the spokes
	const m = numSpokes * 2;
	const spokesAngleIncrement = Math.PI * 2 / m;
	for (var i = 0; i < m; i++)
	{
		const newAngle = angle + spokesAngleIncrement;
		if (i % 2 === 0)
		{
			const spokesList = createTriangle(coinRadius * 0.95, angle, angle + (angleIncrement * 1.1), z * 0.9);
			for (var j = 0; j < spokesList[0].length; j++)
			{
				vertices.push(spokesList[0][j]);
				colors.push(spokesList[1][j]);
				normals.push(spokesList[2][j]);
			}

			const spokesWallList = createWall(0, coinRadius * 0.95, angle, angle + (angleIncrement * 1.1), z * 0.9, 1);
			for (var j = 0; j < spokesWallList[0].length; j++)
			{
				vertices.push(spokesWallList[0][j]);
				colors.push(spokesWallList[1][j]);
				normals.push(spokesWallList[2][j]);
			}
		}
		angle = newAngle;
	}

	return [vertices, colors, normals];
}

/**
 * Creates the two triangles that makes up a coin, front and back
 * @param radius {number} the radius of the triangle from the origin
 * @param angle {number} the angle of the triangle
 * @param newAngle the increment for the next angle of the triangle
 * @param z the z depth of the triangle
 * @returns {[][]} a list containing 3 lists: vertices, colors, normals
 */
function createTriangle(radius, angle, newAngle, z)
{
	const vertices = [];
	const colors = [];
	const normals = [];
	vertices.push(0, 0, z,
				  radius * Math.cos(angle), radius * Math.sin(angle), z,
				  radius * Math.cos(newAngle), radius * Math.sin(newAngle), z);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(0, 0, 1,
				 0, 0, 1,
				 0, 0, 1);

	vertices.push(0, 0, -z,
				  radius * Math.cos(angle), radius * Math.sin(angle), -z,
				  radius * Math.cos(newAngle), radius * Math.sin(newAngle), -z);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(0, 0, -1,
				 0, 0, -1,
				 0, 0, -1);
	return [vertices, colors, normals];
}

/**
 *
 * @param radius
 * @param angle
 * @param angleIncrement
 * @param z
 * @param inwards
 * @returns {[][]}
 */
function createRoof(radius, angle, angleIncrement, z, inwards)
{
	const newAngle = angle + angleIncrement;
	const vertices = [];
	const colors = [];
	const normals = [];

	// ******* TOOTH ROOF  *******
	const tempNormals = [radius * Math.cos(angle + angleIncrement / 2),
						 radius * Math.sin(angle + angleIncrement / 2),
						 0];
	vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), -z * inwards,
				  radius * Math.cos(newAngle), radius * Math.sin(newAngle), -z * inwards,
				  radius * Math.cos(newAngle), radius * Math.sin(newAngle), z * inwards);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(tempNormals[0], tempNormals[1], tempNormals[2],
				 tempNormals[0], tempNormals[1], tempNormals[2],
				 tempNormals[0], tempNormals[1], tempNormals[2]);

	vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), -z * inwards,
				  radius * Math.cos(newAngle), radius * Math.sin(newAngle), z * inwards,
				  radius * Math.cos(angle), radius * Math.sin(angle), z * inwards)
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(tempNormals[0], tempNormals[1], tempNormals[2],
				 tempNormals[0], tempNormals[1], tempNormals[2],
				 tempNormals[0], tempNormals[1], tempNormals[2]);

	return [vertices, colors, normals];
}

/**
 *
 * @param innerRadius
 * @param outerRadius
 * @param angle
 * @param angleIncrement
 * @param z
 * @param inwards
 * @returns {[][]}
 */
function createFace(innerRadius, outerRadius, angle, angleIncrement, z, inwards)
{
	const newAngle = angle + angleIncrement;
	const vertices = [];
	const colors = [];
	const normals = [];

	// *** Front Start ***
	const normFacesOne = calcNormal(outerRadius * Math.cos(angle), outerRadius * Math.sin(angle), z * inwards,
									outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), z * inwards,
									innerRadius * Math.cos(newAngle), innerRadius * Math.sin(newAngle), z);
	vertices.push(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), z,
				  innerRadius * Math.cos(newAngle), innerRadius * Math.sin(newAngle), z,
				  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), z * inwards);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	// normals.push(0, 0, 1,
	// 			 0, 0, 1,
	// 			 0, 0, 1);
	normals.push(normFacesOne[0], normFacesOne[1], normFacesOne[2],
				 normFacesOne[0], normFacesOne[1], normFacesOne[2],
				 normFacesOne[0], normFacesOne[1], normFacesOne[2]);
	vertices.push(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), z,
				  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), z * inwards,
				  outerRadius * Math.cos(angle), outerRadius * Math.sin(angle), z * inwards);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	// normals.push(0, 0, 1,
	// 			0, 0, 1,
	// 			0, 0, 1);
	normals.push(normFacesOne[0], normFacesOne[1], normFacesOne[2],
				 normFacesOne[0], normFacesOne[1], normFacesOne[2],
				 normFacesOne[0], normFacesOne[1], normFacesOne[2]);
	// *** Front End ***

	// *** Back Start ***
	const normFacesTwo = calcNormal(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), -z,
									innerRadius * Math.cos(newAngle), innerRadius * Math.sin(newAngle), -z,
									outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), -z * inwards);
	vertices.push(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), -z,
				  innerRadius * Math.cos(newAngle), innerRadius * Math.sin(newAngle), -z,
				  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), -z * inwards);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(normFacesTwo[0], normFacesTwo[1], normFacesTwo[2],
				 normFacesTwo[0], normFacesTwo[1], normFacesTwo[2],
				 normFacesTwo[0], normFacesTwo[1], normFacesTwo[2]);
	vertices.push(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), -z,
				  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), -z * inwards,
				  outerRadius * Math.cos(angle), outerRadius * Math.sin(angle), -z * inwards);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(normFacesTwo[0], normFacesTwo[1], normFacesTwo[2],
				 normFacesTwo[0], normFacesTwo[1], normFacesTwo[2],
				 normFacesTwo[0], normFacesTwo[1], normFacesTwo[2]);
	// *** Back End ***
	return [vertices, colors, normals];
}

/**
 * Creates two walls
 *
 * @param innerRadius
 * @param outerRadius
 * @param angle
 * @param angleIncrement
 * @param z
 * @param inwards
 * @returns {[][]}
 */
function createWall(innerRadius, outerRadius, angle, angleIncrement, z, inwards)
{
	const newAngle = angle + angleIncrement;
	const vertices = [];
	const colors = [];
	const normals = [];
	const normal_one = calcNormal(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), -z,
								  outerRadius * Math.cos(angle), outerRadius * Math.sin(angle), -z * inwards,
								  outerRadius * Math.cos(angle), outerRadius * Math.sin(angle), z * inwards);
	vertices.push(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), -z,
				  outerRadius * Math.cos(angle), outerRadius * Math.sin(angle), -z * inwards,
				  outerRadius * Math.cos(angle), outerRadius * Math.sin(angle), z * inwards);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(normal_one[0], normal_one[1], normal_one[2],
				 normal_one[0], normal_one[1], normal_one[2],
				 normal_one[0], normal_one[1], normal_one[2]);
	vertices.push(innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), -z,
				  outerRadius * Math.cos(angle), outerRadius * Math.sin(angle), z * inwards,
				  innerRadius * Math.cos(angle), innerRadius * Math.sin(angle), z);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(normal_one[0], normal_one[1], normal_one[2],
				 normal_one[0], normal_one[1], normal_one[2],
				 normal_one[0], normal_one[1], normal_one[2]);

	const normal_two = calcNormal(innerRadius * Math.cos(newAngle), innerRadius * Math.sin(newAngle), -z,
								  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), z * inwards,
								  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), -z * inwards);
	vertices.push(innerRadius * Math.cos(newAngle), innerRadius * Math.sin(newAngle), -z,
				  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), -z * inwards,
				  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), z * inwards);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(normal_two[0], normal_two[1], normal_two[2],
				 normal_two[0], normal_two[1], normal_two[2],
				 normal_two[0], normal_two[1], normal_two[2]);
	vertices.push(innerRadius * Math.cos(newAngle), innerRadius * Math.sin(newAngle), -z,
				  outerRadius * Math.cos(newAngle), outerRadius * Math.sin(newAngle), z * inwards,
				  innerRadius * Math.cos(newAngle), innerRadius * Math.sin(newAngle), z);
	colors.push(1, 0.9, 0.1,
				1, 0.9, 0.1,
				1, 0.9, 0.1);
	normals.push(normal_two[0], normal_two[1], normal_two[2],
				 normal_two[0], normal_two[1], normal_two[2],
				 normal_two[0], normal_two[1], normal_two[2]);
	return [vertices, colors, normals];
}

/**
 * Creates a tooth
 * @param innerRadius {number} the radius of the bottom vertices
 * @param outerRadius {number} the radius of the top vertices
 * @param angle {number} the current angle of the teeth
 * @param angleIncrement {number} the increment for the next angle of the teeth
 * @param z the z depth of the teeth
 * @param inwards {number} the slant of the teeth between the values 1 and 0
 * @returns {[][]} a list containing 3 lists: vertices, colors, normals
 */
function createTooth(innerRadius, outerRadius, angle, angleIncrement, z, inwards)
{
	const newAngle = angle + angleIncrement;
	const vertices = [];
	const colors = [];
	const normals = [];

	// Tooth Faces
	const faceLists = createFace(innerRadius, outerRadius, angle, angleIncrement, z, inwards);
	for (var i = 0; i < faceLists[0].length; i++)
	{
		vertices.push(faceLists[0][i]);
		colors.push(faceLists[1][i]);
		normals.push(faceLists[2][i]);
	}

	// Tooth roof
	const roofLists = createRoof(outerRadius, angle, angleIncrement, z, inwards);
	for (var i = 0; i < roofLists[0].length; i++)
	{
		vertices.push(roofLists[0][i]);
		colors.push(roofLists[1][i]);
		normals.push(roofLists[2][i]);
	}

	// Tooth walls
	const wallLists = createWall(innerRadius, outerRadius, angle, angleIncrement, z, inwards);
	for (var i = 0; i < wallLists[0].length; i++)
	{
		vertices.push(wallLists[0][i]);
		colors.push(wallLists[1][i]);
		normals.push(wallLists[2][i]);
	}
	return [vertices, colors, normals];
}

/**
 * Calculates the normal given three points (basically crossproduct)
 * @param x1 x of v1
 * @param y1 y of v1
 * @param z1 z of v1
 * @param x2 x of v2
 * @param y2 y of v2
 * @param z2 z of v2
 * @param x3 x of v3
 * @param y3 y of v3
 * @param z3 z of v3
 * @returns {number[]} the resultant vector (i.e. the normal vector of three points)
 */
function calcNormal(x1, y1, z1, x2, y2, z2, x3, y3, z3)
{
	var ux = x2-x1, uy = y2-y1, uz = z2-z1;
	var vx = x3-x1, vy = y3-y1, vz = z3-z1;
	return [ uy * vz - uz * vy,
			 uz * vx - ux * vz,
			 ux * vy - uy * vx];
}

