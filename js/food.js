document.addEventListener("DOMContentLoaded", function(event) { 

    var controller = new ScrollMagic.Controller();
  
    var horizontalSlide = new TimelineMax()
    // animate panels
    .to("#js-slideContainer", 1,   {x: "-20%"}) 
    .to("#js-slideContainer", 1,   {x: "-40%"})
    .to("#js-slideContainer", 1,   {x: "-60%"})
    .to("#js-slideContainer", 1,   {x: "-80%"})
  
  
    // create scene to pin and link animation
    new ScrollMagic.Scene({
      triggerElement: "#js-wrapper",
      triggerHook: "onLeave",
      duration: "800%"
    })
      .setPin("#js-wrapper")
      .setTween(horizontalSlide)
      .addTo(controller);
});



// Food Carousel

// Food Carousel

// (function( $ ){

// 	// Count canvases
// 	var slideCount = $( '.canvas' ).length,
// 	paginationDot = '<div class="dot"></div>';

// 	for ( var i = 1; i <= slideCount; i++ ) {
// 		$( '.pagination-dot-container' ).append( paginationDot );
// 	}

// 	// Add selected class to first dot
// 	$( '.dot' ).first().addClass( 'selected' );

// 	// Build Carousel
// 	var dot = 0,
// 	length = $( '.dot' ).length - 1,
// 	winWidth = $( window ).width(),
// 	messageBoxWidth = $( '.message-box' ).width(),

// 	slideFunction = function() {
// 		var currentDot = $( '.dot' ).eq( dot ),
// 		currentSlide = $( '.canvas' ).eq( dot ),
// 		currentCard = $( '.card' ).eq( dot );

// 		currentDot.addClass( 'selected' );
// 		currentCard.addClass( 'activeCard' );
// 		$( '.dot' ).not( currentDot ).removeClass( 'selected' );
// 		$( '.card' ).not( currentCard ).removeClass( 'activeCard' ).removeClass( 'prevCard' );
// 		$( '.activeCard' ).prev().addClass( 'prevCard' );

// 		$( '.canvas-container' ).animate({ 'left': - dot * winWidth }, 500);
//     console.log(dot);
//     console.log(winWidth);
// 		$( '.card-container' ).css( 'left', - dot * messageBoxWidth );
// 	}

// 	$( '.pagination-forward-container' ).on( 'click', function() {
// 		dot = dot < length ? dot += 1 : 0;
// 		slideFunction();
// 	});

// 	$( '.dot' ).on( 'click', function() {
// 		dot = $( this ).index( '.dot' );
// 		slideFunction();
// 		$( '.card' ).not( currentCard ).removeClass( 'activeCard' ).removeClass( 'prevCard' );
// 		$( '.activeCard' ).prev().addClass( 'prevCard' );
// 	});

// 	var carouselSetup = function() {
// 		winWidth = $( window ).width();
// 		var canvasCount = $( '.canvas' ).length,
// 		cardCount = $( '.card' ).length;

// 		$( '.canvas' ).css( 'width', 'calc(100%/' + canvasCount + ' )' );
// 		$( '.canvas-container' ).css( 'width', winWidth * canvasCount );
// 		$( '.card-container' ).css( 'width', messageBoxWidth * cardCount );
// 	}

// 	$( window ).on( 'load resize', function() {
// 		carouselSetup();
// 	});

// })(jQuery);


// function getWidth(el) {
//   const styles = window.getComputedStyle(el);
//   const width = el.offsetWidth;
//   const borderTopWidth = parseFloat(styles.borderTopWidth);
//   const borderBottomWidth = parseFloat(styles.borderBottomWidth);
//   const paddingTop = parseFloat(styles.paddingTop);
//   const paddingBottom = parseFloat(styles.paddingBottom);
//   return width - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
// }

// const slideCount = document.getElementsByClassName('canvas').length;


// for (let i = 1; i <= slideCount; i++) {
// 	let paginationDot = document.createElement("div");
// 	paginationDot.classList.add("dot");
// 	document.querySelector('.pagination-dot-container').appendChild(paginationDot);
// }
// document.querySelector('.dot').classList.add('selected');


// // Build Carousel
// let dot = 0;
// let length = slideCount - 1;
// let winWidth = window.document.documentElement.width;
// let messageBoxWidth = getWidth(document.querySelector('.message-box'));

// slideFunction = function() {
// 	var currentDot = document.getElementsByClassName('dot')[dot];
// 	console.log(currentDot)
// 	let currentSlide = document.getElementsByClassName('canvas')[dot];
// 	let currentCard = document.getElementsByClassName('card')[dot];

// 	currentDot.classList.add( 'selected' );
// 	currentCard.classList.add( 'activeCard' );

// 	const listOfDots = document.getElementsByClassName('dot');
// 	for (let i = 0; i < listOfDots.length; i++ ) {
// 		if (listOfDots[i].classList.length === 2 && i !== dot) {
// 			// remove all other classes in elements that are not the current selected one
// 			listOfDots[i].classList.remove('selected');
// 		}
// 	}

// 	const listOfCards = document.getElementsByClassName('card');
// 	for (let i = 0; i < listOfCards.length; i++ ) {
// 		if (listOfCards[i].classList.length === 2 && i !== dot) {
// 			// remove all other classes in elements that are not the current selected one
// 			listOfCards[i].classList.remove('activeCard');
// 			listOfCards[i].classList.remove('prevCard');
// 		}
// 	}



// 	document.querySelector('.activeCard').previousElementSibling.classList.add('prevCard');
    
  
