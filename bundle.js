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

	Const = {
	  contextType: '2d'
	}
	
	  var canvas, context, secNeedle, hourNeedle, minNeedle,centerX, centerY, radius = 100;
	
	  var init = function (canvasId) {
	    canvas = document.getElementById(canvasId)
	    context = canvas.getContext(Const.contextType)
	    drawBase()
	    drawNeedle()
	    update()
	  }
	
	  var update = function () {
	    window.setTimeout(function () {
	      radius = (canvas.width / 2) - 20;
	      centerX = canvas.width / 2
	      centerY = canvas.height / 2
	      context.clearRect(0, 0, canvas.width, canvas.height)
	      drawBase()
	      drawNeedle()
	      update()
	    }, 1000)
	  }
	
	  var drawCounts = function () {
	    for (var i = 0; i < 60; i++) {
	      context.beginPath()
	      var angle = (i * 6 * (Math.PI / 180))
	      var len = (i % 5 == 0) ? ((i % 15 == 0) ? canvas.width/2-30 : canvas.width/2 - 35) : canvas.width/2-25
	      var x1 = centerX + len * Math.sin(angle)
	      var x2 = centerX + (canvas.width/2-20) * Math.sin(angle)
	      var y1 = centerX + len * Math.cos(angle)
	      var y2 = centerX + (canvas.width/2 -20) * Math.cos(angle)
	      context.moveTo(x1, y1)
	      context.lineTo(x2, y2)
	      context.lineWidth = 3
	      context.strokeStyle = '#666'
	      context.stroke()
	    }
	  }
	
	  var drawBase = function () {
	    context.beginPath()
	    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
	    context.fillStyle = '#000'
	    context.fill()
	    context.lineWidth = 5
	    context.strokeStyle = '#666'
	    context.stroke()
	
	  }
	
	  var drawNeedle = function () {
	    var time = new Date()
	    context.lineWidth = 3
	    drawLines(getHourAngle(time), '#CCC', canvas.width/2 - 85)
	    drawLines(getMinuteAngle(time), '#999', canvas.width/2 - 55)
	    drawLines(getSecondsAngle(time), '#666', canvas.width/2 - 35)
	    drawCounts()
	    context.beginPath()
	    context.arc(centerX, centerY, 5, 0, 2 * Math.PI, false)
	    context.fillStyle = '#999'
	    context.fill()
	    context.stroke()
	
	  }
	
	  drawLines = function (angel, color, length) {
	    context.beginPath()
	    context.strokeStyle = color
	    context.moveTo(centerX, centerY)
	    var x = centerX - length * Math.sin(angel)
	    var y = centerY - length * Math.cos(angel)
	    context.lineTo(x, y)
	    context.stroke()
	  }
	
	  var getSecondsAngle = function (time) {
	    var sec = time.getSeconds() * -6
	    var angel = sec * Math.PI / 180
	    return angel
	  }
	  var getMinuteAngle = function (time) {
	    var minute = time.getMinutes() * -6
	    var angel = minute * Math.PI / 180
	    return angel
	  }
	
	  var getHourAngle = function (time) {
	    var hour = time.getHours() * -30
	    var angel = (hour * Math.PI / 180) + getMinuteAngle(time) / 12
	    return angel
	  }
	
	  var api = {
	    init: init
	  };
	  module.exports = api;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map