$(function() {

	var exits = ['fadeOut', 'fadeOutDown', 'fadeOutUpBig', 'bounceOut', 'bounceOutDown', 'hinge',
				'bounceOutUp', 'bounceOutLeft', 'rotateOut', 'rotateOutUpLeft', 'lightSpeedOut', 'rollOut'];

	var entrances = ['fadeIn', 'fadeInDown', 'fadeInRight', 'bounceIn', 'bounceInRight', 'rotateIn',
					 'rotateInDownLeft', 'lightSpeedIn', 'rollIn', 'bounceInDown' ]; 
	
	var photos = $('#photos'),
		ignoreClicks = false;

	$('.arrow').click(function(e, simulated){
		if(ignoreClicks){
			
			// If clicks on the arrows should be ignored,
			// stop the event from triggering the rest 
			// of the handlers
			
			e.stopImmediatePropagation();
			return false;
		}
		
		// Otherwise allo this click to proceed,
		// but raise the ignoreClicks flag
		
		ignoreClicks = true;
		
		if(!simulated){
			// Once the user clicks on the arrows,
			// stop the automatic slideshow
			clearInterval(slideshow);
		}
	});

	// Listen for clicks on the next arrow
	$('.arrow.next').click(function(e){
		
		e.preventDefault();
		
		// The topmost element
		var elem = $('#photos li:last');
		
		// Apply a random exit animation
		elem.addClass('animated')
			.addClass( exits[Math.floor(exits.length*Math.random())] );
		
		setTimeout(function(){
			
			// Reset the classes
			elem.attr('class','').prependTo(photos);
			
			// The animation is complate!
			// Allow clicks again:
			ignoreClicks = false;
			
		},1000);
	});

	// Listen for clicks on the previous arrow
	$('.arrow.previous').click(function(e){
		
		e.preventDefault();
		
		// The bottom-most element
		var elem = $('#photos li:first');
		
		// Move the photo to the top, and 
		// apply a random entrance animation
		
		elem.appendTo(photos)
			.addClass('animated')
			.addClass( entrances[Math.floor(entrances.length*Math.random())] );
		
		setTimeout(function(){
			
			// Remove the classess
			elem.attr('class','');
			
			// The animation is complate!
			// Allow clicks again:
			ignoreClicks = false;
			
		},1000);
	});


	// Start an automatic slideshow
	var slideshow = setInterval(function(){
		
		// Simulate a click every 1.5 seconds
		$('.arrow.next').trigger('click',[true]);
		
	}, 1500);
	
});
