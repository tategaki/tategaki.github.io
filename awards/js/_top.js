var anchors = function(tag) {
	tag.click(function(){
		var space = 0;
		if($(this).closest('nav').length > 0) {
			var space = -150;
		}
		$('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top + space }, 'slow','swing');
		return false;
	});
}
var windowWidth,windowHeight;
$(function(){
	anchors($('a[href*=#]:not(".noAnchor")'));
	var obj = $('#header .logo').clone(true);
	for (var i=0; i<3; i++) {
		obj.insertAfter('#header .logo');
	}
	$('#SCT2 .title').clone(true).css('zIndex',0).insertAfter('#SCT2 h2');
	$('#SCT2 div.p2').clone(true).css('zIndex',0).insertAfter('#SCT2 p.p2');
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
	$(window).on("resize",function(){
		windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
		windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;

		$('#container').css({
			'height' : 'auto'
		});
		$('#pageTop').css({
			'height' : windowHeight
		});
	});
	$(window).on("load touchmove scroll resize",function(){
		var s = $(window).scrollTop();
		if(windowWidth > 767) {
			var posi = $('#SCT4').offset().top + 1022;
		} else {
			var posi = $('#SCT4').offset().top + 600;
		}
		var scrolled = s + windowHeight - posi;
		if(posi < s + windowHeight) {
			$('#SCT4 p').css('top', ( + (scrolled * 0.3)) + 'px');
			$('#SCT4 p').css('left', ( + (scrolled * 0.5)) + 'px');
		}
		var posi2 = $('#pageBody').offset().top;
		if(posi2 < s) {
			$('nav').addClass('fixed');
		} else {
			$('nav').removeClass('fixed');
		}
	});
});