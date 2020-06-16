
//  build the object, including geometry (triangle vertices)
//  and possibly colors and normals for each vertex
function sschulerGear(numTeeth, numSpokes) {
    const vertices = [];
    const colors = [];
    const normals = [];


    ////////////////////////////
    // Making gear triangles

    //** Minimum numTeeth = 4 **
    //** Minimum numSpokes = 3 **
    ////////////////////////////

    var n = numTeeth * 2;
    var m = numSpokes * 2;
    var rad = 1.0;
    var outRad = rad * 1.2;
    var angInc = 2*3.14159/n;
    var spokeAngInc = 2*3.14159/m;
    var ang = 0;
    var z = 0.1;

    var i;       //  inner coin face back
    var angMult = 0.4;
    for (i = 0; i < n; i++) {   //if 5 do 10 for white space
    
        vertices.push(0, 0, z,
                      rad*Math.cos(ang) * angMult, rad*Math.sin(ang) * angMult, z,
                      rad*Math.cos(ang+angInc) * angMult, rad*Math.sin(ang+angInc) * angMult, z)

        // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
        // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
        colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

        normals.push(0,0,1, 0,0,1, 0,0,1);
        ang += angInc;
    }

    ang = 0;                         //inner coin face front
    var angMult = 0.4;
    for (i = 0; i < n; i++) {
    
        var mat = new Learn_webgl_matrix();
        var rotateMat =  mat.create();
        mat.rotate(rotateMat, 180, 0,1,0);

        var vec4 = new Learn_webgl_point4();
        var v1 = vec4.create(0, 0, z);
        var v2 = vec4.create(rad*Math.cos(ang) * angMult, rad*Math.sin(ang) * angMult, z);
        var v3 = vec4.create(rad*Math.cos(ang+angInc) * angMult, rad*Math.sin(ang+angInc) * angMult, z);

        var newV1 = vec4.create();   
        mat.multiplyP4(newV1,rotateMat,v1);

        var newV2 = vec4.create();   
        mat.multiplyP4(newV2,rotateMat,v2);

        var newV3 = vec4.create();   
        mat.multiplyP4(newV3,rotateMat,v3);                  


        vertices.push(newV1[0], newV1[1], newV1[2],  
                      newV2[0], newV2[1], newV2[2],          
                      newV3[0], newV3[1], newV3[2])

    // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
    // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
    colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

    /// AND WE COULD HAVE ROTATED THE NORMALS
    normals.push(0,0,-1, 0,0,-1, 0,0,-1);
    ang += angInc;

    }   

    var r;
    var z = 0.1;
    drawTooth=false;
    for (r = 0; r < 2; r++) {
        ang = 0;
        drawTooth=false;
        for ( i = 0; i < m ; i++) {       // spoke face
            drawTooth = !drawTooth;
            if(drawTooth) {
                vertices.push(0.25*rad*Math.cos(ang), 0.25*rad*Math.sin(ang), z,
                              0.25*rad*Math.cos(ang+spokeAngInc), 0.25*rad*Math.sin(ang+spokeAngInc), z,
                              0.93*rad*Math.cos(ang+spokeAngInc), 0.93*rad*Math.sin(ang+spokeAngInc), z)

                // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
                // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
                colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper
                
                if (z > 0)
                    normals.push(0,0,1, 0,0,1, 0,0,1);    
                else
                    normals.push(0,0,-1, 0,0,-1, 0,0,-1);    

                vertices.push(0.25*rad*Math.cos(ang), 0.25*rad*Math.sin(ang), z,
                              0.93*rad*Math.cos(ang+spokeAngInc), 0.93*rad*Math.sin(ang+spokeAngInc), z,
                              0.93*rad*Math.cos(ang), 0.93*rad*Math.sin(ang), z);


                // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
                // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
                colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

                if (z > 0)
                    normals.push(0,0,1, 0,0,1, 0,0,1);    
                else
                    normals.push(0,0,-1, 0,0,-1, 0,0,-1);  
            }
            ang += spokeAngInc;
        }
        z = -z;
    }

    ang = 0;                          //  inner coin inner edge
    var drawTooth = true;
    for (i = 0; i < n; i++) {
	    var norm = [rad*Math.cos(ang+angInc/2), rad*Math.sin(ang+angInc/2), 0];
        if (drawTooth) {
            vertices.push(rad*Math.cos(ang) * 0.4, rad*Math.sin(ang)* 0.4, -z,
                          rad*Math.cos(ang+angInc)* 0.4, rad*Math.sin(ang+angInc)* 0.4, -z,
                          rad*Math.cos(ang+angInc)* 0.4, rad*Math.sin(ang+angInc)* 0.4, z)

        // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
        // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
        colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

        vertices.push(rad*Math.cos(ang)* 0.4, rad*Math.sin(ang)* 0.4, -z,
                      rad*Math.cos(ang+angInc)* 0.4, rad*Math.sin(ang+angInc)* 0.4, z,
                      rad*Math.cos(ang)* 0.4, rad*Math.sin(ang)* 0.4, z)

        // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
        // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
        colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])         

        }
        ang += angInc;
    }

    ang = 0;                          //  inner coin outer edge
    var drawTooth = true;
    for (i = 0; i < n; i++) {
        var norm = [-rad*Math.cos(ang+angInc), -rad*Math.sin(ang+angInc), 0];
        if (drawTooth) {
            vertices.push(rad*Math.cos(ang) * 0.8, rad*Math.sin(ang)* 0.8, -z,
                          rad*Math.cos(ang+angInc)* 0.8, rad*Math.sin(ang+angInc)* 0.8, -z,
                          rad*Math.cos(ang+angInc)* 0.8, rad*Math.sin(ang+angInc)* 0.8, z)

        // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
        // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
        colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(rad*Math.cos(ang)* 0.8, rad*Math.sin(ang)* 0.8, -z,
                          rad*Math.cos(ang+angInc)* 0.8, rad*Math.sin(ang+angInc)* 0.8, z,
                          rad*Math.cos(ang)* 0.8, rad*Math.sin(ang)* 0.8, z)

        // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
        // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
        colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

        normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])         

        }
        ang += angInc;
    }

    ang=0;
    drawTooth = true
    for ( i = 0; i < n; i++) {   // spoke walls
        drawTooth = !drawTooth;
        if (drawTooth) {
            var norm = calcNormal(0.4*rad*Math.cos(ang), 0.4*rad*Math.sin(ang), -z,
                                  0.8*rad*Math.cos(ang), 0.8*rad*Math.sin(ang), -z,
                                  0.8*rad*Math.cos(ang), 0.8*rad*Math.sin(ang), z)

            vertices.push(0.4*rad*Math.cos(ang), 0.4*rad*Math.sin(ang), -z,
                          0.8*rad*Math.cos(ang), 0.8*rad*Math.sin(ang), -z,
                          0.8*rad*Math.cos(ang), 0.8*rad*Math.sin(ang), z)

            // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


            vertices.push(0.4*rad*Math.cos(ang), 0.4*rad*Math.sin(ang), -z,
                          0.8*rad*Math.cos(ang), 0.8*rad*Math.sin(ang), z,
                          0.4*rad*Math.cos(ang), 0.4*rad*Math.sin(ang), z)

            // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

            var norm = calcNormal(0.4*rad*Math.cos(ang+spokeAngInc), 0.4*rad*Math.sin(ang+spokeAngInc), -z,
                                  0.8*rad*Math.cos(ang+spokeAngInc), 0.8*rad*Math.sin(ang+spokeAngInc), z,
                                  0.8*rad*Math.cos(ang+spokeAngInc), 0.8*rad*Math.sin(ang+angInc), -z)
            
            vertices.push(0.4*rad*Math.cos(ang+spokeAngInc), 0.4*rad*Math.sin(ang+spokeAngInc), -z,
                          0.8*rad*Math.cos(ang+spokeAngInc), 0.8*rad*Math.sin(ang+spokeAngInc), -z,
                          0.8*rad*Math.cos(ang+spokeAngInc), 0.8*rad*Math.sin(ang+spokeAngInc), z)

            // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push( 0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

            vertices.push(0.4*rad*Math.cos(ang+spokeAngInc), 0.4*rad*Math.sin(ang+spokeAngInc), -z,
                          0.8*rad*Math.cos(ang+spokeAngInc), 0.8*rad*Math.sin(ang+spokeAngInc), z,
                          0.4*rad*Math.cos(ang+spokeAngInc), 0.4*rad*Math.sin(ang+spokeAngInc), z)

            // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])    
        
            ang += spokeAngInc * 2;
        }
    }

    var r;
    var z = 0.1;
    drawTooth=true;
    for (r = 0; r < 2; r++) {
        ang = 0;
        for ( i = 0; i < n; i++) {       // outer coin face

            vertices.push(0.8*rad*Math.cos(ang), 0.8*rad*Math.sin(ang), z,
                          0.8*rad*Math.cos(ang+angInc), 0.8*rad*Math.sin(ang+angInc), z,
                          Math.cos(ang+angInc), Math.sin(ang+angInc), z)

            // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper
            if (z > 0)
                normals.push(0,0,1, 0,0,1, 0,0,1);    
            else
                normals.push(0,0,-1, 0,0,-1, 0,0,-1);    

            vertices.push(0.8*rad*Math.cos(ang), 0.8*rad*Math.sin(ang), z,
                          Math.cos(ang+angInc), Math.sin(ang+angInc), z,
                          Math.cos(ang), Math.sin(ang), z);


            // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            if (z > 0)
                normals.push(0,0,1, 0,0,1, 0,0,1  );    
            else
                normals.push(0,0,-1, 0,0,-1, 0,0,-1  );  
            ang += angInc;
		}
        z = -z;
    }

    var r;
    for (r = 0; r < 2; r++) {
        ang = 0
        var drawTooth = false
        
        for ( i = 0; i < n; i++) {       // face of the teeth

	        drawTooth = !drawTooth
	        if (drawTooth) {

                var norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                                      rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                                      outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), (z/4))

                vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                              rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                              outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), (z/4))

                // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
                // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
                colors.push( 0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper
                  
                if (z > 0)
                    normals.push(-norm[0],-norm[1],-norm[2],-norm[0],-norm[1],-norm[2],-norm[0],-norm[1],-norm[2]);    
                else
                    normals.push(norm[0],norm[1],norm[2],norm[0],norm[1],norm[2],norm[0],norm[1],norm[2]);    

                norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), z,
                                  outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), (z/4),
                                  outRad*Math.cos(ang), outRad*Math.sin(ang), (z/4))
                
                vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), z,
                              outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), (z/4),
                              outRad*Math.cos(ang), outRad*Math.sin(ang), (z/4))


                // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
                // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
                colors.push( 0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

                if (z > 0)
                    normals.push(-norm[0],-norm[1],-norm[2],-norm[0],-norm[1],-norm[2],-norm[0],-norm[1],-norm[2]);    
                else
                    normals.push(norm[0],norm[1],norm[2],norm[0],norm[1],norm[2],norm[0],norm[1],norm[2]);    

		    }
	        ang += angInc;
        }
        z = -z;
   }
   
   ang = 0;                          // outer coin outer edge
   var drawTooth = true;
   for (i = 0; i < n; i++) {

        drawTooth = !drawTooth;
	    var norm = [rad*Math.cos(ang+angInc/2), rad*Math.sin(ang+angInc/2), 0];
        if (drawTooth) {
          
            vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                          rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), -z,
                          rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z)

            // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                          rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), z,
                          rad*Math.cos(ang), rad*Math.sin(ang), z)

            // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push( 0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])            
        }
	    ang += angInc;
    }

    ang = 0;
    drawTooth = false;     // tooth roof
    for (i = 0; i < n; i++) {
	    drawTooth = !drawTooth;
	    if (drawTooth) {
	      
            var norm = [outRad*Math.cos(ang+angInc/2), outRad*Math.sin(ang+angInc/2), 0];

            vertices.push(outRad*Math.cos(ang), outRad*Math.sin(ang), -(z/4),
                          outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), -(z/4),
                          outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), (z/4))

            // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push( 0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])

            vertices.push(outRad*Math.cos(ang), outRad*Math.sin(ang), -(z/4),
                          outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), (z/4),
                          outRad*Math.cos(ang), outRad*Math.sin(ang), (z/4))

            // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push( 0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

		}
	    ang += angInc;
    }

    ang = 0;
    drawTooth = false;
    for ( i = 0; i < n; i++) {   // tooth walls

	    drawTooth = !drawTooth;
	    if (drawTooth) {
 
		    var norm = calcNormal(rad*Math.cos(ang), rad*Math.sin(ang), -z,
		                          outRad*Math.cos(ang), outRad*Math.sin(ang), -(z/4),
		                          outRad*Math.cos(ang), outRad*Math.sin(ang), (z/4))

            vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                          outRad*Math.cos(ang), outRad*Math.sin(ang), -(z/4),
                          outRad*Math.cos(ang), outRad*Math.sin(ang), (z/4))

            // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])


            vertices.push(rad*Math.cos(ang), rad*Math.sin(ang), -z,
                          outRad*Math.cos(ang), outRad*Math.sin(ang), (z/4),
                          rad*Math.cos(ang), rad*Math.sin(ang), z)

            // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

            var norm = calcNormal(rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), -z,
                                  outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), (z/4),
			                      outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), -(z/4))
				                  
            vertices.push(rad*Math.cos(ang+angInc), rad*Math.sin(ang+angInc), -z,
                          outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), -(z/4),
                          outRad*Math.cos(ang+angInc), outRad*Math.sin(ang+angInc), (z/4))

            // colors.push( 0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push( 0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push( 0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             

            vertices.push(rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),-z,
                          outRad*Math.cos(ang+angInc),outRad*Math.sin(ang+angInc),(z/4),
                          rad*Math.cos(ang+angInc),   rad*Math.sin(ang+angInc),z)

            // colors.push(0.83,0.69,0.22,  0.83,0.69,0.22,  0.83,0.69,0.22)  //gold
            // colors.push(0.77,0.79,0.81,  0.77,0.79,0.81, 0.77,0.79,0.81) //silver
            colors.push(0.61,0.42,0.27,  0.61,0.42,0.27,  0.61,0.42,0.27) //copper

            normals.push(norm[0],norm[1],norm[2], norm[0],norm[1],norm[2], norm[0],norm[1],norm[2])             
		}
	    ang += angInc;
    }
    return [vertices,colors,normals]
}




















function calcNormal(x1, y1,  z1,
                    x2,  y2,  z2,
                    x3,  y3,  z3) {
              
    var ux = x2-x1, uy = y2-y1, uz = z2-z1;
    var vx = x3-x1, vy = y3-y1, vz = z3-z1;

    return [ uy * vz - uz * vy,
             uz * vx - ux * vz,
             ux * vy - uy * vx];
}