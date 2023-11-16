let ctx = document.querySelector("canvas").getContext("2d");
	width =  20;
	height = 400;
	time_delay = 400;
	size = 0;
	s = [];
	d = [];
	h = [];
	init();

	function init() {
		pw = ctx.canvas.width / 4;
		w = 10;
		hh = 400;
		for(let i=0; i<3; i++) {
			ctx.fillStyle = "black";
			ctx.fillRect((i + 1) * pw - w, ctx.canvas.height - hh, w + w, hh);
		}
		add_listeners();
	}

	function add_listeners() {
		document.querySelector(".solve").addEventListener("click", () => {
			num = document.querySelector(".number").value;
			if(num == "") {
				alert("please enter the size");
				return;
			}
            // console.log(num);
			num = +num;
            // console.log(num);
			if(num > 5 || num < 0) {
				alert("Size should lie in the range (1, 5]")
				return
			}
			size = num;

			for(let i = size; i>0; i--) {
				s.push(i);
			}
			document.querySelector(".solve").disabled = true;
			stepsToSolveHanoiT(size, s, h, d);
		})
	}

	async function draw() {
		pw = ctx.canvas.width / 4;
		w = 10;
		hh = 400;
		ctx.fillStyle = "lightgreen";
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		// await sleep(time_delay).then(() => {
			for(let i=0; i<3; i++) {
				ctx.fillStyle = "black";
				ctx.fillRect((i + 1) * pw - w, ctx.canvas.height - hh, w + w, hh);
			}
		// })

		hh = 25;
		for(let i=0; i<s.length; i++) {
			// await sleep(time_delay).then(() => {
				ctx.beginPath();
				ctx.fillStyle = "yellow";
				ctx.fillRect((1) * pw - s[i] * 25, ctx.canvas.height - (i + 1) * hh, s[i] * 50, hh);
				ctx.strokeStyle = "white";
				ctx.strokeRect((1) * pw - s[i] * 25, ctx.canvas.height - (i + 1) * hh, s[i] * 50, hh);
				ctx.closePath();
			// })
		}

		for(let i=0; i<h.length; i++) {
			// await sleep(time_delay).then(() => {
				ctx.beginPath();
				ctx.fillStyle = "yellow";
				ctx.fillRect((2) * pw - h[i] * 25, ctx.canvas.height - (i + 1) * hh, h[i] * 50, hh);
				ctx.strokeStyle = "white";
				ctx.strokeRect((2) * pw - h[i] * 25, ctx.canvas.height - (i + 1) * hh, h[i] * 50, hh);
				ctx.closePath();
			// })
			
		}

		for(let i=0; i<d.length; i++) {
			// await sleep(time_delay).then(() => {
				ctx.beginPath();
				ctx.fillStyle = "yellow";
				ctx.fillRect((3) * pw - d[i] * 25, ctx.canvas.height - (i + 1) * hh, d[i] * 50, hh);
				ctx.strokeStyle = "white";
				ctx.strokeRect((3) * pw - d[i] * 25, ctx.canvas.height - (i + 1) * hh, d[i] * 50, hh);
				ctx.closePath();
			// })
		}
	}

	async function stepsToSolveHanoiT(size, s, h, d) {
		if (size >= 1) {
		    await stepsToSolveHanoiT(size - 1, s, d, h);
		   	await sleep(time_delay).then(() => {
		   		draw();
		   	});
		   	d.push(s[s.length - 1]);
		   	s.pop();
		   	await sleep(time_delay).then(() => {
		   		draw();
		   	});        
		    await stepsToSolveHanoiT(size - 1, h, s, d);
		  }
		  
		  return;
	}

	
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
