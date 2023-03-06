const playBTN = document.querySelectorAll("#btn-play")
const audioFile = document.querySelectorAll("#player");
const progressBar = document.querySelectorAll("#file");

let paused = true;
let isPLaying;
let ShuffleINdex;
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

    PLAY(){
        this.playbtn.onclick = () => {
            if(paused == true){
                this.file.play();
                isPLaying = this.file;
                song.innerHTML = this.file.audioFile;
                setInterval(() => {
                const currentTime =  this.file.currentTime;
                const duration =  this.file.duration;
                const progress = (currentTime / duration) * 100;
                this.progressBAR.value = progress
                })

            paused = false
            this.playbtn.innerHTML = "||"
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
            isPLaying.pause();
        }
    }

    shuffle(){
        this.file.play();
    }
}

shuffle.addEventListener("click",play)
const songs = [];
const ShuffledQueue = [];

//Push songs to array
for(let i = 0; i<audioFile.length; i++){
    const song = new Song(audioFile[i],playBTN[i],ResetBTN,progressBar[i],Volume);
    songs.push(song);
}

for(let i in songs){
    songs[i].PLAY();
    songs[i].ResetSong();
}
let counter = songs.length
//Add event lisented when ened to songs
function play(){
    for(let i in songs){
        songs[i].file.addEventListener("ended",next)
    }
    //shuffle feature
    while (counter > 0){
        let index = Math.floor(Math.random() * counter);
        ShuffledQueue[index] = songs[index];
        counter--

        let temp = songs[counter];
        ShuffledQueue[counter] = songs[index];
        songs[index] = temp;

    }
    console.log("Shuffled:",ShuffledQueue,"songs:",                                                                                         songs)
    ShuffleINdex = 0
    ShuffledQueue[0].shuffle();
}
//Play the next song in the queue
function next(){
    ShuffleINdex++;
    ShuffledQueue[ShuffleINdex].shuffle();
}


