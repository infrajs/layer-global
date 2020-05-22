<?php
use infrajs\controller\Layer;
use infrajs\event\Event;
use infrajs\each\Each;
Event::handler('Controller.oninit', function () {
	Layer::parsedAdd(function ($layer){
		if (empty($layer['global'])) return '';
		$hash = '';
		Each::exec($layer['global'], function &($g) use (&$hash) {
			$hash .= '0:';
			$r = null;
			return $r;
		});
		return $hash;
	});
});