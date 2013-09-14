window.onDomReady(function(){	
	initSounds (0, false);
	initIcon();

	var imgDrops = $$('#imgsDrops div');
	var drops = $$('#drops div');
	var drags = $$('#drags div');

	imgDrops.each (function (imgDrag, i) {
		drops[i].setStyles ({
			left: adjDrops[i].x,
			top: adjDrops[i].y
		});
	
		imgDrag.setStyles ({
			'background-position': -150 * i - 8
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
	};