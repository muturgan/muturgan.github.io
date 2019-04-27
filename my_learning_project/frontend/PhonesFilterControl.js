import Component from "./Component.js";

export default class PhonesFilterControl extends Component {
	constructor({ container, }) {
		super(container);
		
		this._container = container;
		
		this._component = document.createElement(`p`);
		this._component.setAttribute(`data-component`, `phones-filter-control`);
		
		this._render();
      
      this._component.addEventListener(`input`, (event) => {
         let customEvent = new CustomEvent(`goodsFiltred`, {
            detail: event.target.value,
			});
				
			this._component.dispatchEvent( customEvent );
		});
	}
	
	_render() {
		this._component.innerHTML = `
			<label>
				Search: <br> <input type="text" class="filter">
			</label>
		`;
		
		this._container.append(this._component);
	};
}