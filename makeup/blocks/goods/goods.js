import {$} from "../../source/libs";

const className = "goods",
	  itemClass = "good-item",
	  itemProcessClass = `${itemClass}_processing`,
	  itemBuyedClass = `${itemClass}_in-basket`,
	  buttonClass = `${itemClass}__button`,
	  counterClass = `${itemClass}__counter`;

export class Goods{

	constructor (el) {
		this.el = el;
		
		$(el).on('click', `.${buttonClass}`, event => {
			let $good = $(event.currentTarget).closest(`.${itemClass}`),
				id = $good.data('id');

			
			let promise;
			if(!$good.hasClass(itemBuyedClass)){
				let count = parseInt($good.find(`.${counterClass} input`).val());
				promise = BASKET.add(id, count);
			}else{
				promise = BASKET.remove(id);
			}

			$good.addClass(itemProcessClass);
			promise.then(
				() => $good.removeClass(itemProcessClass)
			);
		});
	}



	static start () {
		Array.from(document.querySelectorAll(`.${className}`))
			.forEach(el => {
				return new Goods(el);
			})
	}
}