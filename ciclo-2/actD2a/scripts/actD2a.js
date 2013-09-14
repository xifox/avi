// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	var images = $$('#images div');
	confMenu (0, 0, 0, 1, 1);
	
	var repro = new aPlayer.rePro ({
		audioPlayerName: 'pet1.mp3',
		basicSounds: false
	})

	images.each(function(image, index){
		image.setStyle('background-position', -300 * index);
	})
	
}); // end onDomReady
