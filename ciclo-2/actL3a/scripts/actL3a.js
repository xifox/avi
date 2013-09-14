// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base ();

	var drags = $$('#wordsDrag div');
	var drops = $$('#toDrops div');
	var imags = $$('#images div');

	imags.each( function(img, iImg) {
		img.setStyle('background-position', -100 * iImg);
	});

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		multiDrop: 'infinity',
		adjDrags: ajusteDrags,
		textInDrop: false,
		cssClass: 'actL3a'
	});

	miDxD.fncTrueDrop = function(drag, drop) {
		txtDrop = drop.getText() + drag.getText();
		txtAns = solution[drop.Ind].substr(0,txtDrop.length);
		if ( txtDrop == txtAns) return true
		else return false;
	};

	miDxD.addEvent('trueDrop', function(drag, drop){
		txtDrag = drag.getText();
		if ((txtDrag != "What") && (txtDrag != "He") && (txtDrag != "She")) drop.setText(drop.getText() + drag.getText()+ ' ' );
		else drop.setText(drop.getText() + drag.getText());
		txtDrop = (drop.getText()).trim();
		if (txtDrop.length == solution[drop.Ind].length) {
			if ((drop.Ind % 2) == 0) 
				drop.setText(drop.getText().trim() + '?');
			else 
				drop.setText(drop.getText().trim() + '.');
		};
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

}); // end onDomReady

