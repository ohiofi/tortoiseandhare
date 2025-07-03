/*global hareCount,resizeCanvas,Hare,Tortoise,Camera,texture,ellipsoid,ambientLight,directionalLight,createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/
let mydiv;
let moneyDisplay1 = document.getElementById("playerMoneyDisplay1");
let moneyDisplay2 = document.getElementById("playerMoneyDisplay2");
let playerWager1 = document.getElementById("yourWagerDropdown1");
let playerWager2 = document.getElementById("yourWagerDropdown2");
let racerSelect = document.getElementById("racerSelectDropdown");
let score = 0;
let myFont;
let player = new GameObject();
let playerMoney = 150;
let newPlayerMoney = playerMoney;
let playerMoneySpan;
let cam = new Camera();
let shell;
let green;
let objects = [];
let gameState = "ingame";
let jumbotron = {
  text:"Race 1",
  x:500,
  z:1100
}
let floorColor, skyColor;

let raceCount = 1;
let betPlaced = false;
let currentBet = { amount: 0, species: null, name: null };
let scoreboard = {
  tortoiseCount:0,
  hareCount:0,
  tortoiseHeading: { name: "🐢 TORTOISE WINS", wins: 0 },
  hareHeading: { name: "🐇 HARE WINS", wins: 0 },
  tortoiseRacers: [],
  hareRacers:[]
};
function preload() {
  myFont = loadFont(
    "https://cdn.glitch.com/a505537e-e31c-44b7-a7d0-3f1df6037202%2FPressStart2P.ttf?v=1582643146331"
  );
  // shell = loadImage(
  //   "https://cdn.glitch.com/af6937ef-c502-4da1-9b5c-a6f459aabd0f%2Ftortoise%20shell.jpg?v=1618927590685"
  // );
  // green = loadImage(
  //   "https://cdn.glitch.com/af6937ef-c502-4da1-9b5c-a6f459aabd0f%2Fgreen%20texture.jpg?v=1618927667270"
  // );
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes("antialias", true);
  // setup the camera
  //cam.setParent(player, 600, 250);
  //cam.setParent(player, 150 + 22.5*2, 187.5 + 3.125 * 2);
  cam.setParent(player, 170, 170);
  player.transform.position.x = 100;
  player.newTransform.position.x = 100;
  //player.newTransform.position.x = 0;
  player.transform.position.z = 450;
  player.newTransform.position.z = 450;
  player.transform.rotation.y = -20
  //cam.setPosition(-200,400,-200)
  //cam.lookAt(300,0,300)

  for (let i = 0; i < 1; i += 1) {
    addNewHare();
  }

  for (let i = 0; i < 1; i += 1) {
    addNewTortoise();
  }

  mydiv = document.createElement("div"); // Create a <div> element
  //moneyDisplay1 = document.createElement("div"); // Create a <div> element
  createHUD();
  writeScoreboard();
  fillRacerSelectDropdown();
  floorColor = color(90, 120, 90);
  skyColor = color(150,200,250)
}

function draw() {
  background(skyColor);
  ambientLight(128);
  directionalLight(255, 255, 255, 1, -1, 1);
  directionalLight(0, 0, 128, -1, 1, -1);
  //checkPlayerControls();
  cam.update();
  //player.show()
  drawFloor();
  push();
  translate(player.transform.position.x, 80, player.transform.position.z)
  rotateY(player.transform.rotation.y)
  translate(0, 0, jumbotron.z);
  rotateX(25);
  drawText(jumbotron.text,"black");
  pop();
  // label the x and z axis
  // push();
  // translate(1000, 0, 0);
  // rotateY(90);
  // drawText("X+", "red", 10);
  // pop();
  // push();
  // translate(0, 0, 1000);
  // drawText("Z+", "blue", 10);
  // pop();
  updatePlayerMoney();
  for (let each of objects) {
    each.show();
    if (gameState == "ingame") {
      each.update();
      if (each.x < 850 && each.x > player.newTransform.position.x - 150){
        player.newTransform.position.x = each.x + 150
        if (each.x>600){
          player.newTransform.position.z = each.z - 100
        }
      }
    }
    // place your bet
    if (!betPlaced && each.x >= 500) {
      gameState = "paused";
      //playerMoney = newPlayerMoney;
      $("#myModal").modal("show");
    }
    // check for victory
    if (each.x > 1000) {
      processVictory(each);
    }
  }
  player.update()
}

function addNewTortoise(){
  scoreboard.tortoiseCount++;
  let temp = new Tortoise(0, 450 + scoreboard.tortoiseCount * 50);
    scoreboard.tortoiseRacers.splice(0, 0, {
      name: temp.name,
      wins: 0,
      type: "Tortoise"
    });
    objects.splice(0, 0, temp);
  //jumbotron.z += 50;
}

function addNewHare(){
  scoreboard.hareCount++;
  let temp2 = new Hare(0, 500 - scoreboard.hareCount * 50);
  //scoreboard.hareRacers.splice(0, 0, { name: temp2.name, wins: 0, type: "Hare" });
  scoreboard.hareRacers.push({ name: temp2.name, wins: 0, type: "Hare" });
  // push hare to end of objects array
  //objects.splice(0, 0, temp2);
  objects.push(temp2)
  
  
}

function processVictory(winner){
      winner.x = 1000;
      player.newTransform.position.x = winner.x
      player.newTransform.position.z = winner.z
      winner.winner = true;
      winner.energy = 4;
      winner.speed -= Math.random() * 0.2 + Math.random() * 0.2 + 0.6;
      winner.speed = Math.abs(winner.speed);
      jumbotron.text += ": " + winner.name + " Wins!";
      gameState = "paused";
      setTimeout(reset, 3000);
      // find name on scoreboard
      let tempArray = scoreboard.tortoiseRacers.concat(scoreboard.hareRacers);
      console.log(tempArray)
      for (let entry of tempArray) {
        if (entry.name == winner.name) {
          entry.wins++;
          if (winner.constructor.name == "Hare") {
            scoreboard.hareHeading.wins++;
            if(scoreboard.tortoiseCount<10){
              addNewTortoise();
            }
            
          } else {
            scoreboard.tortoiseHeading.wins++;
            if(scoreboard.hareCount<10){
              addNewHare();
            }
          }
          writeScoreboard();
          checkBet(winner);
          fillRacerSelectDropdown();
          break;
        }
      }
      // speed up losers
      for (let loser of objects) {
        if (loser == winner) {
          continue;
        }
        loser.speed += Math.random() * 0.5;
      }
}

function fillRacerSelectDropdown(){
  let previouslySelected = racerSelect.value;
  let result = "";
  for(let each of objects){
    result += "<option value="+each.name
    if(previouslySelected == each.name){
      result += " selected "
    }
    result += ">"+each.name+"</option>"
  }
  racerSelect.innerHTML = result;
}

function updatePlayerMoney() {
  if (playerMoney == newPlayerMoney){
    playerMoneySpan.style.color = "white";
    //playerMoneySpan.style.fontSize = '1rem';
    return
  }
  else if (playerMoney < newPlayerMoney) {
    playerMoney+=2;
    playerMoneySpan.style.color = "green";
    //playerMoneySpan.style.fontSize = '2rem';
    
    
  } else if (playerMoney > newPlayerMoney) {
    playerMoney--;
    playerMoneySpan.style.color = "red";
    //playerMoneySpan.style.fontSize = '2rem';
    
  } 
  playerMoneySpan.innerHTML =
    "$" + playerMoney;
  moneyDisplay2.innerHTML = playerMoney;
}

function choice(list) {
  var index = Math.floor(Math.random() * list.length);
  return list[index];
}

function checkBet(winner) {
  let punct = ["!",""];
  let positive = ["Nice","Cool","Good Job","Sweet","Well Done","Neat","Boss","Fancy","Dandy","Devine","Keen","Swell","Glorious","Hunky-Dory","Marvelous","Nifty","Sensational","Noice","Sick","Gucci","Lit","Phat","Fab","Chill","Killer","Legit","Rad","Savage","Wicked","Alright","Excellent","Fab","Fantabulous","First-class","First-rate","Grand","Hot","Heavenly","Keen","Out-of-Sight","Peachy","Phat","Radical","Righteous","Stellar","Stupendous","Top-notch","A-Okay","Dynamite","Hip","Groovy","Neat","Neato","Nifty","Peachy Keen","That's Swell","That's Hot","Totally","Fresh","Delightful","Grand","Lovely","Outstanding","Sensational","Splendid","Superb","Wonderful","Oh Yeah","Yes"];
  let negative = ["Oof","Awkward","Ouch","Yuck","Sad","Not Cool","Bogus","Bollucks","Boo","Brutal","Bunk","Bush League","Busted","Crummy","Fail","Hack","Janky","Janked Up","Weak","Whack","Jacked Up","Nope","Wrong","You Failed","You Salty?","You Suck","Sad","Rubbish","Garbage","What Are You Doing?","You Stink","Terrible","Awful","Yuck","Appalling","Atrocious","That's Tough","Ew","Gross","Bad","No","Not Even","Shocking","Tough","Oops","Err","Well Shucks","Whoopse","Whoops","Jeepers","Alas","Ow","Oh No","Egad","Golly","Huh","Ah Phooey","Ugh","Darn","Drat","Doggone","Dang","Cripes","Darnation","Gosh-darn-it","Blast","Well, Shoot"];
  // easy money win
  if (currentBet.species != null && currentBet.species == winner.constructor.name) {
    newPlayerMoney += currentBet.amount * 2;
    $("#greenAlert").html(choice(positive)+choice(punct)+" +$"+(currentBet.amount * 2));
    $("#greenAlert").show();
  // easy money lose
  } else if (currentBet.species != null && currentBet.species != winner.constructor.name) {
    newPlayerMoney -= currentBet.amount;
    $("#redAlert").html(choice(negative)+choice(punct)+" -$"+(currentBet.amount));
    $("#redAlert").show();
  // big money win
  } else if (currentBet.name != null && currentBet.name == winner.name) {
    newPlayerMoney += currentBet.amount * 5;
    $("#greenAlert").html(choice(positive)+choice(punct)+" +$"+(currentBet.amount * 5));
    $("#greenAlert").show();
  // big money lose
  } else if (currentBet.name != null && currentBet.name != winner.name) {
    newPlayerMoney -= currentBet.amount;
    $("#redAlert").html(choice(negative)+choice(punct)+" -$"+(currentBet.amount));
    $("#redAlert").show();
  }
    

  currentBet = { amount: 0, species: null, name: null };
}

function reset() {
  let totalRacers = scoreboard.tortoiseCount + scoreboard.hareCount;
  ////cam.setParent(player, 600, 250);
  cam.setParent(player, 160 + 5*totalRacers, 160 + 5*totalRacers);
  cam.setParent(player, 160 + 5*totalRacers, 160 + 5*totalRacers);
  gameState = "paused";
  
  raceCount++;
  jumbotron.text = "Race " + raceCount;
  for (let each of objects) {
    each.x = 0;
    each.winner = false;
  }
  betPlaced = false;
  player.newTransform.position.z = 450 - 55 * hareCount
  player.newTransform.position.x = 0;
  setTimeout(function(){
    gameState = "ingame";
    $("#greenAlert").hide();
    $("#redAlert").hide();
  },3000);
}

function writeScoreboard() {
  mydiv.innerHTML = "";
  let text = "";

  text +=
    scoreboard.tortoiseHeading.name +
    ": " +
    scoreboard.tortoiseHeading.wins +
    "<br>";
  for (let each of scoreboard.tortoiseRacers){
    text +=
        each.name + ": " + each.wins + "<br>";
  }
  text += "<br>"
  text +=
    scoreboard.hareHeading.name + ": " + scoreboard.hareHeading.wins + "<br>";

  for (let each of scoreboard.hareRacers){
    text +=
        each.name + ": " + each.wins + "<br>";
  }

  mydiv.innerHTML = text;
}

function createHUD() {
  mydiv.innerHTML = "Score: <span id='scoreDiv'>0</span> / 100"; // Insert text
  mydiv.className = "hud mt-5 pt-3";
  mydiv.style.position = "absolute";
  mydiv.style.top = 0;
  mydiv.style.left = 0;
  document.body.appendChild(mydiv); // Append <div> to <body>
  moneyDisplay1.innerHTML =
    "💰 Your Money: <span id='pMoneySpan'>$" + playerMoney + "</span>";
  // moneyDisplay1.className = "text-right ";
  // moneyDisplay1.style.position = "absolute";
  // moneyDisplay1.style.top = 0;
  // moneyDisplay1.style.right = 0;
  // document.body.appendChild(moneyDisplay1); // Append <div> to <body>
  //scoreDisplay = document.getElementById("scoreDiv");
  playerMoneySpan = document.getElementById("pMoneySpan");
}

function drawBoxes() {
  // let boxSize = ??
  // for loop
  push();
  translate(600, 5, 50);
  fill("red");
  rotateY(frameCount);
  noStroke();
  box(10);
  pop();
  push();
  translate(100, 5, 800);
  fill("blue");
  rotateY(frameCount);
  noStroke();
  box(10);
  pop();
}

function drawFloor() {
  push();
  //translate(-500,-2,500);
  translate(0,-2,0);
  fill(floorColor);
  //box(1000,1,1000);
  box(2000,1,2000);
  pop();
  let tileSize = 100;
  // tile floor
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      push();
      translate(
        row * tileSize + tileSize / 2,
        0,
        col * tileSize + tileSize / 2
      );
      //fill(255);
      fill(floorColor);
      strokeWeight(10);
      stroke(0);
      box(tileSize, 1, tileSize);
      pop();
    }
  }
}
function drawText(mytext = "", color = "#ED225D", size = 36) {
  push();
  scale(1, -1, 1);
  textAlign(CENTER);
  fill(color);
  stroke(0);
  textFont(myFont);
  textSize(size);
  text(mytext, 0, 0);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

$(function() {
  $("#myModal").modal("hide");
});

$("#myModal").on("hide.bs.modal", function(e) {
  // do something...
  gameState = "ingame";
  betPlaced = true;
});

function betEasy(species = null) {
  currentBet = { amount: parseInt(playerWager1.value), species: species, name: null};
  gameState = "ingame";
  betPlaced = true;
  $("#myModal").modal("hide");
}
function betBig() {
  currentBet = { amount: parseInt(playerWager2.value), species: null, name: racerSelect.value};
  gameState = "ingame";
  betPlaced = true;
  $("#myModal").modal("hide");
}
$("#myModal").modal("hide");
$("#myModal").modal("hide");
$("#myModal").modal("hide");
$("#greenAlert").hide();
$("#redAlert").hide();

$("#greenAlert").on('click', function () {
    $('#greenAlert').hide();
});
$("#redAlert").on('click', function () {
    $('#redAlert').hide();
});