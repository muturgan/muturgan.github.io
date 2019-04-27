export default class Component {
	constructor( container ) {
		this._container = container;
	}
	
	hide() {
		this._component.classList.add(`js-hidden`);
	};
	
	show() {
		this._component.classList.remove(`js-hidden`);
	};
		
	get element() {
		return this._component;
	};
}