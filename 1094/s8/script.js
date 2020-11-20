let audios = ["Audio_One.mp3", "Audio_Two.mp3", "Audio_Three.mp3"]

let current_time = document.querySelector("#current_time")
let total_time = document.querySelector("#total_time")

let prev_icon = document.querySelector("#prev_icon")
let next_icon = document.querySelector("#next_icon")
let play_icon = document.querySelector("#play_icon")
let pause_icon = document.querySelector("#pause_icon")
pause_icon.style.display = "none";

let song = document.querySelector("#song")

let volume_circle = document.querySelector("#volume_circle")
let volume_range = document.querySelector("#volume_range")

let fill = document.querySelector(".fill")
let disk = document.querySelector("#disk")

// create the audio object
let audio = new Audio()
let current_song = 0;

function togglePlayPause(){
    if(audio.paused){
        if(audio.src == ""){
            audio.src = audios[current_song]
        }

        audio.play()

        play_icon.style.display = "none";
        pause_icon.style.display = "initial";

        // disk animation
        spin_disk()

        song.innerHTML = audios[current_song]
    }
    else{
        audio.pause();

        pause_icon.style.display = "none";
        play_icon.style.display = "initial";


        disk.style.animationPlayState = 'paused'
        song.innerHTML = `${audios[current_song]} is paused`
    }
}

function spin_disk(){
    disk.style.animation = 'disk 4s infinite linear';
    disk.style.transformOrigin = 'center';
    disk.style.transformBox = 'fill-box';
}

play_icon.addEventListener('click', () => {
    togglePlayPause()
});

pause_icon.addEventListener('click', () => {
    togglePlayPause()
});

audio.addEventListener("timeupdate", () => {
    let ratio = audio.currentTime / audio.duration
    fill.style.width = ratio * 100 + "%";

    let current = getTime(Math.round(audio.currentTime))
    let total = getTime(Math.round(audio.duration))
    
    current_time.innerHTML = current;
    total_time.innerHTML = total;

    if(audio.ended){
        //play next song
        nextTrack();
    }
});

function getTime(seconds){
    let min = Math.floor(seconds/60);
    let sec = seconds % 60;

    if(min < 10){
        min = "0" + min;
    }

    sec = sec < 10 ? "0" + sec : sec;

    return min + ":" + sec
}

function nextTrack(){
    current_song++
    if(current_song > 2){
        current_song = 0;
    }

    audio.src = audios[current_song];
    audio.play()

    play_icon.style.display = "none";
    pause_icon.style.display = "initial";

    // disk animation
    spin_disk()

    song.innerHTML = audios[current_song]
}

next_icon.addEventListener('click', () => {
    nextTrack();
});

prev_icon.addEventListener('click', () => {
    current_song--;
    if(current_song < 0){
        current_song = 2;
    }

    audio.src = audios[current_song];
    audio.play()

    play_icon.style.display = "none";
    pause_icon.style.display = "initial";

    // disk animation
    spin_disk()

    song.innerHTML = audios[current_song]
});

let range_height = 141.75;
let circle_height = 50.31;

volume_range.addEventListener('click', (e) => {
    let y_dest = e.clientY;
    let ratio = y_dest - window.innerHeight/2;

    volume_circle.style.transformOrigin = 'center';
    volume_circle.style.transform = `translateY(${ratio}px)`;

    let volume_value = (ratio + circle_height) / range_height;

    volume_value = (volume_value - 1) * (-1);

    volume_value = volume_value > 1 ? 1 : volume_value;
    volume_value = volume_value < 0 ? 0 : volume_value;

    audio.volume = volume_value;
})