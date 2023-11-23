"use strict";

const tapSound = new Audio('audio/sound_22465.mp3');
const resetSound = new Audio('audio/sound_22469.mp3');

let gameField = document.getElementById("gameField");
let emptyCell = document.getElementsByName("item0");
let filledItems = document.getElementsByClassName("filled");
let resetButton = document.getElementById("reset");
let checkbox = document.getElementById("valid");

checkbox.addEventListener("change", () => tapSound.play())

gameField.addEventListener("click", makeTurn);
resetButton.addEventListener("click", reset);





function makeTurn(event) {
  let target = event.target;
  if (target.getAttribute("name").substr(0, 4) != "item" && target.getAttribute("name") != "item0") return;

  let targetCoords = target.getBoundingClientRect();
  let targetY = targetCoords.top;
  let targetX = targetCoords.left;
  let targetAllCSS = getComputedStyle(target);
  let targetTop = targetAllCSS.top;
  let targetLeft = targetAllCSS.left;

  let emptyCellCoords = emptyCell[0].getBoundingClientRect();
  let emptyCellY = emptyCellCoords.top;
  let emptyCellX = emptyCellCoords.left;
  let emptyCellAllCSS = getComputedStyle(emptyCell[0]);
  let emptyCellTop = emptyCellAllCSS.top;
  let emptyCellLeft = emptyCellAllCSS.left;

  let currentPropValue = "";

  if ((targetY < emptyCellY) && ((emptyCellY - targetY) < 130) && (Math.abs(targetX - emptyCellX) < 15)) {
    currentPropValue = parseInt(targetTop);
    target.style.top = +currentPropValue + 100 + "px";

    currentPropValue = parseInt(emptyCellTop);
    emptyCell[0].style.top = +currentPropValue - 100 + "px";

    tapSound.play();
    return;
  }

  if ((targetY > emptyCellY) && ((targetY - emptyCellY) < 130) && (Math.abs(targetX - emptyCellX) < 15)) {
    currentPropValue = parseInt(targetTop);
    target.style.top = +currentPropValue - 100 + "px";

    currentPropValue = parseInt(emptyCellTop);
    emptyCell[0].style.top = +currentPropValue + 100 + "px";

    tapSound.play();
    return;
  }

  if ((targetX < emptyCellX) && ((emptyCellX - targetX) < 130) && (Math.abs(targetY - emptyCellY) < 15)) {
    currentPropValue = parseInt(targetLeft);
    target.style.left = +currentPropValue + 100 + "px";

    currentPropValue = parseInt(emptyCellLeft);
    emptyCell[0].style.left = +currentPropValue - 100 + "px";

    tapSound.play();
    return;
  }

  if ((targetX > emptyCellX) && ((targetX - emptyCellX) < 130) && (Math.abs(targetY - emptyCellY) < 15)) {
    currentPropValue = parseInt(targetLeft);
    target.style.left = +currentPropValue - 100 + "px";

    currentPropValue = parseInt(emptyCellLeft);
    emptyCell[0].style.left = +currentPropValue + 100 + "px";

    tapSound.play();
    return;
  }
}




function reset() {
  goHome();

  let numPool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,];

  let newPool = shuffle(numPool);

  if (checkbox.checked) {
    while (!checkForConvergence(newPool)) {
      newPool = shuffle(numPool);
    }
  }

  for (let i = 0; i < 15; i++) {
    filledItems[i].innerHTML = newPool[i];
  }

  resetSound.play();
}




function shuffle(numPool) {
  for (let j, x, i = numPool.length; i; j = parseInt(Math.random() * i), x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
  return numPool;
}



function checkForConvergence(pool) {
	let n = 0;

	for (let i = 0; i < pool.length; i++) {
		for (let j = i + 1; j < pool.length; j++) {
			if (pool[i] > pool[j]) n++;
		}
	}

	if (n % 2) {
		return false;
	} else {
		return true;
	}
}



function goHome() {

	for (let i = 0; i < filledItems.length; i++) {
		filledItems[i].style.top = "0px";
		filledItems[i].style.left = "0px";
	}

	emptyCell[0].style.top = "0px";
	emptyCell[0].style.left = "0px";
}
