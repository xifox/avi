window.onDomReady(function(){
	initSounds(1,false);
	initIcon();

	$('sound').addEvent('mousedown',function(){soundManager.play('snd0')});

	dxd()
});
	
function startDrop(a,b){
	$('imgDrag').setStyle('visibility','visible');

	new Drag.Move($('imgDrag'));
	a.remove();
	b.setText(a.getText())
}
