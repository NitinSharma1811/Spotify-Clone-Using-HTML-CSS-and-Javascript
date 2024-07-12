console.log("Welcome to the Spotify");
//Initialise the variables
let songIndex=0;
let audioElement = new Audio('songs/1.mp3');
let masterplay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"Paon Ki Jutti", filePath:"songs/1.m3",coverPath:"covers/1.jpg"},
    {songName:"Favourite", filePath:"songs/2.m3",coverPath:"covers/2.jpg"},
    {songName:"Raatan Lamiyan", filePath:"songs/3.m3",coverPath:"covers/3.jpg"},
    {songName:"Paon Ki Jutti", filePath:"songs/1.m3",coverPath:"covers/1.jpg"},
    {songName:"Paon Ki Jutti", filePath:"songs/1.m3",coverPath:"covers/1.jpg"},
    {songName:"Paon Ki Jutti", filePath:"songs/1.m3",coverPath:"covers/1.jpg"},
    
]

songItems.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    
})

// audioElement.play();

//Handle play pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0)
        {
            audioElement.play();
    masterplay.classList.remove('fa-play=circle');
    masterplay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
        }

    else{
        audioElement.pause();
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
    gif.style.opacity=0;
    }
})
//Listen to events i.e time update
audioElement.addEventListener('timeupdate',()=>{
    
    //Update the seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
            
        })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})