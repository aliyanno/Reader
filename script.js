$(document).ready(function(){

	$(window).scroll(function(){ 
		if ($(window).scrollTop() >= 323) 
			{$("#navigation").css({
				'position': 'fixed', 
				'top': '-200px'
			}),
			$(".text-box").css('margin-top', '473px')
			} 
		else {$("#navigation").css({
				'position': 'inherit',
			})
			$(".text-box").css('margin-top', '0px')
			}
	});

//Attempt at consolidating JS below

/*	var setNewSlide = function(){
		var $fromSlide = $("div.current");
		var $imageParent = $fromSlide.parent();
		var index = $fromSlide.index() + 1;
		var $toSlide;
		var $clicked = $(this);
		
			if ($clicked.attr("id") == "previous")
				{var $toSlide = $imageParent.find("#div.image-box:nth-child(" + index - 1 + ")")
				}
			else if ($clicked.attr("id") == "next")
				{var $toSlide = $imageParent.find("#div.image-box:nth-child(" + index + 1 + ")")
				}
			else if ($clicked.hasClass(".nav-button"))
				{var $liParent = $(this).parent();
				var $buttonIndex = $liParent.index() + 1;
				var $toSlide = $imageParent.find("#div.image-box:nth-child(" + $buttonIndex + ")")
				}

		var toIndex = $clicked.index() + 1;
		$fromSlide.css('z-index', '1').removeClass('current');
		$(this).css('z-index', '2').addClass('current');

		var $textParent = $(document).find("div.text-box");
		var $textSection = $textParent.find("div.section:nth-child(" + toIndex + ")");
		window.scrollTo(0, $textSection.offset().top - 300);
	};

$(this).setNewSlide; */
	
var navNextSlide = function(){
		var $currentSlide = $("div.current");
		var $parent = $currentSlide.parent();
		var $nextSlide;
		if ($parent.find("div:last-child").hasClass('current')) {
			$nextSlide = $parent.find("div:first-child");
			}
		else {
			$currentSlide
			$nextSlide = $currentSlide.next();
		}

	
		$currentSlide.css('z-index', '1').removeClass('current'),
		$nextSlide.css('z-index', '2').addClass('current');
		var $textParent = $(document).find("div.text-box");
		var $textSection = $textParent.find("div.section:nth-child(" + index + ")");
		window.scrollTo(0, $textSection.offset().top - 300);
		return false;
	};
	
	var navPreviousSlide = function(){
		var $currentSlide = $("div.current");
		var $parent = $currentSlide.parent();
		var $previousSlide;
		if ($parent.find("div:first-child").hasClass('current')) {
			$previousSlide = $parent.find("div:last-child");
		}
		else {
			$previousSlide = $currentSlide.prev();
		}
	
		$currentSlide.css('z-index', '1').removeClass('current'),
		$previousSlide.css('z-index', '2').addClass('current');
		var $textParent = $(document).find("div.text-box");
		var $textSection = $textParent.find("div.section:nth-child(" + index + ")");
		window.scrollTo(0, $textSection.offset().top - 300);
		return false;
	};

	var gotoSlide = function (){
		var $liParent = $(this).parent();
		var index = $liParent.index() + 1;
		var $imageParent = $(document).find("div.image-nav");
		var $matchSlide = $imageParent.find("div:nth-child(" + index + ")"); 
		$imageParent.find("div.current").css('z-index', '1').removeClass('current'),
		$matchSlide.css('z-index', '2').addClass('current');

		var $textParent = $(document).find("div.text-box");
		var $textSection = $textParent.find("div.section:nth-child(" + index + ")");
		window.scrollTo(0, $textSection.offset().top - 300);

		return false
	};

	$("#next").click(navNextSlide)
	$("#previous").click(navPreviousSlide)
	$("a.nav-button").click(gotoSlide)


	
	$(document).keyup(function(e) {
		if (e.which === 39) {navNextSlide();
		}
		else if (e.which === 37) {navPreviousSlide();
		}	
	});
	
});

