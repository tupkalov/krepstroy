const express = require('express');

module.exports = (request, response) => {
	let _super = response.render;
	return function (name, options, ...args) {
		let basket = request.session.basket || [];
		options = Object.assign(
			{basket},
			options
		)
		return _super.call(response, name, options, ...args);
	}
}