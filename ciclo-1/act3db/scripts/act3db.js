window.onDomReady(function(){
	initSounds (0, false);
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var tDrag = 340;

	drags.each(function(drag, i) {

		drag.setStyles ({
			'top': tDrag,
			'left': i*200 + 200,
			'background-position': ((-200 * ans[i]) - 600).toString() + 'px top'
		});

		drag.setOpacity (0.7);
		
		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.addEvents({
			'mousedown': function(el, obj) {
				this.setStyle ('z-index', 50);
				drag.Ind = i;
			},

			'emptydrop'  : function(){
				fxDrag.start ({
					'top': tDrag,
					'left': i*200 + 200
				});
				soundManager.play ('sndError');
			},

			'mouseenter'  : function(){
				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 30);
					}
				});

				drag.setOpacity (1);
				soundManager.play ('sndTic');
			},

			'mouseleave'  : function(){
				drag.setOpacity (0.7);
			}

		});
	});


	$$('#solu div').each (function (solu, iSolu) {
		solu.setStyles ({
			'left': iSolu*220 + 180,
			'background-position': ((-200 * iSolu)).toString() + 'px -200px'
		});
	});

	drops.each(function(drop, iDrop){

		drop.setStyles ({
			'top': 5,
			'left': iDrop*220 + 180
		});

		drop.setOpacity (0.2);

		drop.addEvents({
			'drop': function(drag, drp) {

				if (ans[drag.Ind] == iDrop) {
					drag.remove();

					this.setStyle('background-position' , (-200  * ans[drag.Ind]).toString() + 'px top');
					drop.state = false;

					soundManager.play('sndGood');
					drop.setOpacity (1);
				}
				else {
					drag.fireEvent ('emptydrop');
					this.fireEvent ('leave');
				};
		   	},

			'leave': function(drag, drp) {
				if (drop.state != false) {
					drop.setOpacity (0.2);
				};
		 	},

			'over': function(drag, drp) {
				if (drop.state != false) {
					drop.setOpacity (1);
					drag.setOpacity (0.5);
					soundManager.play ('sndTic');
				};
		 	}
		});
	});
});
