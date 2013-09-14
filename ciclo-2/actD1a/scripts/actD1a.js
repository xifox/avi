var initAct = function () {
	reLoad ();
}


window.onDomReady(function(){
	confMenu (1, 0, 0, 1, 1);

	var images = $$('#images div');
	var sonidos = $$('#sounds div');
	
	images.each(function(image,iImg){
		image.setStyle('background-position', iImg * -150 );
	});
	
	var parlantes = new aPlayer.speakers (sonidos,	{
		sounds: 4,
		basicSounds: false
	});
});