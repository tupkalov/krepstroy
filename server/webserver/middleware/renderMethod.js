const express = require('express');

module.exports = (name, options, ...args) => {
	basket = this.request.session.basket || [];
	options = Object.assign(
		{
			basketCount : basket.length
		},
		options
	)
}