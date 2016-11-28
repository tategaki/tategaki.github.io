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
var hover = function(tag) {
    tag.hover(
		function () {
			$(this).addClass('hover');
		},
		function () {
			$(this).removeClass('hover');
		}
	).click(function(){
		if($('a',this).length){
			if($('a',this).attr('target') === '_blank') {
				window.open($('a',this).attr('href'), '_blank');
			} else {
				location.href = $('a',this).attr('href');
			}
			return false;
		}
    });
}
var windowWidth,windowHeight;
$(function() {
	windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
	windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;
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
	anchors($('a[href*=#]:not(".noAnchor")'));
	hover($('.list .block'));
	$('#SCT3 dl').click(function(){
		if(!(ddLink)) {
			$(this).toggleClass('active');
			if ($(this).hasClass('active')) {
				$(this).find('dd').slideDown();
			} else {
					$(this).find('dd').slideUp();
			}
			return false;
		}
	});
	var ddLink;
    $('#SCT3 dl a').hover(
		function () {
			ddLink = true;
		},
		function () {
			ddLink = false;
		}
	);
	var menuShow;
	$(window).on('load',function(){
		if(windowWidth > 767) {
			menuShow = true;
		} else {
			menuShow = false;
		}
	});
	$(window).on('resize',function(){
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
	});
});