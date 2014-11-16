'use strict';

KU_WEATHER.blocks.Backround = function (settings) {

	var block = document.querySelector('.b-background'),
		blockID = block.id,
		blured = settings.blured || false,
		tag = block.tagName,
		canvasContext = (tag === 'CANVAS') ? block.getContext("2d") : null,
		canvasBackground = null,
		pictureURL = settings.pictureURL;
		
	this.init = function () {
		this.update(this.getPictureUrl());
	};

	this.update = function (url) {
		switch (tag) {
			case 'CANVAS' : this.updateCanvas(url); break;
			default       : this.updateDefault(url); break;
		}
	};

	this.updateDefault = function (url) {
	};

	this.updateCanvas = function (url) {
		var _this = this,
			isNewPicture = this.setPictureUrl(url);

		if (isNewPicture || canvasBackground === null) {
			canvasBackground = new Image();
			canvasBackground.crossOrigin = 'anonymous',
			canvasBackground.src = this.getPictureUrl();
			canvasBackground.onload = function(event) {
				_this.drawImage();
			};
		} else this.drawImage();
		
	};

	this.getPictureUrl = function () { return pictureURL; };
	
	this.setPictureUrl = function (value) {
		if (value === pictureURL) return false;
		pictureURL = value; 
		return true;
	};

  	this.drawImage = function () {
  		canvasContext.drawImage(canvasBackground, 0, 0, block.width, block.height);
  		if (blured) boxBlurCanvasRGBA( blockID, 0, 0, block.width, block.height, 10, 2);
  	};

  	this.init();
};