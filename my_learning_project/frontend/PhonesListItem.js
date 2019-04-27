import Component from "./Component.js";

export default class PhonesListItem extends Component {
	constructor({ container, features, }) {
		super(container);
		
		this._container = container;
		this._features = features;
		
		this._component = document.createElement(`li`);
		this._component.className = `thumbnail`;
		this._component.setAttribute(`data-element`, `phone-item`);
		this._component.setAttribute(`data-phone-name`, `${ this._features.name }`);
		this._component._features = features;
		
		this._render();
      
      this._component.addEventListener(`click`, (event) => {
			if (event.target.closest(`[data-action="show-details"]`)) {
				const customEvent = new CustomEvent(`goodSelected`, {
               bubbles: true,
					detail: this._features.id,
				});
				
				this._component.dispatchEvent( customEvent );
			}
		});
      
      this._component.querySelector(`[data-action="add-to-chart"]`).addEventListener(`click`, (event) => {
         const customEvent = new CustomEvent(`goodAdded`, {
            bubbles: true,
            detail: this._features.name,
         });
         
         this._component.dispatchEvent( customEvent );			
		});
	}
	
	_render() {
		this._component.innerHTML = `
		<a
         href="#!/phones/${ this._features.id }"
         data-action="show-details" class="thumb"
         >
            <img
               alt="${ this._features.id }"
               src="${ this._features.imageUrl }"
               width="100"
               height="100"
               class="highlighted-image"
               >
		</a>
      
		<a
         href="#!/phones/${ this._features.id }"
         data-action="show-details"
            >${ this._features.name }
      </a>
         
         
      <button
         class="phone-list-item-button nav-button"
         data-action="show-details"
         href="#!/phones/${ this._features.id }"
         >
            <a
               href="#!/phones/${ this._features.id }"
               data-action="show-details"
               class="button-link"
                  >Show details
            </a>
      </button>
      
      <button
         class="phone-list-item-button nav-button"
         data-action="add-to-chart"
            >Add to chart
      </button>
      
		<p>${ this._features.snippet }</p>
		`;
		
		this._container.append(this._component);
	};
}