window.onDomReady(function(){
	initSounds (0, false);
	initIcon();

var bloques = $$('#drags div');
var drops = $$('#drops div');
var tDrag = 420;
var i;

bloques.each (function (bloque, iBloque) {
	var letrasDrops = drops[iBloque].getElements('span');
	var drags = bloque.getElements('span');

	
	drags.each(function(drag, iDrag) {
		

		i = iDrag + iBloque * 3;

		drag.setStyles ({
			'left': confDrags[i][0],
			'top': confDrags[i][1]
		});

		new Drag.Move (drag, {
			droppables: letrasDrops,
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
					'left': confDrags[iDrag + iBloque * 3][0],
					'top': confDrags[iDrag + iBloque * 3][1]
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
	});

	letrasDrops.each(function(drop, iDrop) {

		drop.addEvents({
			'drop': function(drag, drp) {
				if (drag.getText() == drop.getText()) {
					soundManager.play('sndGood');
					drop.setStyles ({
						'border-width': 0,
						'color': '#2A2'
					});
					drag.remove();

				}
				else {
					drag.fireEvent ('emptydrop');
					(drop.getParent()).setStyle ('color', '#000');
					drag.setOpacity (1);
				};
		   	},

			'leave': function(drag, drp) {
					(drop.getParent()).setStyle ('color', '#000');
					drop.setStyle ('border-color', '#000');
					drag.setOpacity (1);
		 	},

			'over': function(drag, drp) {
					soundManager.play ('sndTic');
					drop.setStyle ('border-color', '#00F');
					drag.setOpacity (0.4);
		 	}
		});
	});
});

});
