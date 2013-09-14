// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);
	
	var drags = $$('#drags div');
	var drops = $$('#blocks div');

	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actC3a',
		deleteDrag:'none',
		textInDrop: false,
		multiDrop: 'infinity'
	});



	miDxD.fncTrueDrop = function(drag, drop){
		if (drag.getProperty("type")==drop.Ind ) return true;
		else return false;
	};
	
	miDxD.addEvent ('trueDrop', function (drag, drop) {
		var text ="";
		var aux = drag.getText();
		
		switch (drag.getProperty("type")) {
			
			case '0': text = drag.getText() + 'er';
				break;
			case '1':	text = aux + aux.charAt( aux.length -1) + 'er';
				break;
			case '2': text = drag.getText() + 'r';
				break;
			case '3': text = 'more ' + drag.getText();
				break;
		};
		
		drop.setHTML (drop.innerHTML + '<span>' + text +'</span>');
		drag.setStyle ('display', 'none');
			
	});
	
	confINI ();
}); // end onDomReady

confINI = function () {
	miDxD.drags.each (function (drag, iD){
		drag.setStyle ('display', 'block');
		drag.setOpacity (0);
		
	
		(function () {drag.fxDrag.start ({
			top: [0, ajusteDrags[iD].y],
			opacity: 1
		})}).delay (150*iD);
	});
};
