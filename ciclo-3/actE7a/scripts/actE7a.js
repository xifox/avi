// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){

	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 0);

// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops div span');
	
	
	// objeto actE7a tipo DxD.Base
	var actE7a = new DxD.Base (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actE7a',
		opacity: {drop: 0.5, trueDrop: .8}
	});
	
	$$('#drops div').each(function(image,iImg) {
		image.setStyle('background-position', iImg * -230);
	});
	
	actE7a.fncTrueDrop = function (drag, drop) {
		
		if (drag.Ind == drop.Ind) return true;
		else return false;
	};
	
	
	// function initAct() de ActE7a
	var initAct2 = function () {
		actE7a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (200*iD);
		});
	};

	// Llamamos inicio de Actividad
	initAct2();

	

});