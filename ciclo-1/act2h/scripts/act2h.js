window.onDomReady(function(){
	initSounds (0, false);
	initIcon();

	var drags = $$('#drags div');
	var dragsFijos = $$('#dragsFijos div');
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

	drags.each(function(drag,iDrag) {
	
		drag.setStyles ({
			'top': xyDrags[iDrag][0],
			'left': xyDrags[iDrag][1]
		});

		dragsFijos[iDrag].setStyles ({
			'top': xyDrags[iDrag][0],
			'left': xyDrags[iDrag][1]
		});
		
		new Drag.Move (drag, {
			droppables: drops,
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

			'mousedown': function(el, obj) {
			
				this.setStyles({
					'z-index': 40,
					'background-position': (-confClassDrag[2] - confClassDrag[0] * 3  )+ 'px ' + -1 * confClassDrag[3] + 'px' 
				});
				drag.Ind = iDrag;

				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 30);
					}
				});
			},

			'emptydrop': function(){
	
				fxDrag.start({
					'top': xyDrags[iDrag][0],
					'left': xyDrags[iDrag][1]
				});
			}
		});
	});  //drags each

	drops.each(function(drop,iDrop){
		drop.setStyles ({
			'top': xyDrops[iDrop][0],
			'left': xyDrops[iDrop][1]
		});
		drop.setOpacity(0.5);	

		drop.addEvents({
			'drop': function(drag, drp) {
					this.setOpacity(0.5);
					if (drags[drag.Ind].getText() == ans[iDrop].charAt(this.getText().length)) {
						this.setText (this.getText() + drags[drag.Ind].getText());

						drags[drag.Ind].setStyles ({
							'top': xyDrags[drag.Ind][0],
							'left': xyDrags[drag.Ind][1]
						});
					}
					else drags[drag.Ind].fireEvent ('emptydrop');

					if (this.getText() == ans[iDrop]) {
						this.setOpacity(1);
						soundManager.play('sndGood');
						this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 3  )+ 'px ' + -1 * confClassDrop[3] + 'px');
					}
		   	},

			'leave': function(drag,drp) {
				if (this.getText() != ans[iDrop]) {
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 0  )+ 'px ' + -1 * confClassDrop[3] + 'px');
					this.setOpacity(0.5);
				}
				
		 	},

			'over': function(drag,drp) {
				if (this.getText() != ans[iDrop]) {
					this.setOpacity(1);
					this.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 1  )+ 'px ' + -1 * confClassDrop[3] + 'px');
				}
		 	}
		})
	})
});
