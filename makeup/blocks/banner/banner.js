const 	className 		= 'banner',
		classNameStarted= 'banner_started',
		wrapperClass 	= 'banner__wrapper',
		itemClass 		= 'banner__item',


		timeout 		= 5000;

export class Banner{

	constructor (el) {
		this.el = el
		this.wrapperEl = el.querySelector(`.${wrapperClass}`)
		this.itemsEls = Array.from(this.wrapperEl.querySelectorAll(`.${itemClass}`))
		
		this.move(0);

		requestAnimationFrame(() => {
			el.className += ` ${classNameStarted}`;
		});

		this.start();

		this.initStopOnHover();
	}

	initStopOnHover () {

		this.el.addEventListener('mouseenter', () => this.stop())
		this.el.addEventListener('mouseleave', () => this.start())

	}


	move (pos) {
		pos = pos % this.itemsEls.length;
		this.position = pos;
		this.wrapperEl.style.transform = `translateX(${pos * -100}%)`;
	}


	start () {

		if(this._timer) return;

		this._timer = setTimeout(() => {

			this.move(this.position + 1);
			this.start();

		}, timeout)

	}


	stop () {

		if(this._timer){

			clearTimeout(this._timer);
			delete this._timer;

		}

	}









	static start () {
		Array.from(document.querySelectorAll(".banner"))
			.forEach(el => {
				return new Banner(el);
			})
	}
}