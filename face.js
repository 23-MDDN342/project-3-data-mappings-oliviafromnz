// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 6;

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
  this.nose_value;
  this.nose2nd_dimen;
  this.right_earpts = 10;


  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  

  // ************************* DRAW FACE *********************************************
  this.draw = function(positions) {

    this.lower_val = 0;
    this.higher_val = 5;

    // AVERAGE LOCATIONS //

    this.averageRightEye = segment_average(positions.right_eye);
    this.averageLeftEye = segment_average(positions.left_eye);
    this.averageNose = segment_average (positions.nose_bridge); // find average nose bridge location
    this.averageMouth = segment_average(positions.top_lip);


    // FACIAL POINTS LOCATIONS //
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


    // EXTRA VARIABLES
    this.frame_movefacing;
    this.frame_movefacing2;

    this.eye_movefacing2nd;
    this.eye_movefacing2nd2;

    this.ear_trans;
    this.ear_points = 8;
    this.points = 40;
    this.dimensionpoints = this.points-2;

    // dimension colours //

    this.warmcolour_orange = color("#E36A25");
    this.warmcolour_yellow = color("#FEBD11");
    this.warmcolour_pink = color("#D966A7");

    this.coldcolour_blue = color("#1E8096");
    this.coldcolour_green = color("#9BC070");
    this.coldcolour_purple = color("#572E8E");

    this.eye_movefacing2nd_right;
    this.eye_movefacing3rd_right;
    this.orginal_framecolour;

    this.dimension_maincolour =  this.warmcolour_orange;
    this.dimension3_maincolour;

    // 2nd dimension stroke weights
    this.second_stroke_weight1;
    this.second_stroke_weight2;
    this.second_stroke_weight3;

    //this.tester_stroke;




    // ************************* DRAW EARS *********************************************

    ////// LINE TRANSPARENCY EAR ////
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

  // ************************* LOOK LEFT *********************************************
  // if u look left its gray and right its white
  /// LOOK TO FAR RIGHT
  if(this.headSize_L > this.headSize_R){
      this.distanceBetween = this.headSize_R - this.headSize_L;

      this.ear_trans2  = 255;
      this.head_outline = 255;

      this.dimension_maincolour = this.warmcolour_orange;
      this.orginal_framecolour = this.warmcolour_pink;
      this.dimension3_maincolour = this.warmcolour_yellow;
      this.seconddimension_trans = 255;

      // DIMENSION LOCATION SHIFTS //

      // FACE
      this.frame_movefacing = +0.3;
      this.frame_movefacing2 = +0.9;

      // EYE LEFT
      this.eye_movefacing2nd = -1.5;
      this.eye_movefacing3rd = -1;

      // RIGHT EYE
      this.eye_movefacing2nd_right = +2;
      this.eye_movefacing3rd_right = +2.5;

      // NOSE
      this.nose2nd_dimen = +0.5;
      this.nose3rd_dimen = +1;

      //MOUTH
      this.mouth2nd_dimen = +0.5;
      this.mouth3rd_dimen = +1;

      this.distanceBetween = this.headSize_R - this.headSize_L; // Phoebes code //
  }



// ************************* LOOK RIGHT *********************************************
if (this.headSize_R > this.headSize_L){

  
  this.ear_trans2  = 0;
  this.head_outline = 100;


  this.dimension_maincolour = this.coldcolour_blue;
  this.orginal_framecolour = this.coldcolour_purple;
  this.dimension3_maincolour = this.coldcolour_green;
  this.seconddimension_trans = 255;

  this.distanceBetween = this.headSize_L - this.headSize_R; // Phoebes code //

  
  // DIMENSION LOCATION SHIFTS //

  // FACE SHIFT
  this.frame_movefacing = -0.3;
  this.frame_movefacing2 = -0.9;

  /// LEFT EYE
  this.eye_movefacing2nd = -2.5;
  this.eye_movefacing3rd = -3;

  // RIGHT EYE
  this.eye_movefacing2nd_right = +1;
  this.eye_movefacing3rd_right = 0.5;

  /// NOSE
  this.nose2nd_dimen = -0.5;
  this.nose3rd_dimen = -1;

  // MOUTH
  this.mouth2nd_dimen = -0.5;
  this.mouth3rd_dimen = -1;

 }

// ************************************** DIMENSION VISIBILITY  *********************************************
 
 // facing forwards from -0.6-0 range
 if (this.distanceBetween < 0 && this.distanceBetween > -0.6) {

  // FACE FRAMES
  this.D2_stroke1 = 0;
  this.D2_stroke2 = 0;
  this.D2_stroke2 = 0;

  this.D3_stroke1 =0;
  this.D3_stroke2 =0;
  this.D3_stroke3 =0;
  this.D3_stroke4 =0;

  //EYE FRAMES LEFT
  this.D2_EyeStroke1 =0;
  this.D2_EyeStroke2 =0;
  this.D2_EyeStroke3 =0;

  this.D3_EyeStroke1 =0;
  this.D3_EyeStroke2 =0;
  this.D3_EyeStroke3 =0;

  //EYE FRAMES RIGHT
  this.D2_REyeStroke1 =0;
  this.D2_REyeStroke2 =0;
  this.D2_REyeStroke3 =0;
 
  this.D3_REyeStroke1 =0;
  this.D3_REyeStroke2 =0;
  this.D3_REyeStroke3 =0;

  // NOSE
  this.D2_NoseStroke1 =0;

  this.D3_NoseStroke1 =0;

  // MOUTH
  this.D2_MouthStroke1 =0;
  this.D2_MouthStroke2 =0;

  this.D3_MouthStroke1 =0;
  this.D3_MouthStroke2 =0;


}

// facing super to the side -------->
else if (this.distanceBetween < -1){

  // FACE FRAMES
  this.D2_stroke1 = 0.1;
  this.D2_stroke2 = 0.05;
  this.D2_stroke2 = 0.01;

  this.D3_stroke1 =0.05;
  this.D3_stroke2 =0.09;
  this.D3_stroke3 =0.3;
  this.D3_stroke4 =0.1;

    //EYE FRAMES LEFT
  this.D2_EyeStroke1 =0.04;
  this.D2_EyeStroke2 =0.1;
  this.D2_EyeStroke3 =0.08;

  this.D3_EyeStroke1 =0.04;
  this.D3_EyeStroke2 =0.1;
  this.D3_EyeStroke3 =0.08;
  
  //EYE FRAMES RIGHT
  this.D2_REyeStroke1 =0.02;
  this.D2_REyeStroke2 =0.1;
 
  this.D3_REyeStroke1 =0.02;
  this.D3_REyeStroke2 =0.1;

  // NOSE
  this.D2_NoseStroke1 =0.1;

  this.D3_NoseStroke1 =0.1;

    // MOUTH
  this.D2_MouthStroke1 =0.2;
  this.D2_MouthStroke2 =0.1;

  this.D3_MouthStroke1 =0.2;

  }

  // facing between forward and side
else{
    // FACE FRAMES
    this.D2_stroke1 = 0.1;
    this.D2_stroke2 = 0.05;
    this.D2_stroke2 = 0.01;

    this.D3_stroke1 =0;
    this.D3_stroke2 =0;
    this.D3_stroke3 =0;
    this.D3_stroke4 =0;

        //EYE FRAMES LEFT
    this.D2_EyeStroke1 =0.04;
    this.D2_EyeStroke2 =0.1;
    this.D2_EyeStroke3 =0.08;

    this.D3_EyeStroke1 =0;
    this.D3_EyeStroke2 =0;
    this.D3_EyeStroke3 =0;


     //EYE FRAMES RIGHT
     this.D2_REyeStroke1 =0.02;
     this.D2_REyeStroke2 =0.1;
 
     this.D3_REyeStroke1 =0;
     this.D3_REyeStroke2 =0;

    // NOSE
    this.D2_NoseStroke1 =0.1;

    this.D3_NoseStroke1 =0;

      // MOUTH
    this.D2_MouthStroke1 =0.2;
    this.D2_MouthStroke2 =0.1;

    this.D3_MouthStroke1 =0;
    this.D3_MouthStroke2 =0;
 
    }

  
  
  //*********************************************************1st Dimension ************************************************ */
  
  scale(0.5);
  scale(0.6);
  angleMode(DEGREES);
  
  //////////////////// FACE DETAIL //////////////////// FIRST DIMENSION
    push();
    strokeWeight(0.1);

    stroke(this.orginal_framecolour);
    this.points = 40;
  
       //first shape
       beginShape();
       
       fill(18, 2, 36 );
       stroke(this.orginal_framecolour);
       strokeWeight(0.1)
     
       for (let i = 0; i < this.points; i++) {
         let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
         let r = 10 + n;
         this.headWidth = r * cos(i * (360 / this.points)) 
         this.headHeight = r * sin(i * (360 / this.points)) *1.2
         curveVertex(this.headWidth, this.headHeight);
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
       this.headWidth = r * cos(i * (360 / this.points));
       this.headHeight = r * sin(i * (360 / this.points))*1.2
       curveVertex(this.headWidth, this.headHeight);
     }
     endShape(CLOSE);
     pop();
  
    // fifth line
    push()
    beginShape();
    strokeWeight(0.02);
    fill(17, 4, 23, 50);
    for (let i = 0; i < this.points; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
      let r = 8 + n;
      this.headWidth = r * cos(i * (360 / this.points));
      this.headHeight = r * sin(i * (360 / this.points))*1.2
      curveVertex(this.headWidth, this.headHeight);
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
         this.headWidth = r * cos(i * (360 / this.points));
         this.headHeight = r * sin(i * (360 / this.points))*1.2
         curveVertex(this.headWidth, this.headHeight);
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
      this.headWidth = r * cos(i * (360 / this.points));
      this.headHeight = r * sin(i * (360 / this.points))*1.2
      curveVertex(this.headWidth, this.headHeight);
    }
    endShape(CLOSE);
    pop();
  
     //second shape
     beginShape();
     noFill();
     for (let i = 0; i < this.points; i++) {
       let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
       let r = 9.5 + n;
       this.headWidth = r * cos(i * (360 / this.points));
       this.headHeight = r * sin(i * (360 / this.points))*1.2
       curveVertex(this.headWidth, this.headHeight);
     }
     endShape(CLOSE);
     pop();
      
    ////////////// RIGHT EYE /////////////////// FIRST DIMENSION

    push();
    noFill();
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

    ////////////////////// NOSE //////////// FIRST DIMENSION

    // main nose shape
    push();
    stroke(this.orginal_framecolour);
    noFill();

    this.pointsnose = 15;

    beginShape();
    //
    strokeWeight (0.1);
    rotate(this.rotateNose);
    for (let i = 0; i <this.pointsnose; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.nose_value);
      let r = 3 + n;
      this.averageNose[0] = r * cos(i * (360 / this.pointsnose));
      this.averageNose[1] = r * sin(i * (360 / this.pointsnose));
      curveVertex(this.averageNose[0],this.averageNose[1]);
    }
    endShape(CLOSE);
    pop();
  
  //*********************************************** 2nd Dimension ************************************************ */

    ///////////////////////// HEAD OUTLINE ////////////////////// SECOND DIMENSION
    // Thickest head outline

    push();
    beginShape();
       
    noFill();
    stroke(this.dimension_maincolour, this.second_dimen_trans);
    strokeWeight(this.D2_stroke1)

    scale(2.5);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      this.headWidth = r * cos(i * (360 / this.dimensionpoints)) 
      this.headHeight = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(this.headWidth+this.frame_movefacing, this.headHeight);
    }
    endShape(CLOSE);
    pop();


    // 2nd Thickest head outline

    push();
    beginShape();
       
    noFill();
    stroke(this.dimension_maincolour, this.second_dimen_trans);
    strokeWeight(this.D2_stroke2)

    scale(2.7);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      this.headWidth = r * cos(i * (360 / this.dimensionpoints)) 
      this.headHeight = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(this.headWidth+this.frame_movefacing, this.headHeight);
    }
    endShape(CLOSE);
    pop();

    // 3rd Thickest head outline
    push();
    beginShape();
       
    noFill();
    stroke(this.dimension_maincolour, this.second_dimen_trans);
    strokeWeight(this.D2_stroke3)

    //scale(0.66);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      this.headWidth = r * cos(i * (360 / this.dimensionpoints)) 
      this.headHeight = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(this.headWidth+this.frame_movefacing, this.headHeight);
    }
    endShape(CLOSE);
    pop();


    //////////// RIGHT EYE ////////////////// SECOND DIMENSION

    push();
    noFill();
    stroke(this.dimension_maincolour);
    this.points3 = 8;
  
    // outer thin shape
      beginShape();
      
      strokeWeight(this.D2_REyeStroke1); // small detail line weight
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
    strokeWeight(this.D2_REyeStroke2);
    for (let i = 0; i < this.points3; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
      let r = 3 + n;
      this.averageRightEye[0] = r * cos(i * (360 / this.points3));
      this.averageRightEye[1] = r * sin(i * (360 / this.points3));
      curveVertex(this.averageRightEye[0]+this.eye_movefacing2nd_right,  this.averageRightEye[1]-3);
    }
    endShape(CLOSE);


    pop();
    //////////////////// LEFT EYE /////////////////////// SECOND DIMENSION
    push();
    stroke(this.dimension_maincolour);
    noFill();
  
    this.points4 = 10;
  
    // thinnest outer shape
    beginShape();
    //
    strokeWeight(this.D2_EyeStroke1);
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
    strokeWeight(this.D2_EyeStroke2);
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
    strokeWeight(this.D2_EyeStroke3);
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
  stroke(this.dimension_maincolour, this.second_dimen_trans);
  noFill();

  this.pointsnose = 15;

  beginShape();
  //
  //rotate(this.rotateNose);
  strokeWeight (this.D2_NoseStroke1);
  for (let i = 0; i <this.pointsnose; i++) {
    let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.nose_value);
    let r = 2.8 + n;
    this.averageNose[0] = r * cos(i * (360 / this.pointsnose));
    this.averageNose[1] = r * sin(i * (350 / this.pointsnose));
    curveVertex(this.averageNose[0] +this.nose2nd_dimen,this.averageNose[1]);
  }
  endShape(CLOSE);
  pop();



    //*********************************************** 3rd Dimension ************************************************ */

 
    ////////////////////// FACE FRAME AND DETAIL ///////////////// THIRD DIMENSION
   // 2nd Thickest head outline
    push();
    beginShape();
       
    noFill();
    stroke(this.dimension3_maincolour, this.seconddimension_trans);
    strokeWeight(this.D3_stroke1)

    scale(2);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      this.headWidth = r * cos(i * (360 / this.dimensionpoints)) 
      this.headHeight = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(this.headWidth+this.frame_movefacing2, this.headHeight);
    }
    endShape(CLOSE);
    pop();

    // 3rd Thickest head outline
    push();
    beginShape();
       
    noFill();
    stroke(this.dimension3_maincolour, this.seconddimension_trans);
    strokeWeight(this.D3_stroke2)
    scale(2.4);

    for (let i = 0; i < this.dimensionpoints; i++) {
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value-2);
      let r = 4 + n;
      this.headWidth = r * cos(i * (360 / this.dimensionpoints)) 
      this.headHeight = r * sin(i * (360 / this.dimensionpoints)) *1.2
      curveVertex(this.headWidth+this.frame_movefacing2, this.headHeight);
    }
    endShape(CLOSE);
    pop();

   //////////// RIGHT EYE ////////////////// THIRD DIMENSION

   push();
   noFill();
   stroke(this.dimension3_maincolour);
   this.points3 = 8;
 
   // outer thin shape
     beginShape();
     
     strokeWeight(this.D3_REyeStroke1); // small detail line weight
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
   strokeWeight(this.D3_REyeStroke2);
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
    stroke(this.dimension3_maincolour);
    noFill();
  
    this.points4 = 10;
  
    // thinnest outer shape
    beginShape();
    //
    strokeWeight(this.D3_EyeStroke1);
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
    strokeWeight(this.D3_EyeStroke2);
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
    strokeWeight(this.D3_EyeStroke3);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 2.8 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4)); // how squished it is
      curveVertex(this.averageLeftEye[0]+ this.eye_movefacing3rd, this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);

    

   ///////////////////////////// NOSE ///////////////// THIRD DIMENSION
    // main nose shape
    push();
    stroke(this.dimension3_maincolour);
    noFill();

    this.pointsnose = 12;

    beginShape();
    //
    //rotate(this.rotateNose);
    strokeWeight (this.D3_NoseStroke1);
    for (let i = 0; i <this.pointsnose; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.nose_value);
      let r = 2.6 + n;
      this.averageNose[0] = r * cos(i * (360 / this.pointsnose));
      this.averageNose[1] = r * sin(i * (360 / this.pointsnose));
      curveVertex(this.averageNose[0] +this.nose3rd_dimen,this.averageNose[1]);
    }
    endShape(CLOSE);
    pop();

  ///////////////// MOUTH MOVING ///////////// FIRST DIMENSION

  if (this.mouthh_value >1 && this.mouthh_value< 3){
    push();
    noFill();
    stroke(this.orginal_framecolour);

    this.points5 = 16;

    // main shape outline
    beginShape();
  // noFill();
    strokeWeight(0.2);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 3 + n;
      this.averageMouth[0] = r * cos(i * (340 / this.points5));
      this.averageMouth[1] = r * sin(i * (260 / this.points5));
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
      this.averageMouth[0] = r * cos(i * (340 / this.points5));
      this.averageMouth[1] = r * sin(i * (260 / this.points5));
      curveVertex(this.averageMouth[0], this.averageMouth[1]+3);
    }
    endShape(CLOSE);


    pop();
  }

  else if(this.mouthh_value < 1){

    push();
    noFill();
    strokeWeight(0.1);
    stroke(this.orginal_framecolour);

    this.points5 = 16;

    // main shape outline
    beginShape();
  // noFill();
    strokeWeight(0.2);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 3 + n;
      this.averageMouth[0] = r * cos(i * (360 / this.points5));
      this.averageMouth[1] = r * sin(i * (180 / this.points5));
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
      this.averageMouth[1] = r * sin(i * (180 / this.points5));
      curveVertex(this.averageMouth[0], this.averageMouth[1]+3);
    }
    endShape(CLOSE);


    pop();

  }
  else{

      push();
      noFill();
      strokeWeight(0.3);
      stroke(this.orginal_framecolour);
    
      this.points5 = 16;
    
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
    }

  ///////////////// MOUTH MOVING ///////////// SECOND DIMENSION

  if (this.mouthh_value >1 && this.mouthh_value< 3){
    push();
    noFill();
    stroke(this.dimension_maincolour);

    this.points5 = 16;

    // main shape outline
    beginShape();
  // noFill();
    strokeWeight(this.D2_MouthStroke1);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 2.9 + n;
      this.averageMouth[0] = r * cos(i * (340 / this.points5));
      this.averageMouth[1] = r * sin(i * (260 / this.points5));
      curveVertex(this.averageMouth[0]+this.mouth2nd_dimen, this.averageMouth[1]+3);
    }
    endShape(CLOSE);
    pop();
  }

  else if(this.mouthh_value < 1){

    push();
    noFill();
    stroke(this.dimension_maincolour);

    this.points5 = 16;

    // main shape outline
    beginShape();
  // noFill();
    strokeWeight(this.D2_MouthStroke1);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 2.9 + n;
      this.averageMouth[0] = r * cos(i * (360 / this.points5));
      this.averageMouth[1] = r * sin(i * (180 / this.points5));
      curveVertex(this.averageMouth[0]+this.mouth2nd_dimen, this.averageMouth[1]+3);
    }
    endShape(CLOSE);

    pop();

  }
  else{

      push();
      noFill();
      stroke(this.dimension_maincolour);
    
      this.points5 = 16;
    
      // main shape outline
      beginShape();
    // noFill();
      strokeWeight(this.D2_MouthStroke1);
      for (let i = 0; i < this.points5; i++) {
        let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
        let r = 2.9 + n;
        this.averageMouth[0] = r * cos(i * (360 / this.points5));
        this.averageMouth[1] = r * sin(i * (360 / this.points5));
        curveVertex(this.averageMouth[0]+this.mouth2nd_dimen, this.averageMouth[1]+3);
      }
      endShape(CLOSE);
      pop();
    }

  ///////////////// MOUTH MOVING ///////////// THIRD DIMENSION

  if (this.mouthh_value >1 && this.mouthh_value< 3){
    push();
    noFill();
    stroke(this.dimension3_maincolour);

    this.points5 = 16;

    // main shape outline
    beginShape();
  // noFill();
    strokeWeight(this.D3_MouthStroke1);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 2.7 + n;
      this.averageMouth[0] = r * cos(i * (340 / this.points5));
      this.averageMouth[1] = r * sin(i * (260 / this.points5));
      curveVertex(this.averageMouth[0]+this.mouth3rd_dimen, this.averageMouth[1]+3);
    }
    endShape(CLOSE);


    pop();
  }

  else if(this.mouthh_value < 1){

    push();
    noFill();
    stroke(this.dimension3_maincolour);

    this.points5 = 16;

    // main shape outline
    beginShape();
  // noFill();
    strokeWeight(this.D3_MouthStroke1);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 2.7 + n;
      this.averageMouth[0] = r * cos(i * (360 / this.points5));
      this.averageMouth[1] = r * sin(i * (180 / this.points5));
      curveVertex(this.averageMouth[0]+this.mouth3rd_dimen, this.averageMouth[1]+3);
    }
    endShape(CLOSE);

  }
  else{

      push();
      noFill();
      strokeWeight(0.3);
      stroke(this.dimension3_maincolour);
    
      this.points5 = 16;
    
      // main shape outline
      beginShape();
    // noFill();
      strokeWeight(this.D3_MouthStroke1);
      for (let i = 0; i < this.points5; i++) {
        let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
        let r = 2.7 + n;
        this.averageMouth[0] = r * cos(i * (360 / this.points5));
        this.averageMouth[1] = r * sin(i * (360 / this.points5));
        curveVertex(this.averageMouth[0]+this.mouth3rd_dimen, this.averageMouth[1]+3);
      }
      endShape(CLOSE);
    }

  }


  // ********************************************************* SLIDERS **********************************
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
    this.nose_value = map(settings[0], 0, 100, 0, 2);
    this.facedetail_value = map(settings[1], 0, 100, 0.5, 2.5);
    this.righteye_value= map(settings[2], 0, 100, 0, 3);
    this.lefteye_value = map(settings[3], 0, 100, 0, 4);
    this.mouthh_value = map(settings[4], 0, 100, 0, 5);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(5);
    settings[0] = map(this.nose_value, 0, 2, 0, 100);
    settings[1] = map(this.facedetail_value, 0.5, 2.5, 0, 100);
    settings[2] = map(this.righteye_value, 0, 3, 0, 100);
    settings[3] = map(this.lefteye_value, 0, 4, 0, 100);
    settings[4] = map(this.mouthh_value, 0, 5, 0, 100);
    return settings;
  }
}