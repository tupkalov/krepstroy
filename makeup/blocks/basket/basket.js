const className = "basket",
		boxClassName = `${className}__box`,
		countClassName =  `${boxClassName}__count`,
		textClassName = `${boxClassName}__text`;

// singleton
export class Basket{

	constructor (el) {
		this.el = document.querySelector(`.${className}`);
		
		this.$text = $(`.${textClassName}`, this.el);
		this.$counter = $(`.${countClassName}`, this.el);

		$(this).on('data', e => {
			let count = this.data ? this.data.length : 0;
			this.$text.text(count ? `В корзине товаров: ${count}` : 'Корзина пуста');
			this.$counter.text(count);
		})
	}

	add (id, count) {
		if(!count)
			return this.remove(id);
		else
			return Promise.resolve(
				$.post('/basket/add', {id, count})
					.then(
						({data}) => this.refresh(data)
					)
			)
	}

	remove (id) {
		return Promise.resolve(
			$.post('/basket/remove', {id})
				.then(
					({data}) => this.refresh(data)
				)
		)
	}

	refresh (data) {
		this.data = data;
		$(this).trigger('data');
	}

	static start () {
		global.BASKET = new Basket();
	}
}