window.onDomReady(function(){
	initSounds(0,false);
	initIcon();
	
	var c=$$('#imgFijas div');
	var d=$('dado');
	var e=$('fxCuadro');
	var f=new Array(6);
	var i=0;

	while(i<6){var g=(Math.random()*6).toInt();
		if(!f.contains(g)){f[i]=g;i++}
	}

	c.each(function(a,b){a.setStyles({'left':xyImgs[b][0],'top':xyImgs[b][1],'background-position':f[b]*(-200)});

	a.setText(b+1)});
	
	d.addEvent('mousedown',function(){soundManager.play('sndOk');
	
	var a=(Math.random()*6).toInt();
	
	d.setStyle('background-position',(-1200-200*a))})

});
