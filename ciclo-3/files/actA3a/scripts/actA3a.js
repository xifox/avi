// function initAct() de 
var initAct = function () {
	reLoad ();
};


window.onDomReady(function(){
	confMenu (1, 0, 0, 1, 0);
	 
	 var sonidos = new aPlayer.Base ();

	// DxD. Text | Drags y Drops
	var drags = $$('#txtDrags div');
	var drops = $$('#oraciones');
	var cuadros = $$('#images div');
	
	cuadros.each (function (cuadro, iC){
		cuadro.setStyle ('background-position', iC*(-230).toString() + 'px top');
	});

	// Construccion de objeto 'actA3a' tipo DxD.Text
	var actA3a = new DxD.Text (drags, drops, {
		container: $('content'),		
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actA3a'
	});
	
	
		// function initAct() de actA3a
	var initAct2 = function () {
		
		actA3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};

	

// Llamamos inicio de Actividad
	initAct2();
});


	