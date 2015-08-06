var BGMusic = {
	init: function(){
		$.ajax({
			url:'background.mp3',
			type:'get',
			success:function(){
				$("#music").attr('src','background.mp3');
				// $(".preload").hide();
				// $(".detail").show();						
			}
		});
	}
};


$(document).ready(function(){
	// BGMusic.init();
});