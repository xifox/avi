window.onDomReady(function() {
	initSounds (0,false);
	initIcon();
	var imgs = $$('#desk div');

	imgs.each(function(img,iImg) { 
		img.setStyles({
			'left':dydsLT[iImg][0] + 20,
			'top':dydsLT[iImg][1] + 70,
			'background-position': (-150)*(iImg + 3) + 'px 0'
		});
	});

	dxdSwap ();
});
