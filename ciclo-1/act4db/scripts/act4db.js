window.onDomReady(function(){
	$('sound').addEvent('mousedown',function(){soundManager.play('snd0')});
	initSounds(1,false);
	initIcon();
	dxd()
});

	function startDrop(a,b){$('imgDrag').setStyle('visibility','visible');
	new Drag.Move($('imgDrag'));a.remove();b.setText(a.getText())}
