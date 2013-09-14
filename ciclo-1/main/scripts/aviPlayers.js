soundManager.url = '../main/scripts/soundmanager2.swf';
soundManager.debugMode = false;

function initSounds (numSnds, audioPlayer) {
		soundManager.onload =  function () {
			soundManager.defaultOptions = {
  				'autoLoad': true,		// enable automatic loading (otherwise .load() will be called on demand with .play()..)
  				'stream': true,			// allows playing before entire file has loaded (recommended)
  				'autoPlay': false,		// enable playing of file as soon as possible (much faster if "stream" is true)
    			'onid3': null,			// callback function for "ID3 data is added/available"
  				'onload': null,			// callback function for "load finished"
    			'whileloading': null,		// callback function for "download progress update" (X of Y bytes received)
    			'onplay':null,			// callback for "play" start
    			'whileplaying': null,		// callback during play (position update)
    			'onstop': null,			// callback for "user stop"
    			'onfinish': null,		// callback function for "sound finished playing"
   				'onbeforefinish': null,		// callback for "before sound finished playing (at [time])"
   				'onbeforefinishtime': 5000,	// offset (milliseconds) before end of sound to trigger beforefinish..
   				'onbeforefinishcomplete':null,	// function to call when said sound finishes playing
   				'onjustbeforefinish':null,	// callback for [n] msec before end of current sound
   				'onjustbeforefinishtime':200,	// [n] - if not using, set to 0 (or null handler) and event will not fire.
   				'multiShot': false,		// let sounds "restart" or layer on top of each other when played multiple times..
   				'pan': 0,			// "pan" settings, left-to-right, -100 to 100
   				'volume': 100			// self-explanatory. 0-100, the latter being the max.
			};

			soundManager.createSound ({
				id :'sndOk', 
				url: '../main/sounds/ok.mp3'
			});


			soundManager.createSound ({
				id :'sndError', 
				url: '../main/sounds/error1.mp3'
			});


			soundManager.createSound ({
				id :'sndTic', 
				url: '../main/sounds/tic1.mp3'
			});

			soundManager.createSound ({
				id :'sndPop', 
				url: '../main/sounds/pop1.mp3'
			});


			soundManager.createSound ({
				id :'sndGood', 
				url: '../main/sounds/truing1.mp3'
			});

			(numSnds).times (function (i) {
				soundManager.createSound ({
					id: 'snd' + i, 
					url: 'audio/snd'+ i +'.mp3'
				});
			})
			
			if (audioPlayer != false) {
				sonido = soundManager.createSound({
				
				  	'autoLoad': true,		// enable automatic loading (otherwise .load() will be called on demand with .play()..)
					'stream': true,			// allows playing before entire file has loaded (recommended)
					'autoPlay': false,		// enable playing of file as soon as possible (much faster if "stream" is true)
					'pan': 0,			// "pan" settings, left-to-right, -100 to 100
					'volume': 100,
				
				
					id :'aviPlayer', 
					url: audioPlayer,
					
					whileloading : whileLoading,
					whileplaying: whilePlaying,
					onload: function() {
						miSliderPlayerUp.slideOut();
						soundSize = soundManager.sounds.aviPlayer.duration;
						addPlayerSlider ();
						addButtons ('aviPlayer');
						dspTime.setText ('0s');
					}.delay (500),
					onfinish: function () {
						$('cover').remove();
						aviPlayerSlider.set(258);
					}
				});
			}
		}
		
		if (audioPlayer != false) {
			
			var htmlPlayer = '<div id="aviPlayerUpload"><div id="uploading">loading sound ...</div></div><div id="aviPlayer"><div id="dspTime"></div><div id="btnsPlayer"><div></div><div></div><div></div><div></div></div><div id="playing"><div id="knob"></div></div></div>';
			var divPlayer = new Element ('div', {id:'player'})
			divPlayer.injectInside ($('header'));
			$('player').innerHTML = htmlPlayer;
			

			var soundSize = '';
			var aviPlayerSlider;
	
		var miSliderPlayer = new Fx.Slide(
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
//						$('aviPlayerUpload').remove();
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
		};

		function whileLoading () {
			var porcentaje = (this.bytesLoaded / this.bytesTotal) * 100;
			var leftBGI = porcentaje*2.6 - 258;

			$('uploading').setText (porcentaje.toInt() + '%');
			$('uploading').setStyle ('background-position', leftBGI + 'px center');
		};

		function addPlayerSlider () {
			aviPlayerSlider = new Slider($('playing'), $('knob'), {
				steps: 258,
				onChange: function(step) {
					var moveSndTo = step * soundSize / 258;
					soundManager.setPosition ('aviPlayer', moveSndTo);
					posicion = moveSndTo;
				}
			}).set(0);
		};
	
		function addButtons (idSound) {
			var temporizador;
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
								temporizador = playState.periodical (1000);
							break;
						
							case 1:
								posicion = soundManager.sounds.aviPlayer.position;
								soundManager.stop(idSound);
							break;
						
							case 2:
							soundManager.stop(idSound);
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
				})
			})
		}

		var playState = function  () {
			dspTime.setHTML ((soundManager.sounds.aviPlayer.position/1000).toInt() + 's');
		};
		
	}
}
