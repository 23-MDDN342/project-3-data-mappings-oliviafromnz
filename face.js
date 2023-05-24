/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

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
function Face(facedetail_value,righteye_value, lefteye_value, mouthh_value, treerootscale) {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]

  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {

    this.lower_val = 0;
    this.higher_val = 5;
    //let x, y;
   
    /////////////// TREE ROOTS ///////////////
  
    // tree root left side
    push();
    beginShape();
    strokeWeight(0.1)
    fill(255,255,255);
    scale(treerootscale);
    vertex(3, 1);
    bezierVertex(5, -5, 1, -4.5, 1, -8);
    bezierVertex(1, -10, 0, -11, 0, -10);
    bezierVertex(0, -10, 1, -5, -2.3, -6);
    bezierVertex(-3, -6, -12, -9, -7, -3.5);
    bezierVertex(-4, 2, -10, 1, -2, 4);
    endShape();
    pop()
  
     // tree root left detail
     push();
     beginShape();
     strokeWeight(0.05)
     fill(255,255,255);
     scale(treerootscale-0.2);
     vertex(3, 1);
     bezierVertex(5, -5, 1, -4.5, 1, -7);
     bezierVertex(1, -9, 1, -6, 1, -9);
     bezierVertex(0, -10, 1, -5, -2.3, -6);
     bezierVertex(-3, -6, -12, -9, -7, -3.5);
     bezierVertex(-4, 2, -10, 1, -2, 4);
     endShape();
     pop()
  
    // tree root right
    push();
    beginShape();
    strokeWeight(0.1)
    fill(255,255,255);
    rotate(170);
    scale(treerootscale*0.7);
    vertex(3, 1);
    bezierVertex(5, -5, 1, -4.5, 1, -8);
    bezierVertex(1, -10, 0, -11, 0, -10);
    bezierVertex(0, -10, 1, -5, -2.3, -6);
    bezierVertex(-3, -6, -12, -9, -7, -3.5);
    bezierVertex(-4, 2, -10, 1, -2, 4);
    endShape();
    pop()
  
  
    scale(0.6);
    angleMode(DEGREES);
  
     /////////////////// FACE BASE CIRC ///////////////////////////
     push();
     fill(255,255,255); // fill white
     strokeWeight(0.3);
     this.points2 = 40;
     stroke(51);
   
     //*** Pheobes Code for circs */
  
     // outer shape
     beginShape();
     fill(255,255,255);
     for (let i = 0; i < this.points2; i++) {
       let n = map(noise(i), this.lower_val, this.higher_val, -1, facedetail_value);
       let r = 9 + n;
       x = r * cos(i * (360 / this.points2));
       y = r * sin(i * (360 / this.points2));
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
       fill(255,255,255);
       strokeWeight(0.1)
       stroke(51);
       for (let i = 0; i < this.points; i++) {
         let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, facedetail_value);
         let r = 10 + n;
         x = r * cos(i * (360 / this.points));
         y = r * sin(i * (360 / this.points));
         curveVertex(x, y);
       }
       endShape(CLOSE);
  
       
     //most inner circle
     push()
     beginShape();
     strokeWeight(0.008);
     noFill();
     for (let i = 0; i < this.points; i++) {
       let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, facedetail_value);
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
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, facedetail_value);
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
         let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, facedetail_value);
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
      let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, facedetail_value);
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
       let n = map(noise(i), this.lower_val+1, this.higher_val-2, -1, facedetail_value);
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
    stroke(51);
    this.points3 = 8;
  
    // outer thin shape
      beginShape();
      fill(255,255,255);
      strokeWeight(0.02); // small detail line weight
      for (let i = 0; i < this.points3; i++) {
        let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, righteye_value);
        let r = 3.4 + n;
        x = r * cos(i * (360 / this.points3));
        y = r * sin(i * (360 / this.points3));
        curveVertex(x+2, y-2.5);
      }
      endShape(CLOSE);
    
    // main outline (thickest)
    beginShape();
    fill(255,255,255);
    strokeWeight(0.1);
    for (let i = 0; i < this.points3; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, righteye_value);
      let r = 3 + n;
      x = r * cos(i * (360 / this.points3));
      y = r * sin(i * (360 / this.points3));
      curveVertex(x+2, y-2.5);
    }
    endShape(CLOSE);
  
    // second outline (2nd thickest)
    beginShape();
    fill(255,255,255);
    strokeWeight(0.08);
    for (let i = 0; i < this.points3; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, righteye_value);
      let r = 2.5 + n;
      x = r * cos(i * (360 / this.points3));
      y = r * sin(i * (360 / this.points3));
      curveVertex(x+2, y-2.5);
    }
    endShape(CLOSE);
  
    pop();
  
    //////////////////// LEFT EYE ///////////////////////
    push();
    strokeWeight(0.3);
    stroke(51);
  
    this.points4 = 10;
  
    // thinnest outer shape
    beginShape();
    fill(255,255,255);
    strokeWeight(0.04);
    for (let i = 0; i <this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, lefteye_value);
      let r = 3.5 + n;
      x = r * cos(i * (360 / this.points4));
      y = r * sin(i * (360 / this.points4));
      curveVertex(x-1.5, y-1);
    }
    endShape(CLOSE);
  
    // main eye shape (thickest)
    beginShape();
    fill(255,255,255);
    strokeWeight(0.1);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val, -2, lefteye_value);
      let r = 2.5 + n;
      x = r * cos(i * (360 / this.points4));
      y = r * sin(i * (360 / this.points4));
      curveVertex(x-1.5, y-1);
    }
    endShape(CLOSE);
  
    // second thinnest line shape
    beginShape();
    fill(255,255,255);
    strokeWeight(0.08);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, lefteye_value);
      let r = 2.8 + n;
      x = r * cos(i * (360 / this.points4));
      y = r * sin(i * (360 / this.points4));
      curveVertex(x-1.5, y-1);
    }
    endShape(CLOSE);
  
    pop();
    push();
    beginShape();
    fill(255,255,255);
    strokeWeight(0.03);
    for (let i = 0; i < this.points4; i++) {
      let n = map(noise(i), this.lower_val+0.5, this.higher_val, -2, lefteye_value);
      let r = 3 + n;
      x = r * cos(i * (360 / this.points4));
      y = r * sin(i * (360 / this.points4));
      curveVertex(x-1.5, y-1);
    }
    endShape(CLOSE);
  
    pop();
  
    ///////////////// MOUTH MOVING /////////////
    push();
    fill(255,255,255);
    strokeWeight(0.3);
    stroke(51);
  
    this.points5 = 16;
  
   // outer thin detail
   beginShape();
   fill(255,255,255);
   strokeWeight(0.02);
   for (let i = 0; i < this.points5; i++) {
     let n = map(noise(i), this.lower_val, this.higher_val-1, -2, mouthh_value);
     let r = 3.2 + n;
     x = r * cos(i * (360 / this.points5));
     y = r * sin(i * (360 / this.points5));
     curveVertex(x, y+3);
   }
   endShape(CLOSE);
  
    // main shape outline
    beginShape();
    fill(255,255,255);
    strokeWeight(0.2);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, mouthh_value);
      let r = 3 + n;
      x = r * cos(i * (360 / this.points5));
      y = r * sin(i * (360 / this.points5));
      curveVertex(x, y+3);
    }
    endShape(CLOSE);
  
     // thinner shape outline
    beginShape();
    fill(255,255,255);
    strokeWeight(0.1);
    for (let i = 0; i < this.points5; i++) {
      let n = map(noise(i), this.lower_val, this.higher_val-1, -2, mouthh_value);
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
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    return settings;
  }
}
