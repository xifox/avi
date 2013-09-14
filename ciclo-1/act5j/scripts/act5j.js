window.onDomReady(function(){
	initSounds (0, false);
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var txtDrops = $$('#txtDrops div');

	drags.each(function(drag, iDrag) {
	drag.setStyles ({
			'top': confDrags[iDrag][0] ,
			'left': confDrags[iDrag][1],
			'background-position': iDrag * -150
		});

		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});
		drag.addEvents({
			'mousedown': function(el, obj) {
				this.setStyle ('z-index', 40);
				drag.Ind = iDrag;
				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut, 
					duration: 600,
					onComplete: function () {	
					}
				});
			},
			'mouseenter'  : function() {
				soundManager.play ('sndTic');
			},
			'emptydrop': function () {
				fxDrag.start({
					'top': confDrags[iDrag][0] ,
					'left': confDrags[iDrag][1]
				});

				drag.setStyle('z-index', 30);
				soundManager.play ('sndError');
			}
		});
	});

	txtDrops.each(function (txtDrop, i) {
		txtDrop.setStyle('left', 340 * i + 250);
	});

	drops.each(function (drop, iDrop) {
		drop.setStyles({
			'top': confDrops[iDrop][0],
			'left':confDrops[iDrop][1]
		});

		drop.stack = 0;
		drop.addEvents({
			'drop': function(drag, drp) {
						if (iDrop == confDrags[drag.Ind][2]) {
							
							soundManager.play ('sndOk');
							if (iDrop==2) {
								drag.ant.stack -= 1;
							}
							confDrags[drag.Ind][0] = confDrops[iDrop][0];
							confDrags[drag.Ind][1] = confDrops[iDrop][1] + drop.stack * 10; 
							drop.stack +=1; 
							confDrags[drag.Ind][2] = 2;
							drag.ant= drop;
						} else {
						soundManager.play ('sndError');
						}
						fxDrag.start({
							'top': confDrags[drag.Ind][0] ,
							'left': confDrags[drag.Ind][1]});
						this.fireEvent('leave');
						drag.setStyle('z-index', 30 + drop.stack);
							
		   	},
			'over': function(drag, obj) {
					drop.setStyle('background-position',drag.Ind * -150);
			},
			'leave': function(el, obj) {
					drop.setStyle('background-position',-900);
			}
		});
	
	});
});
