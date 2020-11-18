// get references to SVG components
let audios = ["Audio_One.mp3", "Audio_Two.mp3", "Audio_Three.mp3"]

let current_time = document.querySelector("#current_time")
let total_time = document.querySelector("#total_time")

let fill_bar = document.querySelector(".fill")

let pause_icon = document.querySelector("#pause_icon")
pause_icon.style.display = 'none'

let play_icon = document.querySelector("#play_icon")
let prev_icon = document.querySelector("#prev_icon")
let next_icon = document.querySelector("#next_icon")

let disk = document.querySelector("#disk")

let volume_circle = document.querySelector("#volume_circle")
let volume_range = document.querySelector("#volume_range")

let artist = document.querySelector("#artist_name")

// create audio object
let audio = new Audio()
let currentSong = 0

function togglePlayPause(){
    if(audio.paused){
        if(audio.src == ''){
            audio.src = audios[currentSong]
        }
        audio.play()

        play_icon.style.display = 'none'
        pause_icon.style.display = 'initial'

        artist.innerHTML = audios[currentSong]

        spin_disk()
    }
    else{
        audio.pause()

        pause_icon.style.display = 'none'
        play_icon.style.display = 'initial'

        artist.innerHTML = `${audios[currentSong]} is paused`

        disk.style.animationPlayState = 'paused'
    }
}

function spin_disk(){
    disk.style.animation = 'disk 4s linear infinite'
    disk.style.transformOrigin = 'center'
    disk.style.transformBox = 'fill-box'
}

play_icon.addEventListener('click', () => {
    togglePlayPause();
});

pause_icon.addEventListener('click', () => {
    togglePlayPause();
});

function nextAudio(){
    currentSong++;
    if(currentSong > 2){
        currentSong = 0;
    }

    audio.src = audios[currentSong];
    audio.play();

    play_icon.style.display = 'none'
    pause_icon.style.display = 'initial'

    artist.innerHTML = audios[currentSong]

    spin_disk()
}

next_icon.addEventListener('click', () => {
    nextAudio();
})

prev_icon.addEventListener('click', () => {
    currentSong--;
    if(currentSong < 0){
        currentSong = 2;
    }

    audio.src = audios[currentSong];
    audio.play();

    play_icon.style.display = 'none'
    pause_icon.style.display = 'initial'

    artist.innerHTML = audios[currentSong]

    spin_disk()
});

audio.addEventListener('timeupdate', () => {
    let ratio = audio.currentTime / audio.duration;
    fill_bar.style.width = ratio * 100 + "%";

    current_time.innerHTML = getTime(Math.floor(audio.currentTime));

    total_time.innerHTML = getTime(Math.floor(audio.duration));

    if(audio.ended){
        nextAudio();
    }
});

function getTime(seconds){
    let min = Math.floor(seconds/60)
    let sec = seconds % 60;

    if(min < 10){
        min = "0" + min
    }

    sec = (sec < 10) ? ("0" + sec) : sec;

    return min + ":" + sec
}

let circle_height = 26;
let range_height = 73.5;
volume_range.addEventListener('click', (e) => {
    let y_dest = e.clientY;

    let ratio = (y_dest - window.innerHeight / 2 + circle_height) / range_height;

    volume_circle.style.transformOrigin = 'center'
    volume_circle.style.transform = `translateY(${ratio * range_height - circle_height}px)`

    console.log(ratio)

    let volume_value = (ratio - 2) * (-1)
    console.log(volume_value)
    volume_value = volume_value < 0 ? 0 : volume_value
    volume_value = volume_value > 1 ? 1 : volume_value

    audio.volume = volume_value
});