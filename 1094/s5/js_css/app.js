const container = document.querySelector('.container')
const card = document.querySelector('.card')
const car = document.querySelector('.car img')
const title = document.querySelector('.info h1')
const description = document.querySelector('.info h3')
const purchare = document.querySelector('.purchase button')
const models = document.querySelector('button.active')

//moving mouse animation
container.addEventListener("mousemove", (e) => {
    let x_value = (window.innerWidth/2 - e.pageX)/25;
    let y_value = (window.innerHeight/2 - e.pageX)/25;

    card.style.transform = `rotateY(${x_value}deg) rotateX(${y_value}deg)`;
});

//animate in
container.addEventListener("mouseenter", (e) => {
    card.style.transition = 'none';

    title.style.transform = "translateZ(150px)";
    car.style.transform = "translateZ(200px) scaleX(-1)";
    description.style.transform = "translateZ(125px)";
    models.style.transform = "translateZ(100px)";
    purchare.style.transform = "translateZ(75px)";
});


//animate out
container.addEventListener("mouseleave", (e) => {
    card.style.transition = 'all 0.5s ease';
    card.style.transform = "rotateY(0deg) rotateX(0deg)"

    title.style.transform = "translateZ(0px)";
    car.style.transform = "translateZ(0px) scaleX(1)";
    description.style.transform = "translateZ(0px)";
    models.style.transform = "translateZ(0px)";
    purchare.style.transform = "translateZ(0px)";
});