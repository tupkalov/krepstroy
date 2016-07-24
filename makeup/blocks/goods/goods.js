import {$} from "../../source/libs";

const className = "goods",
	  itemClass = "good-item",
	  itemProcessClass = `${itemClass}_processing`,
	  itemBuyedClass = `${itemClass}_buyed`,
	  buttonClass = `${itemClass}__button`,
	  counterClass = `${itemClass}__counter`;

export class Goods{

	constructor (el) {
		this.el = el;
		
		$(el).on('click', `.${buttonClass}`, event => {
			let $button = $(event.currentTarget),
				$good = $button.closest(`.${itemClass}`),
				id = $good.data('id');

			
			let promise;

			if(!$good.hasClass(itemBuyedClass)){
				let count = parseInt($good.find(`.${counterClass} input`).val());
				promise = BASKET.add(id, count)
					.then(() => 
						$good.addClass(itemBuyedClass)
					);

			}else
				promise = BASKET.remove(id)
					.then(() => 
						$good.removeClass(itemBuyedClass)
					);

			$button.attr('disabled', true);
			$good.addClass(itemProcessClass);
			promise.then(
				() => {
					$good.removeClass(itemProcessClass)
					$button.removeAttr('disabled')
				}
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