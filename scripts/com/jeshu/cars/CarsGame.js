var Const = {
  contextType: '2d',
  GAME_NAME  :"pixcel cars",
  START_INSTRUCTION : "Press Spacebar to start !!!",
  BLOCK_SIZE : 10
}

var bgColor = "#DBDFCD";
var canvas, context, speed = 5, gameState = 0, score = 0, highScore = 0, plyX = 9, plyY = 36;

function init(canvasId) {
  canvas = document.getElementById(canvasId);
  canvas.height = 400;
  canvas.width = 240;
  context = canvas.getContext(Const.contextType);
  context.lineDashOffset = 0
  initPreScreen();
  addControls();
}

function initPreScreen(argument) {
  //render(true);
  // setTimeout(addInitText, 200);
}

function createBlocks(isDark, x, y) {
  var color = isDark ? "#5C604E" : "#CDD2B9";
  x = x*Const.BLOCK_SIZE;
  y = y*Const.BLOCK_SIZE;
  context.fillStyle = color;
  context.fillRect(x, y, Const.BLOCK_SIZE, Const.BLOCK_SIZE);

  context.fillStyle = bgColor;
  context.fillRect(x+1, y+1, Const.BLOCK_SIZE - 2 , Const.BLOCK_SIZE -2);

  context.fillStyle = color;
  context.fillRect(x+3, y+3, Const.BLOCK_SIZE -6 , Const.BLOCK_SIZE -6);
}

function render(static) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  var row = canvas.height/10;
  var col = canvas.width/10;
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      createBlocks(false, j, i);
    };
  };

  playerCar(plyX,plyY);

  setTimeout(moveCar, 5000, 4, -4)
  setTimeout(moveCar, 2000, 14, -4)
  setTimeout(moveCar, 0, 9, -4)
  return
  // context.fillStyle = "#333";
  // context.rect(0, 0, 240, 400);
  // context.fill();
  // createTracks();
  // if(static || gameState == 0) {
  //   return;
  // }
  // if(gameState == 1) {
  //   addScore();
  // };
  // setTimeout(render, 60);
}

function moveCar(x, y) {
  enemyCar(x,y,true);
  y++;

  enemyCar(x,y,false);
  console.log(x,y);
  if(y < 40) {
    setTimeout(moveCar, 100,x,y);
  } else {
    y = -4;
    setTimeout(moveCar, Math.random()*2000,x,y);
  }
}

function slidePlayerCar(onLeft) {
  playerCar(plyX, plyY, true)
  var xPos = onLeft ? -5 : 5;
  console.log(plyX);
  plyX += xPos;
  if(plyX < 4) {
    plyX = 4
  } else if(plyX > 14) {
    plyX = 14
  }
  playerCar(plyX, plyY, false);
}

function playerCar(x, y, clear) {
  var carPts = [
    {x : x+1, y : y},
    {x : x, y : y+1},
    {x : x+1, y : y+1},
    {x : x+1, y : y+2},
    {x : x+2, y : y+1},
    {x : x, y : y+3},
    {x : x+1, y : y+3},
    {x : x+2, y : y+3}
  ];
  carPts.forEach(function(item) {
    // console.log(item)
    createBlocks(!clear, item.x, item.y)
  });
}

function enemyCar(x, y, clear) {
  var carPts = [
    {x : x+1, y : y},
    {x : x, y : y+1},
    {x : x+1, y : y+1},
    {x : x+1, y : y+2},
    {x : x+2, y : y+1},
    {x : x, y : y+3},
    {x : x+2, y : y+3}
  ];
  carPts.forEach(function(item) {
    // console.log(item)
    createBlocks(!clear, item.x, item.y)
  });
}

function addInitText(argument) {

  context.fillStyle = "#CCC";
  context.font = "28px sans-serif";
	context.fillText(Const.GAME_NAME, 52,  150);
	context.stroke();
  context.fillStyle = "#FFF";
  context.font = "11px sans-serif";
	context.fillText(Const.START_INSTRUCTION, 55,  380);
	context.stroke();
}

function createTracks(argument) {
  context.strokeStyle = "#666";
  context.beginPath();
        context.lineWidth = 3
        context.setLineDash([20,30]);
        context.moveTo(80,0);
        context.lineTo(75,400);
        context.moveTo(160,0);
        context.lineTo(160,400);
    context.stroke();
    context.lineDashOffset = context.lineDashOffset - speed;
    if(context.lineDashOffset > 50-speed) {
      context.lineDashOffset = 0
    }
}

function addControls(argument) {
  $(document).on("keydown", keyDownHandler)
  $(document).on("keyup", keyUpHandler)
}

function keyUpHandler(argument) {
  speed -= 15;
}

function keyDownHandler(evt) {
  console.log(evt.which);
  if(evt.which == 32 && gameState == 0) {
    gameState = 1;
    startGame();
  } else if(gameState == 1){
    switch (evt.which) {
      case 13 :
        endGame();
        break;
      case 39:
        slidePlayerCar(false)
        console.log("palyer move right");
        break;
      case 37:

        slidePlayerCar(true)
        console.log("palyer move left");
        break;
      case 38:
        speed += 15;
        score++;
        console.log("palyer speeds up");
      default:

    }
  }
}

function startGame(argument) {
  console.log("palyer game starts");
  render();
}

function addScore() {
  console.log(score, speed);
  score++;
  context.fillStyle = "#FFF";
  context.font = "10px sans-serif";
	context.fillText("Score : "+score, 165,  15);
	context.stroke();
  if(score > speed * 10) {
    speed += 10;
  }
  if(speed >= 50) {
    endGame();
  }
}

function endGame(argument) {
  if(highScore < score) {
    highScore = score;
  }
  gameState = 0;
  score = 0;
  speed = 10;
  setTimeout(function() {
    initPreScreen();
    context.fillStyle = "#FFF";
    context.font = "20px sans-serif";
  	context.fillText(highScore, 100, 200);
  }, 200)
}

function showScoreScreen(argument) {
  // body...
}

module.exports  = {
  init : init
}
