window.onDomReady(function(){

	initSounds(2,false);
	initIcon();

	var f=$$('#drags div');
	var g=$$('#drops div');
	var h=$$('#sound div');

	h.each(function(a,b){
		a.setStyles({
			'left':b*500+400
		});

		a.addEvent('click',function(){
			soundManager.play('snd'+b)
		})
	});
	
	f.each(function(d,e){
		new Drag.Move(d,{droppables:g,container:$('content')});
		d.setStyles({
			'left':xyDrag[e][0],
			'top':xyDrag[e][1],
			'background-position':(xyDrag[e][2]*(-1)).toString()+'px top',
			'width':xyDrag[e][3],
			'padding-top':xyDrag[e][4]*30+12,
			'height':62-xyDrag[e][4]*30
		});

		d.addEvents({
			'mousedown':function(a,b){
				this.setStyles({
					'z-index':40
				});

				d.id=e;
				fxDrag=d.effects({transition:Fx.Transitions.Back.easeOut,onComplete:function(){d.setStyle('z-index',30)}})
			},

			'emptydrop':function(a,b,c){
				d.setStyle('background-position',(xyDrag[e][2]*(-1)).toString()+'px top');
				fxDrag.start({'left':xyDrag[e][0],'top':xyDrag[e][1]})
			},

			'mouseenter':function(){
				d.setStyle('background-position',(xyDrag[e][2]*(-1)-1030).toString()+'px top')
			},

			'mouseleave':function(){
				d.setStyle('background-position',(xyDrag[e][2]*(-1)).toString()+'px top')
			}
		})
	});

	g.each(function(d,e){
		d.setStyles({
			'left':xyDrop[e][0],
			'top':xyDrop[e][1],
			'width':xyDrag[e][3],
			'padding-top':xyDrag[e][4]*30+12,
			'height':xyDrop[e][2]
		});

		d.addEvents({
			'drop':function(a,b){
				var c='';
				if(ans[a.id]==e){
					soundManager.play('sndOk');
					this.setHTML(a.innerHTML);
					this.setStyle('background-position',(xyDrag[e][2]*(-1)).toString()+'px top');
					a.remove()
				}

				else{
					a.fireEvent('emptydrop');
					d.fireEvent('leave')
				}
			}
		})
	})
})
