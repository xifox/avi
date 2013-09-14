window.onDomReady(function() {
	initSounds (0, false);
	initIcon();
	indAntCover = -1;
	var covers = $$('#desk div div');
	
	var fxCovers = [];
	
	covers.each(function(cover,iCover){
		box = cover.getParent();
		box.setStyle('background-position', iCover * -150);
		
		fxCovers[iCover] = new Fx.Slide(cover,{duration: 5000, onComplete: function () {contentBlock(0);}});
		
		cover.addEvents({
			'mousedown': function(){
			contentBlock(1);
				soundManager.play('sndOk');

				if (indAntCover != -1) {
					fxCovers[indAntCover].show();
					fxCovers[iCover].slideOut();
					
					indAntCover = iCover;
				}

				else {
					
					fxCovers[iCover].slideOut();
					indAntCover = iCover;
				}
			},

			'mouseenter': function () {
				soundManager.play('sndTic');
			}
		});
	});	
	
})
