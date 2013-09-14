// function initAct() de actE6a
var initAct = function () {
	reLoad ();
};

window.onDomReady(function(){
	var sonidos = new aPlayer.rePro ({
		audioPlayerName:'forest.mp3'
	});
	
	confMenu (1, 0, 0, 1, 0);

	// Drags y Drops
	var drags = $$('#drags div');
	var drops = $$('#drops');

	drags.randomize();

	// objeto actE6a tipo DxD.Base
	var actE6a = new DxD.Text (drags, drops, {
		container: $('content'),
		dragDelete: 'none',
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'actE6a'
	});
});