const pages = {
    home: document.getElementById('home-page'),
    artists: document.getElementById('artists-page'),
    songs: document.getElementById('songs-page'),
    player: document.getElementById('player-page')
};

const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const volumeSliderProgress = document.getElementById('volume-slider-progress');
const lyricsContent = document.getElementById('lyrics-content');
const repeatButton = document.querySelector('.repeat-button');

let currentArtist = '';
let repeatMode = 'none';

function showPage(pageName) {
    Object.values(pages).forEach(page => page.style.display = 'none');
    pages[pageName].style.display = 'block';
}

function toggleRepeat() {
    repeatMode = repeatMode === 'none' ? 'one' : 'none';
    repeatButton.classList.toggle('active', repeatMode === 'one');
    audioPlayer.loop = repeatMode === 'one';
}

function rewindSong(seconds) {
    audioPlayer.currentTime += seconds;
}

function restartSong() {
    audioPlayer.currentTime = 0;
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function updateVolumeSlider() {
    volumeSliderProgress.style.width = `${audioPlayer.volume * 100}%`;
}

updateVolumeSlider();

playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audioPlayer;
    progress.style.width = `${(currentTime / duration) * 100}%`;
    currentTimeElement.textContent = formatTime(currentTime);
    durationElement.textContent = formatTime(duration);
});

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = pos * audioPlayer.duration;
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
    updateVolumeSlider();
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
