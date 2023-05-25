/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 7;

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

  this.facedetail_value = 2;
  this.righteye_value = 3;
  this.lefteye_value = 6;
  this.mouthh_value = 5;


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


    this.R_eyeX = positions.right_eye[0][0];
    this.R_eyeY = positions.right_eye[0][1];

    this.L_eyeX = positions.left_eye[0][0];
    this.L_eyeY = positions.left_eye[0][1];
    

    scale(0.5);
  
  
    scale(0.6);
    angleMode(DEGREES);
  
  
     /////////////////// FACE BASE CIRC ///////////////////////////
     push();
  
     noFill();
     stroke(255,192,203);
     strokeWeight(0.3);
   

     this.points2 = 40;
   
     //*** Pheobes Code for circs */
  
     // outer shape
     beginShape();

     ////////////// EXPERIMENTAL //////////
     //fill(255,255, 255);
     //ellipse(this.averageRightEye[0]+1.5, this.averageRightEye[1]-3, 1, 1);
     //ellipse(this.averageLeftEye[0]-2, this.averageLeftEye[1]-3, 1, 1);

     ///////////////////////////////////////
     //
     for (let i = 0; i < this.points2; i++) {
       let n = map(noise(i), this.lower_val, this.higher_val, -1, this.facedetail_value);
       let r = 9 + n;
       x = r * cos(i * (360 / this.points2)); // how warped in e.g goes skinnier
       y = r * sin(i * (360 / this.points2)); // how flat it is as a 3d 
       curveVertex(x, y);
     }
     endShape(CLOSE);
     pop();
  
  
    //////////////////// FACE DETAIL ////////////////////
    push();
    strokeWeight(0.1);
    stroke(51);
    this.points = 40;
  
       //first shape
       beginShape();
       
       noFill();
       stroke(255,192,203);
       strokeWeight(0.1)
     
       for (let i = 0; i < this.points; i++) {
         let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, this.facedetail_value);
         let r = 10 + n;
         x = r * cos(i * (360 / this.points));
         y = r * sin(i * (360 / this.points));
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
       y = r * sin(i * (360 / this.points));
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
      y = r * sin(i * (360 / this.points));
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
         y = r * sin(i * (360 / this.points));
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
      y = r * sin(i * (360 / this.points));
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
       y = r * sin(i * (360 / this.points));
       curveVertex(x, y);
     }
     endShape(CLOSE);
     pop();
      
    ////////////// RIGHT EYE ///////////////////

    push();
    noFill();
    strokeWeight(0.3);
    stroke(255,255, 255);
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
    strokeWeight(0.08);
    stroke(255,192,203);
    for (let i = 0; i < this.points3; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.righteye_value);
      let r = 2.5 + n;
      this.averageRightEye[0] = r * cos(i * (360 / this.points3));
      this.averageRightEye[1] = r * sin(i * (360 / this.points3));
      curveVertex(this.averageRightEye[0]+1.5, this.averageRightEye[1]-3);
    }
    endShape(CLOSE);



    pop();
  


    //////////////////// LEFT EYE ///////////////////////
    push();
    strokeWeight(0.3);
    stroke(200,100,120);
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
  
    pop();
    push();
    beginShape();
    noFill();
    strokeWeight(0.03);
    stroke(200,100,120);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 3 + n;
      this.averageLeftEye[0] = r * cos(i * (360 / this.points4));
      this.averageLeftEye[1] = r * sin(i * (300 / this.points4)); // how squished it is
      curveVertex(this.averageLeftEye[0]-2, this.averageLeftEye[1]-3);
    }
    endShape(CLOSE);
  
    pop();
  



////////// NOSE ////////////

// if bridge tip is going in a bigger deirection than top of nose and going towards the right, then
// a second nose is created in the inner for dimension

this.facingrsidestroke = 0.05;
this.facingfrontstroke= 0;

    this.MidNoseTip = positions.nose_tip[2];
    this.topofNose = positions.nose_tip[0];

    this.DrawinnerNose;

  if (this.MidNoseTip >= this.topofNose){
    this.DrawinnerNose = this.facingrsidestroke
  }

  else{
    this.DrawinnerNose = this.facingfrontstroke
  }

// main nose shape
push();
    strokeWeight(0.3);
    stroke(200,100,120);
    noFill();
  
    this.pointsnose = 12;
  
    beginShape();
    //
    strokeWeight (0.1);
    for (let i = 0; i <this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 3 + n;
      this.averageNose[0] = r * cos(i * (360 / this.pointsnose));
      this.averageNose[1] = r * sin(i * (250 / this.pointsnose));
      curveVertex(this.averageNose[0],this.averageNose[1]-1);
    }
    endShape(CLOSE);
  pop();


  ///// inner circle for nose 1

  push();
    strokeWeight(0.3);
    stroke(200,100,120);
    noFill();
  
    scale(0.7);
    this.pointsnose = 12;
  
    beginShape();
    //
    strokeWeight (this.DrawinnerNose);
    for (let i = 0; i <this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, this.lefteye_value);
      let r = 3 + n;
      this.averageNose[0] = r * cos(i * (360 / this.pointsnose));
      this.averageNose[1] = r * sin(i * (250 / this.pointsnose));
      curveVertex(this.averageNose[0],this.averageNose[1]-1);
    }
    endShape(CLOSE);
  pop();


    ///////////////// MOUTH MOVING /////////////

// if mouth is closed then squish the mouth and get rid of inner circle
// if mouth is smiling with teeth then do shocked face squished
// if half teeth then shoked face

    push();
    noFill();
    strokeWeight(0.3);
    stroke(255,192,203);
  
    this.points5 = 16;
  
   // outer thin detail
   beginShape();
   noFill();
   strokeWeight(0.02);
   for (let i = 0; i < this.points5; i++) {
     let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
     let r = 1.8 + n;
     x = r * cos(i * (360 / this.points5));
     y = r * sin(i * (360 / this.points5));
     curveVertex(x, y+3);
   }
   endShape(CLOSE);
  
    // main shape outline
    beginShape();
   // noFill();
    strokeWeight(0.2);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 3 + n;
      x = r * cos(i * (360 / this.points5));
      y = r * sin(i * (360 / this.points5));
      curveVertex(x, y+3);
    }
    endShape(CLOSE);
  
     // thinner shape outline
    beginShape();
   // noFill();
    strokeWeight(0.1);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, this.mouthh_value);
      let r = 2.5 + n;
      x = r * cos(i * (360 / this.points5));
      y = r * sin(i * (360 / this.points5));
      curveVertex(x, y+3);
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
    // this.eye_shift = map(settings[1], 0, 100, -2, 2);
    // this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
    
    this.facedetail_value = map(settings[3], 0, 100, 0.5, 7);
    this.righteye_value= map(settings[4], 0, 100, 0, 5);
    this.lefteye_value = map(settings[5], 0, 100, 0, 10);
    this.mouthh_value = map(settings[6], 0, 100, 0, 5);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    // settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    // settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    // settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);

    settings[3] = map(this.facedetail_value, 0.5, 7, 0, 100);
    settings[4] = map(this.righteye_value, 0, 5, 0, 100);
    settings[5] = map(this.lefteye_value, 0, 10, 0, 100);
    settings[6] = map(this.mouthh_value, 0, 5, 0, 100);
    return settings;
  }
}
