// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);
	
	var sonidos = new aPlayer.Base ();

	var numbers = $$('#numbers div');
	var numbersDrops = $$('#numbersDrops div');

/* objeto actJ2a tipo DxD.Base  */
	var actJ2a = new DxD.Swap (numbers, numbersDrops, {
		container: $('content'),
		sendToBack: 'toDrop',
		adjDrags: ajusteDrags,
		cssClass: 'actJ2a',
		multiDrop: 'infinity',
		textInDrop: false
	});
	
	var step = 0;
	actJ2a.drags.each(function(drag, i) {
		var color = [step, 92, 87].hsbToRgb();
		drag.setStyle('background-color', color);
		step = step + 35;
	});
	
	var okComplete;
	actJ2a.addEvent ('trueDrop', function () {
		okComplete = true;
		this.drags.each (function (drag, iD){
			if (ans[drag.Ind] != drag.indDrop) okComplete = false;
		});
		if (okComplete) orderComplete ();
	});
	
	var orderComplete = function(){
		
		actJ2a.drags.each(function(drag, iD) {
			drop = (actJ2a.drops[drag.indDrop]);
			drop.setText(drag.getText())
			drop.setStyles ({
				'background-color': drag.getStyle ('background-color'),
				opacity: 0
			});

			drag.setStyle('display', 'none');
		});
		
		actJ2a.drops.each (function (drop, iD){
			(function () {drop.fxDrop.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
});