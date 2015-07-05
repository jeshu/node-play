/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Clock = __webpack_require__(1);
	Clock.init('main-canvas');
	// module.exports = application;


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Const = {
	  contextType: '2d',
	  stageWidth : 400,
	  stageHeight : 420,
	  gameWidth : 255,
	  gameHeight : 420,
	  GAME_NAME  :"pixcel cars",
	  START_INSTRUCTION : "Press Spacebar to start !!!",
	  BLOCK_SIZE : 15
	}
	
	var bgColor = "#DBDFCD";
	var canvas, context, speed = 5, gameState = 0, score = 0, highScore = 0,
	 plyX = 2, plyY = 420/15 - 5, speed = 10, orignSpeed = 1;
	var runEnemyCarsTimeout, inZipMode = false;
	
	
	function init(canvasId) {
	  canvas = document.getElementById(canvasId);
	  canvas.height = Const.stageWidth;
	  canvas.width = Const.stageHeight;
	  context = canvas.getContext(Const.contextType);
	  context.lineDashOffset = 0
	  initPreScreen();
	  addControls();
	}
	
	function initPreScreen(argument) {
	  addInitText();
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
	  context.clearRect(0, 0, Const.stageWidth, Const.stageWidth);
	  var row = Const.gameHeight/Const.BLOCK_SIZE;
	  var col = Const.gameWidth/Const.BLOCK_SIZE;
	  console.log(row, col);
	  for (var i = 0; i < row; i++) {
	    for (var j = 0; j < col; j++) {
	      createBlocks(false, j, i);
	    };
	  };
	  playerCar(plyX,plyY);
	  runEnemyCars();
	  return;
	}
	var enemyCarArr = [];
	function runEnemyCars() {
	  if(gameState == 0) {
	    return;
	  }
	  console.log("runEnemyCars | ", (750/speed) * 10);
	  var xPosArr = [2,7,12];
	  var x = xPosArr[Math.round(Math.random()*2)];
	  var car = null;
	  moveCar(x, -4, car)
	  car = setTimeout(runEnemyCars, (750/speed) * 10)
	  enemyCarArr.push(car);
	
	}
	
	function moveCar(x, y, car) {
	  if(gameState == 0) {
	    return;
	  }
	  enemyCar(x,y,true);
	  y++;
	
	  enemyCar(x,y,false);
	  if(y < Const.gameHeight/15) {
	    setTimeout(moveCar, 750/speed,x,y, car);
	  } else {
	    clearTimeout(car);
	  }
	  if(x == plyX && y > plyY - 3)  {
	    console.log("gameOver", x, plyX, y, plyY);
	    gameState = 0;
	    endGame();
	  }
	  addScore();
	}
	
	function slidePlayerCar(onLeft) {
	  playerCar(plyX, plyY, true)
	  var xPos = onLeft ? -5 : 5;
	  console.log(plyX);
	  plyX += xPos;
	  if(plyX < 2) {
	    plyX = 2
	  } else if(plyX > 12) {
	    plyX = 12
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
	  context.fillStyle = "#333";
	  context.font = "28px sans-serif";
		context.fillText(Const.GAME_NAME, 152,  150);
		context.stroke();
	  context.fillStyle = "#000";
	  context.font = "12px sans-serif";
		context.fillText(Const.START_INSTRUCTION, 148,  180);
		context.stroke();
	}
	
	function addControls(argument) {
	  $(document).on("keydown", keyDownHandler)
	  $(document).on("keyup", keyUpHandler)
	}
	
	function keyUpHandler(evt) {
	    // if(evt.which == 17)
	    //   speed = orignSpeed;
	    //   if(inZipMode) {
	    //     clearTimeout(runEnemyCarsTimeout);
	    //     runEnemyCarsTimeout = setTimeout(runEnemyCars, (750/speed) * 10);
	    //     inZipMode = false;
	    //   }
	}
	
	function keyDownHandler(evt) {
	  // console.log(evt.which);
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
	        // console.log("palyer move right");
	        break;
	      case 37:
	        slidePlayerCar(true)
	        // console.log("palyer move left");
	        break;
	      case 17:
	        // speed = orignSpeed + 10;
	        // score++;
	        // if(!inZipMode) {
	        //   console.log("palyer speeds up");
	        //   inZipMode = true;
	        //   clearTimeout(runEnemyCarsTimeout);
	        //   runEnemyCarsTimeout = setTimeout(runEnemyCars, (750/speed) * 10);
	        // }
	      default:
	
	    }
	  }
	}
	
	function startGame(argument) {
	  render();
	}
	
	function addScore() {
	  // console.log(score, speed);
	  score++;
	  context.clearRect(Const.gameWidth, 0, Const.stageWidth, 30)
	  context.clearRect(Const.gameWidth, 70, Const.stageWidth, 90)
	  context.fillStyle = "#333";
	  context.font = "14px sans-serif";
		context.fillText("Score : "+score, Const.gameWidth + 10,  30);
		context.stroke();
	  if(score > speed * 100) {
	    speed += 1;
	  }
	  if(speed > 20) {
	    speed = 10;
	  }
	}
	
	function endGame(argument) {
	  if(highScore < score) {
	    highScore = score;
	  }
	  setTimeout(function() {
	    context.clearRect(Const.gameWidth, 30, Const.stageWidth, 30)
	    context.fillStyle = "#333";
	    context.font = "20px sans-serif";
	  	context.fillText("Game Over", Const.gameWidth + 10,  120);
	    context.font = "14px sans-serif";
	  	context.fillText("HighScore : " + highScore, Const.gameWidth + 10,  60);
	    console.log(highScore, score);
	    if(score > highScore) {
	      console.log(highScore);
	  	  context.fillText("New HighScore is " + highScore, Const.gameWidth + 10,  90);
	    }
	  	context.stroke();
	    gameState = 0;
	    score = 0;
	    speed = 10;
	  }, 200)
	}
	
	module.exports  = {
	  init : init
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map