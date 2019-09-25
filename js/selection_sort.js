(function() {
	'use strict';

	const canvas = document.querySelector("#jsCanvas");
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
	const ctx = canvas.getContext('2d');
	const form = document.querySelector(".jsForm");
	const input = document.querySelector("#jsInput");
	const clrBtn = document.querySelector("#jsClearBtn");

	let list = [];

	class Rect {
	};

	const clearCanvas = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	const drawGraph = function(list) {
		ctx.fillStyle = 'black';

		ctx.fillRect(0, 0, 200, 200);
	};

	const initList = function(event) {
		event.preventDefault();

		const num = input.value;
		if ( !Number.isInteger(Number(num)) ) {
			alert("Only Integer is allowed");
			return;
		}

		const tmpList = [];
		for (let i = 0; i < num; ++i)
			tmpList[i] = i + 1;
		list = tmpList;

		clearCanvas();
		drawGraph(list);
	};

	const shuffleList = function(list) {
		for (let i = 1; i < list.length; ++i) {
			const randomIdx = Math.floor(Math.random() * (i+1));

			const tmp = list[i];
			list[i] = list[randomIdx];
			list[randomIdx] = tmp;
		}
	};

	// main
	(function() {
		if (form)	{ form.addEventListener("submit", initList); }
		if (clrBtn)	{ clrBtn.addEventListener("click", clearCanvas); }

		console.dir(canvas);
	})();
})();
