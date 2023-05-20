"use strict";

document.addEventListener('DOMContentLoaded', () => {

const tone = {
    tonic:           ['до', 'до-диез', 'ре','ре-диез', 'ми', 'фа', 'фа-диез', 'соль', 'соль-диез', 'ля', 'ля-диез', 'си'],
	tonicShortEntry:   ['C',  'C#/D♭',   'D',  'D#/E♭',   'E',  'F',  'F#/G♭',    'G',   'G#/A♭',      'A',  'B',       'H'],
	tonicAbstractValue:  [1,   1.5,       2,    2.5,       3,   4,     4.5,      5,       5.5,         6,   6.5,         7],
	tonicArrayPosition:  [0,    1,        2,     3,        4,   5,      6,       7,        8,           9,   10,         11]
};

const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const accords = document.getElementsByName('accord');


const upAccordsList = () => {

	accords.forEach((accord) => {
		const accordInWork = accord.innerHTML;

		let stringInWork = '';

		let j = 0;
		while (accordInWork[0] != tone.tonicShortEntry[j]) {
			j++;
		}

		if (accordInWork[1] === '#') {j++;}
		if (j > 11) {j = 0;}
		if (accordInWork[1] === ('♭' || 'b')) {j--;}
		if (j < 0) {j = 11;}
		j++;
		if (j > 11) {j = 0;}
		if ((+tone.tonicAbstractValue[j] ^ 0) === +tone.tonicAbstractValue[j]) {
			stringInWork = tone.tonicShortEntry[j];
		} else {
			stringInWork = accordInWork[0] + '#';
		}

		let k = 1;
		const secondChar = accordInWork[1];
		if (secondChar === '#' || secondChar === '♭' || secondChar === 'b') {k = 2;}
		for (k; accordInWork[k]; k++) {
			stringInWork += accordInWork[k];
		}

		accord.innerHTML = stringInWork;
	});
}

const downAccordsList = () => {

	accords.forEach((accord) => {
		const accordInWork = accord.innerHTML;

		let stringInWork = '';

		let j = 0;
		while (accordInWork[0] != tone.tonicShortEntry[j]) {
			j++;
		}

		if (accordInWork[1] === '#') {j++;}
		if (j > 11) {j = 0;}
		if (accordInWork[1] === ('♭' || 'b')) {j--;}
		if (j < 0) {j = 11;}
		j--;
		if (j < 0) {j = 11;}
		if ((+tone.tonicAbstractValue[j] ^ 0) === +tone.tonicAbstractValue[j]) {
			stringInWork = tone.tonicShortEntry[j];
		} else {
			stringInWork = accordInWork[0] + '♭';
		}
		if (stringInWork === 'H♭') {stringInWork = 'B';}

		let k = 1;
		const secondChar = accordInWork[1];
		if (secondChar === '#' || secondChar === '♭' || secondChar === 'b') {k = 2;}

		for (k; accordInWork[k]; k++) {
			stringInWork += accordInWork[k];
		}

		accord.innerHTML = stringInWork;
	});
}

upButton.addEventListener("click", upAccordsList, {passive: true});
downButton.addEventListener("click", downAccordsList, {passive: true});

}, {once: true, passive: true});