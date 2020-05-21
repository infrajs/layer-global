import { DOM } from '/vendor/akiyatkin/load/DOM.js'

DOM.once('check', async () => {
	await import('./init.js')
})


