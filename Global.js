let Global = {
	globals:{},
	get: function (name) {
		if (!Global.globals[name]) {
			Global.globals[name] = {
				value: 0,
				unloads: {},
				layers: {}
			};
		}
		return Global.globals[name];
	},
	unload: function (name, path) {
		Each.exec(name, function (n) {
			var g = Global.get(n);
			g.unloads[path]=true;
		});
	},
	hash: function (global) {
		var s = '';
		Each.exec(global, function (g) {
			g = Global.get(g);
			s += g.value + ':';
		});
		return s
	},
	check: function(name) {
		Global.set(name);
		var ids = Global.get(name).layers;
		var layers = [];
		for (var i in ids) {
			layers.push(ids[i]);
		}
		Controller.check(layers);
		Controller.check();
	},
	counter: 1,
	set: function (names) {
		Each.exec(names, function (name) {
			var g = Global.get(name);
			g.value = Global.counter++;
			for (var path in g.unloads) {
				Load.unload(path);
			}

			Each.exec(g.layers, function(layer){
				if (!layer.onsubmit) return;
				if (!layer.config) return;
				if (layer.config && layer.config.ans) layer.config.ans = {};
			});
		});
	},
	checkLayer: function (layer) {
		var json = '';
		if (layer.json){
			if (layer.json.constructor == Array) {
				json = layer.json[0];
			} else {
				json = layer.json;
			}
		}
		Each.exec(layer.global, function (n) {
			var g = Global.get(n);
			if (json) {
				g.unloads[json] = true;
			}
			g.layers[layer.id] = layer;
		});
	}
}


window.Global = Global
Controller.Global = Global
infrajs.global = Global

export {Global}
export default Global