$(function(){
	function init(){
		$(".slideBox").slide({mainCell:".bd ul",autoPlay:true});
	}
	
	$('.main-section header').on('click','li',function(){
		var index=$(this).index();
		$(this).addClass('current').siblings().removeClass('current');
		var contents=$(this).parents('section').find('.content');

//		contents.find('current').slideUp();
//		contents.eq(index).slideDown();
contents.removeClass('current');
contents.eq(index).addClass('current');
});
	init();
})
