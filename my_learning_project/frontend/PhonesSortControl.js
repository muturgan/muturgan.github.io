import Component from "./Component.js";

export default class PhonesSortControl extends Component {
	constructor({ container, }) {
		super(container);

		this._container = container;

		this._component = document.createElement(`p`);
		this._component.setAttribute(`data-component`, `phones-sort-control`);

		this._render();

		this._component.addEventListener(`change`, (event) => {
			const customEvent = new CustomEvent(`goodsSorted`, {
				detail: event.target.value,
			});

			this._component.dispatchEvent( customEvent );
		});
	}

	_render() {
		this._component.innerHTML = `
			<b> Sort by: </b>
			<select class="sort">
				<option value="age">Newest</option>
				<option value="name">Alphabetical</option>
			</select>
		`;

		this._container.append(this._component);
	};
}