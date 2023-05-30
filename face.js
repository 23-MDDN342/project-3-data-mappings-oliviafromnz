/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 8;

// other variables can be in here too
// here's some examples for colors used


//const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face(facedetail_value,righteye_value, lefteye_value, mouthh_value) {

  noiseSeed(100); // Set a fixed seed for consistent randomness
  noiseDetail(8, 0.2); // Set the number of octaves and falloff factor

  this.facedetail_value = 2;
  this.righteye_value = 3;
  this.lefteye_value = 6;
  this.mouthh_value = 5;
  this.Haircolour_value;
  this.chizzeled_value;
  this.nose_value;

  this.orange = color('#E98F36');
  this.tourq = color('#36E9D3');

  this.nose2nd_dimen;
  this.rotateNose;


  // these are state variables for a face
  // (your variables should be different!)
  // this.detailColour = [204, 136, 17];
  // this.mainColour = [51, 119, 153];
  // this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  // this.eye_shift = -1;   // range is -10 to 10
  // this.mouth_size = 1;  // range is 0.5 to 8

  // this.chinColour = [153, 153, 51]
  // this.lipColour = [136, 68, 68]
  // this.eyebrowColour = [119, 85, 17]


  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {

    this.lower_val = 0;
    this.higher_val = 5;
    //let x, y;

    this.averageRightEye = segment_average(positions.right_eye);
    this.averageLeftEye = segment_average(positions.left_eye);

    this.averageNose = segment_average (positions.nose_bridge); // find average nose bridge location

    this.averageMouth = segment_average(positions.top_lip);


    this.R_eyeX = positions.right_eye[0][0];
    this.R_eyeY = positions.right_eye[0][1];

    this.L_eyeX = positions.left_eye[0][0];
    this.L_eyeY = positions.left_eye[0][1];

    this.headWidth = positions.chin[16][0] - positions.chin[0][0]; 
    this.headHeight = positions.chin[8][1] - positions.nose_bridge[0][1]; 
    
    this.headSize_L = positions.nose_tip[2][0] - positions.chin[2][0]; 
    this.headSize_R = positions.chin[14][0] - positions.nose_tip[2][0]; 



    this.left_faceedgeX = positions.chin[14][0]+1;
    this.left_faceedgeY = positions.chin[14][0]-2;

    this.right_faceedgeX = positions.chin[2][0]-1;
    this.right_faceedgeY = positions.chin[2][0]+2;

    this.frame_movefacing;
    this.frame_movefacing2;

    this.eye_movefacing2nd;
    this.eye_movefacing2nd2;

    this.ear_trans;

    this.ear_points = 8;
    this.points = 40;
    this.dimensionpoints = this.points-2;

    this.warmcolour_orange = color("#E36A25");
    this.warmcolour_yellow = color("#FEBD11");
    this.warmcolour_pink = color("#D966A7");

    this.coldcolour_blue = color("#1E8096");
    this.coldcolour_green = color("#9BC070");
    this.coldcolour_purple = color("#572E8E");

    this.left_maincolour;
    this.left_featurecolour; 
    this.left_othercolour;

    this.eye_movefacing2nd_right;
    this.eye_movefacing3rd_right;

    this.orginal_framecolour;

    this.dimension_maincolour =  this.warmcolour_orange;
    this.right_featurecolour = this.warmcolour_pink;
    this.right_othercolour = this.warmcolour_yellow;
    this.dimension3_maincolour;

    this.seconddimension_trans;

    this.second_dimen_trans;
    this.third_dimen_trans;


    //finding the short side of the face to define where the circle will appea
    // on each side

    ////// RIGHT EAR /////////////////
    // makes ear line stroke appear when head facing left and center on
    if(this.headSize_L <= this.headSize_R){
      this.ear_trans  = 255;
      this.head_outline = 0;

     }
     // makes ear line dissapear when head is facing right
     else if (this.headSize_L > this.headSize_R){
      this.ear_trans  = 0;
      this.head_outline = 255;
     }
  
    push();
    // noStroke();
    // fill(255, 255, 255,this.ear_trans);
    // ellipse (this.left_faceedgeX, this.left_faceedgeY, 0.2, 0.2)

    beginShape();
    strokeWeight(0.05);
    stroke(255, 255, 255, this.ear_trans);
    noFill();
  vertex(this.left_faceedgeX, this.left_faceedgeY);
  bezierVertex(this.left_faceedgeX - 0.2, this.left_faceedgeY+0.3, this.left_faceedgeX +0.1, this.left_faceedgeY+0.4, this.left_faceedgeX-0.2, this.left_faceedgeY+0.6);
  endShape();

    pop();

     ///////// LEFT EAR ///////////

     // if u look left its gray and right its white
     /// LOOK TO FAR RIGHT
     if(this.headSize_L > this.headSize_R){
      this.distanceBetween = this.headSize_R - this.headSize_L;


      this.ear_trans2  = 255;
      this.head_outline = 255;
      this.frame_movefacing = +0.3;
      this.frame_movefacing2 = +0.9;

      this.dimension_maincolour = this.warmcolour_orange;
      this.orginal_framecolour = this.warmcolour_pink;
      this.dimension3_maincolour = this.warmcolour_yellow;
      this.seconddimension_trans = 255;

      this.eye_movefacing2nd = -1.5;
      this.eye_movefacing3rd = -1;

      this.eye_movefacing2nd_right = +2;
      this.eye_movefacing3rd_right = +2.5;

      this.second_dimen_trans = 0;

      this.nose2nd_dimen = -0.5;
      this.nose3rd_dimen = -1;

      this.rotateNose;
      this.distanceBetween = this.headSize_R - this.headSize_L;


     }



// when facing right
if (this.headSize_R > this.headSize_L){
  this.distanceBetween = this.headSize_L - this.headSize_R;

  this.ear_trans2  = 0;
  this.head_outline = 100;
  this.frame_movefacing = -0.3;
  this.frame_movefacing2 = -0.9;

  this.dimension_maincolour = this.coldcolour_blue;
  this.orginal_framecolour = this.coldcolour_purple;
  this.dimension3_maincolour = this.coldcolour_green;
  this.seconddimension_trans = 255;

  this.distanceBetween = this.headSize_L- this.headSize_R;
  
  /// LEFT EYE
  this.eye_movefacing2nd = -2.5;
  this.eye_movefacing3rd = -3;

  // RIGHT EYE
  this.eye_movefacing2nd_right = +1;
  this.eye_movefacing3rd_right = 0.5;

  /// NOSE
  this.nose2nd_dimen = +0.5;
  this.nose3rd_dimen = +1;
 }


     else {
      this.ear_trans2  = 255;
      this.head_outline = 255;
      this.seconddimension_trans = 0;

     }
  
    push();
     //noStroke();
     fill(255, 255, 255,255);
     ellipse (this.right_faceedgeX, this.right_faceedgeY, 0.2, 0.2)

    beginShape();
    strokeWeight(0.05);
    stroke(this.dimension_maincolour);
    noFill();
    vertex(this.right_faceedgeX, this.right_faceedgeY);
    bezierVertex(this.right_faceedgeX - 0.2, this.right_faceedgeY+0.3, this.right_faceedgeX -0.3, this.right_faceedgeY+0.4, this.right_faceedgeX-0.2, this.right_faceedgeY+0.6);

    endShape();

    pop();

  
  
    scale(0.5);
  
  
    scale(0.6);
    angleMode(DEGREES);

  
  
    //////////////////// FACE DETAIL ////////////////////
    push();
    strokeWeight(0.1);

    stroke(this.orginal_framecolour);
    this.points = 40;
  
       //first shape
       beginShape();
       
       noFill();
       stroke(this.orginal_framecolour);
       strokeWeight(0.1)
     
       for (let i = 0; i < this.points; i++) {
         let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
         let r = 10 + n;
         x = r * cos(i * (360 / this.points)) 
         y = r * sin(i * (360 / this.points)) *1.2
         curveVertex(x, y);
       }
       endShape(CLOSE);
  
       
     //most inner circle
     push()
     beginShape();
     stroke(255,192,203);
     strokeWeight(0.008);
     noFill();
     for (let i = 0; i < this.points; i++) {
       let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
       let r = 7 + n;
       x = r * cos(i * (360 / this.points));
       y = r * sin(i * (360 / this.points))*1.2
       curveVertex(x, y);
     }
     endShape(CLOSE);
     pop();
  
    // fifth line
    push()
    beginShape();
    strokeWeight(0.02);
    noFill();
    for (let i = 0; i < this.points; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
      let r = 8 + n;
      x = r * cos(i * (360 / this.points));
      y = r * sin(i * (360 / this.points))*1.2
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
  
    // fourth line
       push()
       beginShape();
       strokeWeight(0.06);
       noFill();
       for (let i = 0; i < this.points; i++) {
         let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
         let r = 8.5 + n;
         x = r * cos(i * (360 / this.points));
         y = r * sin(i * (360 / this.points))*1.2
         curveVertex(x, y);
       }
       endShape(CLOSE);
       pop();
  
     // third shape
    push()
    beginShape();
    noFill();
    strokeWeight(0.02);
    for (let i = 0; i < this.points; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
      let r = 9 + n;
      x = r * cos(i * (360 / this.points));
      y = r * sin(i * (360 / this.points))*1.2
      curveVertex(x, y);
    }
    endShape(CLOSE);
    pop();
  
     //second shape
     beginShape();
     noFill();
     for (let i = 0; i < this.points; i++) {
       let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
       let r = 9.5 + n;
       x = r * cos(i * (360 / this.points));
       y = r * sin(i * (360 / this.points))*1.2
       curveVertex(x, y);
     }
     endShape(CLOSE);
     pop();
      
    ////////////// RIGHT EYE ///////////////////

    push();
    noFill();
    strokeWeight(0.3);
    stroke(this.orginal_framecolour);
    this.points3 = 8;
  
    // outer thin shape
      beginShape();
      
      strokeWeight(0.02); // small detail line weight
      for (let i = 0; i < this.points3; i++) {
        let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
        let r = 3.4 + n;
        this.averageRightEye[0] = r * cos(i * (360 / this.points3));
        this.averageRightEye[1] = r * sin(i * (360 / this.points3));
        curveVertex(this.averageRightEye[0]+1.5, this.averageRightEye[1]-3);
      }
      endShape(CLOSE);
    
    // main outline (thickest)
    beginShape();
    //
    strokeWeight(0.1);
    for (let i = 0; i < this.points3; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
      let r = 3 + n;
      this.averageRightEye[0] = r * cos(i * (360 / this.points3));
      this.averageRightEye[1] = r * sin(i * (360 / this.points3));
      curveVertex(this.averageRightEye[0]+1.5,  this.averageRightEye[1]-3);
    }
    endShape(CLOSE);
  
    // second outline (2nd thickest)
    beginShape();
    //
    strokeWeight(0.05);
    for (let i = 0; i < this.points3; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
      let r = 2.5 + n;
      this.averageRightEye[0] = r * cos(i * (360 / this.points3));
      this.averageRightEye[1] = r * sin(i * (360 / this.points3));
      curveVertex(this.averageRightEye[0]+1.5, this.averageRightEye[1]-3);
    }
    endShape(CLOSE);



    pop();
  


    //////////////////// LEFT EYE /////////////////////// FIRST DIMENSION
    push();
    strokeWeight(0.3);
    stroke(this.orginal_framecolour);
    noFill();
  
    this.points4 = 10;
  
    // thinnest outer shape
    beginShape();
    //
    strokeWeight(0.04);
    for (let i = 0; i <this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 3.5 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4));
      curveVertex(this.averageLeftEye[0]-2,this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);
  
    // main eye shape (thickest)
    beginShape();
    noFill();
    strokeWeight(0.1);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val, -2, this.lefteye_value);
      let r = 2.5 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4));
      curveVertex(this.averageLeftEye[0]-2, this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);
  
    // second thinnest line shape
    beginShape();
    noFill();
    strokeWeight(0.08);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 2.8 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4)); // how squished it is
      curveVertex(this.averageLeftEye[0]-2, this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);

    ////////// NOSE ////////////

// main nose shape
push();
strokeWeight(0.3);
stroke(this.orginal_framecolour);
noFill();

this.pointsnose = 12;

beginShape();
//
strokeWeight (0.1);
rotate(this.rotateNose);
for (let i = 0; i <this.pointsnose; i++) {
  let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.nose_value);
  let r = 2.8 + n;
  this.averageNose[0] = r * cos(i * (360 / this.pointsnose));
  this.averageNose[1] = r * sin(i * (250 / this.pointsnose));
  curveVertex(this.averageNose[0],this.averageNose[1]);
}
endShape(CLOSE);
pop();
  
    ///////////////////////// SECOND DIMENSION HEAD OUTLINE //////////////////////
    // Thickest head outline

    push();
    beginShape();
       
    noFill();
    stroke(this.dimension_maincolour, this.second_dimen_trans);
    strokeWeight(0.1)

    scale(2.5);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      x = r * cos(i * (360 / this.dimensionpoints)) 
      y = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(x+this.frame_movefacing, y);
    }
    endShape(CLOSE);
    pop();


    // 2nd Thickest head outline

    push();
    beginShape();
       
    noFill();
    stroke(this.dimension_maincolour, this.second_dimen_trans);
    strokeWeight(0.05)

    scale(2.7);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      x = r * cos(i * (360 / this.dimensionpoints)) 
      y = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(x+this.frame_movefacing, y);
    }
    endShape(CLOSE);
    pop();

    // 3rd Thickest head outline
    push();
    beginShape();
       
    noFill();
    stroke(this.dimension_maincolour, this.second_dimen_trans);
    strokeWeight(0.01)

    //scale(0.66);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      x = r * cos(i * (360 / this.dimensionpoints)) 
      y = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(x+this.frame_movefacing, y);
    }
    endShape(CLOSE);
    pop();


    //////////// RIGHT EYE ////////////////// SECOND DIMENSION

    push();
    noFill();
    strokeWeight(0.3);
    stroke(this.dimension_maincolour, this.second_dimen_trans);
    this.points3 = 8;
  
    // outer thin shape
      beginShape();
      
      strokeWeight(0.02); // small detail line weight
      for (let i = 0; i < this.points3; i++) {
        let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
        let r = 3.4 + n;
        this.averageRightEye[0] = r * cos(i * (360 / this.points3));
        this.averageRightEye[1] = r * sin(i * (360 / this.points3));
        curveVertex(this.averageRightEye[0]+this.eye_movefacing2nd_right, this.averageRightEye[1]-3);
      }
      endShape(CLOSE);
    
    // main outline (thickest)
    beginShape();
    //
    strokeWeight(0.1);
    for (let i = 0; i < this.points3; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
      let r = 3 + n;
      this.averageRightEye[0] = r * cos(i * (360 / this.points3));
      this.averageRightEye[1] = r * sin(i * (360 / this.points3));
      curveVertex(this.averageRightEye[0]+this.eye_movefacing2nd_right,  this.averageRightEye[1]-3);
    }
    endShape(CLOSE);
  
    // // second outline (2nd thickest)
    // beginShape();
    // //
    // strokeWeight(0.05);
    // for (let i = 0; i < this.points3; i++) {
    //   let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
    //   let r = 2.5 + n;
    //   this.averageRightEye[0] = r * cos(i * (360 / this.points3));
    //   this.averageRightEye[1] = r * sin(i * (360 / this.points3));
    //   curveVertex(this.averageRightEye[0]+this.eye_movefacing2nd_right, this.averageRightEye[1]-3);
    // }
    //endShape(CLOSE);



    pop();
    //////////////////// LEFT EYE /////////////////////// SECOND DIMENSION
    push();
    strokeWeight(0.3);
    stroke(this.dimension_maincolour, this.second_dimen_trans);
    noFill();
  
    this.points4 = 10;
  
    // thinnest outer shape
    beginShape();
    //
    strokeWeight(0.04);
    for (let i = 0; i <this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 3.5 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4));
      curveVertex(this.averageLeftEye[0]+ this.eye_movefacing2nd,this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);
  
    // main eye shape (thickest)
    beginShape();
    noFill();
    strokeWeight(0.1);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val, -2, this.lefteye_value);
      let r = 2.5 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4));
      curveVertex(this.averageLeftEye[0]+ this.eye_movefacing2nd, this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);
  
    // second thinnest line shape
    beginShape();
    noFill();
    strokeWeight(0.08);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 2.8 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4)); // how squished it is
      curveVertex(this.averageLeftEye[0]+ this.eye_movefacing2nd, this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);

    //////////////////// NOSE ///////////////// SECOND DIMENSION
  // main nose shape
  push();
  strokeWeight(0.3);
  stroke(this.dimension_maincolour, this.second_dimen_trans);
  noFill();

  this.pointsnose = 12;

  beginShape();
  //
  rotate(this.rotateNose);
  strokeWeight (0.1);
  for (let i = 0; i <this.pointsnose; i++) {
    let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.nose_value);
    let r = 3 + n;
    this.averageNose[0] = r * cos(i * (360 / this.pointsnose));
    this.averageNose[1] = r * sin(i * (250 / this.pointsnose));
    curveVertex(this.averageNose[0],this.averageNose[1] +this.nose2nd_dimen);
  }
  endShape(CLOSE);
  pop();

    ///////////// THIRD DIMENSION HEAD OUTLINE /////////////////

    // push();
    // beginShape();
       
    // noFill();
    // stroke(this.dimension3_maincolour, this.seconddimension_trans);
    // strokeWeight(0.1)

    // scale(2.4);

    // for (let i = 0; i < this.dimensionpoints; i++) {
    //   let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
    //   let r = 4 + n;
    //   x = r * cos(i * (360 / this.dimensionpoints)) 
    //   y = r * sin(i * (360 / this.dimensionpoints)) *1.2
    //   curveVertex(x+this.frame_movefacing2, y);
    // }
    // endShape(CLOSE);
    // pop();


    // 2nd Thickest head outline

    push();
    beginShape();
       
    noFill();
    stroke(this.dimension3_maincolour, this.seconddimension_trans);
    strokeWeight(0.05)

    scale(2);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      x = r * cos(i * (360 / this.dimensionpoints)) 
      y = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(x+this.frame_movefacing2, y);
    }
    endShape(CLOSE);
    pop();

    // 3rd Thickest head outline
    push();
    beginShape();
       
    noFill();
    stroke(this.dimension3_maincolour, this.seconddimension_trans);
    strokeWeight(0.09)
    scale(2.4);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      x = r * cos(i * (360 / this.dimensionpoints)) 
      y = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(x+this.frame_movefacing2, y);
    }
    endShape(CLOSE);
    pop();
   //////////// RIGHT EYE ////////////////// THIRD DIMENSION

   push();
   noFill();
   strokeWeight(0.3);
   stroke(this.dimension3_maincolour);
   this.points3 = 8;
 
   // outer thin shape
     beginShape();
     
     strokeWeight(0.02); // small detail line weight
     for (let i = 0; i < this.points3; i++) {
       let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
       let r = 3.4 + n;
       this.averageRightEye[0] = r * cos(i * (360 / this.points3));
       this.averageRightEye[1] = r * sin(i * (360 / this.points3));
       curveVertex(this.averageRightEye[0]+this.eye_movefacing3rd_right, this.averageRightEye[1]-3);
     }
     endShape(CLOSE);
   
   // main outline (thickest)
   beginShape();
   //
   strokeWeight(0.1);
   for (let i = 0; i < this.points3; i++) {
     let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
     let r = 3 + n;
     this.averageRightEye[0] = r * cos(i * (360 / this.points3));
     this.averageRightEye[1] = r * sin(i * (360 / this.points3));
     curveVertex(this.averageRightEye[0]+this.eye_movefacing3rd_right,  this.averageRightEye[1]-3);
   }
   endShape(CLOSE);

    //////////////////// LEFT EYE /////////////////////// THIRD DIMENSION
    push();
    strokeWeight(0.3);
    stroke(this.dimension3_maincolour);
    noFill();
  
    this.points4 = 10;
  
    // thinnest outer shape
    beginShape();
    //
    strokeWeight(0.04);
    for (let i = 0; i <this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 3.5 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4));
      curveVertex(this.averageLeftEye[0]+ this.eye_movefacing3rd,this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);
  
    // main eye shape (thickest)
    beginShape();
    noFill();
    strokeWeight(0.1);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val, -2, this.lefteye_value);
      let r = 2.5 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4));
      curveVertex(this.averageLeftEye[0]+ this.eye_movefacing3rd, this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);
  
    // second thinnest line shape
    beginShape();
    noFill();
    strokeWeight(0.08);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 2.8 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4)); // how squished it is
      curveVertex(this.averageLeftEye[0]+ this.eye_movefacing3rd, this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);

    





  ////////////////////////////////// NOSE ///////////////// THIRD DIMENSION
// main nose shape
push();
strokeWeight(0.3);
stroke(this.dimension3_maincolour);
noFill();

this.pointsnose = 12;

beginShape();
//
rotate(this.rotateNose);
strokeWeight (0.1);
for (let i = 0; i <this.pointsnose; i++) {
  let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.nose_value);
  let r = 3 + n;
  this.averageNose[0] = r * cos(i * (360 / this.pointsnose));
  this.averageNose[1] = r * sin(i * (250 / this.pointsnose));
  curveVertex(this.averageNose[0],this.averageNose[1] +this.nose3rd_dimen);
}
endShape(CLOSE);
pop();

    ///////////////// MOUTH MOVING /////////////

// if mouth is closed then squish the mouth and get rid of inner circle
// if mouth is smiling with teeth then do shocked face squished
// if half teeth then shoked face

this.mouthsquishfactor;

    this.mouthsquishY = 250;
    this.Mouthnotsquish = 360;

    this.upperlippoint = positions.top_lip[3];
    this.lowerLeft_lippoint = positions.top_lip[0];

    if (this.upperlippoint > this.lowerLeft_lippoint){
      this.mouthsquishfactor =  this.Mouthnotsquish
    }

    else{
      this.mouthsquishfactor = this.mouthsquishY
    }



    push();
    noFill();
    strokeWeight(0.3);
    stroke(this.orginal_framecolour);
  
    this.points5 = 16;
  
   // outer thin detail
   beginShape();
   noFill();
   strokeWeight(0.02);
   for (let i = 0; i < this.points5; i++) {
     let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
     let r = 1.8 + n;
     this.averageMouth[0] = r * cos(i * (360 / this.points5));
     this.averageMouth[1] = r * sin(i * (this.mouthsquishfactor / this.points5));
     curveVertex(this.averageMouth[0], this.averageMouth[1]+3);
   }
   endShape(CLOSE);
  
    // main shape outline
    beginShape();
   // noFill();
    strokeWeight(0.2);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 3 + n;
      this.averageMouth[0] = r * cos(i * (360 / this.points5));
      this.averageMouth[1] = r * sin(i * (360 / this.points5));
      curveVertex(this.averageMouth[0], this.averageMouth[1]+3);
    }
    endShape(CLOSE);
  
     // thinner shape outline
    beginShape();
   // noFill();
    strokeWeight(0.1);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 2.5 + n;
      this.averageMouth[0] = r * cos(i * (360 / this.points5));
      this.averageMouth[1] = r * sin(i * (360 / this.points5));
      curveVertex(this.averageMouth[0], this.averageMouth[1]+3);
    }
    endShape(CLOSE);

    


  
    pop();


    

 

  
    
  //   console.log()
  //   // head
  //   ellipseMode(CENTER);
  //   stroke(stroke_color);
  //   fill(this.mainColour);
  //   ellipse(segment_average(positions.chin)[0], 0, 3, 4);
  //   noStroke();


  //   // mouth
  //   fill(this.detailColour);
  //   ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

  //   // eyebrows
  //   fill( this.eyebrowColour);
  //   stroke( this.eyebrowColour);
  //   strokeWeight(0.08);
  //   this.draw_segment(positions.left_eyebrow);
  //   this.draw_segment(positions.right_eyebrow);

  //   // draw the chin segment using points
  //   fill(this.chinColour);
  //   stroke(this.chinColour);
  //   this.draw_segment(positions.chin);

  //   fill(100, 0, 100);
  //   stroke(100, 0, 100);
  //   this.draw_segment(positions.nose_bridge);
  //   this.draw_segment(positions.nose_tip);

  //   strokeWeight(0.03);

  //   fill(this.lipColour);
  //   stroke(this.lipColour);
  //   this.draw_segment(positions.top_lip);
  //   this.draw_segment(positions.bottom_lip);

  //   let left_eye_pos = segment_average(positions.left_eye);
  //   let right_eye_pos = segment_average(positions.right_eye);

  //   // eyes
  //   noStroke();
  //   let curEyeShift = 0.04 * this.eye_shift;
  //   if(this.num_eyes == 2) {
  //     fill(this.detailColour);
  //     ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
  //     ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);

  //     // fill(this.mainColour);
  //     // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
  //     // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
  //   }
  //   else {
  //     let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
  //     let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

  //     fill(this.detailColour);
  //     ellipse(eyePosX, eyePosY, 0.45, 0.27);

  //     fill(this.mainColour);
  //     ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
  //   }
  //  // fill(0)
  //  //ellipse(0,0, 0.5,0.5) center point
  //  //rect(-2,-2,4.5,4) sizing debug 
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    // this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
     this.rotateNose = map(settings[1], 0, 100, -90, 270);
     this.nose_value = map(settings[2], 0, 100, 0, 4);
    
    this.facedetail_value = map(settings[3], 0, 100, 0.5, 7);
    this.righteye_value= map(settings[4], 0, 100, 0, 3);
    this.lefteye_value = map(settings[5], 0, 100, 0, 4);
    this.mouthh_value = map(settings[6], 0, 100, 0, 5);
    this.Haircolour_value = map(settings[7], 0, 100, 0, 100)
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(4);
    // settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.rotateNose, 270, -90, 0, 100);
    settings[2] = map(this.nose_value, 0, 10, 0, 100);

    settings[3] = map(this.facedetail_value, 0.5, 7, 0, 100);
    settings[4] = map(this.righteye_value, 0, 3, 0, 100);
    settings[5] = map(this.lefteye_value, 0, 4, 0, 100);
    settings[6] = map(this.mouthh_value, 0, 5, 0, 100);
    settings[7] = map(this.Haircolour_value, 0, 100, 0, 4);
    return settings;
  }
}