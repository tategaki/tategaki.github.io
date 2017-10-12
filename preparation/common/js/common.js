var anchors = function(tag) {
	tag.click(function(){
		$('html,body').animate({ scrollTop: $($(this).attr("href")).offset().top }, 'slow','swing');
		return false;
	});
}
var menuModal = function() {
	$('nav').prepend('<p class="btn"><a class="menu-trigger" href="#"><span></span><span></span><span></span></a></p>');
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
		if(windowWidth < 767) {
			$('nav .menu').fadeOut();
			$('nav .btn a').removeClass('active');
		}
	});
}
var windowWidth,windowHeight;
$(function(){
	anchors($('a[href*="#"]:not(".noAnchor")'));
	windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
	windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;

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
				$('nav .btn a').removeClass('active');
				menuShow = false;
			}
		}
	});
	menuModal();
});