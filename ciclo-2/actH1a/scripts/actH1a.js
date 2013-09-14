// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	
	confMenu (1, 0 , 0, 1, 0);
	
	var drags = $$('#months div');
	var drops = $$('#toDrop div');
	var images = $$('#images div');

	

	images.each(function(image, index){
		image.setStyle('background-position', -115 * index);
	});

	var sonidos = new aPlayer.Base();
	
	var ajusteDrags = new Array (12);
	ajusteDrags = [
		{x: 60, y: 390},
		{x: 120, y: 440},
		{x: 100, y: 490},
		{x: 260, y: 390},
		{x: 340, y: 440},
		{x: 310, y: 490},
		{x: 480, y: 390},
		{x: 540, y: 440},
		{x: 530, y: 490},
		{x: 700, y: 390},
		{x: 750, y: 440},
		{x: 740, y: 490}
	];
	
	ajusteDrags.randomize ();

	drops.addClass('caja180x50x0x40');
	drags.addClass('caja180x30x0x190');
	solution = [0, 4, 6, 3, 11, 7, 10, 2, 5, 8, 9, 1];
	miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: true,
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		ans: solution
	});

	miDxD.fncTrueDrop = function(drag, drop){
		if (solution[drop.Ind] == drag.Ind) return true;
		else false;
	};

	miDxD.addEvent('trueDrop', function (drag, drop) {
		drop.setText(drag.getText());
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