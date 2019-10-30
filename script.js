// ID card dimensions = 92mm * 60 mm
// Apsect ratio = 1.533 : 1

const BORDER_RADIUS = 50;

window.addEventListener('DOMContentLoaded', () => {
	const canvas = document.querySelector('#id-card');
	if (!(canvas instanceof HTMLCanvasElement)) return;
	const ctx = canvas.getContext('2d');
	if (!(ctx instanceof CanvasRenderingContext2D)) return;

	const drawBox = () => {
		ctx.fillStyle = '#222';
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
		ctx.fill();
	}

	drawBox();

	const redrawCard = () => {
		const name = document.querySelector('#char-name').value;
		const age = document.querySelector('#age').value;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		drawBox();

		ctx.fillStyle = 'white';
		ctx.font = '100pt \'Patrick Hand\',sans-serif';
		ctx.textBaseline = 'alphabetic';

		ctx.fillText(name, 150, 150);
		ctx.strokeStyle = 'orange';
		ctx.lineWidth = 4;
		ctx.strokeText(name, 150, 150);
		ctx.fillStyle = 'black';
		ctx.fillText(age, 70, 170);
	};

	document.querySelectorAll('input').forEach(input => {
		input.addEventListener('change', redrawCard);
	});

	document.querySelector('#save').addEventListener('click', e => {
		const link = document.createElement('a');
		const imgData = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
		link.setAttribute('download', 'id-card.png');
		link.setAttribute('href', imgData);
		link.click();
	});
});
