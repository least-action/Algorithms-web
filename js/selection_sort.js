/*TODO
	- add animation to sorting
	- coloring checking bars

done
	- bar position fitting
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

	let list = [];

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
	const nthElementSort = function(list, n) {
		let min = n;
		for (let i=n; i<list.length; ++i) {
			if (list[i] < list[min])
				min = i;
		}
		exchange(list, n, min);
	};

	const clearCanvas = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
	const drawGraph = function(list) {
		clearCanvas();
		const barNum = list.length;
		const graphWidth = (canvas.width * canvasWidthRatio);
		const eachWidth = graphWidth / barNum;
		const barWidth = eachWidth * barWidthRatio;
		const graphHeight = canvas.height * canvasHeightRatio;
		const leftBottom = [ canvas.width * ((1 - canvasWidthRatio)/2),
							canvas.height * ((1 + canvasHeightRatio)/2) ];
		const barShift = barNum != 1 ? eachWidth * (1-barWidthRatio) / (barNum-1) : 0;

		ctx.fillStyle = 'black';
		for (let i=0; i<barNum; ++i) {
			ctx.fillRect(leftBottom[0] + ((eachWidth+barShift)*i),
							leftBottom[1] - (graphHeight*((list[i]+1)/barNum)),
							barWidth,
							graphHeight*((list[i]+1)/barNum));
		}
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
			tmpList[i] = i;
		list = tmpList;

		clearCanvas();
		drawGraph(list);
	};
	const sortCanvas = function(event) {
		for (let i=0; i<list.length; ++i) {
			setTimeout(() => {nthElementSort(list, i); drawGraph(list);}, 10 * i)
		}
	};
	const shuffleCanvas = function(event) {
		shuffleList(list);
		drawGraph(list)
	};

	// main
	(function() {
		if (form)		{ form.addEventListener("submit", initList); }
		if (clrBtn)		{ clrBtn.addEventListener("click", clearCanvas); }
		if (sortBtn)	{ sortBtn.addEventListener("click", sortCanvas); }
		if (shuffleBtn)	{ shuffleBtn.addEventListener("click", shuffleCanvas); }
	})();
})();












