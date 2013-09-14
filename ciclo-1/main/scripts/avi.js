var Drag.DxD = Drag.Move.extend({
	
	
})

Element.extend({

	Position: function(options) {
		if (options == undefined) return this.getPosition ()
		else {
			this.setStyles ({
				'left': options.x,
				'top': options.y
			});
		}

	},

	Id: function (id) {
		if (id == undefined) return this.id
		else this.id = id;
	}
});
