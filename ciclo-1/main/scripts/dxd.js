function dxd (drags, drops, xyDrags, xyDrops) {

	if (drags == undefined) var drags = $$('#drags div');
	if (drops == undefined) var drops = $$('#drops div');

	if (xyDrops != undefined) (drops.getParent()).setStyle ('position', 'absolute');

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

	drags.each(function(drag,iDrag) {
		drag.setStyles({
			'left': confDrags[iDrag][0],
			'top': confDrags[iDrag][1]
		});
		new Drag.Move (drag, {
			droppables:drops,
			container: $('content')
		});
		drag.addEvents({
			'mouseenter': function () { 
				this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 2  )+ 'px ' + -1 * confClassDrag[3] + 'px');
				soundManager.play('sndTic');
			},

			'mouseleave': function () {
				this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 1  )+ 'px ' + -1 * confClassDrag[3] + 'px');
			},

			'mouseup': function () {
				if (drag.allowedBlock) {
				contentBlock(1);
				drag.allowedBlock = false;
				}
			},

			'mousedown': function() {

				drag.setOpacity(0.3);
				drag.allowedBlock = true;
				drag.Ind = iDrag;
				this.setStyles({
					'z-index': 40,
					'background-position': (-confClassDrag[2] - confClassDrag[0] * 3  )+ 'px ' + -1 * confClassDrag[3] + 'px' 
				});
				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					duration: 500,
					onComplete: function () {
						contentBlock(0);
						drag.setStyle ('z-index', 30);
						drag.setOpacity(1);
					}
				});
			},
			'emptydrop': function () {
				fxDrag.start({
					'left': confDrags[iDrag][0],
					'top': confDrags[iDrag][1]
				});
			}			
		});
	});

	drops.each(function(drop, iDrop){

	if (xyDrops != undefined) {
		drop.setStyles({
			'position': 'absolute',
			'left': xyDrops[iDrop][0],
			'top': xyDrops[iDrop][1]
		});
	}

		drop.addEvents({
			'drop':function(drag, grp) {
				drop.Ind = iDrop;
				if(ans[iDrop]== drag.Ind) {
					contentBlock(0);
					startDrop(drag, drop);
					soundManager.play('sndOk');
				} else {
					soundManager.play('sndError');
					this.fireEvent('leave', drag);
					drag.fireEvent('emptydrop');
				}
			},
			'over': function(drag) {
				if(ans[iDrop] !=-1) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 1  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				}
			},
			'leave': function (drag) {
				if(ans[iDrop] !=-1) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 0  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				}
			}
		});
	});
}
