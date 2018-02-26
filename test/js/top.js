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
$(function(){
	$('#SCT1').prepend('<div class="mask"></div>');
	$('#SCT1 .jp').scrollLeft($('#SCT1 .jp div').width());
	windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
	windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;
	$('#VISUAL').css({
		'height' : windowHeight
	});
	$(window).on("resize",function(){
		windowWidth = (!(window.innerWidth)) ? document.documentElement.clientWidth : window.innerWidth;
		windowHeight = (!(window.innerHeight)) ? document.documentElement.clientHeight : window.innerHeight;
		$('#VISUAL').css({
			'height' : windowHeight
		});
	});
	var _scroll = {
		delay: 1000,
		easing: 'linear',
		items: 1,
		duration: 0.07,
		timeoutDuration: 0,
		pauseOnHover: 'immediate'
	};
	$('#NEWS .ticker').carouFredSel({
		width: 670,
		align: false,
		items: {
			width: 'variable',
			visible: 1
		},
		scroll: _scroll
	});
	$('.caroufredsel_wrapper').css('width', '100%');
	hover($('#SCT5 .block'));
});