window.onDomReady(function() {
	initSounds (0, false);
	initIcon();
	dxd ();
});

 function startDrop(drag, drop) {
	drop.setText(drag.getText());
	drop.setStyle('background-position', (-confClassDrop[2] - confClassDrop[0] * 3  )+ 'px ' + -1 * confClassDrop[3] + 'px' );
	drag.remove();
	ans[drop.Ind]= -1;
}
