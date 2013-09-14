window.onDomReady(function(){

	initSounds (0, false);
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var txtDrops = $$('#txtDrops div');

	txtDrops.each(function(txtDrop,i){
		txtDrop.setStyles({
			'left':xyTxtDrops[i][0],
			'top':xyTxtDrops[i][1]
		});
	});
	drags.each(function(drag,iDrag) {
		drag.setStyles({
			'left':xyDrags[iDrag][0],
			'top':xyDrags[iDrag][1],
			'background-position':-180*iDrag
		});
		drag.Ind = iDrag;

		new Drag.Move (drag, {
			container: $('content'),
			droppables: drops
		});

		drag.addEvents({
			'mousedown': function(el, obj) {
				this.setStyle('z-index',40);
				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle('z-index',30);
					}
				});
			},

			'mouseenter': function(el, obj){
				soundManager.play('sndTic');
				drag.setStyle ('z-index', 500);
			},

			'emptydrop': function(el, obj){
				fxDrag.start({
					'left': xyDrags[iDrag][0],
					'top': xyDrags[iDrag][1]
				});
				drag.setStyle ('z-index', 100);
			}
		});
	});

	drops.each(function(drop,iDrop){
		drop.setStyles({
			'left': xyDrops[iDrop][0],
			'top': xyDrops[iDrop][1]
		});
		drop.addEvents({
			'drop': function(drag,drp){
				if  (ans[iDrop] == drag.Ind){
					soundManager.play('sndOk');
					this.setStyle('background-position',-180 * iDrop);
					drag.remove();
					txtDrops[iDrop].remove();
					$$('#rareFont').setStyle('background-position', -400 * iDrop);
				} else {
					soundManager.play('sndError');
					drag.fireEvent('emptydrop');
				}
			},
			'over': function(drg,drp){},
			'leaver':function(drg,drp){}
		});
	});
});
