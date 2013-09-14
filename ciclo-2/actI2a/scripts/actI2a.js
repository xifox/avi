// function initAct() de 
var initAct = function () {
	reLoad ();
};



window.onDomReady (function () {
	confMenu (1, 0, 0, 1, 0);

	var sonidos = new aPlayer.Base ();

	var drags = $$('#wordsDrag div');
	var drops = $$('#forDrop');

	/* objeto miDxD tipo DxD.Base  */
	var miDxD = new DxD.Base (drags, drops, {
		container: $('content'),
		sendToBack: 'ini',
		adjDrags: ajusteDrags,
		cssClass: 'miDxD',
		textInDrop: false,
		multiDrop: 'infinity'
	});
	
	var i = 0;
	
	miDxD.fncTrueDrop = function (drag, drop) {
		var txtDrop = drop.getText() + drag.getText();
		var txtAns = ans[i].substr (0, txtDrop.length);
		var arrTxtDrop = txtDrop.split(' ');
		var arrTxtAns = ans[i].split(' ');
		var lngtArr= arrTxtDrop.length;
		if (arrTxtDrop[lngtArr -1] == arrTxtAns[lngtArr -1])
			return true;
			else return false;
	};
	
	miDxD.addEvent ('trueDrop', function (drag, drop) {
		var txtDrop = drop.getText() + drag.getText();
		var txtAns = ans[i].substr (0, txtDrop.length);
		drop.setText (txtAns + ' ');
		if (txtDrop == ans[i]) {
			drop.setText(txtDrop.trim() + '.');
		};
	});

	$('hour').addEvent ('mousedown', function () {
		soundManager.play ('sndTic');
		i++;
		if (i == 7) i = 0;

		$('hour').setStyle ('background-position', (i)*(-302).toString() + 'px top');
		drops[0].setText ('It\'s ');
		drops[0].removeClass (miDxD.options.cssClass + '-trueDrop');
	});
	
	confINI = function () {
		miDxD.drags.each (function (drag, iD){
			drag.setStyle ('display', 'block');
			drag.setOpacity (0);
		
			(function () {drag.fxDrag.start ({
				top: [0, ajusteDrags[iD].y],
				opacity: 1
			})}).delay (150*iD);
		});
	};
	
	confINI ();
});