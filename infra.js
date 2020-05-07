import Fire from "/vendor/akiyatkin/load/Fire.js"
import Global from "/vendor/infrajs/layer-global/Global.js"

Fire.hand(Controller, 'init', async () => {
	Controller.externalAdd('global', 'external');
	Controller.parsedAdd(layer => {
		if (!layer.global) return;
		let hash = Global.hash(layer.global)
		return hash;
	});
})
Controller.Global = Global
infrajs.global = Global
window.Global = Global
Event.handler('Layer.onshow', async (layer) => {
	if (!layer.global) return;
	Global.checkLayer(layer);
}, 'global:tpl');