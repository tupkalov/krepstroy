const 	className 		= 'search',
		classListVisible = className + "_list-visible",

		inputClassName 	= className + '__input',
		formClassName 	= className + '__form',
		listClassName 	= className + '__list',
		listItemClassName 	= listClassName + '-item',
		submitClassName 	= className + '__submit';
import {$} from "../../source/libs";

import {_} from "underscore";


export class Search{

	constructor (el) {
		this.el = el;
		this.input = this.el.querySelector(`.${inputClassName}`);
		this.form = this.el.querySelector(`.${formClassName}`);
		this.submit = this.el.querySelector(`.${submitClassName}`);
		this.list = this.el.querySelector(`.${listClassName}`);

		$(this.form).on('submit', () => this.search());

		$(this.form).on('input', _.debounce(() => this.search(), 200));
	}

	search () {
		let query = this.input.value.trim().toLowerCase();
		return Promise.resolve(
			$.post('/search', {query})
				.then(({ data }) => this.build(data))
		)
	}

	build (data) {
		if(Array.isArray(data)){
			this.renderList(data);
			this.showList();
		}else{
			this.hideList();
		}
	}

	renderList (data) {
		if(data.length)
			this.list.innerHTML = data.map(doc => 
				`<a class="${listItemClassName}" href="/good/${doc._id}">${doc.name}</a>`
			).join('')
		else
			this.list.innerHTML = `<a class=${listItemClassName}>Ничего не найдено</a>`;
	}

	showList () {
		$(this.el).addClass(classListVisible);
	}
	
	hideList () {
		$(this.el).removeClass(classListVisible);
	}

	static start () {
		Array.from(document.querySelectorAll('.' + className))
			.forEach(el => {
				return new Search(el);
			})
	}
}