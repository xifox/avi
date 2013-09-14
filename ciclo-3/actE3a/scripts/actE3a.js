// function initAct() de 
var initAct = function () {
	reLoad ();
};

window.onDomReady(function() {
	var sonidos = new aPlayer.Base ();
	confMenu (1, 0, 0, 1, 1);
	
	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('.drops td');

	// objeto actE3a tipo DxD.Base
	var actE3a = new DxD.Swap (drags, drops, {
		container: $('content'),
		sendToBack: 'toDrop',
		adjDrags: ajusteDrags,
		bgOffsetDrag: -180,
		cssClass: 'actE3a',
		multiDrop: 'infinity',
		enableSnds: [0, 0, 0, 0, 0, 0]
	});
	

	actE3a.fncTrueDrop = function (drag, drop) {
		if (ans[drag.Ind] == drop.Ind) return true;
		else return false;
	};

	actE3a.addEvent ('trueDrop', function (drag, drop){
		var todoOk = true;
		sonidos.Pop ();
		ans.each (function (el, iE) {
			if (ans[actE3a.drags[iE].Ind] != actE3a.drags[iE].indDrop) todoOk = false;
		}, this);

		if (todoOk) {
			sonidos.Good ();
			(function(){actE3a.drags.each (function (drag, iD){
				actE3a.drops[iD].setStyles ({
					'background': '#2BF'
				});
				
				(function(){drag.fxDrag.start ({
					opacity: [0, 1]
				})}).delay (iD*100);
			}, this)}).delay (800);
		};
	});


// function initAct() de actE3a
	var initAct2 = function () {
		actE3a.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
			(function () {drag.fxDrag.start ({
				top: [300, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (200*iD);
		});
	};
	
	// Llamamos inicio de Actividad
	initAct2();
});