/**
 * Copyright (C) Eliot Partridge, 2019. Licensed under MIT.
 */

// ID card dimensions = 92mm * 60 mm
// Apsect ratio = 1.533 : 1

const CANVAS_WIDTH  = 1533;
const CANVAS_HEIGHT = 1000;
const BORDER_RADIUS = 50;

window.addEventListener('DOMContentLoaded', () => {
	const canvas = document.querySelector('#id-card');
	if (!(canvas instanceof HTMLCanvasElement)) return;
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;
	const ctx = canvas.getContext('2d');
	if (!(ctx instanceof CanvasRenderingContext2D)) return;

	const bg = new Image();
	let bgPattern = null;
	bg.onload = () => {
		bgPattern = ctx.createPattern(bg, 'no-repeat');
		drawBox();
	}
	bg.src = './MLP-ID-Card.png';

	const drawBox = () => {
		ctx.beginPath();
		// top left
		ctx.arc(BORDER_RADIUS, BORDER_RADIUS, BORDER_RADIUS, Math.PI, 3 * Math.PI / 2);
		// top right
		ctx.arc(canvas.width - BORDER_RADIUS, BORDER_RADIUS, BORDER_RADIUS, 3 * Math.PI / 2, 0);
		// bottom right
		ctx.arc(canvas.width - BORDER_RADIUS, canvas.height - BORDER_RADIUS, BORDER_RADIUS, 0, Math.PI / 2);
		// bottom left
		ctx.arc(BORDER_RADIUS, canvas.height - BORDER_RADIUS, BORDER_RADIUS, Math.PI / 2, Math.PI);
		// finish path
		ctx.lineTo(0, BORDER_RADIUS);

		ctx.fillStyle = bgPattern || '#222';
		ctx.fill();
	}

	drawBox();

	const redrawCard = () => {
		const name = document.querySelector('#char-name').value.toUpperCase();
		const eyeColor = document.querySelector('#eye-color').value.toUpperCase();
		const cityEl = document.querySelector('#city');
		const city = cityEl.options[cityEl.selectedIndex].text.toUpperCase();

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		drawBox();

		ctx.fillStyle = '#060E21';
		ctx.font = '77pt \'Patrick Hand\',sans-serif';
		ctx.textBaseline = 'alphabetic';

		ctx.fillText(name, 536, 374, 500);
	};

	document.querySelectorAll(['input, select']).forEach(input => {
		input.addEventListener('input', redrawCard);
	});

	document.querySelector('#save').addEventListener('click', () => {
		const link = document.createElement('a');
		const imgData = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
		link.setAttribute('download', 'id-card.png');
		link.setAttribute('href', imgData);
		link.click();
	});
});
