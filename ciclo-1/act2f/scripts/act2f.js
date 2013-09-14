window.onDomReady(function(){
	initSounds (0, false);
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var dropsFnd = $$('#dropsFnd div');

	drags.each(function(drag,iDrag) {
		drag.setStyles ({
			'left': xyDrags [iDrag] [0],
			'top': xyDrags [iDrag][1]
		});
		new Drag.Move (drag, {
			container: $('content'),
			droppables : drops
		});

		drag.addEvents({
			'mousedown': function(el, obj) {
				drag.Ind = iDrag;
				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
					drag.setStyle ('z-index', 300);
					}
				});
			},
			'mouseenter': function (drg,drp){
				soundManager.play('sndTic');
				this.setStyle('background-position', '-360px -190px');
			},
			'mouseleave': function (drg,drp){
				this.setStyle('background-position', '-180px -190px');
			},
			'emptydrop': function(){
				fxDrag.start({
					'left': xyDrags [iDrag] [0],
					'top': xyDrags [iDrag][1]
				});
			}
		});
	});
	drops.each(function(drop,iDrop){
		drop.setStyles({
			'left': xyDrops[iDrop][0],
			'top': xyDrops[iDrop][1]
		});


		dropsFnd[iDrop].setStyles({
			'left': xyDrops[iDrop][0] + 2,
			'top': xyDrops[iDrop][1] + 2
		});


		drop.addEvents({
			'drop':function(drag,drp){
				if(ans[iDrop]==drag.Ind) {
					soundManager.play('sndOk');
					this.setText(drag.getText());
					dropsFnd[iDrop].setText(drag.getText());
					drag.remove();
				} else {
					soundManager.play('sndError');
					drag.fireEvent('emptydrop');
				}
			},
			'over': function(){

			}
		});
	});

});
