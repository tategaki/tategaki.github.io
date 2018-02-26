var anchors = function(tag) {
	tag.click(function(){
		$('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top }, 'slow','swing');
		return false;
	});
}
var movieShow = true;
var movieShow2 = true;
var scrollEvent = function() {
	var setElm = $('.init');
	$(window).on('load scroll resize orientationchange',function(){
		var scrTop = $(window).scrollTop();
		var winHeight = $(window).height();
		setElm.each(function(){
			if(!($(this).hasClass('activeView2'))){
				var setThis = $(this),
				elmTop = setThis.offset().top;
				if (scrTop > elmTop - winHeight){
					setThis.addClass('activeView2');
					setThis.addClass('activeView');
					setThis.delay(500).queue(function() {
						$(this).removeClass('init').dequeue();
					});
					setThis.delay(2000).queue(function() {
						$(this).removeClass('activeView').dequeue();
					});
				}
			}
		});
		var elmTop2 = $('#VISUAL .lead').offset().top;
		if (scrTop > elmTop2 - winHeight){
			if(movieShow) {
				$('#VISUAL .movie').addClass('motion1');
				$('#VISUAL .movie').delay(2000).queue(function() {
					$(this).removeClass('motion1').addClass('motion2').dequeue();
					$('#VISUAL .lead').addClass('buruburu');
					$('#VISUAL .view .ori').clone().addClass('AAA').removeClass('ori').appendTo('#VISUAL .view');
				});
				$('#VISUAL .movie').delay(1200).queue(function() {
					$(this).removeClass('motion2').addClass('motion3').dequeue();
				});
				$('#VISUAL .view .ori').delay(4000).queue(function() {
					$(this).addClass('hurueru3').dequeue();
				});
				movieShow = false;
			}
		}
		/*var elmTop3 = $('#SCT1 .cont').offset().top;
		if (scrTop > elmTop3 - winHeight){
			if(movieShow2) {
			console.log('aaa');
				$('#SCT1 .movie').addClass('motion1');
				$('#SCT1 .movie').delay(2000).queue(function() {
					$(this).removeClass('motion1').addClass('motion2').dequeue();
					$('#SCT1 h2').addClass('buruburu');
				});
				$('#SCT1 .movie').delay(1200).queue(function() {
					$(this).removeClass('motion2').addClass('motion3').dequeue();
				});
				movieShow2 = false;
			}
		}*/
	});
}
var menuShow = function() {
	$('#VISUAL #LED').prepend('<div class="mask"></div>');
	//$('#VISUAL,#SCT1').prepend('<div class="movie"><div><span class="s1"></span><span class="s2"></span></div></div>');
	$('#VISUAL').prepend('<div class="movie"><div><span class="s1"></span><span class="s2"></span></div></div>');
	$('nav').prepend('<p class="btn"><a class="menu-trigger" href="#"><span></span><span></span><i>MENU</i></a></p>');
	$('nav .btn a').click(function(){
		$(this).toggleClass('active');
		if ($(this).hasClass('active')){
			$('i',this).html('CLOSE');
			$('nav .menu').fadeIn();
		} else {
			$('i',this).html('MENU');
			$('nav .menu').fadeOut();
		}
		return false;
	});
	$('nav .menu li a').click(function(){
		$('nav .menu').fadeOut();
		$('nav .btn a').removeClass('active');
		$('nav .btn i').html('MENU');
	});
}
var windowWidth,windowHeight;
$(function(){
	windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
	windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;
	$(window).on("resize",function(){
		windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
		windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;
	});
	if(location.hash){
		console.log('aaa');
		$('html,body').animate({ scrollTop: 0 });
		$('html,body').animate({ scrollTop: $(location.hash).offset().top }, 'slow','swing');
	}
	var titShow;
	var posi = $('#VISUAL .logo').offset().top;
	if(posi < $(window).scrollTop()) {
		titShow = false;
	} else {
		titShow = true;
	}
	$(window).on("load touchmove scroll resize",function(){
		var s = $(window).scrollTop();
		var posi = $('#VISUAL .logo').offset().top;
		if(posi < s) {
			if(!(titShow)) {
				$('#header').addClass('opacity');
				titShow = true;
			}
		} else {
			if(titShow) {
				$('#header').removeClass('opacity');
				titShow = false;
			}
		}
	});
	$('#SCT0 .otherBotton a').click(function(){
		$('#SCT0 .other').slideDown();
		$('#SCT0 .otherBotton').hide();
		return false;
	});
	$('#VISUAL .lead').scrollLeft($('#VISUAL .lead div').width());
	$('#SCT4 .view').scrollLeft($('#SCT4 .view .cnt').width());
	var _scroll = {
		delay: 1000,
		easing: 'linear',
		items: 1,
		duration: 0.07,
		timeoutDuration: 0,
		pauseOnHover: 'immediate'
	};
	$('#NEWS .ticker').carouFredSel({
		height: 445,
		direction: 'up',
		align: false,
		items: {
			height: 'variable',
			visible: 1
		},
		scroll: _scroll
	});
	anchors($('a[href*="#"]:not(".noAnchor")'));
	menuShow();
	scrollEvent();
});