let vertices = [];
let colors = [];
let normals = [];
const mat = new Learn_webgl_matrix();
const vec4 = new Learn_webgl_point4();


//tints of gold
const g1 = [0xff / 255, 0xd7 / 255, 0x00 / 255];
const g2 = [0xff / 255, 0xdb / 255, 0x19 / 255];
const g3 = [0xff / 255, 0xdf / 255, 0x32 / 255];
const g4 = [0xff / 255, 0xe3 / 255, 0x4c / 255];
const g5 = [0xff / 255, 0xe7 / 255, 0x66 / 255];
const g6 = [0xff / 255, 0xeb / 255, 0x7f / 255];

//weird gold colors
const GOLD0 = [0xFF / 255, 0xDF / 255, 0 / 255];
const GOLD1 = [0xFF / 255, 0xD3 / 255, 0 / 255];
const GOLD2 = [0xCF / 255, 0xAF / 255, 0x3B / 255];
const GOLD3 = [0xC5 / 255, 0xB3 / 255, 0x58 / 255];
const SILVER0 = [0xe2 / 255, 0xe2 / 255, 0xe3 / 255];
const SILVER1 = [0xaa / 255, 0xa9 / 255, 0xad / 255];
const SILVER2 = [0xc0 / 255, 0xc0 / 255, 0xc0 / 255];

//constants
const STEPS = 4000;
const SPOKE_RAD = .03;
const INNER_THICKNESS = 0.2;
const OUTER_THICKNESS = 0.3;
const TOOTH_HEIGHT = 0.1;
const DULLNESS = 3;
const CENTER_INNER = 0.15;
const CENTER_OUTER = 0.32;
const EXO_OUTER = 1;
const EXO_INNER = 0.9;
const CENTER_RING_THICKNESS = .23;
const NEG_NORMAL = [0, 0, -1];
const POS_NORMAL = [0, 0, 1];
const RADIUS = 1.0;
const ANGINC = 2 * Math.PI / STEPS;


function shafferGear(numTeeth = 32, numSpoke = 10) {
    let rotateMat;
    let ang = 0;

    //center ring
    let centerRing = {
        rad1: CENTER_INNER * .5,
        rad2: CENTER_INNER * .7,
        innerColor: g6,
        innerThickness: CENTER_RING_THICKNESS
    };

    //second ring from the center
    let secondCenterRing = {
        rad1: CENTER_INNER * .9,
        rad2: CENTER_INNER * 1.1,
        innerColor: g5,
        innerThickness: CENTER_RING_THICKNESS
    };

    //third ring from the center
    let thirdCenterRing = {
        rad1: CENTER_INNER * 1.3,
        rad2: CENTER_INNER * 1.5,
        innerColor: g4,
        innerThickness: CENTER_RING_THICKNESS
    };
    //fourth ring from the center
    let fourthCenterRing = {
        rad1: CENTER_INNER * 1.7,
        rad2: CENTER_INNER * 1.9,
        innerColor: g3,
        innerThickness: CENTER_RING_THICKNESS
    };

    //casing around inside rings
    let centerRingCasing = {
        rad1: CENTER_OUTER * 1.0015,
        rad2: CENTER_OUTER * 0.95,
        innerColor: SILVER1,
        innerThickness: CENTER_RING_THICKNESS

    };

    //inner rim
    let innerRim = {
        rad3: EXO_INNER * 0.95,
        outerColor: SILVER1,
        outerThickness: .17
    };

    //hub
    let hubFace = {
        rad1: CENTER_INNER * .6,
        rad2: CENTER_OUTER,
        outerThickness: OUTER_THICKNESS,
        innerThickness: INNER_THICKNESS,
        outerColor: GOLD3,
        innerColor: SILVER1,

    };

    let main_config = {
        toothCount: numTeeth,
        spokeCount: numSpoke,
        rad1: CENTER_INNER,
        rad2: CENTER_OUTER,
        rad3: EXO_INNER,
        rad4: EXO_OUTER,
        spokeRad: SPOKE_RAD,
        outerThickness: OUTER_THICKNESS,
        innerThickness: INNER_THICKNESS,
        teethHeight: TOOTH_HEIGHT,
        outerColor: GOLD2,
        innerColor: GOLD1,
        toothOuterColor: g1,
        toothInnerColor: GOLD2,
        dullness: DULLNESS,
        noRoof: false
    };

    const spokeConfig = {
        spokeCount: numSpoke,
        spokeRad: 0.05,
        outerThickness: .3,
        innerThickness: .2,
        innerColor: GOLD2,
        outerColor: GOLD2,
        rad1: 0.15,
        rad2: .32,
        rad3: EXO_INNER
    };

    const spokeFeatures = {
        innerColor: SILVER2,
        outerColor: SILVER2,
        centerColor: GOLD2,
        zScale1: 1.4,
        hScale1: 0.86,
        hScale2: 0.91,
        hScale3: 0.39
    };

    const toothConfig = {
        toothCount: numTeeth,
        spokeCount: numSpoke,
        outerThickness: OUTER_THICKNESS,
        teethHeight: TOOTH_HEIGHT,
        outerColor: GOLD0,
        innerColor: GOLD1,
        toothOuterColor: SILVER1,
        toothInnerColor: GOLD2,
        noRoof: false
    };


    //spokes
    ang = 0;
    const aStep = 2 * Math.PI / spokeConfig.spokeCount;
    for (let j = 0; j < spokeConfig.spokeCount; j++) {
        rotateMat = mat.create();
        mat.rotate(rotateMat, mat.toDegrees(ang + aStep), 0, 0, 1);
        createSpoke(rotateMat, spokeConfig, spokeFeatures);
        ang += aStep;
    }

    //teeth
    ang = 0;
    const noRoof = toothConfig.noRoof;
    const tc = checkToothCount(toothConfig.toothCount);
    const tStep = 2 * Math.PI / tc;
    let drawTooth = false;
    for (let i = 0; i < tc; i++) {
        drawTooth = !drawTooth;
        if (drawTooth || noRoof) {
            rotateMat = mat.create();
            mat.rotate(rotateMat, mat.toDegrees(ang + tStep), 0, 0, 1);
            drawGearTooth(tStep, toothConfig, ang);
        }
        ang += tStep;
    }


    //rings
    for (let i = 0; i < STEPS; i++) {
        createInnerRing(centerRing, ang);
        createInnerRing(secondCenterRing, ang);
        createInnerRing(thirdCenterRing, ang);
        createInnerRing(fourthCenterRing, ang);
        //flat part of gear hub
        createInnerRing(hubFace, ang);
        //casing of hub
        createInnerRing(centerRingCasing, ang);
        //outer gear wall
        createOuterRing(main_config, ang);
        //inner gear rim
        createOuterRing(innerRim, ang);
        //coin edge
        drawCoinEdge(main_config, ang);
        ang += ANGINC;
    }
    return [vertices, colors, normals];
}


function createOuterRing(options, ang) {
    const z = options.outerThickness;
    const ringStart = options.rad3;
    const col = [options.outerColor[0], options.outerColor[1], options.outerColor[2],
        options.outerColor[0], options.outerColor[1], options.outerColor[2],
        options.outerColor[0], options.outerColor[1], options.outerColor[2]
    ];
    const rotateMat = mat.create();
    const rotateRingInner = mat.create();
    mat.rotate(rotateMat, 180, 0, 1, 0);
    mat.rotate(rotateRingInner, 180, 0, 0, 1);

    const v1 = vec4.create(
        ringStart * RADIUS * Math.cos(ang),
        ringStart * RADIUS * Math.sin(ang),
        z);
    const v2 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        z);
    const v3 = vec4.create(
        RADIUS * Math.cos(ang + ANGINC),
        RADIUS * Math.sin(ang + ANGINC),
        z);

    const v4 = vec4.create(
        ringStart * RADIUS * Math.cos(ang - ANGINC),
        ringStart * RADIUS * Math.sin(ang - ANGINC),
        z);
    const v5 = vec4.create(
        ringStart * RADIUS * Math.cos(ang),
        ringStart * RADIUS * Math.sin(ang),
        z);
    const v6 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        z);

    const v7 = vec4.create(
        ringStart * RADIUS * Math.cos(ang),
        ringStart * RADIUS * Math.sin(ang),
        z);
    const v8 = vec4.create(
        ringStart * RADIUS * Math.cos(ang),
        ringStart * RADIUS * Math.sin(ang),
        -z);
    const v9 = vec4.create(
        ringStart * RADIUS * Math.cos(ang + ANGINC),
        ringStart * RADIUS * Math.sin(ang + ANGINC),
        z);

    const i1 = vec4.create(
        ringStart * RADIUS * Math.cos(ang),
        ringStart * RADIUS * Math.sin(ang),
        -z);
    const i2 = vec4.create(
        ringStart * RADIUS * Math.cos(ang + ANGINC),
        ringStart * RADIUS * Math.sin(ang + ANGINC),
        z);
    const i3 = vec4.create(
        ringStart * RADIUS * Math.cos(ang + ANGINC),
        ringStart * RADIUS * Math.sin(ang + ANGINC),
        -z);

    const norm0 = calcNormalFromVec(v1, v2, v3);
    const norm1 = calcNormalFromVec(v6, v5, v4);
    const norm2 = calcNormalFromVec(i1, i2, i3);


    //Flip it and ship it
    const newV1 = vec4.create();
    mat.multiplyP4(newV1, rotateMat, v1);
    const newV2 = vec4.create();
    mat.multiplyP4(newV2, rotateMat, v2);
    const newV3 = vec4.create();
    mat.multiplyP4(newV3, rotateMat, v3);

    const newV4 = vec4.create();
    mat.multiplyP4(newV4, rotateMat, v4);
    const newV5 = vec4.create();
    mat.multiplyP4(newV5, rotateMat, v5);
    const newV6 = vec4.create();
    mat.multiplyP4(newV6, rotateMat, v6);


    pushTriangle(createTriangleJS(v1, v2, v3), norm0, col);
    pushTriangle(createTriangleJS(v4, v5, v6), norm1, col);
    pushTriangle(createTriangleJS(v7, v8, v9), norm2, col);
    pushTriangle(createTriangleJS(i1, i2, i3), norm2, col);
    pushTriangle(createTriangleJS(newV1, newV2, newV3), NEG_NORMAL, col);
    pushTriangle(createTriangleJS(newV4, newV5, newV6), NEG_NORMAL, col);

}

function createInnerRing(options, ang) {
    const z = options.innerThickness;
    const col = [options.innerColor[0], options.innerColor[1], options.innerColor[2],
        options.innerColor[0], options.innerColor[1], options.innerColor[2],
        options.innerColor[0], options.innerColor[1], options.innerColor[2]
    ];
    const cStart = options.rad1;
    const cEnd = options.rad2;
    const rotateMat = mat.create();
    const rotateRingInner = mat.create();

    //Matrix to rotate front to back.
    mat.rotate(rotateMat, 180, 0, 1, 0);
    mat.rotate(rotateRingInner, 180, 0, 0, 1);

    //Face of center circle
    const c1 = vec4.create(
        cStart * RADIUS * Math.cos(ang),
        cStart * RADIUS * Math.sin(ang),
        z);
    const c2 = vec4.create(
        cEnd * RADIUS * Math.cos(ang),
        cEnd * RADIUS * Math.sin(ang),
        z);
    const c3 = vec4.create(
        cEnd * RADIUS * Math.cos(ang + ANGINC),
        cEnd * RADIUS * Math.sin(ang + ANGINC),
        z);

    const c4 = vec4.create(
        cStart * RADIUS * Math.cos(ang - ANGINC),
        cStart * RADIUS * Math.sin(ang - ANGINC),
        z);
    const c5 = vec4.create(
        cStart * RADIUS * Math.cos(ang),
        cStart * RADIUS * Math.sin(ang),
        z);
    const c6 = vec4.create(
        cEnd * RADIUS * Math.cos(ang),
        cEnd * RADIUS * Math.sin(ang),
        z);


    //Flip it and ship it
    const newC1 = vec4.create();
    mat.multiplyP4(newC1, rotateMat, c1);
    const newC2 = vec4.create();
    mat.multiplyP4(newC2, rotateMat, c2);
    const newC3 = vec4.create();
    mat.multiplyP4(newC3, rotateMat, c3);

    const newC4 = vec4.create();
    mat.multiplyP4(newC4, rotateMat, c4);
    const newC5 = vec4.create();
    mat.multiplyP4(newC5, rotateMat, c5);
    const newC6 = vec4.create();
    mat.multiplyP4(newC6, rotateMat, c6);


    //Inner edges of center ring.
    const j1 = vec4.create(
        cStart * RADIUS * Math.cos(ang),
        cStart * RADIUS * Math.sin(ang),
        z);
    const j2 = vec4.create(
        cStart * RADIUS * Math.cos(ang),
        cStart * RADIUS * Math.sin(ang),
        -z);
    const j3 = vec4.create(
        cStart * RADIUS * Math.cos(ang + ANGINC),
        cStart * RADIUS * Math.sin(ang + ANGINC),
        z);

    const j4 = j2;
    const j5 = j3;
    const j6 = vec4.create(
        cStart * RADIUS * Math.cos(ang + ANGINC),
        cStart * RADIUS * Math.sin(ang + ANGINC),
        -z);

    const jNorm0 = [cStart * RADIUS * Math.cos(ang), cStart * RADIUS * Math.sin(ang), 0];


    //outside of inner casing
    const j7 = vec4.create(
        cEnd * RADIUS * Math.cos(ang),
        cEnd * RADIUS * Math.sin(ang),
        z);
    const j8 = vec4.create(
        cEnd * RADIUS * Math.cos(ang),
        cEnd * RADIUS * Math.sin(ang),
        -z);
    const j9 = vec4.create(
        cEnd * RADIUS * Math.cos(ang + ANGINC),
        cEnd * RADIUS * Math.sin(ang + ANGINC),
        z);

    const j10 = j8;
    const j11 = j9;
    const j12 = vec4.create(
        cEnd * RADIUS * Math.cos(ang + ANGINC),
        cEnd * RADIUS * Math.sin(ang + ANGINC),
        -z);

    const jNorm1 = [cEnd * RADIUS * Math.cos(ang), cEnd * RADIUS * Math.sin(ang), 0];


    pushTriangle(createTriangleJS(c1, c2, c3), POS_NORMAL, col);
    pushTriangle(createTriangleJS(c4, c5, c6), POS_NORMAL, col);
    pushTriangle(createTriangleJS(newC1, newC2, newC3), NEG_NORMAL, col);
    pushTriangle(createTriangleJS(newC4, newC5, newC6), NEG_NORMAL, col);
    pushTriangle(createTriangleJS(j1, j2, j3), jNorm0, col);
    pushTriangle(createTriangleJS(j4, j5, j6), jNorm0, col);
    pushTriangle(createTriangleJS(j7, j8, j9), jNorm1, col);
    pushTriangle(createTriangleJS(j10, j11, j12), jNorm1, col);


}


function drawCoinEdge(options, ang) {
    const z = options.outerThickness;
    const col = [options.outerColor[0], options.outerColor[1], options.outerColor[2],
        options.outerColor[0], options.outerColor[1], options.outerColor[2],
        options.outerColor[0], options.outerColor[1], options.outerColor[2]
    ];
    const v1 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        -z);
    const v2 = vec4.create(
        RADIUS * Math.cos(ang + ANGINC),
        RADIUS * Math.sin(ang + ANGINC),
        -z);
    const v3 = vec4.create(
        RADIUS * Math.cos(ang + ANGINC),
        RADIUS * Math.sin(ang + ANGINC),
        z);

    const v4 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        -z);
    const v5 = vec4.create(
        RADIUS * Math.cos(ang + ANGINC),
        RADIUS * Math.sin(ang + ANGINC),
        z);
    const v6 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        z);

    const norm0 = calcNormalFromVec(v1, v2, v3);
    const norm1 = calcNormalFromVec(v4, v5, v6);

    pushTriangle(createTriangleJS(v1, v2, v3), norm0, col);
    pushTriangle(createTriangleJS(v4, v5, v6), norm1, col);
}


function createSpoke(rotateMat, options, spokeFeatures) {

    const steps = 180;
    let angle = 0;
    const aStep = 2 * Math.PI / steps;
    const cEnd = options.rad2;
    const r = options.spokeRad;
    const height = options.rad3;


    for (let j = 0; j < steps; j++) {


        let v1 = vec4.create(
            r * Math.cos(angle),
            cEnd - .01,
            r * Math.sin(angle));
        let v3 = vec4.create(
            r * Math.cos(angle + aStep),
            height,
            r * Math.sin(angle + aStep));
        let v2 = vec4.create(
            r * Math.cos(angle + aStep),
            cEnd - .1,
            r * Math.sin(angle + aStep));


        const v4 = v1;
        const v5 = v3;
        const v6 = vec4.create(r * Math.cos(angle), height, r * Math.sin(angle));

        const norm0 = calcNormalFromVec(v2, v1, v3);

        //flip it
        let newV1 = vec4.create();
        mat.multiplyP4(newV1, rotateMat, v1);
        const newV2 = vec4.create();
        mat.multiplyP4(newV2, rotateMat, v2);
        const newV3 = vec4.create();
        mat.multiplyP4(newV3, rotateMat, v3);

        const newV4 = vec4.create();
        mat.multiplyP4(newV4, rotateMat, v4);
        const newV5 = vec4.create();
        mat.multiplyP4(newV5, rotateMat, v5);
        const newV6 = vec4.create();
        mat.multiplyP4(newV6, rotateMat, v6);


        const outerColor = options.outerColor;
        const innerColor = options.innerColor;

        const color1 = [innerColor[0], innerColor[1], innerColor[2],
            innerColor[0], innerColor[1], innerColor[2],
            outerColor[0], outerColor[1], outerColor[2]];

        const color2 = [innerColor[0], innerColor[1], innerColor[2],
            outerColor[0], outerColor[1], outerColor[2],
            outerColor[0], outerColor[1], outerColor[2]];


        pushTriangle(createTriangleJS(newV1, newV2, newV3), norm0, color1);
        pushTriangle(createTriangleJS(newV4, newV5, newV6), norm0, color2);

        if (spokeFeatures) {
            createSpokeFeatures(rotateMat, options, angle, aStep, spokeFeatures)
        }

        angle += aStep;
    }
}

function calcNormal(x1, y1, z1,
                    x2, y2, z2,
                    x3, y3, z3) {

    const ux = x2 - x1,
        uy = y2 - y1,
        uz = z2 - z1;

    const vx = x3 - x1,
        vy = y3 - y1,
        vz = z3 - z1;

    return [uy * vz - uz * vy,
        uz * vx - ux * vz,
        ux * vy - uy * vx];
}

function createSpokeFeatures(rotateMat, options, angle, aStep, sf) {
    const cEnd = options.rad2;
    const r = options.spokeRad;
    const height = options.rad3;


    let zScale1 = sf.zScale1;
    let hScale1 = sf.hScale1;
    let hScale2 = sf.hScale2;

    //top of cap
    const e1 = vec4.create(
        r * Math.cos(angle),
        height * hScale1,
        r * Math.sin(angle));
    const e3 = vec4.create(
        r * zScale1 * Math.cos(angle + aStep),
        height * hScale2,
        r * zScale1 * Math.sin(angle + aStep));
    const e2 = vec4.create(
        r * Math.cos(angle + aStep),
        height * hScale1,
        r * Math.sin(angle + aStep));


    const e4 = e1;
    const e5 = e3;
    const e6 = vec4.create(
        r * zScale1 * Math.cos(angle),
        height * hScale2,
        r * zScale1 * Math.sin(angle));

    const newE1 = vec4.create();
    const newE2 = vec4.create();
    const newE3 = vec4.create();
    const newE4 = vec4.create();
    const newE5 = vec4.create();
    const newE6 = vec4.create();

    mat.multiplyP4(newE1, rotateMat, e1);
    mat.multiplyP4(newE2, rotateMat, e2);
    mat.multiplyP4(newE3, rotateMat, e3);
    mat.multiplyP4(newE4, rotateMat, e4);
    mat.multiplyP4(newE5, rotateMat, e5);
    mat.multiplyP4(newE6, rotateMat, e6);

    const outerColor = sf.outerColor;
    const innerColor = sf.innerColor;


    const color3 = [innerColor[0], innerColor[1], innerColor[2],
        innerColor[0], innerColor[1], innerColor[2],
        innerColor[0], innerColor[1], innerColor[2]];

    let norm0 = calcNormalFromVec(e2, e1, e3);

    pushTriangle(createTriangleJS(newE1, newE2, newE3), norm0, color3);
    pushTriangle(createTriangleJS(newE4, newE5, newE6), norm0, color3);

    //bottom of cap
    const d1 = vec4.create(
        r * zScale1 * Math.cos(angle),
        height * hScale2,
        r * zScale1 * Math.sin(angle));
    const d3 = vec4.create(
        r * zScale1 * Math.cos(angle + aStep),
        height,
        r * zScale1 * Math.sin(angle + aStep));
    const d2 = vec4.create(
        r * zScale1 * Math.cos(angle + aStep),
        height * hScale2,
        r * zScale1 * Math.sin(angle + aStep));


    const d4 = d1;
    const d5 = d3;
    const d6 = vec4.create(
        r * zScale1 * Math.cos(angle),
        height,
        r * zScale1 * Math.sin(angle));

    const newD1 = vec4.create();
    const newD2 = vec4.create();
    const newD3 = vec4.create();
    const newD4 = vec4.create();
    const newD5 = vec4.create();
    const newD6 = vec4.create();

    mat.multiplyP4(newD1, rotateMat, d1);
    mat.multiplyP4(newD2, rotateMat, d2);
    mat.multiplyP4(newD3, rotateMat, d3);
    mat.multiplyP4(newD4, rotateMat, d4);
    mat.multiplyP4(newD5, rotateMat, d5);
    mat.multiplyP4(newD6, rotateMat, d6);

    norm0 = calcNormalFromVec(d2, d1, d3);
    const color1 = [innerColor[0], innerColor[1], innerColor[2],
        innerColor[0], innerColor[1], innerColor[2],
        outerColor[0], outerColor[1], outerColor[2]];
    const color2 = [innerColor[0], innerColor[1], innerColor[2],
        outerColor[0], outerColor[1], outerColor[2],
        outerColor[0], outerColor[1], outerColor[2]];


    pushTriangle(createTriangleJS(newD1, newD2, newD3), norm0, color1);
    pushTriangle(createTriangleJS(newD4, newD5, newD6), norm0, color2);


    const hScale3 = sf.hScale3;

    const f1 = vec4.create(
        r * zScale1 * Math.cos(angle),
        cEnd,
        r * zScale1 * Math.sin(angle));
    const f3 = vec4.create(
        r * Math.cos(angle + aStep),
        height * hScale3,
        r * Math.sin(angle + aStep));
    const f2 = vec4.create(
        r * zScale1 * Math.cos(angle + aStep),
        cEnd,
        r * zScale1 * Math.sin(angle + aStep));

    const f4 = f1;
    const f5 = f3;
    const f6 = vec4.create(
        r * Math.cos(angle),
        height * hScale3,
        r * Math.sin(angle));


    const newF1 = vec4.create();
    const newF2 = vec4.create();
    const newF3 = vec4.create();
    const newF4 = vec4.create();
    const newF5 = vec4.create();
    const newF6 = vec4.create();

    mat.multiplyP4(newF1, rotateMat, f1);
    mat.multiplyP4(newF2, rotateMat, f2);
    mat.multiplyP4(newF3, rotateMat, f3);
    mat.multiplyP4(newF4, rotateMat, f4);
    mat.multiplyP4(newF5, rotateMat, f5);
    mat.multiplyP4(newF6, rotateMat, f6);

    norm0 = calcNormalFromVec(newF2, newF1, newF3);
    pushTriangle(createTriangleJS(newF1, newF2, newF3), norm0, color3);
    pushTriangle(createTriangleJS(newF4, newF5, newF6), norm0, color3);
}

function calcNormalFromVec(v1, v2, v3) {
    const x1 = v1[0];
    const y1 = v1[1];
    const z1 = v1[2];
    const x2 = v2[0];
    const y2 = v2[1];
    const z2 = v2[2];
    const x3 = v3[0];
    const y3 = v3[1];
    const z3 = v3[2];

    const ux = x2 - x1,
        uy = y2 - y1,
        uz = z2 - z1;

    const vx = x3 - x1,
        vy = y3 - y1,
        vz = z3 - z1;

    return [uy * vz - uz * vy,
        uz * vx - ux * vz,
        ux * vy - uy * vx];
}

function checkToothCount(tc) {
    let retVal = tc * 2;
    if (retVal % 4 === 0) {
        retVal += 2;
    }
    return retVal;
}

function drawGearTooth(angleStep, options, ang) {

    const innerColor = options.toothInnerColor;
    const outerColor = options.toothOuterColor;


    const n = DULLNESS;
    const s = n - 1;
    const z = options.outerThickness;
    const outRad = RADIUS + options.teethHeight;
    const inStep = 0.03;
    const angStep = angleStep / n;

    const rot0 = mat.create();
    mat.rotate(rot0, 180, 0, 1, 0);

    const v1 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        -z);
    const v2 = vec4.create(
        outRad * Math.cos(ang + angStep),
        outRad * Math.sin(ang + angStep),
        -z + inStep);
    const v3 = vec4.create(
        outRad * Math.cos(ang + angStep),
        outRad * Math.sin(ang + angStep),
        z - inStep);

    const v4 = vec4.create(RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        -z);
    const v5 = vec4.create(outRad * Math.cos(ang + angStep),
        outRad * Math.sin(ang + angStep),
        z - inStep);
    const v6 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        z);

    const norm0 = calcNormalFromVec(v1, v2, v3);
    let norm1 = calcNormalFromVec(v4, v5, v6);


    const color2 = [innerColor[0], innerColor[1], innerColor[2],
        outerColor[0], outerColor[1], outerColor[2],
        outerColor[0], outerColor[1], outerColor[2]];

    const color3 = [innerColor[0], innerColor[1], innerColor[2],
        outerColor[0], outerColor[1], outerColor[2],
        innerColor[0], innerColor[1], innerColor[2]];

    pushTriangle(createTriangleJS(v1, v2, v3), norm0, color2);
    pushTriangle(createTriangleJS(v4, v5, v6), norm1, color3);

    const newV1 = vec4.create();
    mat.multiplyP4(newV1, rot0, v1);
    const newV2 = vec4.create();
    mat.multiplyP4(newV2, rot0, v2);
    const newV3 = vec4.create();
    mat.multiplyP4(newV3, rot0, v3);
    const newNorm0 = vec4.create();


    mat.multiplyP4(newNorm0, rot0, norm0);

    norm1 = calcNormalFromVec(v4, v5, v6);
    const newV4 = vec4.create();
    mat.multiplyP4(newV4, rot0, v4);
    const newV5 = vec4.create();
    mat.multiplyP4(newV5, rot0, v5);
    const newV6 = vec4.create();
    mat.multiplyP4(newV6, rot0, v6);

    const newNorm1 = vec4.create();
    mat.multiplyP4(newNorm1, rot0, norm1);

    pushTriangle(createTriangleJS(newV1, newV2, newV3), newNorm0, color2);
    pushTriangle(createTriangleJS(newV4, newV5, newV6), newNorm1, color2);

    const c1 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        -z);
    const c2 = vec4.create(
        RADIUS * Math.cos(ang + angleStep),
        RADIUS * Math.sin(ang + angleStep),
        -z);
    const c3 = vec4.create(
        outRad * Math.cos(ang + s * angStep),
        outRad * Math.sin(ang + s * angStep),
        -z + inStep);

    const c4 = vec4.create(
        RADIUS * Math.cos(ang),
        RADIUS * Math.sin(ang),
        -z);
    const c5 = c3;
    const c6 = vec4.create(
        outRad * Math.cos(ang + angStep),
        outRad * Math.sin(ang + angStep),
        -z + inStep);

    const normC0 = calcNormalFromVec(c1, c2, c3);
    const normC1 = calcNormalFromVec(c4, c5, c6);

    const color0 = [outerColor[0], outerColor[1], outerColor[2],
        outerColor[0], outerColor[1], outerColor[2],
        outerColor[0], outerColor[1], outerColor[2]];

    const color1 = [innerColor[0], innerColor[1], innerColor[2],
        innerColor[0], innerColor[1], innerColor[2],
        outerColor[0], outerColor[1], outerColor[2]];

    pushTriangle(createTriangleJS(c1, c2, c3), normC0, color1);
    pushTriangle(createTriangleJS(c4, c5, c6), normC1, color2);


    const newC1 = vec4.create();
    mat.multiplyP4(newC1, rot0, c1);
    const newC2 = vec4.create();
    mat.multiplyP4(newC2, rot0, c2);
    const newC3 = vec4.create();
    mat.multiplyP4(newC3, rot0, c3);


    const newC4 = vec4.create();
    mat.multiplyP4(newC4, rot0, c4);
    const newC5 = vec4.create();
    mat.multiplyP4(newC5, rot0, c5);
    const newC6 = vec4.create();
    mat.multiplyP4(newC6, rot0, c6);

    const normC2 = calcNormalFromVec(newC1, newC2, newC3);
    const normC3 = calcNormalFromVec(newC4, newC5, newC6);

    pushTriangle(createTriangleJS(newC1, newC2, newC3), normC2, color1);
    pushTriangle(createTriangleJS(newC4, newC5, newC6), normC3, color2);

    const rad1 = vec4.create(
        outRad * Math.cos(ang + angStep),
        outRad * Math.sin(ang + angStep),
        -z + inStep);
    const rad2 = vec4.create(
        outRad * Math.cos(ang + angStep),
        outRad * Math.sin(ang + angStep),
        z - inStep);
    const rad3 = vec4.create(
        outRad * Math.cos(ang + s * angStep),
        outRad * Math.sin(ang + s * angStep),
        -z + inStep);

    const normR0 = [outRad * Math.cos(ang + angStep), outRad * Math.sin(ang + angStep), 0];
    pushTriangle(createTriangleJS(rad1, rad2, rad3), normR0, color0);

    const rad4 = vec4.create(
        outRad * Math.cos(ang + angStep),
        outRad * Math.sin(ang + angStep),
        z - inStep);
    const rad5 = vec4.create(
        outRad * Math.cos(ang + angStep * s),
        outRad * Math.sin(ang + angStep * s),
        z - inStep);
    const rad6 = vec4.create(
        outRad * Math.cos(ang + s * angStep),
        outRad * Math.sin(ang + s * angStep),
        -z + inStep);

    const normrad1 = [outRad * Math.cos(ang + angStep), outRad * Math.sin(ang + angStep), 0];
    pushTriangle(createTriangleJS(rad4, rad5, rad6), normrad1, color0);

}


function createTriangleJS(v1, v2, v3) {
    return {
        normals: calcNormal(v1[0], v1[1], v1[2], v2[0], v2[1], v2[2], v3[0], v3[1], v3[2]),
        vertices: [v1[0], v1[1], v1[2], v2[0], v2[1], v2[2], v3[0], v3[1], v3[2]]
    }
}

function pushTriangle(tv, n, col) {
    vertices.push(
        tv.vertices[0], tv.vertices[1], tv.vertices[2],
        tv.vertices[3], tv.vertices[4], tv.vertices[5],
        tv.vertices[6], tv.vertices[7], tv.vertices[8]
    );
    normals.push(
        n[0], n[1], n[2],
        n[0], n[1], n[2],
        n[0], n[1], n[2]
    );
    colors.push(
        col[0], col[1], col[2],
        col[3], col[4], col[5],
        col[6], col[7], col[8]
    )
}




