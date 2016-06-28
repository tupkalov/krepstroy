import {$} from "../../js/src/libs";

const __itemClass = "groups__item",
	  __itemActiveClass = 'groups__item_active',
	  __itemOpenClass = 'groups__item_open',
	  itemClass = 'groups-item',
	  itemActiveClass = 'groups-item_active', 
	  itemOpenClass = 'groups-item_open';

export class Groups{

	constructor (el) {
		this.el = el
		$(el).on('click', '.' + __itemClass, function(e){
			if($(e.target).closest(`.${itemClass}`).length === 0)
				return;


			$(e.currentTarget)
				.toggleClass(__itemOpenClass)
				.find('.' + itemClass)
				.toggleClass(itemOpenClass)

			if ($(e.currentTarget).has(__itemOpenClass))
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