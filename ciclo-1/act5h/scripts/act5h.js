window.onDomReady(function() {

	initSounds (0, false);
	initIcon();

	var drags = $$('#drags div');
	var drops = $$('#drops div');

	var nameClass = drags.getParent().getProperty ('class')[0];
	confClassDrag =  ((nameClass.substring(5,nameClass.length)).split('x'));

	confClassDrag.each (function (el, iEl) {
		confClassDrag[iEl] = el.toInt();
	});

	nameClass = drops.getParent().getProperty ('class')[0];
	confClassDrop =  ((nameClass.substring(5,nameClass.length)).split('x'));

	confClassDrop.each (function (el, iEl) {
		confClassDrop[iEl] = el.toInt();
	});

	drags.each (function (drag, iDrag) {
		if (ans[iDrag] !=0) drag.state = true;
		new Drag.Move (drag, {
			droppables: drops,
			container: $('content')
		});

		drag.setStyles ({
			'left': xyDrags [iDrag][0],
			'top': xyDrags [iDrag][1]
		});

		drag.addEvents({
			'mouseenter': function () { 
				this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 2  )+ 'px ' + -1 * confClassDrag[3] + 'px');
				soundManager.play('sndTic');
			},

			'mouseleave': function () {
				this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 1  )+ 'px ' + -1 * confClassDrag[3] + 'px');
			},
			'mousedown': function(el, obj) {

				this.setStyles ({
					'z-index': 40
				});

				drag.id = iDrag;

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 30);
					}
				});
			},
			'emptydrop': function(a, b, c) {
				fxDrag.start({
					'left': xyDrags[iDrag][0],
					'top': xyDrags[iDrag][1]
				});
			}
		});
	});

	drops.each(function(drop, iDrop){

		drop.setStyles ({
			'left': xyDrops[iDrop][0],
			'top': xyDrops[iDrop][1]
		});
	
		drop.addEvents({
			'drop': function(drag, drp) {
				if ((ans[iDrop] != -1) && (drag.state)) {
					drag.state  = false;
					ans[iDrop] = -1;
					soundManager.play('sndOk');
					this.setHTML (drag.innerHTML);
					this.setStyle ('border-color','#dd8');
					drag.remove();
					
				}
				else {
					soundManager.play('sndError');
					drop.fireEvent('leave');
					drag.fireEvent ('emptydrop');
				};
			},
			
			'over': function(drag) {
				if(ans[iDrop] !=-1) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 1  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				};
			},
			
			'leave': function (drag) {
				if(ans[iDrop] !=-1) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 0  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				};
			}
		});
	});
});
