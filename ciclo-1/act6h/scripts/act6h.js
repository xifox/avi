window.onDomReady(function(){initSounds(0,false);initIcon();var e=$$('#drags div');var f=$$('#drops div');var g=300;e.each(function(c,i){c.setStyles({'top':g,'left':i*160+85,'background-position':-150*i});new Drag.Move(c,{droppables:f,container:$('content')});c.addEvents({'mousedown':function(a,b){this.setStyle('z-index',50);c.Ind=i},'emptydrop':function(){fxDrag.start({'top':g,'left':i*160+85});soundManager.play('sndError')},'mouseenter':function(){fxDrag=c.effects({transition:Fx.Transitions.Back.easeOut,onComplete:function(){c.setStyle('z-index',30)}});c.setStyles({'background-position':(-150)*i-750});soundManager.play('sndTic')},'mouseleave':function(){c.setStyles({'background-position':(-150)*i})}})});f.each(function(c,d){c.setStyles({'top':5,'left':d*220+180,'background-position':-200*d});c.setOpacity(0.4);c.addEvents({'drop':function(a,b){if(ans[a.Ind]==d){a.remove();soundManager.play('sndGood');c.setOpacity(1)}else{a.fireEvent('emptydrop');a.setOpacity(1);c.setOpacity(0.6)}},'leave':function(a,b){c.setOpacity(0.6);a.setOpacity(1)},'over':function(a,b){c.setOpacity(1);a.setOpacity(0.5);soundManager.play('sndTic')}})})});