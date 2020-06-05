import { Global } from "/vendor/infrajs/layer-global/Global.js"
import { Parsed } from '/vendor/infrajs/controller/src/Parsed.js'
import { External } from '/vendor/infrajs/controller/src/External.js'
import { Controller } from '/vendor/infrajs/controller/src/Controller.js'
import { Event } from '/vendor/infrajs/event/Event.js'

/*
2 инициализации
1 - onload - при заходе на страницу
2 - Обращение к классу-файлу - при клике - через события (подписанное в collect) Controller.hand('init'

*/



External.add('global', 'external');
Parsed.add(layer => {
	if (!layer.global) return;
	let hash = '';
	[layer.global].flat().map(g => {
		g = Global.get(g);
		hash += g.value + ':';
	});
	return hash
});
Event.handler('Layer.onshow', async (layer) => {
	if (!layer.global) return
	[layer.global].flat(2).map(n => {
		var g = Global.get(n);
		if (layer.json) g.unloads[layer.json] = true;
		g.layers[layer.id] = layer;
	})
}, 'global:tpl');