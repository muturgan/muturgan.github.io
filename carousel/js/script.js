'use strict';
let leftButton = document.body.querySelector('#toLeft');
let rightButton = document.body.querySelector('#toRight');
let box = document.body.querySelector('.carousel');
let items = box.querySelectorAll('img');
let count = 0;

leftButton.addEventListener('click', leftButtonClickHandler);
rightButton.addEventListener('click', rightButtonClickHandler);


function leftButtonClickHandler() {
	box.append(items[0]);
	items = box.querySelectorAll('img');
}

function rightButtonClickHandler() {
	for (let item of items) {
		item.addEventListener('transitionend', itemTtransitionendHandler);
		item.classList.toggle('fast', false);
		item.style.left = '135px';
	}
}

function itemTtransitionendHandler() {
	count++;
	event.target.classList.toggle('fast', true);
	event.target.style.left = '0px';
	if (count % items.length === 0) {
		box.prepend(items[items.length - 1]);
		items = box.querySelectorAll('img');
		count = 0;
	}
}