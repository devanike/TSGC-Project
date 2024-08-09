// AUDIO PLAY BAR
const musicDivs = document.querySelectorAll('.music');
const playAudioBar = document.getElementById('play-pause-button');
const forwardButton = document.getElementById('forward-button');
const backwardButton = document.getElementById('backward-button');
const shuffleButton = document.getElementById('shuffle-button');
const repeatButton = document.getElementById('repeat-button');
const volumeButton = document.getElementById('volume-button');
const volumeSlider = document.getElementById('volume-slider');
const durationBar = document.querySelector('#audio-controls-bar .duration');
const progressBar = document.getElementById('progress-bar');
const durationCount = document.getElementById('duration-count');
const audioControlsBar = document.getElementById("audio-controls-bar");
const currentArtist = document.getElementById('current-artist');
const currentTitle = document.getElementById('current-title');
let currentAudio = null;
let currentPlayIcon = null;
let currentIndex = -1;
let progressUpdateInterval = null
let isShuffled = false;
let isRepeating = false;
let shuffledList = [];
let originalList = [];


// Initialize the original list of music
originalList = Array.from(musicDivs).map((musicDiv, index) => {
    const audioPlayer = musicDiv.querySelector('.audio-player');
    const playIcon = musicDiv.querySelector('#play-icon');

    const artistElement = musicDiv.querySelector('.artist');
    const titleElement = musicDiv.querySelector('.title');

    const artist = artistElement ? artistElement.textContent : 'Unknown Artist';
    const title = titleElement ? titleElement.textContent : 'Unknown Title';
    
    audioPlayer.addEventListener('ended', () => {
        if (isRepeating && audioPlayer === currentAudio) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            playNext();
        }
    });
    audioPlayer.addEventListener('loadedmetadata', () => {
        const durationElement = musicDiv.querySelector('.duration');
        const formattedDuration = formatTime(audioPlayer.duration);
        durationElement.textContent = formattedDuration;
        if (audioPlayer === currentAudio) {
            durationBar.textContent = formattedDuration;
        }
    });
    return { audioPlayer, playIcon, artist, title, index, musicDiv };
});


 // Function to shuffle the playlist
function shufflePlaylist() {
    shuffledList = [...originalList];
    for (let i = shuffledList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
    }
}

musicDivs.forEach((musicDiv, index)  => {
    const playIcon = musicDiv.querySelector('#play-icon');
    const audioPlayer = musicDiv.querySelector('.audio-player');

    playIcon.addEventListener('click', () => {
        handlePlayPause(audioPlayer, playIcon, index);
    });

    // Sync the play/pause state with the audio player controls
    audioPlayer.addEventListener('play', () => {
        playIcon.textContent = 'pause';
        startProgressUpdateInterval(audioPlayer);
        highlightCurrentMusicDiv(musicDiv);
    });

    audioPlayer.addEventListener('pause', () => {
        playIcon.textContent = 'play_arrow';
        clearInterval(progressUpdateInterval);
        // removeHighlightFromMusicDiv(musicDiv);
    });

    audioPlayer.addEventListener('ended', () => {
        playIcon.textContent = 'play_arrow';
        clearInterval(progressUpdateInterval);
        removeHighlightFromMusicDiv(musicDiv);
        // playNext(); // Automatically play the next song
        if (isRepeating && audioPlayer === currentAudio) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            playNext();
        }
    });

    audioPlayer.addEventListener('timeupdate', () => {
        updateProgressBar(audioPlayer);
    });
});

playAudioBar.addEventListener('click', () => {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
            playAudioBar.textContent = 'pause';
            if (currentPlayIcon) currentPlayIcon.textContent = 'pause';
            startProgressUpdateInterval(currentAudio);
            // shows the audio controls bar
            audioControlsBar.classList.remove('hide-player');
        } else {
            currentAudio.pause();
            playAudioBar.textContent = 'play_arrow';
            if (currentPlayIcon) currentPlayIcon.textContent = 'play_arrow';
            clearInterval(progressUpdateInterval);
            // Show the audio controls bar
            // audioControlsBar.classList.add('hide');
        }
    }
});

forwardButton.addEventListener('click', () => {
    playNext();
});

backwardButton.addEventListener('click', () => {
    playPrevious();
});

progressBar.addEventListener('input', () => {
    if (currentAudio) {
        currentAudio.currentTime = (progressBar.value / 100) * currentAudio.duration;
    }
});

// Initialize the volume slider based on the current audio volume
if (currentAudio) {
    volumeSlider.value = currentAudio.volume;
}

volumeSlider.addEventListener('input', () => {
    if (currentAudio) {
        currentAudio.volume = volumeSlider.value;
    }
});

function handlePlayPause(audioPlayer, playIcon, index) {
    // Pause te current audio if it's playing
    if (currentAudio && currentAudio !== audioPlayer) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Restart the previously playing song
        if (currentPlayIcon) currentPlayIcon.textContent = 'play_arrow';
        playAudioBar.textContent = 'play_arrow';
    }

     // Toggle the play/pause state
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.textContent = 'pause';
        playAudioBar.textContent = 'pause';
        currentAudio = audioPlayer;
        currentPlayIcon = playIcon;
        currentIndex = index;
        durationBar.textContent = formatTime(audioPlayer.duration);
        updateProgressBar(audioPlayer);
        updateDurationCount(audioPlayer);
        volumeSlider.value = audioPlayer.volume;
        // shows the audio controls bar
        audioControlsBar.classList.remove('hide-player');
        currentArtist.textContent = originalList[index].artist;
        currentTitle.textContent = originalList[index].title;
        highlightCurrentMusicDiv(document.querySelectorAll('.music')[index]);
    } else {
        audioPlayer.pause();
        playIcon.textContent = 'play_arrow';
        playAudioBar.textContent = 'play_arrow';
        currentAudio = null;
        currentPlayIcon = null;
        currentIndex = -1
        clearInterval(progressUpdateInterval);
        // removeHighlightFromMusicDiv(document.querySelectorAll('.music')[index]);
        // hides the audio controls bar
        // audioControlsBar.classList.add('hide');
    }
}

function playNext() {
    const list = isShuffled ? shuffledList : originalList;
    if (currentIndex < list.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // loop to the first audio
    }
    playAudioAtCurrentIndex(list);
}

function playPrevious() {
    const list = isShuffled ? shuffledList : originalList;
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = list.length - 1; // loop to the last audio
    }
    playAudioAtCurrentIndex(list);
}

function playAudioAtCurrentIndex(list) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; // Restart the previously playing song
        if (currentPlayIcon) currentPlayIcon.textContent = 'play_arrow';
        removeHighlightFromMusicDiv(document.querySelectorAll('.music')[currentIndex]);
    }

    // const { audioPlayer, playIcon } = audioList[currentIndex];
    const { audioPlayer, playIcon, artist, title, musicDiv } = list[currentIndex];
    audioPlayer.play();
    playIcon.textContent = 'pause';
    playAudioBar.textContent = 'pause';
    durationBar.textContent = formatTime(audioPlayer.duration);
    currentAudio = audioPlayer;
    currentPlayIcon = playIcon;
    updateProgressBar(audioPlayer);
    updateDurationCount(audioPlayer);
    currentArtist.textContent = artist;
    currentTitle.textContent = title;
    highlightCurrentMusicDiv(musicDiv);
}

function startProgressUpdateInterval(audioPlayer) {
    progressUpdateInterval = setInterval(() => {
        updateDurationCount(audioPlayer);
    }, 1000); // Update every second
}

function updateProgressBar(audioPlayer) {
    const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progressPercent;
}

function updateDurationCount(audioPlayer) {
    durationCount.innerHTML = `${formatTime(audioPlayer.currentTime)}/<span class="duration">${formatTime(audioPlayer.duration)}</span>`;
}

shuffleButton.addEventListener('click', () => {
    isShuffled = !isShuffled;
    if (isShuffled) {
        shufflePlaylist();
        shuffleButton.classList.add('active'); // Add class to indicate shuffle is active
        if (currentAudio) {
            // Set currentIndex to the shuffled position of the current audio
            currentIndex = shuffledList.findIndex(item => item.audioPlayer === currentAudio);
            if (currentIndex === -1) {
                currentIndex = 0; // Default to the first song in shuffledList if not found
            }
        }
    } else {
        shuffledList = [];
        shuffleButton.classList.remove('active'); // Remove class to indicate shuffle is inactive
        if (currentAudio) {
            // Set currentIndex to the original position of the current audio
            currentIndex = originalList.findIndex(item => item.audioPlayer === currentAudio);
            if (currentIndex === -1) {
                currentIndex = 0; // Default to the first song in originalList if not found
            }
        }
    }
})

repeatButton.addEventListener('click', () => {
    isRepeating = !isRepeating;
    repeatButton.classList.toggle('active', isRepeating); // Toggle class to indicate repeat is active
    if (isRepeating && currentAudio) {
        currentAudio.addEventListener('ended', () => {
            if (isRepeating && currentAudio) {
                currentAudio.currentTime = 0;
                currentAudio.play();
            }
        }, { once: true }); // ensures that the event handler is only invoked once per repeat
    }
});


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function highlightCurrentMusicDiv(musicDiv) {
    // Remove 'active' class from all music divs
    document.querySelectorAll('.music').forEach(div => div.classList.remove('active'));
    // Add 'active' class to the currently playing music div
    musicDiv.classList.add('active');
}

function removeHighlightFromMusicDiv(musicDiv) {
    musicDiv.classList.remove('active');
}