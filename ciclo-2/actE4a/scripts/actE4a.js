// function initAct() de 
var initAct = function () {
	reLoad ();
};
function checkAct() {
	$$('#toDrop div').each(function (drop,iDrop) {
		drop.setText(solution[iDrop]);
		$$('#staticText div')[iDrop].setText ('');
		$$('#staticText div')[iDrop].setStyle ('color', '#0A0')
	})
}
window.onDomReady (function () {
	confMenu (1, 1, 0, 1, 0);

	var miSounds = new aPlayer.Base();
	
	
	var images = $$('#images div');
	var drags = $$('#wordsDrag div');
	var drops = $$('#toDrop div');

	var staticTexts = $$('#staticText div');
	
	images.each(function(image, iImg){
		image.setStyle('background-position', -110 * iImg);
	});

	staticTexts.each(function(statTxt, indTxt){
		statTxt.setStyles({
			'left': ajusteStaticText[indTxt].x,
			'top': ajusteStaticText[indTxt].y
		});
	});

	miDxD = new DxD.Base(drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		adjDrops: ajusteDrops,
		multiDrop: 'infinity',
		textInDrop: false,
		cssClass: 'actE4a'
	});

		miDxD.fncTrueDrop = function (drag, drop){
			var txt_drop = (drop.getText()).clean();
			var txt_drag = drag.getText();
			var texto_aux = (txt_drop +' ' +txt_drag).clean();
			if (texto_aux == solution[drop.Ind].substring(0, texto_aux.length)) 
				return true;
				 else return false;
		
	};
	
	miDxD.addEvent ('trueDrop', function (drag, drop) {
		drop.setText(drop.getText() + drag.getText() + ' ');
	});
	
	// function initAct() de miDxD
	var initAct2 = function () {
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();

});