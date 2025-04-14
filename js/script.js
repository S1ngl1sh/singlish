let currentArtist = '';
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const volumeSliderProgress = document.getElementById('volume-slider-progress');
const lyricsContent = document.getElementById('lyrics-content');

function showArtists() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('artists-page').style.display = 'block';
    document.getElementById('songs-page').style.display = 'none';
    document.getElementById('player-page').style.display = 'none';
    return false;
}

function showHome() {
    document.getElementById('artists-page').style.display = 'none';
    document.getElementById('songs-page').style.display = 'none';
    document.getElementById('player-page').style.display = 'none';
    document.getElementById('home-page').style.display = 'block';
    return false;
}

function showSongs(artistName) {
    currentArtist = artistName;
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('artists-page').style.display = 'none';
    document.getElementById('songs-page').style.display = 'block';
    document.getElementById('player-page').style.display = 'none';
    document.querySelector('#songs-page .page-title').textContent = artistName + ' Songs';
    return false;
}

function showPlayer(songTitle, artistName, albumArtUrl, audioUrl) {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('artists-page').style.display = 'none';
    document.getElementById('songs-page').style.display = 'none';
    document.getElementById('player-page').style.display = 'block';
    
    document.getElementById('player-song-title').textContent = songTitle;
    document.getElementById('player-song-artist').textContent = artistName;
    document.getElementById('player-album-art').src = albumArtUrl;
    
    audioPlayer.src = audioUrl;
    audioPlayer.load();
    
    lyricsContent.textContent = "Loading lyrics...\n\n(Here would be the actual lyrics for the song)";
    
    return false;
}

function toggleLoop() {
    audioPlayer.loop = !audioPlayer.loop;
    document.querySelector('.loop-button').classList.toggle('active', audioPlayer.loop);
}

function skipBackward() {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
}

function skipForward() {
    audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 5);
}

function restartSong() {
    audioPlayer.currentTime = 0;
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function updateVolumeSlider() {
    const volume = audioPlayer.volume;
    volumeSliderProgress.style.width = `${volume * 100}%`;
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
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    
    progress.style.width = (currentTime / duration) * 100 + '%';
    
    currentTimeElement.textContent = formatTime(currentTime);
    if (duration) {
        durationElement.textContent = formatTime(duration);
    }
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

audioPlayer.addEventListener('ended', () => {
    if (!audioPlayer.loop) {
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
