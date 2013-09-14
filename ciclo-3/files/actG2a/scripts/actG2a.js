// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);

	initIcon();

	var tapas = $$('#desk div div');
	var ordFch = 0;
	var pareja = new Array (12);

	tapas.each (function (tapa, iTapa) {

		// Ficha
		ficha = tapa.getParent();

		// Imrpimimos numero de ficha
		tapa.setText(iTapa + 1);

		var dspFnd;

		// Recorremos ficha a ficha. Generamos parejas.

		if (fchs[iTapa] > (fchs.length/2) -1) {
			pareja [iTapa] = fchs[iTapa] - 6;
			tapa.getParent ().setStyle ('background-position', (-150)*(fchs[iTapa] - 6).toString() + 'px top');
		}
		else {
			pareja [iTapa] = fchs[iTapa];
		};

		var fichaTxt = new Element ('span');
		fichaTxt.setText (fchsTxt[fchs[iTapa]]);
		fichaTxt.injectTop (ficha);

		tapa.addEvents ({
			'mousedown': function (e) {

				ordFch++;

				if (ordFch == 1) {
					fxTapaUno = new Fx.Slide(tapa);

					idTapaUno = iTapa;
					fxTapaUno.slideOut();
				};

				if (ordFch == 2) {
					contentBlock (1);

					if (pareja[idTapaUno] == pareja [iTapa]) {

					soundManager.play ('sndGood');

						var fxTapaDos = new Fx.Slide(tapa);
						fxTapaDos.slideOut().chain (function () {
							tapas[idTapaUno].remove ();
							tapas[iTapa].remove ();

							contentBlock (0);
						});
					}
					else {
						soundManager.play ('sndError');
						var fxTapaDos = new Fx.Slide(tapa);
						
						fxTapaDos.slideOut().chain (function () {
							fxTapaUno.slideIn().chain (function () {
								fxTapaDos.slideIn().chain (function () {
							
								(tapas[idTapaUno].getParent()).replaceWith (tapas[idTapaUno]);
								(tapas[iTapa].getParent()).replaceWith (tapas[iTapa]);
								
								contentBlock (0);
						});
						});
						});
					};

					ordFch = 0;
				};
			},

			'mouseenter': function () {soundManager.play ('sndTic');}
		});
	});

});