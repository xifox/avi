window.onDomReady(function(){
	initSounds (0, false);
	initIcon();

var imgDrops = $$('#imgDrops div');

	imgDrops.each(function(imgDrop, i) {
		imgDrop.setStyle ('background-position', -266 *i);
		imgDrop.setOpacity (0.5);
	});

	dxd();
});

 function startDrop(drag, drop) {
	drop.setText(drag.getText());
	drop.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 3  )+ 'px ' + -1 * confClassDrop[3] + 'px' );
	drag.remove();
	ans[drop.Ind]= -1;
	$$('#imgDrops div')[drop.Ind].setOpacity(1);
}
