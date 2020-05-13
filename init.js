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
	let hash = Global.hash(layer.global)
	return hash;
});
Event.handler('Layer.onshow', async (layer) => {
	if (!layer.global) return;
	Global.checkLayer(layer);
}, 'global:tpl');



Controller.Global = Global
window.Global = Global
