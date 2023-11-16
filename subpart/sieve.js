let ctx = document.querySelector("canvas").getContext("2d");
	let size = 10;
	let pw = ctx.canvas.width / size;
	let ph = ctx.canvas.height / size;
	let sieve = [];
	let time_delay = 200;
	init();

	function init() { 
		for(let i=0; i< size * size + 1; i++) {
			sieve.push(1);
		}
		sieve[0] = 0;
		sieve[1] = 0;
		draw_array()
		add_listeners();
	}

	function draw_array() {
		for(let m=1; m<size * size + 1; m++) {
			i = Math.floor((m - 1) / size);
			j = Math.floor((m - 1) % size);
			
			ctx.fillStyle = "black";
			ctx.strokeStyle = "white";
			ctx.fillRect(j * pw, i * ph, pw, ph);
			ctx.strokeRect(j * pw, i * ph, pw, ph);
			ctx.fillStyle = "white";
			ctx.font = "bolder 12px serif"
			ctx.fillText(m, j * pw + pw / 2 - 4, i * ph + ph / 2 + 4)
		}
	}

	function add_listeners() {
		document.querySelector(".generate").addEventListener("click", () => {
			document.querySelector(".generate").disabled = true;
			generate_sieve();
		})
	}

	async function generate_sieve() {
		for(let m=1; m < size * size + 1; m++) {
			if(m == 1) {
				p = q = 0;
				ctx.fillStyle = "black";
				ctx.fillRect(q * pw, p * ph, pw, ph);
				ctx.strokeRect(q * pw, p * ph, pw, ph);
				continue;
			}

			i = Math.floor((m - 1) / size);
			j = Math.floor((m - 1) % size);
			val = m + 1;

			await sleep(time_delay).then(() =>{
				
			})
			if(sieve[m] == 1) {
				ctx.fillStyle = "yellow";
				ctx.fillRect(j * pw, i * ph, pw, ph);
				ctx.strokeRect(j * pw, i * ph, pw, ph);
				ctx.fillStyle = "red";
				ctx.font = "bolder 20px ubuntu";
				ctx.fillText(m, j * pw + pw / 2, i * ph + ph / 2);

				for(let n = m * m; n  < size * size + 1; n = n + m) {
					p = Math.floor((n - 1) / size);
					q = Math.floor((n - 1) % size);
					ctx.fillStyle = "black";
					ctx.strokeStyle = "black";
					sieve[n] = 0;
					await sleep(time_delay).then(() => {
						ctx.fillStyle = "black";
						ctx.fillRect(q * pw, p * ph, pw, ph);
						ctx.strokeRect(q * pw, p * ph, pw, ph);
					})
				} 
			}
		}
		document.querySelector(".generate").disabled = true;
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
