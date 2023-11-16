let sec = document.querySelector('.section');
let heading = document.querySelector('.title');
let cnt = 0;

setInterval(() => {
    if(cnt % 2 == 0){
        // heading.innerHTML = "DSA Visualizer";
        heading.style.color = "white";
    }
    else{
        // heading.innerHTML = "By Chetan Jani";
        heading.style.color = "yellow";
    }
    cnt++;
}, 1000)

let details = [
{
    heading: 'Time Complexity',
    image: `Image/time_complexity.png`,
    link: 'subpart/time_complexity.html',
},
{
    heading: 'Array',
    image: `Image/array.png`,
    link: 'subpart/array.html',
},
{
    heading: 'Water Trapping',
    image: `Image/water.png`,
    link: 'subpart/water.html',
},
{
    heading: 'Sieve Algo',
    image: `Image/sieve.png`,
    link: 'subpart/sieve.html',
},
{
    heading: 'Tower of Hanoi',
    image: `Image/toh.jfif`,
    link: 'subpart/toh.html',
},
{
    heading: 'Queue',
    image: `Image/queue.png`,
    link: 'subpart/queue.html',
}
]

details.forEach((detail, index) => {
    add_card(detail, index);
}) 

function add_card(details, index) {
    let card = document.createElement('div');
    ['col-md-4'].forEach((el) => card.classList.add(el));
    card.style.transform = 'scale(.9)';
    let card_html = `
    <div class="card" style="border-radius : 20px" >
        <div class="card__heading"> ${details.heading} </div>
        <a href="${details.link}" target="_self" class="card-img-top-parent">
        <img src="${details.image}" class="card-img-top" alt="${details.heading}">
        </a>
        <div class="card-body"> </div>
    </div>
    `	     		
    card.innerHTML = card_html;
    sec.appendChild(card);
}



