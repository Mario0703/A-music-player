let playBTN = document.getElementById("btn-play");
let pause = document.getElementById("btn-pause");

let playBTN2 = document.getElementById("btn-play2");
let pause2 = document.getElementById("btn-pause2");

let audioFile = document.getElementById("player");
let audioFile2 = document.getElementById("player2");

let progressBar = document.getElementById("file");
let progressBar2 = document.getElementById("file2");


let Volume = document.getElementById("myRange") 
let currentVolume = Volume.value; // global variable to store current volume level

function updateVolume() {
    currentVolume = Volume.value;
    audioFile.volume = currentVolume;
    audioFile2.volume = currentVolume;
}

  
// add an event listener to the volume slider
Volume.addEventListener("input", updateVolume);

//Creats a song class that wil represent all the song in the music player
class Song{
    constructor(file, playbtn, pausebtn,progressBAR,volumeSlider){
        this.playbtn = playbtn;
        this.pausebtn = pausebtn;
        this.file = file;
        this.progressBAR = progressBAR
        this.volumeSlider = volumeSlider
    }

    play(){
        this.playbtn.onclick = () => {
            this.file.play();
            setInterval(() => {
                const currentTime =  this.file.currentTime;
                const duration =  this.file.duration;
                const progress = (currentTime / duration) * 100;
                this.progressBAR.value = progress
            })
        }
    }

    Pause(){
        this.pausebtn.onclick = () => {
            this.file.pause();
        }
    }

}
let mySong  = new Song(audioFile,playBTN,pause,progressBar,Volume);
let mySong2  = new Song(audioFile2,playBTN2,pause2,progressBar2,Volume);

mySong.play();
mySong.Pause();

mySong2.play();
mySong2.Pause();




