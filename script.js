let playBTN = document.getElementById("btn-play");
let pause = document.getElementById("btn-pause");
let audioFile = document.getElementById("player");
let progressBar = document.getElementById("file")

//Creats a song class that wil represent all the song in the music player
class Song{
    constructor(file, playbtn, pausebtn){
        this.playbtn = playbtn;
        this.pausebtn = pausebtn;
        this.file = file;
    }

    play(){
        this.playbtn.onclick = () => {
            this.file.play();
            setInterval(updateTime,1000);
        }
    }

    Pause(){
        this.pausebtn.onclick = () => {
            this.file.pause();
            clearInterval(updateTime,1000);
        }
    }

}
let mySong  = new Song(audioFile,playBTN,pause);
mySong.play();
mySong.Pause();

function updateTime() {
    const currentTime = audioFile.currentTime;
    const duration = audioFile.duration;
    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;
}


