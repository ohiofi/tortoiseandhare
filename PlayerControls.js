/*global cam,camera, player, cos, sin,movedX,movedY,abs,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

let horizontalTiltSpeed = 0.05;
let moveSpeed = 5;

function checkPlayerControls() {
  // NOTE: tilt camera up/down is a camera control found in the Camera class
  
  // rotate player left/right
  // player.transform.rotation.y -= -movedX * horizontalTiltSpeed;

  // right
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    //requestPointerLock();
    player.transform.position.x +=
      cos(player.transform.rotation.y) * moveSpeed;
    player.transform.position.z -=
      sin(player.transform.rotation.y) * moveSpeed;
  }
  // left
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    //requestPointerLock();
    player.transform.position.x -=
      cos(player.transform.rotation.y) * moveSpeed;
    player.transform.position.z +=
      sin(player.transform.rotation.y) * moveSpeed;
  }
  // reverse
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    //requestPointerLock();
    player.transform.position.x -= sin(player.transform.rotation.y) * moveSpeed;
    player.transform.position.z -= cos(player.transform.rotation.y) * moveSpeed;
  }
  // forward
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    //requestPointerLock();
    player.transform.position.x += sin(player.transform.rotation.y) * moveSpeed;
    player.transform.position.z += cos(player.transform.rotation.y) * moveSpeed;
  }
  // plus zoom in
  if(keyIsDown(187)){
    cam.distanceAboveParent--;
    let temp = cam.distanceAboveParent;
    cam.verticalTiltOffset = temp / 2;
  }
  // minus zoom out
  if(keyIsDown(189)){
    cam.distanceAboveParent++;
    let temp = cam.distanceAboveParent;
    cam.verticalTiltOffset = temp / 2;
  }
}
function mouseClicked() {
  //requestPointerLock();
}
