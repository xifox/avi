window.onDomReady(function() {
	initSounds (10, false);

	initIcon();
	var vectorSnd = $$('#snd div');

	vectorSnd.forEach(function(snd,i) {
		snd.setStyles({
			'top':sndTL[i][0],
			'left':sndTL[i][1]
		});

		snd.addEvent('click', function() {
			soundManager.play('snd'+ i);
		});
	});

	dxdSwap ();
});
