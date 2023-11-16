arr =[];
	max = 100;
	time_delay = 500;
	size = 16;
	no_of_null = 7;
	canvas = document.querySelector('canvas');
	max_width = canvas.width;
	max_height = canvas.height;
	serach_url = '../search.html'
	ctx = canvas.getContext("2d");
	rect = {
		width: 60,
		height: 24
	}

	init();
	animate();


// utility
	function randomize_an_array() {
		arr = [];
		copy = [];

		for(let i=0; i<size; i++) {
			arr.push("\\0");
			copy.push("\\0")
		}

		for(let i=0; i<size - no_of_null; i++) {
			arr[i] = Math.floor(Math.random() * max + 1);
			copy[i] = (arr[i]);
		}
	}

	function init() {	
			randomize_an_array();
			add_listeners();
	}

	function add_listeners() {
		document.querySelector(".arr__insert").addEventListener("click", () => {
			let div__parent = document.createElement("div");
			let html = `
				<div class="insert__details">
					<label for="insert__index">
						Index
						<input type="number" value="0" required id="insert__index" />
					</label>

					<label for="insert__value">
						Element Value
						<input type="number" value="0" required id="insert__value" />
					</label>
					<div class="insert__submit">
						<button>
							submit
						</button>
					</div>
				</div>
			`
			div__parent.innerHTML = html;
			div__parent.style.position = "absolute";
			div__parent.style.top = "0px";
			div__parent.style.left = "0px";
			div__parent.style.width = "100%";
			div__parent.style.height = "100vh";
			div__parent.style.textAlign = 'center';
			div__parent.style.display = 'flex';
			div__parent.style.justifyContent = 'center';
			div__parent.style.alignSelf = 'center';
			div__parent.style.background = "rgba(0, 0, 0, .7)";
			
			document.querySelector("body").appendChild(div__parent);

			document.querySelector(".insert__submit").addEventListener("click", () => {
				let index = document.querySelector("#insert__index").value;
				let value = document.querySelector("#insert__value").value;
				if(index < 0 || index >= size) {
					alert("indvalid index");
				}		
				else {
					div__parent.remove();
					insert_animation(value, index);
				}
			})
		})

		document.querySelector(".arr__delete").addEventListener("click", () => {
			let div__parent = document.createElement("div");
			let html = `
				<div class="insert__details">
					<label for="delete__index">
						Index
						<input type="number" value="0" required id="delete__index" />
					</label>

					<div class="delete__submit">
						<button>
							submit
						</button>
					</div>
				</div>
			`
			div__parent.innerHTML = html;
			div__parent.style.position = "absolute";
			div__parent.style.top = "0px";
			div__parent.style.left = "0px";
			div__parent.style.width = "100%";
			div__parent.style.height = "100vh";
			div__parent.style.textAlign = 'center';
			div__parent.style.display = 'flex';
			div__parent.style.justifyContent = 'center';
			div__parent.style.alignSelf = 'center';
			div__parent.style.background = "rgba(0, 0, 0, .7)";
			
			document.querySelector("body").appendChild(div__parent);

			document.querySelector(".delete__submit").addEventListener("click", () => {
				let index = +document.querySelector("#delete__index").value;
				if(index < 0 || index >= size) {
					alert("indvalid index");
				}		
				else {
					div__parent.remove();
					delete_animation(index);
				}
			})
		})

		document.querySelector(".arr__search").addEventListener("click", () => {
			location.href = serach_url;	
		})
	}



	function clear(x1=0, y1=0, width=max_width, height=max_height) {
			ctx.fillStyle = 'black';
			ctx.fillRect(x1, y1, width, height)
	}

	function animate(glit_color=-1) {
		clear(0, 0, max_width, max_height);
		copy.forEach((e, i) => {
			ctx.fillStyle = "white";
			lit = 0
			ctx.fillRect(i * rect.width + i + 10, 30, rect.width, rect.height);
			ctx.fillStyle = 'black';
			ctx.font = 'bold 15px ubuntu'
			ctx.fillText(`${e}`, i * rect.width + i + rect.width/2 + 10 , 16 + 30)
			ctx.fillStyle = 'white';
		})
		ctx.font = 'normal 12px monospace'
		ctx.fillText("Original Array", max_width - 990, 16)
		ctx.fillStyle = 'black';

		arr.forEach((e, i) => {
			ctx.fillStyle = "white";
			lit = 0;
			if(i == glit_color) {
				ctx.fillStyle = "red";
				ctx.fillRect(i * rect.width + i + 10, max_height/2 - 6, rect.width, rect.height);
				lit = 10;
			}
			else {
				ctx.fillRect(i * rect.width + i + 10, max_height/2, rect.width, rect.height);
			}	
			ctx.fillStyle = 'black';
			ctx.font = 'bold 15px ubuntu'
			ctx.fillText(`${e}`, i * rect.width + i + rect.width/2 + 10, max_height/2 + rect.height * (3/4) - lit)
			ctx.fillStyle = 'black';
		})

		let p = [];
		for(let i=0; i<size; i++) {
			p.push(i);
		}

		p.forEach((e, i) => {
			ctx.fillStyle = "white";	
			ctx.fillRect(i * rect.width + i + 10, max_height/2 + 2 * rect.height, rect.width, rect.height * (3 / 4));
			ctx.fillStyle = 'black';
			ctx.font = 'bold 15px ubuntu'
			ctx.fillText(`${e}`, i * rect.width + i + rect.width/2 + 10, max_height/2 + rect.height * (3/4) + (7.5 / 4) * rect.height)
			ctx.fillStyle = 'black';
		})
		ctx.fillStyle = "white";
		ctx.font = "bolder 12px monospace";
		ctx.fillText("Index", 10, max_height/2 + 45)

	}

	async function insert_animation(value, index) {
		if(arr.indexOf("\\0") == -1) {
			alert("can't insert becase array is full");
			return;
		}
		else {
			let p = size - 1;
			for(let j = p; j > index; j--) {
				arr[j] = arr[j - 1];
				await sleep(time_delay).then(() => {
					animate(j - 1);
				})
				if(value != "\\0") {
					ctx.fillStyle = "red";
					ctx.fillRect(2, 2, rect.width, rect.height);
					ctx.fillStyle = "yellow";
					ctx.fillText(value, rect.width / 2 - 2, rect.height / 2 + 10);
					ctx.fillStyle = "black";
					ctx.fillText("Temp value", rect.width / 2 + 50, rect.height / 2 + 10)
				}
			}
			arr[index] = value;
			animate();
			// ctx.fillStyle = "lightgreen";
			// ctx.fillRect(2, 2, rect.width, rect.height);
			// ctx.fillStyle = "black";
		}
	}
	
	async function delete_animation(index) {
		let p = 0;
		arr.forEach((e) => {
			p += +e;
		})
		if(p == size) {
			alert("empty array can't delete anything")
			return;
		}
		else {
			for(let j = index; j < size - 1; j++) {
				arr[j] = arr[j + 1];
				await sleep(time_delay).then(() => {
					animate(j + 1);
				})
			}
			arr[size - 1] = "\\0";
			animate();
			ctx.fillStyle = "lightgreen";
			ctx.fillRect(2, 2, rect.width, rect.height);
			ctx.fillStyle = "black";
		}
	}


	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}