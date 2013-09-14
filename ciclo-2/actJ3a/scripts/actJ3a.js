// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base ();

	var drags = $$('#returns div');
	var drops = $$('#operation div');
	var txtDrops = $$('#operation div span');

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actJ3a',
		textInDrop: false
	});

	miDxD.fncTrueDrop = function(drag, drop){
		if (solution[drop.Ind] == drag.Ind) return true;
		else return false;
	};

	miDxD.addEvent('trueDrop', function(drag, drop){
		txtDrops[drop.Ind].setText(drag.getText());
	});
	


	confINI = function () {
	
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);

			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (200*iD);
		});
	};
	
	confINI ();
	
}); // end onDomReady


