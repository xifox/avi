// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 1);

	// Drags y Drops
	var swords = $$('#swords div');
	var drops = $$('.frases');

	var imgs = $$('.bloques span');

	imgs.each (function (img, iM){
		img.setStyle ('background-position', (-125)*iM.toString () + 'px top');
	});

	// objeto actC2a tipo DxD.Text
	var actC2a = new DxD.Text (swords, drops, {
		container: $('content'),
		sendToBack: 'ini',
		cssClass: 'actC2a',
		multiDrop: 'infinity'
	});


	var ansArr = new Array (10);
	ansArr = {
		'surfing': 'sailing',
		'sailing': 'surfing',
		'swimming': 'cycling',
		'cycling': 'swimming'
	};

	var hiddensWord = $$('.frases span span');

	var txtDrag;
	var idReng = -1;
	actC2a.addEvent ('trueDrop', function (drag, drop){
		txtDrag = drag.getText ();

		if ($$('.frases p')[idReng] != undefined) {
			if ($$('.frases p')[idReng].getElements('span span')[laOtra] != undefined) {
				if ($$('.frases p')[idReng].getElements('span span')[laOtra].getProperty('ans').contains(txtDrag)) 
					$$('.frases p')[idReng].getElements('span span')[laOtra].setProperty('ans', ansArr[txtDrag]);
			};
		};
	});

	actC2a.addEvent ('textComplete', function (id){
		idReng = (id/3).toInt();
		idWord = (id%3);
		laOtra = idWord ? 0 : 1;
	});

	// function initAct() de actC2a
	var initAct2 = function () {
		actC2a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				left: [500, actC2a.options.adjDrags[iD].x],
				opacity: 1
			})}).delay (100*iD);
		});
	};

	// Llamamos inicio de Actividad
	initAct2();
});