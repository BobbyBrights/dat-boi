function main() {
	/**
	 * The amount to blur the canvas 
	 */
	const MAX_BLUR_RADIUS = 180;
	
	/**
	 * The delay so the it's easier to observe the initial fade in
	 */
	const INITIAL_DELAY = 1000;
	
	var blurRadius = 7;	
	
	var component = $('.ProgressiveMedia');
	var image     = $('.ProgressiveMedia__image');
	var canvas    = $('.ProgressiveMedia__canvas');
	var thumbnail = $('.ProgressiveMedia__thumbnail');

	var context = canvas.getContext('2d');
	
	/**
	 * The aspect-ratio-fill padding is set here. 
	 */
	var aspectRatioFill = document.querySelector('.aspect-ratio-fill');
	var percentage = (thumbnail.naturalHeight / thumbnail.naturalWidth) * 100;
	aspectRatioFill.style.paddingBottom = `${percentage}%`;

	/**
	 * Draw the thumbnail onto the canvas, then blur it
	 */
	drawThumbnail(blurRadius);
	
	/**
	 * Load the image in. Once it's loaded, add a class to the 
	 * component wrapper that fades in the image and fades out 
	 * the canvas element.
	 */
	image.src = image.dataset.src;
	image.addEventListener('load', function onImageLoaded() {
		image.removeEventListener('load', onImageLoaded);
		
		// This delay is only set so the we can see the blur effect more clearly on page load  
		setTimeout(function () {
			component.classList.add('isImageLoaded');
		}, INITIAL_DELAY);		
	});
	
	/**
	 * Draws the thumbnail into the canvas and blurs it
	 */
	function drawThumbnail(blur) {
			context
			.drawImage(thumbnail, 0, 0, thumbnail.naturalWidth,
								thumbnail.naturalHeight, 0, 0, canvas.width, canvas.height);
		StackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, blur);
	}
}