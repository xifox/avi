// function initAct() de 
var initAct = function () {
	reLoad ();
};
function checkAct () {
	$$('span').each(function(caja,iC){
		caja.setStyle ('color', 'black');	
	} );
}

window.onDomReady (function () {
	confMenu (1, 1, 0, 1, 0);
	var miSounds = 	new aPlayer.Base () ;		

	var clothes = $$('#images div');
	var forDrags = $$('#forDrag div');
	var drops = $$('#drops div');
	var x0 = 560; var y0 = 0;
	var dispersion = 20;
	var fxClothe = [];
	
	var amtClothe = new Array(6);

	clothes.each (function (clothe, iC) {
		var clotheType = clotheTypes[iC];
		var coorClothe = {x: x0 + (iC % 4) * 100 + (dispersion * $random (0,2)), y: y0 + (iC % 5) * 100 + (dispersion * $random (0,2))};

		if(isNaN(amtClothe[clotheType])) amtClothe[clotheType]=1;
		else amtClothe[clotheType]++;
		clothe.setStyles ({
			'background-position': ((-80 * clotheType).toString() + 'px top'),
			opacity: 0,
			'left': coorClothe.x,
			'top': coorClothe.y
		});
		
		fxClothe[iC] = clothe.effects (clothe);

		(function(){
			fxClothe[iC].start({
				opacity: 1
			})
		}).delay (100*iC);
	});

	miDxD = new DxD.Base (forDrags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags, 
		cssClass: 'actE3a',
		textInDrop: true
	});

	miDxD.fncTrueDrop = function(drag, drop) {

		if (drop.getProperty('type') == drag.Ind) return true;
		else return false;
	};	

	$('btn01').addEvent('mousedown', function () {

	});	
});
