window.onDomReady(function(){

	initSounds (0, false);
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var desks = $$ ('#desk div');
var tDrag = 460;


	desks.each (function (desk, iDesk) {
		desk.setStyles ({
			'background-position': (-600) * (iDesk + 1)
		});
	});

	drags.each(function(drag, i) {
		drag.setStyles ({
			'top': tDrag,
			'left': i*60 + 400,
			'background-position': -40 * i
		});

		drag.setOpacity (0.9);
		
		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.addEvents({
			'mousedown': function(el, obj) {
				this.setStyle ('z-index', 50);

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 30);
					}
				});
				drag.Ind = i;
			},

			'emptydrop'  : function(){
				fxDrag.start ({
					'top': tDrag,
					'left': i*60 + 400
				});
				soundManager.play ('sndError');
			},

			'mouseenter'  : function(){
				soundManager.play ('sndTic');
			}
		});
	});

	drops.each(function(drop, iDrop){

		drop.addEvents({
			'drop': function(drag, drp) {

				if (ans[drag.Ind] == iDrop) {
					soundManager.play('sndGood');
					drop.setStyle ('color', clrs[drag.Ind]);

					if (fnd[iDrop]) drop.setStyle ('background-color' , '#FFF');
					else drop.setStyle ('background-position' , '-720px -40px');
					
					desks[iDrop].setStyle ('display', 'block');

					drop.activo = false;
					drag.remove();
				}
				else {
					drag.fireEvent ('emptydrop');
					this.setStyles ({
						'color': '#46A',
						'border-color': '#00F'
					});
				}
		   	},

			'leave': function(drag, drp) {
				if (drop.activo != false) {
					drop.setStyles ({
						'color': '#46A',
						'border-color': '#00F'
					});
				}
		 	},

			'over': function(drag, drp) {
				if (drop.activo != false) {
					drop.setStyles ({
						'color': '#000',
						'border-color': '#000'
					});
				soundManager.play ('sndTic');
				}

		 	}
		});
	});


});
