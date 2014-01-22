

$(document).ready(function(){
	window.readerIndex = 0;	
	var sectionArray = window.story.sections,
		sectionLength = window.story.sections.length;



//Set up the Header

	var getTitleTemplate = function() {
		var titleElement = $("<h1></h1>");
		titleElement.addClass("title");
		titleElement.text(window.story.title);
		return titleElement;
	};

	var getAuthorTemplate = function() {
		var authorElement = $("<h4></h4>");
		authorElement.addClass("author");
		authorElement.text('by ' + window.story.author);
		return authorElement
	};

	var getMainTemplate = function() {
		var mainElement = $("<h5></h5>");
		mainElement.addClass("anthology");
		mainElement.text('in ' + window.story.main);
		return mainElement
	};

	var setHeader = function () {
		$('div#title-container').append(getTitleTemplate())
			.append(getAuthorTemplate())
			.append(getMainTemplate());
	}();

//Set up the Navigation Images

	var getNavTemplate = function () {
		var imageNav = $("<div></div>");
		imageNav.addClass("image-nav");

		var getNavImage = function (i) {
			var sectionImage = sectionArray[i].image,
				imageTag = $("<img src='" + sectionImage + "'>");
			imageNav.append(imageTag);

			if (imageTag.index() != window.readerIndex) {
				imageTag.hide();
			} else {
				imageTag.addClass('current');
			}
		};

		for (var i = 0; i < sectionLength; i++) {
			getNavImage(i);
		};

		return imageNav;

	};

	var setNav = function () {
		$('div#nav-container').append(getNavTemplate());
	}();

//Set up the Navigation buttons
	
	var getNavList = function () {
		var listNav = $("<div></div>");
		listNav.addClass("list-nav");
		var inlineNav = $("<ul></ul>");
		inlineNav.addClass("inline-nav");
		listNav.append(inlineNav);

		var getPrevNav = function () {
			var prevButton = $("<li><a id='previous' href='#'>Previous</a></li>");
			inlineNav.append(prevButton);
		};

		var getNextNav = function () {
			var nextButton = $("<li><a id='next' href='#'>Next</a></li>");
			inlineNav.append(nextButton);
		};

		var getNavElem = function () {
			for (var i = 0; i < sectionLength; i++) {
				var sectionButton = $("<li></li>");
				var buttonText = sectionArray[i].nav;
				var buttonAnchor = $("<a href='#'></a>");
				buttonAnchor.addClass("nav-button");
				buttonAnchor.append(buttonText);
				sectionButton.append(buttonAnchor);
				inlineNav.append(sectionButton);
				if (i === window.readerIndex) {
					buttonAnchor.addClass('active');
				};
			}
		};

		getPrevNav();
		getNavElem();
		getNextNav();
		return listNav;
	};

	var setNavButtons = function () {
		$('div#nav-container').append(getNavList());
	}();

//Set up Content

	var getContent = function () {
		var textBox = $("<div></div>");
		textBox.addClass('content-box');
		for (var i = 0; i < sectionLength; i++) {
			var sectionBox = $("<div></div>");
			sectionBox.addClass('section-box');
			sectionBox.attr('id', "" + i + "")

			var fancyHeader = $("<div></div>");
			fancyHeader.addClass('fancy-header');

			var sectionIcon = sectionArray[i].icon;
			var fancyImage = $("<img src='" + sectionIcon + "'>");

			var bodyText = $("<div></div>");
			bodyText.addClass('body-text');

			var sectionContent = (sectionArray[i].text);
			bodyText.load(sectionContent);
			
			fancyHeader.append(fancyImage);
			sectionBox.append(fancyHeader);
			sectionBox.append(bodyText);
			textBox.append(sectionBox);
		}
		return textBox;
	};

	var setContent = function() {
		$('div#content').append(getContent());
	}();

//Change window.readerIndex for Navigation
	var setReaderIndex = function(i) {
		window.readerIndex = i;
	}

//Navigation animation

	var setToImage = function () {
		var img = $("div.image-nav img"),
			toImage = $(img.get(window.readerIndex));
		img.hide();
		toImage.show();
		img.removeClass('current');
		toImage.addClass('current');
	};

	var scrollToContent = function() {
		var sectionDiv = $("div.section-box#" + window.readerIndex + "");
		if (window.readerIndex === 0) {
			window.scrollTo(0);
		} else {
			window.scrollTo(0, sectionDiv.offset().top - 285);
		}
	};

	var makeButtonActive = function() {
		var navButtons = $(".nav-button"),
			navElement = $(navButtons.get(window.readerIndex));
		navButtons.removeClass('active');
		navElement.addClass('active');
	};

	var setActiveOnScroll = function() {
		setToImage();
		makeButtonActive();
	};

	var goToSection = function() {
		setToImage();
		scrollToContent();
		makeButtonActive();
	};


// Set Image index

	var getNextSlide = function (event) {
		if (window.readerIndex != sectionLength - 1) {
			setReaderIndex(window.readerIndex + 1);
			goToSection();
		}
		event.preventDefault();
	};

	var getPrevSlide = function (event) {
		if (window.readerIndex != 0) {
			setReaderIndex(window.readerIndex - 1);
			goToSection();
		}
		event.preventDefault();
	};

	var getAnySlide = function (event) {
		var buttonText = $(this).text();
			for (var i = 0; i < sectionLength; i++ ) {
				if (sectionArray[i].nav === buttonText) {
					setReaderIndex(i);
				}
			}
		goToSection();
		event.preventDefault();
	};

//Change image depending on window position
	var beginScroll = function() { 
		var getSectionOffsetValues = function() { // arrays the pixel position of each section in the DOM
			var result = [];
			for (var i = 0; i < sectionLength; i++) {
				var sectionDiv = $("div.section-box#" + i + ""),
					offsetValue = sectionDiv.offset().top;
				result.push(offsetValue);
			};
			return result;
		};
	
		var getNextIndex = function(windowPosition) { //determines the next section a reader will come to
			var nextIndex = -1,
				sectionRelativePosition;
			for (var i = 1; i < sectionLength; i++)  {
				sectionRelativePosition = sectionPositionArray[i] - windowPosition;
				if (sectionRelativePosition >= 0) {
					nextIndex = i;
					break;
				}
			}
			if (nextIndex === -1) {
				nextIndex = sectionLength;
			}
			setReaderIndex(nextIndex - 1);
		};

		var sectionPositionArray = getSectionOffsetValues();

		var setActiveImage = function() { //determines the current section
			var navSpace = 380; 
			var windowPosition = $(window).scrollTop() + navSpace;
			
			getNextIndex(windowPosition);
			setActiveOnScroll();
		};

		setInterval(setActiveImage, 100);
	};

// Fix Nav at Window Top

	var fixedNav = function(event) {
		var navBox = $("div#nav-container");
		var headerArea = 364; //space above nav area that will not be fixed position
		if ($(window).scrollTop() >= headerArea) {
			navBox.addClass('fixed-navigation');
			$("div#content").addClass('below-nav');
		} else {
			navBox.removeClass('fixed-navigation');
			$("div#content").removeClass('below-nav');
		}
	};
	
// Bind functions 
	$(window).scroll(fixedNav);
	setTimeout(beginScroll, 5000);
	$("#next").click(getNextSlide);
	$("#previous").click(getPrevSlide);
	$("a.nav-button").click(getAnySlide);


	$(document).keyup(function(event) {
		if (event.which === 39) {getNextSlide(event);
		}
		else if (event.which === 37) {getPrevSlide(event);
		}	
	});

	setInterval()

});