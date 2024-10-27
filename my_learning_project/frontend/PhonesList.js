import Component from "./Component.js";
import PhonesListItem from './PhonesListItem.js';

export default class PhonesList extends Component {
	constructor({ container, }) {
		super(container);

		this._container = container;
		this._phones = null;
		this._items = [];

		this._component = document.createElement(`ul`);
		this._component.className = `phones`;

		this._component.addEventListener(`goodSelected`, (event) => {
			event.stopPropagation();
		});

		this._component.addEventListener(`goodAdded`, (event) => {
			event.stopPropagation();
		});
	}

	_render() {
		for (const phoneFeatures of this._phones) {
			this._items.push (new PhonesListItem({
				container: this._component,
				features: phoneFeatures,
			}));
		}

		this._container.append(this._component);
	};

	setPhones(phones) {
		this._phones = phones;
		this._render();
	};

	sort(feature) {
		this._items.sort((a, b) => {
			if (a._features[`${feature}`] > b._features[`${feature}`]) {
				return -1;
			} else {
				return 1;
			}
		});

		for (const item of this._items) {
			this._component.prepend(item._component);
		}
	};

	filter(str) {
		str = str.toLowerCase();

		for (const item of this._items) {
			if (item._features.name.toLowerCase().includes(str)) {
				item.show();
			} else {
				item.hide();
			}
		}
	};
}