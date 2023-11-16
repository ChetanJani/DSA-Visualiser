arr =[];
max = 100;
time_delay = 500;
canvas = document.querySelector('canvas');
max_width = canvas.width;
max_height = canvas.height;

queue_width = 200;
ctx = canvas.getContext("2d");
size = 10;
rect = {
    width: 60,
    height: 24
}

init();
animate();

	function randomize_an_array() {
		arr = [];
		queue = [];
		for(let i=0; i<size; i++){
			arr.push(Math.floor(Math.random() * max + 1));
		}
	}

	function init() {	
			randomize_an_array();
			create_queue();
			document.querySelector(".enqueue").addEventListener("click", () => {
				enqueue();
			})
			
			document.querySelector(".dequeue").addEventListener("click", () => {
				dequeue();
			})

	}

	function create_queue() {
		ctx.fillStyle = 'lightgreen';
		ctx.fillRect(max_width - queue_width, 0, queue_width, max_height)
		ctx.fillStyle = 'black';
		ctx.fillRect(max_width - queue_width, max_height - rect.height / 2 - 3, queue_width, 1)
		ctx.font = 'bold 15px ubuntu'	
		ctx.fillText("QUEUE", max_width - queue_width / 2 - 15, max_height - 1);
	}


	function clear(x1=0, y1=0, width=max_width, height=max_height) {
			ctx.fillStyle = 'lightgreen';
			ctx.fillRect(x1, y1, width, height)
	}

	function animate() {
		clear(0, 0, max_width, max_height);
		create_queue();
		arr.forEach((e, i) => {
			ctx.fillStyle = "black";	
			ctx.fillRect(i * rect.width + i + 10, max_height/2, rect.width, rect.height);
			ctx.fillStyle = 'white';
			ctx.font = 'bold 15px ubuntu'
			ctx.fillText(`${e}`, i * rect.width + i + rect.width/2 + 10, max_height/2 + rect.height * (3/4))
			ctx.fillStyle = 'black';
		})	
		queue.forEach((e, i) => {
			if(i == queue.length - 1) {
				ctx.fillStyle = "green";					
			}
			else if(i == 0) {
				ctx.fillStyle = "blue";	
			}
			else {
				ctx.fillStyle = "white";	

			}
			let h = max_height - rect.height - i*(rect.height/2) - i -4;
			ctx.fillRect(max_width - queue_width + 5, h, queue_width - 10, rect.height / 2);
			ctx.fillStyle = 'black';
			ctx.font = 'bold 12px ubuntu'
			ctx.fillText(`${e}`, max_width - queue_width / 2, h + rect.height/2 - 1)
			ctx.fillStyle = 'black';
		});
	}

	function enqueue() {
		if(queue.length == size) {
			alert("queue Full");
		}
		else if(arr.length == 0) {
			alert("No Element is present to enqueue");
			window.location.reload();
		}
		else {
			queue.push(arr.shift());
			animate();
		}
	}

	function dequeue() {
		if(queue.length == 0) {
			if(arr.length == 0) {
				alert("Empty queue can't dequeue further");
				window.location.reload();
			}
			else {
				alert("Empty queue,  please enqueue something to dequeue")
			}
		}
		else {
			queue.splice(0, 1);
			animate();
		}
	}
