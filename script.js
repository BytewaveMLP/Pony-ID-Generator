window.onload = function() {
	const canvas = document.querySelector('#id-card');
	const ctx = canvas.getContext('2d');

	const BORDER_RADIUS = 55;

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
};
