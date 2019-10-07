/*TODO
	- coloring checking bars

done
	- bar position fitting
	- add animation to sorting
*/

(function() {
	'use strict';

	const canvas = document.querySelector("#jsCanvas");
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
	const ctx = canvas.getContext('2d');
	const form = document.querySelector(".jsForm");
	const input = document.querySelector("#jsInput");
	const clrBtn = document.querySelector("#jsClearBtn");
	const sortBtn = document.querySelector("#jsSortBtn");
	const shuffleBtn = document.querySelector("#jsShuffleBtn");

	// graph
	const canvasWidthRatio = 0.7;
	const canvasHeightRatio = 0.7;
	const barWidthRatio = 0.3;
	let delay = 10;

	let list = [];
	let listColor = [];
	let listWithColor = [];

	const clearCanvas = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	const drawGraph = function(listWithColor) {
		clearCanvas();
		const barNum = listWithColor.length;
		const graphWidth = (canvas.width * canvasWidthRatio);
		const eachWidth = graphWidth / barNum;
		const barWidth = eachWidth * barWidthRatio;
		const graphHeight = canvas.height * canvasHeightRatio;
		const leftBottom = [ canvas.width * ((1 - canvasWidthRatio)/2),
							canvas.height * ((1 + canvasHeightRatio)/2) ];
		const barShift = barNum != 1 ? eachWidth * (1-barWidthRatio) / (barNum-1) : 0;

		for (let i=0; i<barNum; ++i) {
			ctx.fillStyle = listWithColor[i][1];
			ctx.fillRect(leftBottom[0] + ((eachWidth+barShift)*i),
							leftBottom[1] - (graphHeight*((listWithColor[i][0]+1)/barNum)),
							barWidth,
							graphHeight*((listWithColor[i][0]+1)/barNum));
		}
	};

	const initList = function(event) {
		event.preventDefault();

		const num = input.value;
		if ( !Number.isInteger(Number(num)) ) {
			alert("Only Integer is allowed");
			return;
		}

		const tmpListWithColor = [];
		for (let i = 0; i < num; ++i) {
			tmpListWithColor[i] = [i, 'black'];
		}
		listWithColor = tmpListWithColor;

		clearCanvas();
		drawGraph(listWithColor);
	};
	const shuffleList = function(list) {
		for (let i = 1; i < list.length; ++i) {
			const randomIdx = Math.floor(Math.random() * (i+1));

			const tmp = list[i];
			list[i] = list[randomIdx];
			list[randomIdx] = tmp;
		}
	};
	const exchange = function(li, i, j) {
		let tmp = li[i];
		li[i] = li[j];
		li[j] = tmp;
	};
	const testExchange = function(li, i, j) {
		exchange(li, i, j);
	};

/*
	const nthSelectionSort = function(listWithColor, n) {
		let min=listWithColor[n][0];
		for (let i=n; i<listWithColor.length; ++i) {
		}
	};
*/

	const selectionSort = function(listWithColor) {
		let count = 0;
		let min;
		for (let i=0; i<listWithColor.length; ++i) {
			//++count;
			listWithColor[i][1] = 'red';
			const copy = JSON.parse(JSON.stringify(listWithColor));
			setTimeout(() => { drawGraph(copy); }, delay * (++count));
			min = i+1;
			for (let j=i+1; j<listWithColor.length; ++j) {
				//++count;
				listWithColor[j][1] = 'red';
				const copy = JSON.parse(JSON.stringify(listWithColor));
				setTimeout(() => { drawGraph(copy); }, delay * (++count));

				if (listWithColor[j][0] < listWithColor[min][0]) {
					listWithColor[min][1] = 'black';
					min = j;
					listWithColor[min][1] = 'green';
				} else
					listWithColor[j][1] = 'black';
			}
			if (min < listWithColor.length && listWithColor[min][0] < listWithColor[i][0])
				exchange(listWithColor, i, min);
			if (min < listWithColor.length)
				listWithColor[min][1] = 'black';
			listWithColor[i][1] = 'black';
		}
		setTimeout(() => { drawGraph(listWithColor); }, delay * (++count));
	};
	const sortCanvas = function(event) {
		selectionSort(listWithColor);
	};
	const shuffleCanvas = function(event) {
		shuffleList(listWithColor);
		for (let i=0; i<listWithColor.length; ++i)
			listWithColor[i][1] = 'black';
		drawGraph(listWithColor);
	};

	// main
	const main = function() {
		if (form)		{ form.addEventListener("submit", initList); }
		if (clrBtn)		{ clrBtn.addEventListener("click", clearCanvas); }
		if (sortBtn)	{ sortBtn.addEventListener("click", sortCanvas); }
		if (shuffleBtn)	{ shuffleBtn.addEventListener("click", shuffleCanvas); }
	};

	// execute
	(function() {
		main();
	})();
})();












