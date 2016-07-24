const 	className 		= 'counter',
		minusClass 		= className + '__minus',
		plusClass 		= className + '__plus',
		inputClass 		= className + '__input'
		;


export class Counter{

	constructor (el) {
		this.el = el;
		this.minus 	= el.querySelector('.' + minusClass);
		this.plus 	= el.querySelector('.' + plusClass);
		this.input 	= el.querySelector('.' + inputClass);

		this.value = parseInt(this.input.value);

		this.minus.addEventListener('click', e => this.decrement());
		this.plus.addEventListener('click', e => this.increment());
		this.input.addEventListener('change', e => this._change());
	}

	decrement () {

		this.input.value = this.value = Math.max(1, this.value - 1);
		this.trigger();
	}

	increment () {
		this.input.value = this.value = this.value + 1;
		this.trigger();
	}

	trigger () {
		let event = new Event('change', {"bubbles":true, "cancelable":true});
		this.input.dispatchEvent(event);
	}

	_change () {
		let val = parseInt(this.input.value);
		if(isNaN(val))
			this.input.value = this.value;
		else
			this.input.value = this.value = val;
	}

	static start () {
		Array.from(document.querySelectorAll('.' + className))
			.forEach(el => {
				return new Counter(el);
			})
	}
}