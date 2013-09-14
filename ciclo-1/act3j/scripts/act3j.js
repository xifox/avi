window.onDomReady(function(){
	
	initSounds (0, 'audio/audio.mp3');
	
	initIcon();

//	Variables Globales
var drags = $$('#drags div');
var drop = $('drop');
var drops = $$('#drop div');
var indDrop = 0;

	drags.each(function(drag, i) {

		drag.setStyles ({
			'left': confDrags[i][0],
			'top': confDrags[i][1],
			'background-position': (-150 * i) + 'px 0'
		});

		drag.setOpacity (0.5);
		
		new Drag.Move (drag, {
			droppables: drop,
			container: $('content')
		});

		drag.addEvents({
			'mousedown': function(el, obj) {
				this.setStyle ('z-index', 50);
				drag.Ind = i;

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 30);
					}
				});


			},

			'emptydrop'  : function(){
				fxDrag.start ({
					'left': confDrags[i][0],
					'top': confDrags[i][1]
				});
				soundManager.play ('sndError');
			},

			'mouseenter'  : function(){
				drag.setOpacity (1);
				soundManager.play ('sndTic');
			},

			'mouseleave'  : function(){
				drag.setOpacity (0.5);
			}

		});
	});

		drop.addEvents({
			'drop': function(drag, drp) {

				if (ans[drag.Ind]) {
					drag.remove();
					soundManager.play('sndGood');

					drops[indDrop].setStyle ('background-position', ((-150 * drag.Ind) -9) + 'px center');
					drops[indDrop].setOpacity (1);
					indDrop++;

				}
				else {
					drag.fireEvent ('emptydrop');
					drag.setOpacity (1);
				}
		   	},

			'over': function(drag, drp) {
				soundManager.play ('sndTic');
		 	}
		});
});
		
