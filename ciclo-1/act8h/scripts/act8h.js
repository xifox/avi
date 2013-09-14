window.onDomReady(function(){
initSounds(0,false);initIcon();
var c=$$('#desk div');c.each(function(a,b){a.setStyles({'left':dydsLT[b][0]+100,'top':dydsLT[b][1]+70,'background-position':(-150)*b+'px 0'})});dxdSwap()
});