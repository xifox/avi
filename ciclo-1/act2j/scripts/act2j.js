window.onDomReady(function(){
	initSounds (6, false);
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var tDrag = 370;

	drags.each(function(drag, i) {
		drag.setStyles ({
			'left': confDrags[i][0],
			'top': confDrags[i][1],
			'width': confDrags[i][2],
			'height': confDrags[i][3],
			'background-position': (-150 * i) + 'px 0'
		});
		
		new Drag.Move (drag, {
			droppables: drops,
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
				soundManager.play ('sndTic');
			}

		});
	});

	drops.each(function(drop, iDrop){

		drop.setStyles ({
			'left': iDrop*160 + 20
		});

		drop.setOpacity (0.4);

		drop.addEvents({
			'drop': function(drag, drp) {

				if (ans[iDrop] == drag.Ind) {
					drag.remove();
					this.setStyle('background-position' , ((-150 * iDrop) -900) + 'px 0'); 
					soundManager.play('sndGood');
					drop.setOpacity (1);
					ans[iDrop] = -1;
					drop.setText('');
				}
				else {

					drag.fireEvent('emptydrop');
					drag.setOpacity(1);
					if (ans[iDrop] != -1) {
						drop.setStyle('background-position', '-1800px 0');
						drop.setOpacity(0.6);
					}
				}
		   	},

			'leave': function(drag, drp) {
				if (ans[iDrop] != -1) {
					drop.setOpacity (0.6);
					drag.setOpacity (1);
					drop.setStyle ('background-position', '-1800px 0');		
				}
		 	},

			'over': function(drag, drp) {
				if (ans[iDrop] != -1) {
					soundManager.play ('sndTic');
					drop.setOpacity (1);
					drag.setOpacity (0.6);
					drop.setStyle ('background-position', '-1950px 0');
				}
		 	}
		});
	});
});
