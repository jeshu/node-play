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
	  START_INSTRUCTION : "Press Spacebar to start !!!"
	}
	var bgColor = "#DBDFCD";
	var canvas, context, speed = 5, gameState = 0, score = 0, highScore = 0;
	
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
	  render(true);
	 // setTimeout(addInitText, 200);
	}
	
	function createBlocks(isDark, x, y) {
	  var color = isDark ? "#5C604E" : "#CDD2B9";
	  
	  context.fillStyle = color;
	  context.fillRect(x, y, 10, 10);
	
	  context.fillStyle = bgColor;
	  context.fillRect(x+1, y+1, 8, 8);
	
	  context.fillStyle = color;
	  context.fillRect(x+3, y+3, 4, 4);
	}
	
	function render(static) {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  var row = canvas.height/10;
	  var col = canvas.width/10;
	  for (var i = 0; i < row; i++) {
	    for (var j = 0; j < col; j++) {
	      createBlocks(false, j*10, i*10);
	    };
	  };
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
	        console.log("palyer move right");
	        break;
	      case 37:
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map