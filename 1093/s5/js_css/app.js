const container = document.querySelector('.container')
const card = document.querySelector('.card')
const car = document.querySelector('.car img')
const title = document.querySelector('.title')
const description = document.querySelector('.description')
const buy = document.querySelector('.buy button')
const selected_model = document.querySelector('button.active')

// moving animation
container.addEventListener("mousemove", (e) => {
    let x_value = (window.innerWidth/2 - e.pageX)/25;
    let y_value = (window.innerWidth/2 - e.pageY)/25;

    card.style.transform = `rotateY(${x_value}deg) rotateX(${y_value}deg)`
});

//animate in
container.addEventListener("mouseenter", (e) => {
    card.style.transition = "none";

    // popout
    title.style.transform = "translateZ(150px)";
    car.style.transform = "translateZ(200px) rotateZ(-10deg) scaleX(-1)";
    description.style.transform = "translateZ(125px)";
    selected_model.style.transform = "translateZ(100px)";
    buy.style.transform = "translateZ(75px)";
});

//animate out
container.addEventListener("mouseleave", (e) => {
    card.style.transition = "all 0.5s ease";

    card.style.transform = "rotateY(0deg) rotateX(0deg)";
    title.style.transform = "translateZ(0px)";
    car.style.transform = "translateZ(0px) rotateZ(0deg) scaleX(1)";
    description.style.transform = "translateZ(0px)";
    selected_model.style.transform = "translateZ(0px)";
    buy.style.transform = "translateZ(0px)";
});