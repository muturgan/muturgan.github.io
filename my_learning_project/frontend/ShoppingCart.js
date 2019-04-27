import Component from "./Component.js";
import AddedGoodsItem from './AddedGoodsItem.js';

export default class ShoppingCart extends Component {
	constructor({ container, }) {
		super(container);
		
		this._container = container;
		this._goods = [];
		
		this._component = document.createElement(`p`);
		
		this._render();
		
		this._addedGoods = this._component.querySelector(`.addedGoods`);
		this._emptyMarker = this._component.querySelector(`.empty-marker`);
		
		this._component.addEventListener(`click`, (event) => {
			if (event.target.classList.contains(`remove-good`)) {
				for (const good of this._goods) {
					if ( good.element === event.target.closest(`li`) ) {
						good.removeGood({
							goodsList: this._addedGoods,
							good: good.element,
						});
					}
				}
			}
		});
		
		const observer = new MutationObserver(() => {
			this._isEmpty();
		});
		observer.observe(this._addedGoods, { childList: true, });
	}
	
	_render() {
		this._component.innerHTML = `
			<b> Shopping Cart </b>
			<br>
			<span class="empty-marker"> Cart is empty </span>
			<ul class="addedGoods"></ul>
		`;
		
		this._container.append(this._component);
	};
	
   
	addGoodsItem({ container, good, }) {
      this._goods.push (new AddedGoodsItem({ container, good, }));
   };
      
      
	_isEmpty() {
		if (this._component.querySelector(`li`)) {
			this._emptyMarker.classList.add(`js-hidden`);
		} else {
			this._emptyMarker.classList.remove(`js-hidden`);
		}
	};
}