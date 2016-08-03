const 	className 		= 'order',
		listClassName 	= className + '__list',
		itemClassName 	= className + '__item',
		priceClassName 	= className + '__price',
		sumClassName 	= className + '__sum',
		delClassName 	= className + '__del',

		counterValueQuery = 'input[name$="[count]"]';


export class Order{

	constructor (el) {
		this.el = el;

		$(el).on('counter', `.${itemClassName}`, event => {
			let id = $(event.currentTarget).data('id'),
				counter = event.originalEvent.counterValue;
			if(counter > 0)
				BASKET.add(id, event.originalEvent.counterValue);
			else
				BASKET.remove(id);

			this.calc();

		})

		$(el).on('click', `.${delClassName}`, event => {
			let $item = $(event.currentTarget).closest(`.${itemClassName}`),
				id = $item.data('id');

			BASKET.remove(id)
				.then(() => {
					$item.remove();
					this.checkEmpty();
					this.calc();
				});
		});

		this.list = el.querySelector('.' + listClassName);
		this.sumPrice = el.querySelector('.' + sumClassName + ' .' + priceClassName);
		if(this.list){
			this.items = Array.from(this.list.querySelectorAll('.' + itemClassName));

			this.list.addEventListener('change', e => this.calc(), false);

			this.calc();
		}
	}

	checkEmpty () {
		this.items = Array.from(this.list.querySelectorAll('.' + itemClassName));
		if(this.items.length === 0)
			location.reload();
	}

	calc () {
		let sum = 0;

		for(let item of this.items){
			let input = item.querySelector(counterValueQuery);
			let price = item.querySelector('.' + priceClassName);
			sum += parseInt(price.innerHTML) * parseInt(input.value);
		}

		this.sumPrice.innerHTML = Order.format(sum);
	}

	static format (value) {
		value = (value + '').split('');

		let ret = '';
		while(value.length)
			ret = value.splice(-3).join('') + ' ' + ret;


		return ret.trim();
	}

	static start () {
		Array.from(document.querySelectorAll('.' + className))
			.forEach(el => {
				return new Order(el);
			})
	}
}