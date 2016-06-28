/*const className = "goods",
	  itemClass = "good",
	  itemBuyedClass = `${itemClass}_in-basket`,
	  buttonClass = `${itemClass}__button`,
	  counterClass = `${itemClass}__counter`;
*/

// singleton
export class Basket{

	constructor (el) {
		//this.el = el;
		
	}

	add (id, count) {
		if(!count)
			return this.remove(id);
		else
			return Promise.resolve(
				$.post('/basket/add', {id, count})
					.then(
						{dafreshta} => this.refresh(data)
					)
			)
	}

	remove (id) {
		return Promise.resolve(
			$.post('/basket/remove', {id})
				.then(
					{data} => this.refresh(data)
				)
		)
	}

	refresh (data) {
		this.data = data;
		$(this).trigger('refresh');
	}

	static start () {
		global.BASKET = new Basket();
	}
}