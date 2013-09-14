var initAct;

window.onDomReady(function(){
	confMenu (1, 0, 0, 1, 0);
	
	var drags = $$('#letters div');
	var drops = $$('#toDrop');
 	var letras = $$('#letters div');
	var angulo = 2 * Math.PI / 26;

	$('desk').setOpacity(0.3);
	letras.each (function (letra, iL) {
		var alfa = angulo * iL;
		ajusteDrags[iL].y = (Math.sin (alfa) * (-250) + 250).toInt();
		ajusteDrags[iL].x = (Math.cos (alfa)* (-400) + 500).toInt();
	})	
 	var miKara = new aPlayer.speakers (letras, {
			adjSpeakers: ajusteDrags,
			sounds:  26
			});
	
	miDxD = new DxD.Base (letras, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		multiDrop: 'infinity',
		cssClass: 'drop',
		textInDrop: false
	});

	posicionaLetras (letras);
	
	
	miDxD.addEvent ('trueDrop', function (drag,drop) {
		drop.setText(drop.getText() + drag.getText() );
	});
});

initAct = function () {
	reLoad ();
	};

function posicionaLetras (letras){
	letras.each (function (letra, iL) {
		letra.setOpacity (0);
		(function () {letra.fxDrag.start({
			left: [500,ajusteDrags[iL].x],
			top: [250,ajusteDrags[iL].y],
			opacity: 1
		})}).delay (100*iL);
	});
};
