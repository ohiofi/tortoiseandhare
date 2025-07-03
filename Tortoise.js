/*global shininess,ambientMaterial,Camera,texture,ellipsoid,ambientLight,directionalLight,createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let tortoiseNames = ["Shelly","Jon","Shelby","Sandy","Sandra","Karen","Shahad","Max","Amanda","Snappy","Teen","Mutant","Ninja","Sis","Smash","Don","Leo","Mike","Raph","Tubby","Sue","Taz","Tim","Tia","Sal","Ted","Terra","Greene","Pond","Lake","Tort","Tart","Splash","Eggy","Squirt","Smith","Smarth","Smooth","Truman","Sminkin","Sewer","Syd","Seward","Teddy","Slimey","Torty","Taco","Tara","Slimer","Sushi","Sid","Sam","Seth","Sara","Sassy","Susan","Stu","Sadie","Stella","Sage","Sasha","Sierra","Skylar","Steph","Sydney","Tracy","Tony","Tom","Tracy","Tina","Thomas","Ttt","Tops","Theo","Thor","Tobias","Treble","Trouble","Thad","Ty"];
shuffle(tortoiseNames);
let tortoiseCount = 0;

class Tortoise {
  constructor(x,z) {
    this.class = "turtle"
    this.name = tortoiseNames[tortoiseCount];
    tortoiseCount++;
    this.x = x;
    this.z = z;
    this.speed = Math.random()+Math.random()+0.5;
    this.direction = 0;
    this.bodyColor = color(0,random(150,255),0);
    this.shellColor = color(random(100,160),random(70,130),random(30,90));
    this.energy = Math.random()*1.5+1;
    this.secondWind = Math.random()*0.5+Math.random()*0.5
    this.winner = false;
    this.textColor = color(130+random(-30,30),240+random(-15,15),130+random(-30,30))
  }
  show() {
    push();
    
    noStroke();
    translate(this.x-24, 10, this.z);
    rotateY(-this.direction);
    scale(0.5,0.5,0.5);
    // name
    push()
    translate(0, 75, 0);
    rotateY(player.transform.rotation.y)
    rotateX(45)
    
    //drawText(this.name,color(this.energy*250,150,250),36);
    if(this.winner){
      drawText(this.name,color(random(100,255),random(100,255),random(100,255)),46);
    }else{
      drawText(this.name,this.textColor,36);
    }
    pop()
    //body
    push()
    if(this.winner){
      rotateY(frameCount*2)
    }
    push();
    
    //texture(shell);
    stroke(0)
    shininess(10)
    ambientMaterial(this.shellColor)
    
    translate(0, 15, 0);
    ellipsoid(40, 20, 30,6,3);
    //ellipsoid(30, 40, 40, 6, 3);
    pop();
    //head
    //texture(green);
    ambientMaterial(this.bodyColor)
    push();
    translate(35, 20, 0);
    ellipsoid(15, 10, 15);
    pop();
    //legs
    push();
    
    let legMoveDist = 10;
    translate(-15, 0+sin(frameCount*3+90)*legMoveDist, 15);
    ambientMaterial(this.bodyColor)
    box(10, 15, 10);
    pop();
    push();
    translate(15, 0+sin(frameCount*3)*legMoveDist, 15);
    ambientMaterial(this.bodyColor)
    box(10, 15, 10);
    pop();
    push();
    translate(-15, 0+sin(frameCount*3+180)*legMoveDist, -15);
    ambientMaterial(this.bodyColor)
    box(10, 15, 10);
    pop();
    push();
    translate(15, 0+sin(frameCount*3+270)*legMoveDist, -15);
    ambientMaterial(this.bodyColor)
    box(10, 15, 10);
    pop();
    pop();
    pop()

  }
  update() {
    // delayed start
    if(this.x == 0 && Math.random()<0.8){
      return
    }
    this.energy *= 0.99;
    if(this.x > 500 && this.x < 520){
      this.energy = Math.random()*0.5+Math.random()*0.5+this.secondWind;
    }
    this.x = this.x + cos(this.direction) * (this.speed+this.energy);
    //this.z = this.z + sin(this.direction) * this.speed;
    //this.direction = this.direction + random() - random();
    // if (this.x < 0) {
    //   this.x = 0;
    //   this.direction  += random(160,200);
    // }
    // if (this.x > 1000) {
    //   this.direction  += random(160,200);
    //   this.x = 1000;
    // }
    // if (this.z < 0) {
    //   this.z = 0;
    //   this.direction  += random(160,200);
    // }
    // if (this.z > 1000) {
    //   this.z = 1000;
    //   this.direction  += random(160,200);
    // }
  }
}