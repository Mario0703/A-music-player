const playBTN = document.querySelectorAll("#btn-play")
const audioFile = document.querySelectorAll("#player");
const progressBar = document.querySelectorAll("#file");

let paused = true;
let Volume = document.getElementById("myRange") 
let currentVolume = Volume.value; // global variable to store current volume level

//Function that updates the audio changer
function updateVolume() {
    currentVolume = Volume.value;
    audioFile.forEach((file) =>{
        console.log(file);
    });
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
            
                requestAnimationFrame(() => {
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
    this.file.currentTime = 0
    }

}
const songs = [];
for(let i = 0; i<audioFile.length; i++){
    const song = new Song(audioFile[i],playBTN[i],progressBar[i],Volume);
    songs.push(song);
}

for(let i in songs){
    songs[i].play();
}