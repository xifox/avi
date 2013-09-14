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


	drag.Ind = iDrag;

		drag.setStyles({
			width: confClassDrag[0],
			height: confClassDrag[1],
			left: confDrags[iDrag][0],
			top: confDrags[iDrag][1],
			'background-position': (-1)*confClassDrag[0]*iDrag
		});

		new Drag.Move (drag, {
			droppables:drops,
			container: $('content')
		});
		drag.addEvents({
			'mouseenter': function () { 
				soundManager.play('sndTic');
			},

			'mouseup': function () {
				if (drag.allowedBlock) {
				contentBlock(1);
				drag.allowedBlock = false;
				}
			},

			'mousedown': function() {

				drag.allowedBlock = true;

				this.setOpacity (0.3);

				this.setStyles({
					'z-index': 40
				});
				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					duration: 500,
					onComplete: function () {
						contentBlock(0);
						drag.setStyle ('z-index', 30);
						drag.setOpacity (1);
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

	drops.each(function(drop, iDrop) {

	drop.allowOver = true;
	drop.allowLeave = true;
	drop.Ind = iDrop;

	if (xyDrops != undefined) {
		drop.setStyles({
			'position': 'absolute',
			'left': xyDrops[iDrop][0],
			'top': xyDrops[iDrop][1]
		});
	};

		drop.addEvents({
			'drop':function(drag, grp) {

				if(ans[drag.Ind]== drop.Ind) {
					contentBlock(0);
					startDrop(drag, drop);
					soundManager.play('sndGood');
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 4  )+ 'px ' + -1 * confClassDrop[3] + 'px');

				} else {
					this.fireEvent('leave', drag);
					drag.fireEvent('emptydrop');
				};
			},
			'over': function(drag) {
				if(drop.allowOver) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 1  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				};
			},
			'leave': function (drag) {
				if(drop.allowLeave) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 0  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				};
			}
		});
	});
}
