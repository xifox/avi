window.onDomReady(function(){

initSounds(6,false);

initIcon();

var e=$$('#drags div');
var f=$$('#drops div');
var g=$$('#sounds div');
var h=e.getParent().getProperty('class')[0];

confClassDrag=((h.substring(5,h.length)).split('x'));

confClassDrag.each(function(a,b){confClassDrag[b]=a.toInt()});

g.each(function(a,b){a.setStyles({'left':xySnds[b][0],'top':xySnds[b][1]});

a.addEvent('click',function(){soundManager.play('snd'+b)})});

e.each(function(c,i){c.setStyles({'left':xyDrags[i][0],'top':xyDrags[i][1]});

new Drag.Move(c,{droppables:f,container:$('content')});

c.addEvents({'mouseenter':function(){this.setStyle('background-position',(-confClassDrag[2]-confClassDrag[0]*2)+'px '+ -1*confClassDrag[3]+'px');

soundManager.play('sndTic')},'mouseleave':function(){this.setStyle('background-position',(-confClassDrag[2]-confClassDrag[0]*1)+'px '+ -1*confClassDrag[3]+'px')},'mousedown':function(a,b){

iDrag=i;

this.setStyles({'z-index':40,'background-position':(-confClassDrag[2]-confClassDrag[0]*3)+'px '+ -1*confClassDrag[3]+'px'});

fxDrag=c.effects({transition:Fx.Transitions.Back.easeOut,onComplete:function(){c.setStyle('z-index',30)}})},'emptydrop':function(){fxDrag.start({'left':xyDrags[i][0],'top':xyDrags[i][1]})}})});

f.each(function(c,d){c.setOpacity(0.5);

c.addEvents({'drop':function(a,b){if((ans[d]!=-1)&&(iDrag==ans[d])){g[d].setStyle('visibility','hidden');

ans[d]=-1;

this.setText(a.getText());

this.setOpacity(1);

a.remove();

soundManager.play('sndOk');

this.setStyle('background-position',d*-250)}else{a.fireEvent('emptydrop')}},'leave':function(a,b){if(ans[d]!=-1){this.setOpacity(0.5)}},'over':function(a,b){if(ans[d]!=-1){this.setOpacity(0.6)}},'mousedown':function(){if(ans[i]!=-1){this.setOpacity(0.8)}},'mouseup':function(){if(ans[d]!=-1){this.setOpacity(0.5)}}})})});
