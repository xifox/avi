// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

var sonidos = new aPlayer.Base ();

	confMenu (1, 0, 0, 1, 0);


	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#frase');

	// objeto actC5a-base tipo DxD.Base
	var actC5a_base = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		textInDrop: false,
		cssClass: 'words',
		multiDrop: 'infinity'
	});	

	actC5a_base.addEvent ('trueDrop', function (drag, drop) {
		letterDrop.each (function (lD, iD){
			lD.setDisplay (false);
		});
		letterDrop[drag.Ind].setDisplay (true);
	});


	// Drags y Drops
	var letterDrags = $$('#letterDrags div', $('most'));
	var letterDrop = $$('#frase p');

	// objeto actC5a tipo DxD.Text
	var actC5a = new DxD.Base (letterDrags, letterDrop, {
		container: $('content'),
		sendToBack: 'ini',
		cssClass: 'letter',
		textInDrop: false,
		multiDrop: 'infinity'
	});
	
	actC5a.fncTrueDrop = function (drag, drop) {
		wordDrop = drop.getElement ('.txt-hidden').getText().substr (0, drag.getText().length);
		if (drag.getText() == wordDrop) {
			drop.getElement ('.txt-normal').setText (drop.getElement ('.txt-normal').getText() + wordDrop);
			drop.getElement ('.txt-hidden').setText (drop.getElement ('.txt-hidden').getText().substring (wordDrop.length, drop.getElement ('.txt-hidden').getText().length))
			if (!drop.getElement ('.txt-hidden').getText().length) return true;
			return false;
		}
	};
	
	// function initAct() de actC5a
	var initAct2 = function () {
		actC5a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);

			if (iD != 16) {
				(function(){
					drag.fxDrag.start({
						top: [0, drag.Pos.y],
						opacity: 1
					});
				}).delay(80 * iD);
			};
		});
		
		actC5a.drags[16].fxDrag.start ({
			left: [0, 200],
			top: [0, 300],
			opacity: 1
		});
		actC5a.options.adjDrags[16].x = 200;
		actC5a.options.adjDrags[16].y = 300;
	};
	
	// Llamamos inicio de Actividad
	initAct2();
});