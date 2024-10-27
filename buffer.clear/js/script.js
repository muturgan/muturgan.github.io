'use strict'


function makeBuffer() {
		let myBuffer = '';

		function newBuffer(param) {
			if (param === undefined) {
				return myBuffer;
			}

			myBuffer += param;
		}

		newBuffer.clear = function() {
				myBuffer = '';
		}

		return newBuffer;
}
