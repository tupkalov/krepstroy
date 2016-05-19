const 	className 		= 'banner',
		classNameStarted= 'banner_started',
		wrapperClass 	= 'banner__wrapper',
		itemClass 		= 'banner__item';

export class Banner{

	constructor (el) {
		this.el = el
		this.wrapperEl = el.querySelector(`.${wrapperClass}`)
		this.itemsEls = Array.from(this.wrapperEl.querySelectorAll(`.${itemClass}`))
		
		this.move(0);

		requestAnimationFrame(() => {
			el.className += ` ${classNameStarted}`;
		});
	}


	move (pos) {
		this.position = pos;
	}



















	static start () {
		Array.from(document.querySelectorAll(".banner"))
			.forEach(el => {
				return new Banner(el);
			})
	}
}