const playBTN = document.querySelectorAll("#btn-play")
const audioFile = document.querySelectorAll("#player");
const progressBar = document.querySelectorAll("#file");

let paused = true;
let isPLaying;
let Volume = document.getElementById("myRange"); 
let ResetBTN = document.getElementById("Reset-btn");
let shuffle = document.getElementById("shuffle");

let currentVolume = Volume.value; // global variable to store current volume level

//Function that updates the audio changer
function updateVolume() {
    currentVolume = Volume.value;
    audioFile.forEach((file) =>{
        file.volume = currentVolume;
    });
}

// add an event listener to the volume slider
Volume.addEventListener("input", updateVolume);

/*
Creats a song class that wil represent all the song in the music player
Here in the class it is possible to play pause and reset the songs.
*/
class Song{
    constructor(file, playbtn,ResetBTN,progressBAR,volumeSlider){
        this.playbtn = playbtn; 
        this.file = file;
        this.progressBAR = progressBAR;
        this.volumeSlider = volumeSlider;
        this.ResetBTN = ResetBTN;
    }

    play(){
        this.playbtn.onclick = () => {
            
            if(paused == true){
                this.file.play();
                isPLaying = this.file;
                setInterval(() => {
                const currentTime =  this.file.currentTime;
                const duration =  this.file.duration;
                const progress = (currentTime / duration) * 100;
                this.progressBAR.value = progress
                })

            paused = false
            this.playbtn.innerHTML = "||"
            console.log(this.file.title)
            }
       
            else{
                this.playbtn.innerHTML = "▶"
                this.progressBAR.value = 0;
                paused = true
                this.file.pause();
            }
            
        }
    }   

    ResetSong(){
        this.ResetBTN.onclick = () =>{
            isPLaying.currentTime = 0;
            this.playbtn.innerHTML = "▶"
        }
    }
}


shuffle.onclick = function(){
    songs.forEach(function(sound){
        sound.onended = onended;
    });
}

function onended(evt) {
    currentIndex = (currentIndex + 1) % songs.length; // increment our index
    songs[currentIndex].play(); // play the next sound
  }

const songs = [];
const ShuffledQueue = [];

for(let i = 0; i<audioFile.length; i++){
    const song = new Song(audioFile[i],playBTN[i],ResetBTN,progressBar[i],Volume);
    songs.push(song);
}

for(let i in songs){
    songs[i].play();
    songs[i].ResetSong();
}



