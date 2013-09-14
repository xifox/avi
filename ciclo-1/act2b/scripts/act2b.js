window.onDomReady(function() {
	initSounds (0, 'audio/audio2b.mp3');
	initIcon();
	dxd ();
});

function startDrop(drag, drop) {
	drop.setText(drag.getText());

	drop.setStyles ({
		'background-image': 'url(images/act2b.png)',
		'background-position': ans[drop.Ind] * (-150)
	});


	drop.setText ('');
	drag.remove();
	ans[drop.Ind]= -1;
}
