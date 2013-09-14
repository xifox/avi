window.onDomReady(function(){
initIcon();

initSounds(0,false);

var b=$$('#imgDrops div');

b.each(function(a,i){
	a.setStyle('background-position',-266*i);
	a.setOpacity(0.5)
});

dxd()

});

function startDrop(a,b){b.setText(a.getText());b.setStyle('background-position',(-confClassDrop[2]-confClassDrop[0]*3)+'px '+ -1*confClassDrop[3]+'px');a.remove();ans[b.Ind]=-1;$$('#imgDrops div')[b.Ind].setOpacity(1)}
