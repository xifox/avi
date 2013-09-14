window.onDomReady(function(){
	initIcon();
	initSounds (0, 'audio/nact1.mp3');

	$$('#desk div').each( function(li, i) {
		li.setStyles({
			'left': xyLi[i][0],
			'top': xyLi[i][1]
		});
	});
});
