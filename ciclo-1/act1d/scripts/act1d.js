window.onDomReady(function(){	
	initSounds (0, false);
	initIcon();
	var imgDrops = $$('#imgsDrops div');

	var drops = $$('#drops div');
	var drags = $$('#drags div');
	imgDrops.each (function (imgDrag, i) {
		imgDrag.setStyles ({
			'background-position': -280 * i
		});
		imgDrag.setOpacity(0.5);
	});
		dxd ();
});

function startDrop (drag,drop) {
 drop.setText(drag.getText());
ans[drop.Ind] = -1;
 $$('#imgsDrops div')[drop.Ind].setOpacity(1);
drag.remove(); 
}
