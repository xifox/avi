window.onDomReady(function(){
	initSounds (0, false);
	initIcon();

var drags = $$('#drags div');
var drops = $$('#drops div');
var cover = false; 
	drags.each(function(drag, i) {

		drag.setStyles ({
			'left': xyDrags[i][0],
			'top': xyDrags[i][1],
			'background-position': -150 * i
		});
		
		new Drag.Move (drag, {
			droppables: drops
		});

		drag.addEvents({
			'mousedown': function(el, obj) {
				drag.Ind = i;
				this.setStyle ('z-index', 50);
				fxDrag = drag.effects({
					transition:Fx.Transitions.Back.easeOut,
					onComplete: function () {
						drag.setStyle ('z-index', 30);
					}
				});
			},

			'emptydrop'  : function(){
				fxDrag.start ({
					'left': xyDrags[i][0],
					'top': xyDrags[i][1]
				});
			}
		});
	});

	drops.each(function(drop, iDrop){
		drop.setStyles({
			'left': xyDrops[iDrop][0],
			'top': xyDrops[iDrop][1]
		});
		drop.state = true;
		drop.addEvents({
			'drop': function(drag, drp) {
				if (this.state !=false) {
					drag.setStyle('visibility', 'hidden');	
					drag.setStyles({
						'left': xyDrags[drag.Ind][0],
						'top': xyDrags[drag.Ind][1]
					});
					this.state= false;
					soundManager.play('sndOk');
				};
		   	},

			'leave': function(drag,drp) {
				if (this.state !=false) {
					this.setStyle('background-position', '-750px');
				}
		 	},

			'over': function(drag,drp) {
				if (this.state !=false) {
					this.setStyle('background-position' , -150  * drag.Ind ); 

				}
		 	}
		});
	});
	

$$('#start').addEvent('click', function(){
	drags.each(function(drag,iDrag){ drag.setStyle('visibility', 'visible'); });
	drops.each(function(drop,iDrop){
		drop.state = true;
		drop.setStyle('background-position', '-750px');
	});
});
	
	$('gate').addEvent('mousedown', function () { 
		fxGate = this.effects( {transition:Fx.Transitions.Quad.easeOut, duration: 900});
		
		if (cover == false ) {
			fxGate.start({'left': '600px'});
			cover = true;
			this.setText('Click to see the pictures');
		} else { 
			fxGate.start({'left':'130px'});
			cover= false;
			this.setText('Click to hide the pictures');			
		}
	});
});
