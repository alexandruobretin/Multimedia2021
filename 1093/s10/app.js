let video_player = document.getElementsByClassName("video_player")[0]
let video = document.querySelector('video')

let close_btn = document.querySelector('.close_btn')
close_btn.addEventListener('click', () => {
    video_player.style.display = "none"
})

let play_btns = document.querySelectorAll('.play_btn')

play_btns.forEach( btn => {
    btn.addEventListener('click', ()=> {
        let source = btn.getAttribute('file')
        console.log(source)

        video.src = "media/" + source
        video_player.style.display = "initial"
    })
})

function blackwhite(){
    video.style.filter = "grayscale(100%)";
}

function sepia(){
    video.style.filter = "sepia(100%)";
}

function invert(){
    video.style.filter = "invert(100%)";
}

function nofilter(){
    video.style.filter = "none";
}