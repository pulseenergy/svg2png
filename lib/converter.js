"use strict";
/*global phantom: false, window: false*/

var webpage = require("webpage");
var system = require("system");

if (system.args.length !== 4) {
	console.error("Usage: converter.js source dest scale");
	phantom.exit();
} else {
	convert(system.args[1], system.args[2], Number(system.args[3]));
}

function endsWith(string, suffix) {
	return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

function convert(source, dest, scale) {
	var page = webpage.create();

	page.open(source, function (status) {
		if (status !== "success") {
			console.error("Unable to load the source file.");
			phantom.exit();
			return;
		}

		try {
			page.paperSize = {
				format: "A4",
				orientation: "landscape"
			};

			page.viewportSize = {
				width: 1124,
				height: 794
			};
			if (endsWith(dest, "pdf")) {
				page.viewportSize = {
					width: window.screen.width,
					height: window.screen.height
				};
			}

		} catch (e) {
			console.error("Unable to calculate dimensions.");
			console.error(e);
			phantom.exit();
			return;
		}

		// This delay is I guess necessary for the resizing to happen?
		setTimeout(function () {
			page.render(dest);
			phantom.exit();
		}, 0);
	});
}
