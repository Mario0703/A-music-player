const playBTN = document.getElementById("btn-play");
const playBTN2 = document.getElementById("btn-play2");
const playBTN3 = document.getElementById("btn-play3");
const playBTN4 = document.getElementById("btn-play4");
const playBTN5 = document.getElementById("btn-play5");
const playBTN6 = document.getElementById("btn-play6");

const audioFile = document.getElementById("player");
const audioFile2 = document.getElementById("player2");
const audioFile3 = document.getElementById("player3");
const audioFile4 = document.getElementById("player4");
const audioFile5 = document.getElementById("player5");
const audioFile6 = document.getElementById("player6");

const progressBar = document.getElementById("file");
const progressBar2 = document.getElementById("file2");
const progressBar3 = document.getElementById("file3");
const progressBar4 = document.getElementById("file4");
const progressBar6 = document.getElementById("file6");
const progressBar5 = document.getElementById("file5");

let paused = true;
let Volume = document.getElementById("myRange") 
let currentVolume = Volume.value; // global variable to store current volume level

//Function that updates the audio changer
function updateVolume() {
    currentVolume = Volume.value;
    audioFile.volume = currentVolume;
    audioFile2.volume = currentVolume;
    audioFile3.volume = currentVolume;
    audioFile4.volume = currentVolume;
    audioFile5.volume = currentVolume;
    audioFile6.volume = currentVolume;

}

  
// add an event listener to the volume slider
Volume.addEventListener("input", updateVolume);

/*
Creats a song class that wil represent all the song in the music player
Here in the class it is possible to play pause and reset the songs.
*/
class Song{
    constructor(file, playbtn,progressBAR,volumeSlider){
        this.playbtn = playbtn        
        this.file = file;
        this.progressBAR = progressBAR
        this.volumeSlider = volumeSlider
    }

    play(){
        this.playbtn.onclick = () => {
            
            if(paused == true){
            
                this.file.play();
            
                setInterval(() => {
                const currentTime =  this.file.currentTime;
                const duration =  this.file.duration;
                const progress = (currentTime / duration) * 100;
                this.progressBAR.value = progress
                })

            paused = false
            console.log(paused)
            }
       
            else{
                this.progressBAR.value = 0;
                paused = true
                this.file.pause();
            }
            
        }
    }   

    ResetSong(){
    this.file.currentTime = 0
    }

}
let mySong  = new Song(audioFile,playBTN,progressBar,Volume);
let mySong2  = new Song(audioFile2,playBTN2,progressBar2,Volume);
let mySong3  = new Song(audioFile3,playBTN3,progressBar3,Volume);
let mySong4  = new Song(audioFile4,playBTN4,progressBar4,Volume);
let mySong5  = new Song(audioFile5,playBTN5,progressBar5,Volume);
let mySong6  = new Song(audioFile6,playBTN6,progressBar6,Volume);



mySong.play();
mySong2.play();
mySong3.play();
mySong4.play();
mySong5.play();
mySong6.play();
