var anchors = function(tag) {
	tag.click(function(){
		var space = 0;
		if($(this).closest('nav').length > 0) {
			if(windowWidth > 767) {
				var space = -150;
			} else {
				var space = -75;
			}
		}
		$('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top + space }, 'slow','swing');
		return false;
	});
}
var windowWidth,windowHeight;
$(function(){
	$('.ticker').addClass('type'+Math.round(Math.random()*2));
	$('nav').prepend('<p class="btn"></p>');
	$('nav .menu').prepend('<p class="close"></p>');
	$('nav .btn').click(function(){
		$('nav .btn').fadeOut();
		$('nav .menu').fadeIn();
	});
	$('nav .close').click(function(){
		$('nav .menu').fadeOut();
		$('nav .btn').fadeIn();
	});
	$('nav .menu li a').click(function(){
		if(windowWidth <= 767) {
			$('nav .menu').fadeOut();
			$('nav .btn').fadeIn();
		}
	});
	anchors($('a[href*=#]:not(".noAnchor")'));
	var obj = $('#header .logo').clone(true);
	for (var i=0; i<3; i++) {
		obj.insertAfter('#header .logo');
	}
	$('#SCT2 .title').clone(true).css({zIndex:'2',opacity:'0.6'}).insertAfter('#SCT2 h2');
	$('#SCT2 div.p2').clone(true).css({zIndex:'2',opacity:'0.6'}).insertAfter('#SCT2 p.p2');
	$('#SCT3 .otherBotton a').click(function(){
		$('#SCT3 .other').slideDown();
		$('#SCT3 .otherBotton').hide();
		return false;
	});
	windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
	windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;
	$('#container').css({
		'height' : 'auto'
	});
	$('#pageTop').css({
		'height' : windowHeight
	});
	if(location.hash){
		var space = 0;
		if(windowWidth > 767) {
			var space = -150;
		} else {
			var space = -75;
		}
		$('html,body').animate({ scrollTop: $(location.hash).offset().top + space }, 'slow','swing');
		console.log(location.hash);
	
	}
	var menuShow;
	if(windowWidth > 767) {
		menuShow = true;
	} else {
		menuShow = false;
	}
	$(window).on("resize",function(){
		windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
		windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;
		if(windowWidth > 767) {
			if(!(menuShow)) {
				$('nav .menu').show();
				$('nav .btn').hide();
				menuShow = true;
			}
		} else {
			if(menuShow) {
				$('nav .menu').hide();
				$('nav .btn').show();
				menuShow = false;
			}
		}
		$('#container').css({
			'height' : 'auto'
		});
		if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') === -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			return false;
		} else {
			$('#pageTop').css({
				'height' : windowHeight
			});
		}
	});
	$(window).on("load touchmove scroll resize",function(){
		var s = $(window).scrollTop();
		if(windowWidth > 767) {
			var posi = $('#SCT4').offset().top + 1022;
			var scrolled = s + windowHeight - posi;
			if(posi < s + windowHeight) {
				$('#SCT4 .cnt div').css('top', (scrolled * 0.5) + 'px');
				$('#SCT4 .cnt div').css('left', (scrolled * 0.5) + 'px');
			}
		}
		var posi2 = $('#pageBody').offset().top;
		if(posi2 < s) {
			$('nav').addClass('fixed');
		} else {
			$('nav').removeClass('fixed');
		}
	});
	$('#SCT4 .view').scrollLeft($('#SCT4 .view .cnt').width());
	var _scroll = {
		delay: 1000,
		easing: 'linear',
		items: 1,
		duration: 0.07,
		timeoutDuration: 0,
		pauseOnHover: 'immediate'
	};
	$('#SCT1 .ticker').carouFredSel({
		width: 670,
		align: false,
		items: {
			width: 'variable',
			visible: 1
		},
		scroll: _scroll
	});
	$('.caroufredsel_wrapper').css('width', '100%');
});