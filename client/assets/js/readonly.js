$(document).ready( function() {
	$("#edit-button").click(function(){

		$("#dev-info-block input").prop('readonly', false);
		$("#config-block input").prop('readonly', false);
		$("#dev-info-block input").css('border', '2px ridge #b6b8ba');
		$("#config-block input").css('border', '2px ridge #b6b8ba');
		$("#picture-button").css('font-size', '14px');			
		$("#picture-button").css('display', 'block');
	})
});