"use strict";

let gameField = document.body.querySelector('.game-field');
let ball = gameField.querySelector('#ball');

let ballRadius = 25;
ball.setAttribute('r', ballRadius);


gameField.addEventListener("click", gameFieldClickHandler);

function gameFieldClickHandler(event) {
	let gameFieldCoords = gameField.getBoundingClientRect();

	switch (true) {
		case (event.clientX - gameFieldCoords.left < ballRadius):
		ball.setAttribute('cx', ballRadius + 1);
		break;

		case (gameFieldCoords.left + parseInt(getComputedStyle(gameField).width) - event.clientX < ballRadius):
		ball.setAttribute('cx', parseInt(getComputedStyle(gameField).width) - (ballRadius + 2));
		break;

		default:
		ball.setAttribute('cx', event.clientX - gameFieldCoords.left);
	}

	switch (true) {
		case (event.clientY - gameFieldCoords.top < ballRadius):
		ball.setAttribute('cy', ballRadius);
		break;

		case (gameFieldCoords.top + parseInt(getComputedStyle(gameField).height) - event.clientY < ballRadius):
		ball.setAttribute('cy', parseInt(getComputedStyle(gameField).height) - (ballRadius + 2));
		break;

		default:
		ball.setAttribute('cy', event.clientY - gameFieldCoords.top);
	}
}