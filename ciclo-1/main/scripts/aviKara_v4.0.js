	var soundSize = '';
	var aviPlayerSlider;
	var stdCuadro = 0;

	var cancionHTML = '';
	var renglones;
	var posIns = [];
	var timeIni;
//	var indPalAnt= -1;

//	var fxWord;

	var tagRenglon = 'p';
	var sepA = '<p>';
	var sepC = '</p>';

	var formA = '<span id="wordKara">';
	var formC = '</span>';

	var indRenglon = 0;

//	var fxMovie;

window.onDomReady (function () {

	var htmlPlayer = '<div id="aviPlayerUpload"><div id="uploading">loading sound ...</div></div><div id="aviPlayer"><div id="dspTime"></div><div id="btnsPlayer"><div></div><div></div><div></div><div></div></div><div id="playing"><div id="knob"></div></div></div>';
	var divPlayer = new Element ('div', {id:'player'});
	divPlayer.injectInside ($('header'));
	$('player').innerHTML = htmlPlayer;
			
//	fxMovie = new Fx.Styles($('movie-inner'), {duration:500, wait:false});

	renglones = $$ ('#karaoke ' + tagRenglon);
	var cancionTXT = '';
	var i = 0;
	var posIni = sepA.length;

	var rxe = new Array ();

	$$('#karaoke div').each (function (coco, idCoco) {
		coco.getElements (tagRenglon).each (function (coco2, idCoco2) {
			rxe [i] = idCoco;
			i++;
		});
	});
	i = 0;
			
	renglones.each (function (renglon, iRng) {

		cancionHTML = cancionHTML + sepA + renglon.getText() + sepC;
		cancionTXT = cancionTXT + renglon.getText() + ' ';

		var palabras = (renglon.getText()).split(' ');
	
			posIni = 0;
			palabras.each (function (palabra, iPal) {
				posIns [i] = [posIni, posIni + palabra.length, palabra, iRng, rxe[iRng]];
				posIni = posIni + palabra.length + 1;
				i++;
			});
			posIni = sepA.length;

			//posIni = posIni + sepA.length + sepC.length - 1;
	});

	timeIni = tiempos[0];
	var tiemposTemp = new Array (tiempos.length);

	for (i = 0; i <= tiempos.length; i++)
		if (tiempos[i] != undefined) tiemposTemp [tiempos[i]] = i;

	tiempos = tiemposTemp.copy();

	tiemposTemp = null;

	tiemposTemp = new Array (cuadros.length);
	for (i = 0; i <= cuadros.length; i++)
		if (cuadros[i] != undefined) tiemposTemp [cuadros[i]] = i;

	cuadros = tiemposTemp.copy();

	tiemposTemp = null;
	
	var j = 0;
	cuadros.each (function (el, i) {
		if (cuadros[i] != undefined) j = cuadros[i];
		cuadros[i]= j;
	});
		
	$('karaoke').setStyle ('display', 'none');
	
});

window.onload = function () {

	printCancionHTML (timeIni);

	var miSliderPlayer = new Fx.Slide(
		$('aviPlayer'), {
			'mode': 'vertical',
			'duration': 500
		});

	miSliderPlayer.hide();
	var miSliderPlayerUp = new Fx.Slide(
		$('aviPlayerUpload'), {
			'mode': 'vertical',
			'duration': 500,
				onComplete: function () {
//					$('aviPlayerUpload').remove();
					$('aviPlayer').setStyle('visibility', 'visible');
					$('aviPlayerUpload').setStyle('visibility', 'hidden');
					miSliderPlayer.slideIn();
				}
			}
		);

	var dspTime = $('dspTime');
	var posicion = 0;

	function whilePlaying() {
		var porcentaje = (this.position / this.duration)*100;
		var moveKnob = porcentaje * 2.6;
	
		$('knob').setStyle ('left', moveKnob);

		var decSegs = (this.position/1000).toInt();
		$('dspTime').setText (decSegs + 's');

		printCancionHTML ((this.position/100).toInt());
	};

	function whileLoading () {
		var porcentaje = (this.bytesLoaded / this.bytesTotal) * 100;
		var leftBGI = porcentaje*2.6 - 258;

		$('uploading').setText (porcentaje.toInt() + '%');
		$('uploading').setStyle ('background-position', leftBGI + 'px center');
	};
	
	function initSound(fileName) {
		soundManager.url = '../main/scripts/soundmanager2.swf';
		soundManager.debugMode = false;
		soundManager.onload =  function () {
			var sonido = soundManager.createSound({
				id :'miSonido', 
				url: fileName,
				autoPlay: false,
				autoLoad: true,
				whileloading : whileLoading,
				whileplaying: whilePlaying,
				onload: function() {
					miSliderPlayerUp.slideOut();
					soundSize = soundManager.sounds.miSonido.duration;
					addPlayerSlider ();
					addButtons ('miSonido');
//					indPal = 0;
				},
				onfinish: function () {
					$('cover').remove();
					aviPlayerSlider.set(258);
				}
			});
		};
	};
	
	function addPlayerSlider (idSound) {
		aviPlayerSlider = new Slider($('playing'), $('knob'), {
			steps: 260,
			onChange: function(step) {
					var moveSndTo = step * soundSize / 258;
					soundManager.setPosition ('miSonido', moveSndTo);
					posicion = moveSndTo;
			}
		}).set(0);
	};
	
		function addButtons (idSound) {
			//var temporizador;
			var btnsPlayer = $$('#btnsPlayer div');
		
			btnsPlayer.each (function (btn, iB) {
				btn.setStyle ('background-position', (-24)*iB.toString() + 'px top');
			
				btn.addEvents ({
					mouseenter: function () {
						btn.setStyle ('background-position', ((-24)*iB - 96).toString() + 'px top');
					},

					mouseleave: function () {
						btn.setStyle ('background-position', (-24)*iB.toString() + 'px top');
					},
				
					mousedown: function () {
						switch (iB) {
							case 0:
								soundManager.play(idSound);
								soundManager.getSoundById(idSound).setPosition(posicion);
								//temporizador = playState.periodical (1000);
							break;
						
							case 1:
								posicion = soundManager.sounds.miSonido.position;
								soundManager.stop(idSound);
							break;
						
							case 2:
							soundManager.stop('miSonido');
								//temporizador = $clear (temporizador);
								aviPlayerSlider.set(0);
								posicion = 0;
								dspTime.setText ('0s');
							break;
						
							case 3:
								soundManager.getSoundById(idSound).setPosition(0);
								aviPlayerSlider.set(0);
								posicion = 0;
							break;
						};
					}
				});
			});
		};

	function printCancionHTML (tiempo) {
			
			indicePal = tiempos[tiempo];
	
//		if ((indicePal != undefined) && (indPalAnt != indicePal)) {
		if (indicePal != undefined) {
//			indPalAnt = indicePal;

			var cadIni = (renglones[posIns[indicePal][3]].getText()).substring (0, posIns[indicePal][0]);
						
			var cadFin = (renglones[posIns[indicePal][3]].getText()).substring (posIns[indicePal][1], (renglones[posIns[indicePal][3]].getText()).length);	

			var primerRenglon = sepA + cadIni + formA + posIns[indicePal][2] + formC + cadFin + sepC;
			var segundoRenglon = sepA + renglones[posIns[indicePal][3] + 1].getText () + sepC;
			$('dspPal').setHTML (primerRenglon + segundoRenglon);
			
			};
			
			if ((cuadros[tiempo] != stdCuadro) && (cuadros[tiempo] != undefined)) {
				stdCuadro = cuadros[tiempo];

				$('movie-inner').setStyles ({
					'background-position': (-500)* (cuadros[tiempo])
				});
												
		};
			return primerRenglon;
	};

	initSound(sndFile);
};