var anchors = function(tag) {
	tag.click(function(){
		$('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top }, 'slow','swing');
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
var menuShow = function() {
	$('#VISUAL,#SCT1').prepend('<div class="movie"><span></span></div>');
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
	});
	$('nav .menu li a').click(function(){
		$('nav .menu').fadeOut();
		$('nav .btn a').removeClass('active');
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
		$('html,body').animate({ scrollTop: $(location.hash).offset().top }, 'slow','swing');
	}
	anchors($('a[href*="#"]:not(".noAnchor")'));
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
	menuShow();
});
var windowWidth,windowHeight;
