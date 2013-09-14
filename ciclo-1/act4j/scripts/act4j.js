window.onDomReady(function(){
	initSounds (6, false);
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var sounds = $$('#sounds div');
var tDrag = 420;

	sounds.each(function(snd,iSnd){
		snd.addEvent('click',function(){
			soundManager.play('snd'+iSnd);
		});
	});
	
	drags.each(function(drag, i) {

		drag.setStyles ({
			'left': (i*100) + 240,
			'top': tDrag
		});
		
		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.addEvents({
			'mousedown': function(el, obj) {
				this.setStyles ({
					'z-index': 50,
					'background-position': '-80px 0px'
				});
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
					'left': (i*100) + 240,
					'top': tDrag
				});
				soundManager.play ('sndError');
			},

			'mouseenter'  : function() {
				this.setStyle('background-position' , '-40px 0px'); 
				soundManager.play ('sndTic');
			},

			'mouseleave'  : function() {
				this.setStyle('background-position' , '0px 0px'); 
			}
		});
	});  // drags each

	drops.each(function(drop, iDrop){

		drop.setStyles ({
			'left': confDrops[iDrop][0],
			'top': confDrops[iDrop][1]
		});

		drop.dsp = true;
		
		drop.setOpacity (0.6);

		drop.addEvents({
			'drop': function(drag, drp) {

				if (ans[iDrop] == drag.Ind) {
					drag.remove();
					this.setStyles ({
						'background-position': '-120px 0px',
						'color': 'white'
					}); 
					soundManager.play('sndGood');
					drop.setOpacity (1);

					drop.dsp = false;
				}
				else {
					drag.fireEvent ('emptydrop');
					drag.setOpacity (1);
					if (drop.dsp) {
						drop.setOpacity (0.6);
						drop.setStyle ('background-position', '0px 0px');
						drop.setText('');
					}
					
				};
		   	},

			'leave': function(drag, drp) {
				if (drop.dsp) {
					drop.setOpacity (0.4);
					drag.setOpacity (1);
					drop.setStyle ('background-position', '-40px 0px');
					drop.setText('');
				};
		 	},

			'over': function(drag, drp) {
				if (drop.dsp) {
					soundManager.play ('sndTic');
					drop.setOpacity (1);
					drag.setOpacity (0.4);
					drop.setStyle ('background-position', '-80px 0px');
					drop.setText (drag.getText());
				};
		 	}
		});
	});
});
