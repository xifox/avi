window.onDomReady(function() {
	$('sound').addEvent ('mousedown', function () {
		soundManager.play ('snd0');
	});
	
	initSounds (1, false);
	initIcon();
	dxd ();
});

function startDrop(drag, drop) {
	$('imgDrag').setStyle ('visibility', 'visible');
	new Drag.Move ($('imgDrag'));

	drag.remove();
	drop.setText (drag.getText());
}
