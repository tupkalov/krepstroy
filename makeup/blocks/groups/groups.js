import {$} from "../../js/src/libs";

const __itemClass = "groups__item",
	  __itemActiveClass = 'groups__item_active',
	  itemClass = 'groups-item',
	  itemActiveClass = 'groups-item_active';

export class Groups{

	constructor (el) {
		this.el = el
		$(el).on('click', '.' + __itemClass, function(e){
			if($(e.target).closest(`.${itemClass}`).length === 0)
				return;

			$(e.currentTarget)
				.toggleClass(__itemActiveClass)
				.find('.' + itemClass)
				.toggleClass(itemActiveClass)

			if ($(e.currentTarget).has('__itemActiveClass'))
				setTimeout(() => {
					$(e.currentTarget).scrollintoview({
					    direction: "vertical"
					});
				}, 100)

			e.preventDefault();
		})
	}



	static start () {
		Array.from(document.querySelectorAll(".groups"))
			.forEach(el => {
				return new Groups(el);
			})
	}
}