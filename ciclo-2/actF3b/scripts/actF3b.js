// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	confMenu (1, 0 , 1, 1, 0);

	var miRepro = new aPlayer.rePro ({
		audioPlayerName: 'sndF3b.mp3',
		basicSounds: false
	});

	var images = $$('#images div');
	var frases = $$('#phrases div');
	images.each(function (img,iImg){
		img.setStyle('background-position', iImg * -150);
	});
	frases.each(function(frase,iFrase){
		frase.setStyles({
			'left': ajusteFrases[iFrase].x,
			'top': ajusteFrases[iFrase].y
		});
	});
});