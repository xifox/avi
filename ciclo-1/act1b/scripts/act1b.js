window.onDomReady(function() {
	
initSounds (0, false);

	initIcon();

	var tapas = $$('#desk div div');

	var ordFch = 0;

	var pareja = new Array (12);
	
	tapas.each (function (tapa, iTapa) {
		
		tapa.setText (iTapa + 1);

		ficha = tapa.getParent();
		var dspFnd;

		if (fchs[iTapa] > (fchs.length/2) -1) {
			pareja [iTapa] = fchs[iTapa] - 6;
			dspFnd = (-150)*7;
		}

		else {
			pareja [iTapa] = fchs[iTapa];
			dspFnd = (-150)* fchs[iTapa];
		};

		var fichaTxt = new Element ('span');
		fichaTxt.setText (fchsTxt[fchs[iTapa]]);
		fichaTxt.injectTop (ficha);

		ficha.setStyles ({
			'background-position': dspFnd + 'px top'
			});

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
