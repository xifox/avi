window.onDomReady (function() {
	initSounds (0, false);
	
	initIcon();

	var txtDrops1 = $$('#txtDrops1 div');
	var txtDrops2 = $$('#txtDrops2 div');
	var txtDrags1 = $$('#txtDrags1 div');
	var txtDrags2 = $$('#txtDrags2 div');

	var nameClass = txtDrags1.getParent().getProperty ('class')[0];
	confClassDrag =  ((nameClass.substring(5,nameClass.length)).split('x'));

	confClassDrag.each (function (el, iEl) {
		confClassDrag[iEl] = el.toInt();
	});

	initAct ();

	$('restart').addEvent ('mousedown', function () {
		reInitAct();
	});

	function reInitAct () {
		txtDrops1.each(function(drop,iDrop){
			drop.state = false;
			drop.setText('');
			drop.setStyle('background-position', '0px');
		});
	
		txtDrops2.each(function(drop,iDrop){
			drop.setText('');
			drop.setStyle('background-position', '-180px -190px');
		});
	};

	function initAct () {
		txtDrags1.each (function (txtDrag1, itxtDrag1) {
			txtDrag1.setStyles ({
				'top': xytxtDrags1[itxtDrag1][0],
				'left': xytxtDrags1[itxtDrag1][1]
			});

			new Drag.Move (txtDrag1, {
				droppables: txtDrops1,
				container: $('content')
			});

			txtDrag1.addEvents ({
				'mouseenter': function () { 
					this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 1  )+ 'px ' + -1 * confClassDrag[3] + 'px');
					soundManager.play('sndTic');
				},

				'mouseleave': function () {
					this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 0  )+ 'px ' + -1 * confClassDrag[3] + 'px');
				},


				'mousedown': function (el, obj) {
					this.setStyles({
						'z-index': 40,
						'background-position': (-confClassDrag[2] - confClassDrag[0] * 3  )+ 'px ' + -1 * confClassDrag[3] + 'px' 
					});
		
					fxDrag = txtDrag1.effects({
						transition:Fx.Transitions.Back.easeOut,
						onComplete: function () {
							txtDrag1.setStyle ('z-index', 300);
						}
					});
				},

				'emptydrop': function(){
					this.setStyle ('border-color', 'silver');
					fxDrag.start({
						'top': xytxtDrags1[itxtDrag1][0],
						'left': xytxtDrags1[itxtDrag1][1]
					});
				}
			});
		});

		txtDrops1.each (function (txtDrop1, itxtDrop1) {
			txtDrop1.state= false;
			txtDrop1.addEvents ({
				'drop': function (drg, drp) {
					if (this.state == false) {
						txtDrop1.setText ('Can you see' + ' ' + drg.getText());
						this.state= true;
						drg.setStyle ('display', 'block');
						this.setStyle('background-position', '-300px');
					};
				
				drg.fireEvent ('emptydrop');
			
		   		},

				'over': function () {
					if(this.state != true) {
						this.setStyle('background-position', '-300px');
					};
				},

				'leave': function () {
					if(this.state != true) {
						this.setStyle('background-position', '0px');
					};
				}
			});
		});

		txtDrags2.each (function (txtDrag2, i) {
			txtDrag2.setStyles ({
				'top': xytxtDrags2[i][0],
				'left': xytxtDrags2[i][1],
				'display': 'block'
			});

			new Drag.Move (txtDrag2, {
				droppables: txtDrops2,
				container: $('content')
			});

			txtDrag2.addEvents ({
				'mouseenter': function () { 
					this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 1  )+ 'px ' + -1 * confClassDrag[3] + 'px');
					soundManager.play('sndTic');
				},

				'mouseleave': function () {
					this.setStyle('background-position', (-confClassDrag[2] - confClassDrag[0] * 0  )+ 'px ' + -1 * confClassDrag[3] + 'px');
				},

				'mousedown': function (el, obj) {
					this.setStyles({
						'z-index': 40,
						'background-position': (-confClassDrag[2] - confClassDrag[0] * 3  )+ 'px ' + -1 * confClassDrag[3] + 'px' 
					});

					fxDrag = txtDrag2.effects({
						transition:Fx.Transitions.Back.easeOut,
						onComplete: function () {
							txtDrag2.setStyle ('z-index', 300);
						}
					});
				},

				'emptydrop': function(){
					this.setStyle ('border-color', 'silver');
					fxDrag.start({
						'top': xytxtDrags2[i][0],
						'left': xytxtDrags2[i][1]
					});
				}
			});
		});

		txtDrops2.each (function (txtDrop2, i) {

			txtDrop2.addEvents ({
				'drop': function(drag, drp) {
					if (txtDrops1[i].state) {
						txtDrop2.setText (drag.getText());
						this.setStyle('background-position', -180 * 2 +'px -190px');
					};

					drag.fireEvent ('emptydrop');
			   	},

				'over': function () {
					if (txtDrops1[i].state) {
						this.setStyle('background-position', -180 * 2 +'px -190px');
					};
				},

				'leave': function () {
					if (txtDrops1[i].state) {
						this.setStyle('background-position', -180 * 1 +'px -190px');
					};
				}
			});
		});
		
	};
});
