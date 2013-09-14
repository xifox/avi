// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);

	var numIni = -1;
	var nuevoNum = -1;
	var dado = $('dado');
	var mapa = $('desk2');
	var puedo = true;
	var conta = 0;

	// Funcion que imprime un numero aleatorio en el dado
	tiraDado = function () {
		puedo = false;
		var nuevoNum = $random (0, 5);
		dado.setStyle ('background-position', (-150)*nuevoNum.toString() + 'px top');
		mapa.setStyles ({
			'background-position': (-650) * (nuevoNum + 1).toString() + 'px top',
			opacity: 0.5
		});
		conta++;
		soundManager.play ('sndTic');
		if (conta > 15) {
			mapa.setOpacity(1);

			soundManager.play ('sndOk');
			dado.setOpacity (1);
			idT = $clear(idT);
			puedo = true;
		};
		return nuevoNum;
	};

	var idT;

	dado.addEvents ({
		'mousedown': function () {
			if (puedo) {
				conta = 0;
				dado.setOpacity(0.7);
				idT = setInterval("tiraDado ()", 200);
			};
		}
	});
});