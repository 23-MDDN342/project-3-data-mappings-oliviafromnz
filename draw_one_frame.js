function draw_one_frame(cur_frac) {
    // VARIABLES
    
    ellipseMode(RADIUS);
    let window_size = canvasHeight/2; // window size
    //strokeJoin(ROUND)
    
    /////////////// COLOURS //////////////
    
    let window_color1 = color("#8AB0BF") // light blue colour
    let window_color2 = color("#65818c") // lighter blue colour
    let backgroundColor = color ("#D9B384") // background colour sand
    let framingColor = color ("#E5DCC7") //framing colour 
    let celingColor = color ("#EBE3AB") //ceiling colour light sand
    
    let ceiling_alive = color ("#DCA553")
    let ceiling_alive2 = color ("#FFE0B6")
    //let darkeygreen = color ("#93AEBF")  // dark greeny blue
    let framingdetail = color ("#42565D")
    let windowXsize = width/2;
    let windowYsize = height*1;
    let window_framecolor = color ("#405259")
    let ceilingstroke_chnage = color ("#B7A47D")
    
    let mainColor = color("#EADFC4") // light cream
    let backupColor = color("#738E99") // blue
    let detailColor = color ("#B26E14") //yellow
    
    ///////////////// CEILING //////////////
    
    noStroke();
    fill(celingColor);
    rect(0, 0, width, height);
    
    
    let changeval = map(cur_frac, -1, 1, 0, 1)
    // let val = map(cur_frac, -1, 1, 0, 1) //CurFrac already goes between 0 and 1 so I made val a little smarter 
    if (cur_frac <= 0.5){
      changeval = map(cur_frac, 0 , 0.5, 0, 1) // for the first half of the animation, have the val get bigger 
    }
    else{
      changeval = map(cur_frac, 0.5,1, 1,0) // for the second half of the animation have the val get smaller
    } // this is a system you may want to implement for your colour changes above in the code. 
    
     let ceiling_change = lerpColor(ceiling_alive2, ceiling_alive, changeval);
     let ceiling_change2 = lerpColor(detailColor, ceiling_alive, changeval);
     let detail_change = lerpColor(framingColor, ceilingstroke_chnage, changeval);
    
     
    // /// array for ceiling arc colour ////
    
    let arcColor = [
      color("#EADFC4"), // light cream
      color("#9D9759"), //green
      color("#E5DCC7"), //cream
      color("#738E99"), // blue
      color("#DCA553"), //yellow dark
      color("#B35842") //red
    ]
    
    /// where ellipses spawn //////
      strokeWeight(1);
      let circ_points = [
      //1 * height,
      1.33 * height,
      1.66 * height,
      1.99 * height,
      2.33 * height,
      2.66 * height,
      2.99 * height,
      3.33 * height,
      3.66 * height,
      ]
    
    
    ///// making the arcs spawn and move upwards ////
    // (Phobes code with notes attatched)
     push()
    strokeWeight(3);
    stroke(0)
    for (let i = 0; i < circ_points.length - 1; i++) {
    let cur_grid_line = map(cur_frac, 0, 1, circ_points[i], circ_points[i - 1]);
    console.log(cur_grid_line)
    let value = map(cur_grid_line, 0, height, 0, 1); // this is just remapping something to equal cur frac again ... I think
    let arcColor_change = lerpColor(arcColor[i%arcColor.length], arcColor[(i+1)%arcColor.length], cur_frac); // %arcColor.length means you will always have a number that fits the array length of your colours. 
     fill(arcColor_change);
     strokeWeight(width/30)
     stroke(detail_change)
     ellipseMode(CENTER);
     ellipse(width / 2, cur_grid_line/1.35, windowXsize * 2.5, windowYsize * 2.5);
    
     noFill()
     stroke(window_framecolor)
     strokeWeight(width/150)
     ellipse(width / 2, cur_grid_line/1.35, windowXsize * 2.5, windowYsize * 2.5);
    
     noStroke()
     fill(135,	135,	135, 40)
     ellipse(width / 2, cur_grid_line/1.24, windowXsize * 2.5, windowYsize * 2.5);
    
    
     line(width/2, height,width*0.33, height*0) 
     line(width/2, height,width*0.66, height*0) 
    
     //pop()
    
    //////////////////////// WINDOW ARC /////////
    push()
    strokeWeight(width/70)
    stroke("#EADFC4")
    fill(detail_change);
    ellipse(windowXsize, height/0.96, window_size*2.4, window_size*1.3);
    
    // detail blue stroke on main arc 
    noFill()
    strokeWeight(width/150)
    stroke(window_framecolor)
    ellipse(windowXsize, height/0.97, window_size*2.4, window_size*1.3);
    pop()
    
     ///////////////////////// WINDOW //////////////
    
    // window colour looping
    
    noStroke()
    let val = map(cur_frac, -1, 1, 0, 1)
    // let val = map(cur_frac, -1, 1, 0, 1) //CurFrac already goes between 0 and 1 so I made val a little smarter 
    if (cur_frac <= 0.5){
      val = map(cur_frac, 0 , 0.5, 0, 1) // for the first half of the animation, have the val get bigger 
    }
    else{
      val = map(cur_frac, 0.5,1, 1,0) // for the second half of the animation have the val get smaller
    } // this is a system you may want to implement for your colour changes above in the code. 
    
     let window_change = lerpColor(window_color1, window_color2, val);
    
    // window main ellipse
    
      // window main ellipse glow
      strokeWeight(width/50)
      stroke(ceiling_change)
      ellipse(windowXsize, height, window_size);
    
      // blue outer window frame
    strokeWeight(width/100)
    stroke(window_framecolor)
    fill(ceiling_change)
    ellipse(windowXsize, height, window_size);
    
    push()
    noStroke()
    fill(125,	125,	125, 200) // blue color in rgb with transparency value
    ellipse(windowXsize, height*1.01, window_size*0.96, window_size-8);
    pop()
    
    //window framing inner circle
    
    push()
    strokeWeight(width/100)
    fill(window_change); 
    stroke(window_framecolor)
    ellipse(windowXsize, height, window_size/1.20);
    pop()
    
    
    // window framining inner lines
    
    push()
    strokeWeight(width/150)
    stroke(window_framecolor)
    line(width/2, height/1.26, width/2, height) // centre line 
    line(width/2.4, height/1.16, width/2, height) // left line
    line(width/1.71, height/1.16, width/2, height) // right line
    line(width/2.58, height, width/1.62, height) // bottom line
    pop()
    
    //////////////////////// WALLS BASE //////////////
    push()
    noStroke()
    //left wall
    fill(backgroundColor);
    quad(width*0.35, height, windowXsize*0.25, height*0, windowXsize*0, height*0, width*0.001, height)
    
    //right wall
    quad(width*0.65, height, windowXsize*1.75, height*0, windowXsize*2, height*0, width, height)
    pop()
    
    // framing lines ceiling thick lines
    push()
    
    noFill()
    
    strokeWeight(width/17)
    stroke(ceiling_change2)
    line (width*0.65, height,windowXsize*1.75, height*0); // right wall
    line (width*0.35, height,windowXsize*0.25, height*0); // left wall
    
    strokeWeight(width/20)
    stroke(ceiling_change)
    line (width*0.65, height,windowXsize*1.75, height*0); // right wall
    line (width*0.35, height,windowXsize*0.25, height*0); // left wall
    
    strokeWeight(width/200)
    stroke(window_framecolor)
    line (width*0.64, height,windowXsize*1.73, height*0); // right wall
    line (width*0.36, height,windowXsize*0.27, height*0); // left wall
    
    stroke("#A55A16")
    line (width*0.66, height,windowXsize*1.77, height*0); // right wall
    line (width*0.34, height,windowXsize*0.23, height*0); // left wall
    
    
    pop()
    
    /////////////////////////// smaller PAINTING BASES //////////////
    push()
    fill("#D9CDB8")
    triangle(width*0.83, height*1.02, windowXsize*1.67, height*0.42, width*0.70, height*1.02) //right panel framing inner
    triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height*1.02) //right panel framing inner
    
    ////////////////////////// PIXELS FOR PAINTINGS /////////////
    
    let orbSize = width / 40;
    let spacingSize = width / 55;
    
    let shapePoints = []; // array to store the points defining the custom shape
    
    // Defining quad and triangle points 
    
    fill("#D9CDB8");
    noStroke(30);
    beginShape(); // start defining the custom shape
    shapePoints.push(createVector(width*0.91, height));
    shapePoints.push(createVector(windowXsize*1.79, height*0.18));
    shapePoints.push(createVector(windowXsize*2, height*-0.25));
    shapePoints.push(createVector(width, height));
    quad(width*0.90, height, windowXsize*1.79, height*0.18, windowXsize*2, height*-0.25, width, height); // right panel framing
    
    shapePoints.push(createVector(width*0.09, height));
    shapePoints.push(createVector(windowXsize*.21, height*0.18));
    shapePoints.push(createVector(windowXsize*0, height*-0.25));
    shapePoints.push(createVector(width*0, height));
    quad(width*0.10, height, windowXsize*.21, height*0.18, windowXsize*0, height*-0.10, width*0, height); // left panel framing
    
    shapePoints.push(createVector(width*0.84, height*1.02));
    shapePoints.push(createVector(windowXsize*1.69, height*0.38));
    shapePoints.push(createVector(width*0.71, height)); // left bottom point
    triangle(width*0.83, height*1.02, windowXsize*1.69, height*0.38, width*0.70, height) //right panel framing inner
    
    shapePoints.push(createVector(width*0.17, height*1.02));
    shapePoints.push(createVector(windowXsize*0.33, height*0.42));
    shapePoints.push(createVector(width*0.29, height)); // right bottom point
    triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height) //left panel framing inner
    
    endShape(CLOSE); // end the custom shape
    
    // making loop for ellipses
    push()
    for(let across = 0.5; across < width/spacingSize; across++) {
      for(let down = 0.5; down < height/spacingSize; down++) {
      let x = spacingSize*across;
      let y = spacingSize*down;
      
      // check if the ellipse is within the custom shape 
    
      if(isPointInShape(x, y, shapePoints)) {
        noiseColor = getNoiseValue(spacingSize*across, spacingSize*down, 0.8, "noiseColor", 0, 1, 150); // 200 is smooth value making it lumpy looking
      noiseyColor = lerpColor(mainColor, backupColor, noiseColor);
      noiseycolor2 = lerpColor(backupColor, detailColor, noiseColor);
      finallerp = lerpColor(noiseyColor, noiseycolor2, noiseColor);
        fill(finallerp);
        ellipse(x, y, orbSize);
      }
    
      }
    }
    pop()
    
    // function to determine if a point is within a custom shape defined by an array of vertices
    // (sourced from ChatGPT.com)
    function isPointInShape(x, y, vertices) {
      let inside = false;
      let j = vertices.length - 1;
      for(let i = 0; i < vertices.length; i++) {
      if((vertices[i].y < y && vertices[j].y >= y || vertices[j].y < y && vertices[i].y >= y) && (vertices[i].x <= x || vertices[j].x <= x)) {
        if(vertices[i].x + (y - vertices[i].y) / (vertices[j].y - vertices[i].y) * (vertices[j].x - vertices[i].x) < x) {
        inside = !inside;
        }
      }
      j = i;
      }
      return inside;
    }
    
    
     ////////////////////////////// FRAMING  ///////////////
    
     // framing for quads 
    
     push()
    noFill()
    strokeWeight(width/50)
    stroke(framingColor)
    quad(width*0.90, height*1.02, windowXsize*1.79, height*0.17, windowXsize*2, height*-0.25, width, height*1.02); // right panel framing
    quad(width*0.10, height*1.02, windowXsize*.21, height*0.17, windowXsize*0, height*-0.25, width*0, height*1.02); // left panel framing
    pop()
    
    // framing for triangle and wall ceiling mounting
    
    push()
    noFill()
    strokeWeight(width/50)
    stroke(framingColor)
    triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height*1.02) //left panel framing inner
    triangle(width*0.83, height*1.02, windowXsize*1.67, height*0.42, width*0.70, height*1.02) //right panel framing inner
    
    pop()
    
    // detailed framing for paintings and wall ceiling mounting
    
    push()
    noFill()
    strokeWeight(width/100)
    stroke(framingdetail)
    
    line (width*0.65, height,windowXsize*1.75, height*0); // right wall
    line (width*0.35, height,windowXsize*0.25, height*0); // left wall
    
    triangle(width*0.17, height*1.02, windowXsize*0.33, height*0.42, width*0.30, height*1.02) //left panel framing inner
    triangle(width*0.83, height*1.02, windowXsize*1.67, height*0.42, width*0.70, height*1.02) //right panel framing inner
    
    quad(width*0.90, height*1.02, windowXsize*1.79, height*0.17, windowXsize*2, height*-0.25, width, height*1.02); // right panel framing
    quad(width*0.10, height*1.02, windowXsize*.21, height*0.17, windowXsize*0, height*-0.25, width*0, height*1.02); // left panel framing
    
    pop()
    
    //////////////////////// DE BUG  ///////// 
    //(not updated)
    if (debugView) {
      strokeWeight(1);
      stroke(255, 0, 0);
      for(let i=0; i<circ_points.length; i++) {
      ellipse(width / 2, cur_grid_line*2, windowXsize * 1.9, windowYsize * 4.4);
    
      }
    } 
    
      // white deatiled framing/moutning in wall 
    
    strokeWeight(width/100)
    stroke("#E5DCC7")
    
    line(width*0.865, height, width*0.865, height*0.20)
    line (width*0.68, height,windowXsize*1.82, height*0); // right wall
    
    line(width*0.135, height, width*0.135, height*0.20)
    line (width*0.32, height,windowXsize*0.18, height*0); // left wall
    
    pop()
    
    ////////////////////////// SHADING WALL ///////////////
    
    let startColor = color(50, 98, 100, 80); //  w/alpha
    let endColor = color(8, 78, 100, 100); //  w/alpha
    noStroke();
    
    // right wall points
    let quadPts = [
      createVector(width*0.33, height),
      createVector(windowXsize*0.25, height*0.12),
      createVector(windowXsize*0, height*-0.4),
      createVector(width*0.001, height),
    ]; 
    
    // with gradient effect and transparency
    for (let i = 0; i < quadPts.length - 1; i++) {
      let colorLerp = lerpColor(startColor, endColor, i/(quadPts.length-2)); // Calculate the color at this point of the gradient
      fill(colorLerp);
      quad(
      quadPts[i].x, quadPts[i].y,
      quadPts[i+1].x, quadPts[i+1].y,
      quadPts[i+1].x, height,
      quadPts[i].x, height
      );
    }
     
    // left wall points
    let quadPts2 = [
      createVector(width*0.67, height),
      createVector(windowXsize*1.75, height*0),
      createVector(windowXsize*2, height*0),
      createVector(width, height)
    ]; 
    
    // with gradient effect and transparency
    for (let i = 0; i < quadPts2.length - 1; i++) {
      let colorLerp = lerpColor(startColor, endColor, i/(quadPts2.length-2)); // Calculate the color at this point of the gradient
      fill(colorLerp);
      quad(
      quadPts2[i].x, quadPts[i].y,
      quadPts2[i+1].x, quadPts[i+1].y,
      quadPts2[i+1].x, height,
      quadPts2[i].x, height
      );
    }
    }
    
  
  // note: you can draw optional things depending on "debugView"
  if (debugView) {
    // we'll draw our "keyframes"
    noFill();
    stroke(255, 0, 0);
    strokeWeight(height/100);
    // here we "plug in" the values when cur_frac is 0
    rect(-half_width, 0, rect_width, height);
    rect( width - half_width, 0, rect_width, height);
    rect(-width - half_width, 0, rect_width, height);
  }
}

