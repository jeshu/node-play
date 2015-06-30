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
	  GAME_NAME  :"pixcel cars",
	  START_INSTRUCTION : "Press Spacebar to start !!!",
	  BLOCK_SIZE : 10
	}
	
	var bgColor = "#DBDFCD";
	var canvas, context, speed = 5, gameState = 0, score = 0, highScore = 0,
	 plyX = 9, plyY = 36, speed = 1, orignSpeed = 1;
	var runEnemyCarsTimeout, inZipMode = false;
	
	
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
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  var row = canvas.height/10;
	  var col = canvas.width/10;
	  for (var i = 0; i < row; i++) {
	    for (var j = 0; j < col; j++) {
	      createBlocks(false, j, i);
	    };
	  };
	  playerCar(plyX,plyY);
	  runEnemyCars();
	  return;
	}
	
	function runEnemyCars() {
	  if(gameState == 0) {
	    return;
	  }
	  console.log("runEnemyCars | "   , (750/speed) * 10);
	  var xPosArr = [4,9,14];
	  var x = xPosArr[Math.round(Math.random()*2)]
	  moveCar(x, -4)
	  runEnemyCarsTimeout = setTimeout(runEnemyCars, (750/speed) * 10);
	}
	
	function moveCar(x, y) {
	  if(gameState == 0) {
	    return;
	  }
	  enemyCar(x,y,true);
	  y++;
	
	  enemyCar(x,y,false);
	  // console.log(x,y);
	  if(y < 40) {
	    setTimeout(moveCar, 750/speed,x,y);
	  } else {
	    y = -4;
	    // setTimeout(moveCar, Math.random()*2000,x,y);
	  }
	  if(x == plyX && y > plyY - 3)  {
	    gameState = 0;
	    console.log("gameOver");
	    endGame();
	  }
	  addScore();
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
	  context.fillStyle = "#333";
	  context.font = "28px sans-serif";
		context.fillText(Const.GAME_NAME, 52,  150);
		context.stroke();
	  context.fillStyle = "#000";
	  context.font = "12px sans-serif";
		context.fillText(Const.START_INSTRUCTION, 48,  180);
		context.stroke();
	}
	
	function addControls(argument) {
	  $(document).on("keydown", keyDownHandler)
	  $(document).on("keyup", keyUpHandler)
	}
	
	function keyUpHandler(evt) {
	  if(evt.which == 17)
	    speed = orignSpeed;
	    if(inZipMode) {
	      clearTimeout(runEnemyCarsTimeout);
	      runEnemyCarsTimeout = setTimeout(runEnemyCars, (750/speed) * 10);
	      inZipMode = false;
	    }
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
	        speed = orignSpeed + 10;
	        score++;
	        if(!inZipMode) {
	          console.log("palyer speeds up");
	          inZipMode = true;
	          clearTimeout(runEnemyCarsTimeout);
	          runEnemyCarsTimeout = setTimeout(runEnemyCars, (750/speed) * 10);
	        }
	      default:
	
	    }
	  }
	}
	
	function startGame(argument) {
	  render();
	}
	
	function addScore() {
	  console.log(score, speed);
	  score++;
	  context.fillStyle = "#FFF";
	  context.font = "10px sans-serif";
		context.fillText("Score : "+score, 165,  15);
		context.stroke();
	  if(score > speed * 100) {
	    speed += 1;
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map