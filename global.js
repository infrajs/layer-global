(function () {
	//global:(bool);// проверка есть tpl или нет. Если tpl будет загружен пустой слой не покажется
	//globalignoredata:(bool); загружать повторно данные или нет
	Event.one('Controller.oninit', function () {
		Controller.externalAdd('global','external');
		Controller.parsedAdd(function(layer){
			if (!layer.global) return '';
			var s = '';
			Each.exec(layer.global, function (g) {
				g = Global.get(g);
				s += g.value + ':';
			});
			return s;
		});
	});

	Global = {
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
		check: function(name) {
			Controller.Global.set(name);
			var ids = Controller.Global.get(name).layers;
			var layers = [];
			for (var i in ids) {
				layers.push(ids[i]);
			}
			Controller.check(layers);
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
		}
		//,onsubmit:[]
	}
	infrajs.checkGlobal = function (layer) {
		if (!layer.global) return;
		var json = '';
		if(layer.json){
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
	Controller.Global = Global;
	infrajs.global = Global;
})();