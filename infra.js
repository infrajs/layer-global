import Fire from "/vendor/akiyatkin/load/Fire.js"

Fire.hand(Controller, 'oninit', async () => {
	Controller.externalAdd('global', 'external');
	let { Global } = await import('/vendor/infrajs/layer-global/Global.js')
	Controller.parsedAdd(layer => {
		if (!layer.global) return;
		
		let hash = Global.hash(layer.global)
		return hash;
	});
})

Event.handler('Layer.onshow', async (layer) => {
	if (!layer.global) return;
	let { Global } = await import('/vendor/infrajs/layer-global/Global.js')
	Global.checkLayer(layer);
}, 'global:tpl');