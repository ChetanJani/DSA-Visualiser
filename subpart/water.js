let ctx = document.querySelector("canvas").getContext("2d");
let size = 20;
let arr = [];
time_delay = 300;
pre = [];
let max = 10;
let area = 0;
next = [];
ans = [];
init();

function init() {
    min = 1;
    for(let i=0; i<size; i++) {
        p = Math.floor(Math.random() * (max - min + 1) + min);
        arr.push(p);
    }

    let ma = 0;

    for(let i=0; i<size; i++) {
        if(arr[ma] <= arr[i]) {
            ma = i;
        }
        pre.push(ma);
        
    }

    ma = size - 1;
    for(let i=0; i<size; i++) {
        next.push(0);
        ans.push(0)
    }
    for(let i=size - 1; i>-1; i--) {
        if(arr[ma] <= arr[i]) {
            ma = i;
        }
        next[i] = ma;
        
    }

    for(let i=0; i<size; i++) {
        if(arr[next[i]] < arr[pre[i]]) {
            ans[i] = arr[next[i]] - arr[i];
        }
        else {
            ans[i] = arr[pre[i]] - arr[i];	
        }
    }

    createHistogram();
    add_listeners();
}


function add_listeners() {
    document.querySelector(".visualise").addEventListener("click", () => {
        document.querySelector(".visualise").disabled = true;
        document.querySelector(".max").innerText = area;
        async function get() {
            for(let i=0; i<size; i++) {
                await sleep(time_delay).then(() => {
                    pw = ctx.canvas.width / size;
                    width = pw;
                    height = ((arr[i] + ans[i]) / max) * ctx.canvas.height;
                    y = ctx.canvas.height - height;
                    ctx.beginPath();
                    ctx.fillStyle = "blue";	
                    ctx.fillRect(i * pw, y , width, height);
                    area = area + arr[i] * ans[i];
                    document.querySelector(".max").innerText = area;
                    // }
                    createHistogram();
                })
            }
        }

        get();
    })
}

async function createCell(i, height) {
    pw = ctx.canvas.width / size;
    gap = 1;
    y = ctx.canvas.height - height;
    ctx.beginPath();
    ctx.fillStyle = "darkgray";	
    ctx.fillRect(i * pw, y , pw, height);

    ctx.strokeStyle = "white";		
    ctx.lineWidth  = 2;
    ctx.strokeRect(i * pw, y, pw, height);
}

async function createHistogram() {
    for(let i=0; i<size; i++) {
        createCell(i, (arr[i] / max) * ctx.canvas.height);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
