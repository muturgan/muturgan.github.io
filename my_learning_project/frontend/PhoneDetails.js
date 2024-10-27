import Component from "./Component.js";

export default class PhoneDetails extends Component {
   constructor({ container, }) {
		super(container);

		this._container = container;
		this._selectedPhoneData = {};
      this._filteredData = {};

		this._component = document.createElement(`div`);
      this._component.classList.add(`js-hidden`);
	}


   setSelectedPhone(selectedPhonedata) {
      this._selectedPhoneData = selectedPhonedata;
      for (const key in this._selectedPhoneData) {
         if (key !== `images` && key !== `name` && key !== `description` && key !== `description` && key !== `id`) {
            this._filteredData[key] = this._selectedPhoneData[key];
         }
      }

      this._render();

      this._component.querySelector(`[data-action="add-to-chart"]`).addEventListener(`click`, (event) => {
         const customEvent = new CustomEvent(`goodAdded`, {
            detail: this._selectedPhoneData.name,
         });

         this._component.dispatchEvent( customEvent );
		});

      this._component.querySelector(`[data-action="back-to-list"]`).addEventListener(`click`, (event) => {
         const customEvent = new CustomEvent(`detaisPageClosed`);

         this._component.dispatchEvent( customEvent );
		});

      this._imagesList.addEventListener(`click`, (event) => {
         if (event.target.closest(`img`)) {
            this._mainImage.src = event.target.src;
         }
		});
   };

   _render() {
		this._component.innerHTML = `
         <img
            class="phone"
            data-indicator="main-image"
            src="${ this._selectedPhoneData.images[0] }"
         >

         <button
            data-action="add-to-chart"
            class="nav-button"
            >
               Add to chart
         </button>

         <button
            data-action="back-to-list"
            class="nav-button"
            href="#!"
            >
               <a
                  href="#!"
                  class="button-link"
                  >
                     Back to list
               </a>
         </button>

         <h1>${ this._selectedPhoneData.name }</h1>

         <p>${ this._selectedPhoneData.description }</p>
         <ul class="phone-thumbs"></ul>
         <ul class="specs"></ul>
      `;

      this._mainImage = this._component.querySelector(`[data-indicator="main-image"]`);

      this._imagesList = this._component.querySelector(`.phone-thumbs`);
      const specsList = this._component.querySelector(`.specs`);

      for (const image of this._selectedPhoneData.images) {
         this._imagesList.insertAdjacentHTML(`beforeEnd`, `
            <li>
               <img
                  src="${ image }"
                  class="highlighted-image"
               >
            </li>
         `);
      }

      let assistiveString = ``;


      //render Hardware
      assistiveString = `
         <li>
            <span>Hardware</span>
            <dl>
               <dt>CPU</dt>
               <dd> ${ this._selectedPhoneData.hardware.cpu } </dd>
               <dt>USB</dt>
               <dd> ${ this._selectedPhoneData.hardware.usb } </dd>
               <dt>Audio / headphone jack</dt>
               <dd> ${ this._selectedPhoneData.hardware.audioJack } </dd>
               <dt>FM Radio</dt>
               <dd> ${ this._selectedPhoneData.hardware.fmRadio
                     ? '<b class="available">✓</b>'
                     : '<span class="unavailable">✘</span>' }
               </dd>
               <dt>Accelerometer</dt>
               <dd> ${ this._selectedPhoneData.hardware.accelerometer
                     ? '<b class="available">✓</b>'
                     : '<span class="unavailable">✘</span>' }
               </dd>
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);


      //render Battery
      assistiveString = `
         <li>
            <span>Battery</span>
            <dl>
               <dt>Type</dt>
               <dd> ${ this._selectedPhoneData.battery.type || '-' } </dd>
               <dt>Talk Time</dt>
               <dd> ${ this._selectedPhoneData.battery.talkTime || '-' } </dd>
               <dt>Standby time (max)</dt>
               <dd> ${ this._selectedPhoneData.battery.standbyTime || '-' } </dd>
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);


      //render Storage and Memory
      assistiveString = `
         <li>
            <span>Storage and Memory</span>
            <dl>
               <dt>RAM</dt>
               <dd> ${ this._selectedPhoneData.storage.ram || '-' } </dd>
               <dt>Internal Storage</dt>
               <dd> ${ this._selectedPhoneData.storage.flash || '-' } </dd>
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);


      //render Connectivity
      assistiveString = `
         <li>
            <span>Connectivity</span>
            <dl>
               <dt>Network Support</dt>
               <dd> ${ this._selectedPhoneData.connectivity.cell } </dd>
               <dt>WiFi</dt>
               <dd> ${ this._selectedPhoneData.connectivity.wifi } </dd>
               <dt>Bluetooth</dt>
               <dd> ${ this._selectedPhoneData.connectivity.bluetooth } </dd>
               <dt>Infrared</dt>
               <dd> ${ this._selectedPhoneData.connectivity.infrared
                     ? '<b class="available">✓</b>'
                     : '<span class="unavailable">✘</span>' }
               </dd>
               <dt>GPS</dt>
               <dd> ${ this._selectedPhoneData.connectivity.gps
                     ? '<b class="available">✓</b>'
                     : '<span class="unavailable">✘</span>' }
               </dd>
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);


      //render Android
      assistiveString = `
         <li>
            <span>Android</span>
            <dl>
               <dt>OS Version</dt>
               <dd> ${ this._selectedPhoneData.android.os } </dd>
               <dt>UI</dt>
               <dd> ${ this._selectedPhoneData.android.ui } </dd>
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);


      //render Size and Weight
      assistiveString = `
         <li>
            <span>Size and Weight</span>
            <dl>
               <dt>Dimensions</dt>
               <dd> ${ this._selectedPhoneData.sizeAndWeight.dimensions[0] } </dd>
               <dd> ${ this._selectedPhoneData.sizeAndWeight.dimensions[1] } </dd>
               <dd> ${ this._selectedPhoneData.sizeAndWeight.dimensions[2] } </dd>
               <dt>Weight</dt>
               <dd> ${ this._selectedPhoneData.sizeAndWeight.weight } </dd>
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);


      //render Display
      assistiveString = `
         <li>
            <span>Display</span>
            <dl>
               <dt>Screen size</dt>
               <dd> ${ this._selectedPhoneData.display.screenSize } </dd>
               <dt>Screen resolution</dt>
               <dd> ${ this._selectedPhoneData.display.screenResolution } </dd>
               <dt>Touch screen</dt>
               <dd> ${ this._selectedPhoneData.display.touchScreen
                     ? '<b class="available">✓</b>'
                     : '<span class="unavailable">✘</span>' }
               </dd>
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);



      //render Camera
      assistiveString = `
         <li>
            <span>Camera</span>
            <dl>
               <dt>Primary</dt>
               <dd> ${ this._selectedPhoneData.camera.primary || '-' } </dd>
               <dt>Features</dt>
               ${this._selectedPhoneData.camera.features.map(item => `<dd>${item}</dd>`).join('') || '-' }
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);



      //render Availability
      assistiveString = `
         <li>
            <span>Availability</span>
            <dl>
      `;

      for (const availabilityFeature of this._selectedPhoneData.availability) {
         assistiveString += `<dd> ${ availabilityFeature || '-' } </dd>`;
      }

      assistiveString += `
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);



      //render Additional Features
      assistiveString = `
         <li>
            <span>Additional Features</span>
            <dl>
               <dd> ${ this._selectedPhoneData.additionalFeatures || '-' } </dd>
            </dl>
         </li>
      `;

      specsList.insertAdjacentHTML(`beforeEnd`, assistiveString);


		this._container.append(this._component);
	};
}