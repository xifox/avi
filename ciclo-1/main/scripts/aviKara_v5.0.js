	var soundSize = '';
	var aviPlayerSlider;

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

window.addEvent ('load', function () {
	//console.log ('onLoad Primero ?');
});	

window.onDomReady (function () {

	var htmlPlayer = '<div id="aviPlayerUpload"><div id="uploading">loading sound ...</div></div><div id="aviPlayer"><div id="dspTime"></div><div id="btnsPlayer"><div></div><div></div><div></div><div></div></div><div id="playing"><div id="knob"></div></div></div>';
	var divPlayer = new Element ('div', {id:'player'});
	divPlayer.injectInside ($('header'));
	$('player').innerHTML = htmlPlayer;


	var dspTime = $('dspTime');

	soundManager.url = '../main/scripts/soundmanager2.swf';
	soundManager.debugMode = false;

	soundManager.onload =  function () {
		var sonido = soundManager.createSound({
			id :'miSonido', 
			url: sndFile,
			'autoLoad': true,		// enable automatic loading (otherwise .load() will be called on demand with .play()..)
			'autoPlay': false,		// enable playing of file as soon as possible (much faster if "stream" is true)
			'stream': true,			// allows playing before entire file has loaded (recommended)
			'onid3': null,			// callback function for "ID3 data is added/available"
			'multiShot': true,		// let sounds "restart" or layer on top of each other when played multiple times..
			'pan': 0,				// "pan" settings, left-to-right, -100 to 100
			'volume': 100,

			whileloading : whileLoading,
			whileplaying: whilePlaying,
			
			onload: function(coco) {
				//console.log (this);
				dspTime.setText ('0s');
				miSliderPlayerUp.slideOut();
				soundSize = soundManager.sounds.miSonido.duration;
				addPlayerSlider ();
				addButtons ('miSonido');
				indPal = 0;
			}.delay (1000),
			onfinish: function () {
				aviPlayerSlider.set(258);
//				$('cover').remove();
			}
		});
	};


	fxMovie = new Fx.Styles($('movie-inner'), {duration:500, wait:false});

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

	});

	timeIni = tiempos[0];

	var tiemposTemp = new Array (tiempos.length);

	for (i = 0; i <= tiempos.length; i++)
		if (tiempos[i] != undefined) tiemposTemp [tiempos[i]] = i;

	tiempos = tiemposTemp.copy();

	tiemposTemp = null;

	$('karaoke').setStyle ('display', 'none');

	printCancionHTML (timeIni);

	miSliderPlayer = new Fx.Slide(
		$('aviPlayer'), {
			'mode': 'vertical',
			'duration': 500
		}
	);

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
	
//	miSliderPlayerUp.slideOut();
	var moveKnob;

	whilePlaying = function () {
		var porcentaje = (soundManager.sounds.miSonido.position / soundManager.sounds.miSonido.duration)*100;
		moveKnob = porcentaje * 2.6;
		$('knob').setStyle ('left', moveKnob);
	};

	whileLoading  = function () {
		var porcentaje = (this.bytesLoaded / this.bytesTotal) * 100;
		var leftBGI = porcentaje*2.6 - 258;

		$('uploading').setText (porcentaje.toInt() + '%');
		$('uploading').setStyle ('background-position', leftBGI + 'px center');
	};


	addPlayerSlider = function (idSound) {
		aviPlayerSlider = new Slider($('playing'), $('knob'), {
			steps: 260,

			onChange: function(step) {
				var moveSndTo = step * soundSize / 260;
				soundManager.setPosition ('miSonido', moveSndTo);
			}
			
		}).set(0);
	};
	
	
	var temporizador;
	
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
								temporizador = playState.periodical (100);
							break;
						
							case 1:
								posicion = soundManager.sounds.miSonido.position;
								soundManager.stop(idSound);
							break;
						
							case 2:
							soundManager.stop('miSonido');
								temporizador = $clear (temporizador);
								aviPlayerSlider.set(0);
								posicion = 0;
								dspTime.setText ('0s');
							break;
						
							case 3:
								soundManager.getSoundById(idSound).setPosition(0);
								aviPlayerSlider.set(0);
								posicion = 0;
							break;
						}
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
			$('dspPal').setHTML (primerRenglon);
		};
	};
	
	var playState = function  () {
		dspTime.setText ((soundManager.sounds.miSonido.position/1000).toInt() + 's');
		printCancionHTML ((soundManager.sounds.miSonido.position/100).round());

	};
});