import Component from "./Component.js";

export default class AddedGoodsItem extends Component {
	constructor({ container, good, }) {
		super(container);
		
		this._container = container;
		this._good = good;
		
		this._component = document.createElement(`li`);
		
		this._render();
	}
	
	addGood({ goodsList, good, }) {
		for (const existentGood of goodsList.querySelectorAll(`li`)) {
			if (existentGood.firstElementChild.textContent === good) {
				existentGood.querySelector(`.goods-amount`).textContent = (
					existentGood.querySelector(`.goods-amount`).textContent[0] +
					( +existentGood.querySelector(`.goods-amount`).textContent.substring(1) + 1 ) );
				return;
			}
		}
		
		goodsList.lastElementChild.append(this._component);
	};
	
	removeGood({ goodsList, good, }) {
		if (+good.querySelector(`.goods-amount`).textContent.substring(1) > 1) {
			good.querySelector(`.goods-amount`).textContent = (
				good.querySelector(`.goods-amount`).textContent[0] +
				( +good.querySelector(`.goods-amount`).textContent.substring(1) - 1 ) );
		} else {
			goodsList.removeChild(good);
		}
	};
	
	_render() {
		this._component.innerHTML = `
			<span>${ this._good }</span>
         <br>
			<span class="goods-amount">x1</span>
			<button class="remove-good">x</button>
			`;
		
		this.addGood({
				goodsList: this._container,
				good: this._good,
			});
	};
}