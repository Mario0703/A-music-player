const playBTN = document.querySelectorAll("#btn-play");
const audioFile = document.querySelectorAll("#player");
const progressBar = document.querySelectorAll("#file");

let paused = true;
let isPLaying;
let ShuffleINdex;
let Volume = document.getElementById("myRange"); 
let ResetBTN = document.getElementById("Reset-btn");
let shuffle = document.getElementById("shuffle");
let CurrentSong = document.getElementById("f");
let Cover = document.getElementById("cover");
let NextSongPlaylist = document.getElementById("next-song");
let beforePlaylist = document.getElementById("song-before");


let currentVolume = Volume.value; // global variable to store current volume level
const songs_titles = ["See you again - Charlie Puth", "Dumb ways to die -Video game", "Infinity - LEMMiNO","Blinding Light -the Weeknd","Stor Mand - Tobias Rahim & Andreas Odbjerg", "Vi ta'r guldet med hjem - 8ball"];
const song_images = ["SongCoverImages/See you again Cover.jpg","SongCoverImages/Dumb Ways to Die Cover.jpg","SongCoverImages/Lemmino Infinity Cover.jpg","SongCoverImages/The Weeknd Blinding Lights.jpg","SongCoverImages/Stor mand.jpg","SongCoverImages/8ball.jpg"]
const SongMap = new Map();
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
    constructor(file, playbtn,ResetBTN,progressBAR,volumeSlider,artist,img){
        this.playbtn = playbtn; 
        this.file = file;
        this.progressBAR = progressBAR;
        this.volumeSlider = volumeSlider;
        this.ResetBTN = ResetBTN;
        this.artist = artist;
        this.img = img;
    }

    PLAY(){
        this.playbtn.onclick = () => {
            if(paused == true){
                this.file.play();
                isPLaying = this.file;                
                setInterval(() => {
                const currentTime =  this.file.currentTime;
                const duration =  this.file.duration;
                const progress = (currentTime / duration) * 100;
                this.progressBAR.value = progress;
                })
            paused = false;
            this.playbtn.innerHTML = "||";
            CurrentSong.innerHTML = this.artist;
            console.log(this.img)
            Cover.src = this.img
            }

            else{
                this.playbtn.innerHTML = "▶"
                this.progressBAR.value = 0;
                paused = true;
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

shuffle.addEventListener("click",play);
NextSongPlaylist.addEventListener("click",next)
beforePlaylist.addEventListener("click",next)

const songs = [];
const ShuffledQueue = [];

//Push songs to array
for(let i = 0; i<audioFile.length; i++){
    const song = new Song(audioFile[i],playBTN[i],ResetBTN,progressBar[i],Volume,songs_titles[i],song_images[i]);
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
    ShuffleINdex = 0;
    ShuffledQueue[0].shuffle();
}
//Play the next song in the queue
function next(){
    ShuffleINdex++;
    ShuffledQueue[ShuffleINdex].shuffle();
}