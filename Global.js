import { DOM } from '/vendor/akiyatkin/load/DOM.js'
import { Load } from '/vendor/akiyatkin/load/Load.js'

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
	unload: function (names, path) {
		[names].flat().map(name => {
			var g = Global.get(name)
			g.unloads[path] = true
		});
	},
	check: async name => {
		Global.set(name)

		// var g = Global.get(name);
		// var layers = [];
		// for (var id in g.layers) {
		// 	layers.push(g.layers[id]);
		// }
		// КОнтроллер не умеет обрабатыавть родителей, переданные слови не всегда нужно показывать
		// await Controller.check(layers);
		await DOM.puff('check')
	},
	counter: 1,
	set: function (names) {
		[names].flat(2).map(name => {
			let g = Global.get(name);
			g.value = Global.counter++;
			for (let path in g.unloads) {
				Load.drop('json', path)
				Load.drop('text', path)
				//Load.unload(path);
			}
			for (let id in g.layers) {
				let layer = g.layers[id]
				if (!layer.config || !layer.config.ans) continue
				layer.config.ans = {}
			}
		});
	}
}
window.Global = Global
export {Global}