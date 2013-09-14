window.onDomReady(function(){
	initSounds (0, false);

	initIcon();

	var drags = $$('#drags div');
	var dragsFijos = $$('#dragsFijos div');
	var drops = $$('#drops div');
	var imgDrops = $$('#imgDrops div');
	var letra;
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

	$$('#imgDrops div').each(function(imgDrop,iImgDrop) {
		imgDrop.setStyle('background-position',iImgDrop * -150);
	});

	drags.each(function(drag,iDrag) {
	
		drag.setStyles ({

			'left': xyDrags[iDrag][0],
			'top': xyDrags[iDrag][1]
		});

		dragsFijos[iDrag].setStyles ({
			'left': xyDrags[iDrag][0],
			'top': xyDrags[iDrag][1]
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
					'left': xyDrags[iDrag][0],
					'top': xyDrags[iDrag][1]
				});
			}
		});
	});

	drops.each(function(drop,iDrop){

		drop.setOpacity(0.5);	

		drop.addEvents({
			'drop': function(drag, drp) {
					this.setOpacity(0.5);
					letra  = drags[drag.Ind].getText();
					if (letra =="") letra =" ";
					if (letra == ans[iDrop].charAt(this.getText().length)) {
						this.setText (this.getText() + letra);
						drags[drag.Ind].setStyles ({
							'left': xyDrags[drag.Ind][0],
							'top': xyDrags[drag.Ind][1]
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
