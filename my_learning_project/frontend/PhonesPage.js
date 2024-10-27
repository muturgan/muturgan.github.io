import PhonesService from "./phones-service.js";
import Component from "./Component.js";
import PhonesFilterControl from './PhonesFilterControl.js';
import PhonesSortControl from './PhonesSortControl.js';
import PhoneDetails from './PhoneDetails.js';
import PhonesList from './PhonesList.js';
import ShoppingCart from './ShoppingCart.js';

export default class PhonesPage extends Component {
	constructor({ container, }) {
		super(container);

		this._container = container;

		this._render();

		this._initPhonesFilterControl();
		this._initPhonesSortControl();
		this._initShoppingCart();
		this._initPhoneDetails();
		this._initPhonesList();


		this._phonesList.element.addEventListener(`goodAdded`, (event) => {
			this._shoppingCart.addGoodsItem({
				container: this._shoppingCart.element,
				good: event.detail,
			});
		});

		this._phoneDetails.element.addEventListener(`goodAdded`, (event) => {
			this._shoppingCart.addGoodsItem({
				container: this._shoppingCart.element,
				good: event.detail,
			});
		});

		this._phonesList.element.addEventListener(`goodSelected`, (event) => {
			this._showPhoneDetails(event.detail);
		});

		this._phoneDetails.element.addEventListener(`detaisPageClosed`, () => {
			PhonesService.getPhones()
				.then(this._showPhonesList.bind(this));
		});

		this._phonesFilterControl.element.addEventListener(`goodsFiltred`, (event) => {
			this._phonesList.filter(event.detail);
		});

		this._phonesSortControl.element.addEventListener(`goodsSorted`, (event) => {
			this._phonesList.sort(event.detail);
		});
	}

	_render() {
		this._container.insertAdjacentHTML(`afterBegin`, `
			<aside class="sidebar">
				<!--Sidebar content-->
				<section data-component="controls"></section>
				<section data-component="shopping-cart"></section>
			</aside>

			<main class="main-content">
				<!--Body content-->
				<div data-component="phones-list"></div>
				<div data-component="phone-details"></div>
			</main>
		`);
	};

	_initPhonesFilterControl() {
		this._phonesFilterControl = new PhonesFilterControl({ container: document.body.querySelector(`[data-component="controls"]`), });
	};

	_initPhonesSortControl() {
		this._phonesSortControl = new PhonesSortControl({ container: document.body.querySelector(`[data-component="controls"]`), });
	};

	_initPhonesList() {
		this._phonesList = new PhonesList({
			container: document.body.querySelector(`[data-component="phones-list"]`),
		});

		PhonesService.getPhones()
			.then(this._showPhonesList.bind(this));
	};


	_initShoppingCart() {
		this._shoppingCart = new ShoppingCart({
			container: document.body.querySelector(`[data-component="shopping-cart"]`),
		});
	};

	_initPhoneDetails() {
		this._phoneDetails = new PhoneDetails({
			container: document.body.querySelector(`[data-component="phone-details"]`),
		});
	};

	_showPhoneDetails(phoneId) {
		PhonesService.getPhones(phoneId)
			.then(this._showSelectedPhone.bind(this))
			.then(this._phoneDetails.show())
			.then(this._phonesList.hide());
	};

	_showPhonesList(phones) {
		this._phonesList.setPhones(phones);
		this._phonesList.show();
		this._phoneDetails.hide();
	};

	_showSelectedPhone(phone) {
		this._phoneDetails.setSelectedPhone(phone);
	};
}