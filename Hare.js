/*global PlayerObject,texture,createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/
// by June Yang

let hareNames = ["Bops","Ben","Bonnie","Barb","Bub","Brown","Bart","Bob","Babs","Bops","Boo","Baby","Bess","Bill","Bell","Beth","Benji","Betsy","Boots","Busy","Buzz","Bro","Bessie","Blue","B.B.","Blinky","Bubbles","Big","Bert","Bort","Burt","Becky","Bam","Bork","Bee","Bets","Bus","Beck","Boone","Barney","Brite","Bitey","Bunny","Bugs","Buster","Bix","Barkley","Bernie","Brad","Brony","Bronson","Boss","Beans","Buddy","Berkley","Buffy","Bobby","Biz","Blaze","Burke","Bertha","Benjamin","Boy","Boi","Bb","B#","Bass","Boolean","Bully","Bucko","Bigboi","Bullseye","Bord","Boids","Bart","Bard","Bethany","Birch","Burger","Batman","Batgirl","Bailey","Barley","Bread","Break","Broke","Bentley","Brock","Barrack","Brunch","Brah","Bacon","Bald","Book","Baldy","Bingus","Bubba"];
let hareCount = 0;
shuffle(hareNames);

class Hare extends GameObject {
  constructor(_x, _z) {
    super();
    this.class = "hare";
    this.name = hareNames[hareCount];
    hareCount++;
    this.x = _x;
    this.z = _z;
    this.transform.position.y = 0;
    this.transform.scale.x = random(1.6, 1.9);
    this.transform.scale.y = random(1.6, 1.9);
    this.transform.scale.z = random(1.6, 1.9);
    this.state = "walking";
    this.transform.rotation.y = 0
    this.speed = Math.random()*3 + Math.random()*3 + 1
    let lightBase = random(0,85)
    this.lightColor = color(255-lightBase,255-lightBase*2,255-lightBase*3)
    this.darkColor = color(random(5,55))
    this.sleepTimer = random(15,30);
    this.awakeTimer = random(15,30)+random(15,30);
    this.maxSleep = random(25,45)+random(25,45);
    this.maxAwake = random(25,30)+random(25,30);
    this.energy = 5;
    this.winner = false
    this.textColor = color(240+random(-15,15),130+random(-30,30),130+random(-30,30))
  }
  show() {
    
    push()
    translate(this.x-18, 10, this.z );
    scale(2,2,2)
    
    rotateY(-this.transform.rotation.y); // test out different values to see what make the rabbits walk the correct direction. For example, maybe 90 or -90
    // name
    push()
    translate(0, 18, 0);
    rotateY(player.transform.rotation.y)
    rotateX(45)
    
    //drawText(this.name,color(this.energy*250,150,250),9);
    if(this.winner){
      drawText(this.name,color(random(100,255),random(100,255),random(100,255)),12);
    }else{
      drawText(this.name,this.textColor,9);
    }
    
    pop()
    push()
    if(this.winner){
      rotateY(frameCount*2)
    }
    
    //left leg
    push();
    noStroke();
    //fill("grey");
    fill(this.darkColor)
    if (this.state == "standing") {
      translate(-3, 0, -2);
    }
    if (this.state == "walking") {
      translate(-3, 2 + cos(frameCount * 5) * 3, -2);
      //rotateX(2 + sin(frameCount * 5) * 40);
    }
    box(3, 1, 1);
    pop();
    //right leg
    push();
    noStroke();
    //fill("grey");
    fill(this.darkColor)
    if (this.state == "standing") {
      translate(-3, 0, 2);
    }
    if (this.state == "walking") {
      translate(-3, 2 + cos(frameCount * 5) * 3, 2);
      //rotateX(2 + cos(frameCount * 5) * 40);
    }
    box(3, 1, 1);
    pop();
    //body
    push();
    noStroke();
    translate(0, 5, 0);
    //texture(Bfur);
    fill(this.lightColor)
    rotateZ(90);
    sphere(4.5, 8);
    pop();
    //left arm
    push();
    noStroke();
    //fill("grey");
    fill(this.darkColor)
    if (this.state == "standing") {
      translate(4, 0, -2);
    }
    if (this.state == "walking") {
      translate(4, 2 + sin(frameCount * 5) * 3, -2);
      //rotateX(2 + cos(frameCount * 5) * 40);
    }
    box(3, 1, 1);
    pop();
    //right arm
    push();
    noStroke();
    //fill("grey");
    fill(this.darkColor)
    if (this.state == "standing") {
      translate(4, 0, 2);
    }
    if (this.state == "walking") {
      translate(4, 2+sin(frameCount * 5) * 3, 2);
      //rotateX(2 + sin(frameCount * 5) * 40);
    }
    box(3, 1, 1);
    pop();
    //head
    push();
    noStroke();
    //texture(Bfur);
    fill(this.lightColor)
    translate(5, 10, 0);
    //rotateY(-90);
    sphere(4);
    pop();
    //tail
    push();
    noStroke();
    //texture(Bfur);
    fill(this.lightColor)
    translate(-5, 4, 0);
    sphere(2);
    pop();
    //left ear
    push();
    noStroke();
    //texture(Bfur);
    fill(this.lightColor)
    translate(5, 15, -2.5);
    //rotateX(5);
    //box(1, 7, 2);
    ellipsoid(0.5,3.5,1)
    pop();
    //right ear
    push();
    noStroke();
    //texture(Bfur);
    fill(this.lightColor)
    translate(5, 15, 2.5);
    //rotateX(-5);
    //box(1, 7, 2);
    ellipsoid(0.5,3.5,1)
    pop();
    //left eye
    push();
    noStroke();
    fill(this.darkColor)
    translate(8, 12, -1);
    sphere(0.5);
    pop();
    //right eye
    push();
    noStroke();
    fill(this.darkColor)
    translate(8, 12, 1);
    sphere(0.5);
    pop();
    //mouth
    push();
    noStroke();
    fill(this.lightColor)
    translate(8.35, 10, 0);
    sphere(1);
    pop();
    pop();
    pop()
  }
  update() {
    // delayed start
    if(this.x == 0 && Math.random()<0.2){
      return
    }
    // awake
    if (this.awakeTimer < this.maxAwake) {
      this.state = "walking"
      this.energy *= 0.95;
      this.x  += cos(this.transform.rotation.y) * (this.speed + this.energy);
      this.awakeTimer++;
    // sleep
    } else if (this.sleepTimer < this.maxSleep) {
      this.energy *= 0.9;
      this.state = "standing"
      this.sleepTimer ++;
    // wake up  
    } else {
      this.sleepTimer = 0;
      this.awakeTimer = 0;
      this.energy = Math.random()*2 + 3
    }
  }
 // walk() {
 //    this.transform.position.x  += cos(this.transform.rotation.y) * this.speed;
 //    this.transform.position.z += sin(this.transform.rotation.y) * this.speed;
    // this.transform.rotation.y += (random() - random());
    // if (this.transform.position.x  < 0) {
    //   this.transform.position.x  = 0;
    //   this.transform.rotation.y += random(160,200);
    // }
    // if (this.transform.position.x  > 1000) {
    //   this.transform.rotation.y  += random(160,200);
    //   this.transform.position.x  = 1000;
    // }
    // if (this.transform.position.z < 0) {
    //   this.transform.position.z = 0;
    //   this.transform.rotation.y  += random(160,200);
    // }
    // if (this.transform.position.z> 1000) {
    //   this.transform.position.z = 1000;
    //   this.transform.rotation.y  += random(160,200);
    // }
  //}


}