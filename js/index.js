$(function(){ 
	$('.more_list li').click(mock);
	$('.recommend_list li').click(mock);
	function mock(){
		window.location.href = '../survey/desc.html'
	}
}); 

