const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const titleEl = document.getElementById('title');
const artistEl = document.getElementById('artist');
const coverImg = document.getElementById('cover-img');
const coverContainer = document.getElementById('cover-container');
const playlistEl = document.getElementById('playlist');
const volumeSlider = document.getElementById('volume');
const autoplayCheckbox = document.getElementById('autoplay');

let isPlaying = false;
let songIndex = 0;

// Song list
const songs = [
    {title: "Apna Bana Le", artist: "Arijit Singh, Sachin-Jigar", src: "songs/apna_bana_le.mp3 copy.mp3", cover: "img/1.png"},
    {title: "Aaj Ki Raat", artist: "Vishal-Shekhar", src: "songs/aaj_ki_raat.mp3.Mp3", cover: "img/2.png"},
    {title: "Boyfriend", artist: "Ariana Grande, Social House", src: "songs/boyfriend.mp3.mp3", cover: "img/3.png"},
    {title: "For A Reason", artist: "John Doe", src: "songs/for_a_reason.mp3.mp3", cover: "img/4.png"},
    {title: "Kufar", artist: "Unknown Artist", src: "songs/kufar.mp3.mp3", cover: "img/5.png"},
    {title: "Danger", artist: "Vishal Dadlani, Parvathi Meenakshi, Sachin-Jigar, Amitabh Bhattacharya", src: "songs/danger.mp3.mp3", cover: "img/6.png"},
    {title: "Blinding Lights", artist: "The Weeknd", src: "songs/blinding_lights.mp3.mp3", cover: "img/7.png"},
    {title: "Levitating", artist: "Dua Lipa", src: "songs/levitating.mp3.mp3", cover: "img/8.png"},
    {title: "Heat Waves", artist: "Glass Animals", src: "songs/heat_waves.mp3.mp3", cover: "img/9.png"}
];


// Load song
function loadSong(index){
    const song = songs[index];
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    audio.src = song.src;
    coverImg.src = song.cover;
    updatePlaylistActive();
}

// Play/Pause
function playSong(){
    audio.play().catch(err => console.log(err));
    isPlaying = true;
    playBtn.innerHTML = "&#10074;&#10074;";
    coverContainer.classList.add('playing'); // rotate cover
}

function pauseSong(){
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = "&#9658;";
    coverContainer.classList.remove('playing'); // stop rotation
}

playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// Next / Previous
function nextSong(){
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    playSong();
}

function prevSong(){
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    playSong();
}

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Progress
audio.addEventListener('timeupdate', () => {
    if(audio.duration){
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
});

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(time){
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});
audio.volume = volumeSlider.value;

// Playlist
function renderPlaylist(){
    playlistEl.innerHTML = ""; // Clear previous items
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`; // Show Song - Artist
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songIndex);
            playSong();
        });
        playlistEl.appendChild(li);
    });
    updatePlaylistActive();
}

// Highlight active song
function updatePlaylistActive(){
    const items = playlistEl.querySelectorAll('li');
    items.forEach((item, index) => {
        item.classList.toggle('active', index === songIndex);
    });
}

// Autoplay
audio.addEventListener('ended', () => {
    if(autoplayCheckbox.checked){
        nextSong();
    } else {
        pauseSong();
    }
});

// Ensure DOM is loaded before rendering playlist
window.addEventListener('DOMContentLoaded', () => {
    renderPlaylist();
    loadSong(songIndex);
});
