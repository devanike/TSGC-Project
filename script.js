const clearSearchField = document.getElementById("clear")
const searchInput = document.getElementById("search-input")
const profilePicture = document.getElementById("profile-pic")
const profileDropDown = document.getElementById("profile-dropdown")
const navMenu = document.getElementById("menu")
const navItems = document.querySelectorAll(".navitem")
// const hiddenNav = document.getElementById("hidden-nav")
const closeBtn = document.getElementById("close")
const mobileSideNav = document.getElementById("navbar")
const searchIcon = document.getElementById("search-icon")
const closeSearchBar = document.getElementById("close-search")
const clearSearchBar = document.getElementById("mobile-clear")
const mobileSearchBar = document.getElementById("mobile-search")
const mobileSearchInput = document.getElementById("mobile-search-input")
const thumbs = document.querySelectorAll(".thumbs")
// const playPauseIcon = document.getElementById("play-icon")
const playIcons = document.querySelectorAll('.image-overlay > span');


// setting the height of the topbar and topcontent divs
// topBar.style.height = topContent.offsetHeight + 'px';

// clearing the search field
// clearSearchField.addEventListener("click", () => {
//     searchInput.value = '';
//     clearSearchField.style.display = 'none';
//     searchInput.focus();
// })

function clearInputField(input, icon) {
    input.value = ""
    icon.style.display = "none"
    input.focus()
}

// clearing the search fields
clearSearchField.addEventListener("click", () => clearInputField(searchInput, clearSearchField))
// mobile
clearSearchBar.addEventListener("click", () => clearInputField(mobileSearchInput, clearSearchBar))

// showing the cancel icon when there is input
searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
        clearSearchField.style.display = 'block';
    } else {
        clearSearchField.style.display = 'none';
    }
});

// shows the cancel icon when there's input
mobileSearchInput.addEventListener('input', () => {
    if (mobileSearchInput.value.length > 0) {
        clearSearchBar.style.display = 'block';
    } else {
        clearSearchBar.style.display = 'none';
    }
});

// Profile Dropdown Menu
profilePicture.addEventListener("click", () => DisplayDiv(profileDropDown))

// opens and closes the mobile Search Bar when the search icon is clicked
searchIcon.addEventListener("click", () => DisplayDiv(mobileSearchBar))
closeSearchBar.addEventListener("click", () => DisplayDiv(mobileSearchBar))

function DisplayDiv(div) {
    if (div.classList.contains("hide")) {
        div.classList.remove('hide');
        div.classList.add('show');
    } else {
        div.classList.remove('show');
        div.classList.add('hide');
    }
}

// Toggling the active class on the nav items
navItems.forEach(navItem => {   //change this to a function
    navItem.addEventListener('click', function() {
      // Remove active class from all items
        navItems.forEach(i => i.classList.remove('active'));

      // Add active class to the clicked item
        this.classList.add('active');
    })
})

// Toggling the active class on the thumbs
thumbs.forEach(thumb => {   //change this to a function
    thumb.addEventListener('click', function() {
      // Remove active class from all items
        thumbs.forEach(i => i.classList.remove('active'));

      // Add active class to the clicked item
        this.classList.add('active');
    })
})

navMenu.addEventListener("click", () => DisplayDiv(mobileSideNav))


// AUDIO PLAY BAR
const musicDivs = document.querySelectorAll('.music');
const playAudioBar = document.getElementById('play-pause-button');
const forwardButton = document.getElementById('forward-button');
const backwardButton = document.getElementById('backward-button');
const shuffleButton = document.getElementById('shuffle-button');
const durationBar = document.querySelector('#audio-controls-bar .duration');
const progressBar = document.getElementById('progress-bar');
const durationCount = document.getElementById('duration-count');
let currentAudio = null;
let currentPlayIcon = null;
let currentIndex = -1;
let progressUpdateInterval = null
let isShuffled = false;
let shuffledList = [];
let originalList = [];


// Initialize the original list of music
originalList = Array.from(musicDivs).map((musicDiv, index) => {
    const audioPlayer = musicDiv.querySelector('.audio-player');
    const playIcon = musicDiv.querySelector('#play-icon');
    audioPlayer.addEventListener('ended', () => playNext());
    audioPlayer.addEventListener('loadedmetadata', () => {
        const durationElement = musicDiv.querySelector('.duration');
        const formattedDuration = formatTime(audioPlayer.duration);
        durationElement.textContent = formattedDuration;
        if (audioPlayer === currentAudio) {
            durationBar.textContent = formattedDuration;
        }
    });
    return { audioPlayer, playIcon, index };
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
    });

    audioPlayer.addEventListener('pause', () => {
        playIcon.textContent = 'play_arrow';
        clearInterval(progressUpdateInterval);
    });

    audioPlayer.addEventListener('ended', () => {
        playIcon.textContent = 'play_arrow';
        clearInterval(progressUpdateInterval);
        playNext(); // Automatically play the next song
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
        } else {
            currentAudio.pause();
            playAudioBar.textContent = 'play_arrow';
            if (currentPlayIcon) currentPlayIcon.textContent = 'play_arrow';
            clearInterval(progressUpdateInterval);
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
    } else {
        audioPlayer.pause();
        playIcon.textContent = 'play_arrow';
        playAudioBar.textContent = 'play_arrow';
        currentAudio = null;
        currentPlayIcon = null;
        currentIndex = -1
        clearInterval(progressUpdateInterval);
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
    }

    // const { audioPlayer, playIcon } = audioList[currentIndex];
    const { audioPlayer, playIcon } = list[currentIndex];
    audioPlayer.play();
    playIcon.textContent = 'pause';
    playAudioBar.textContent = 'pause';
    durationBar.textContent = formatTime(audioPlayer.duration);
    currentAudio = audioPlayer;
    currentPlayIcon = playIcon;
    updateProgressBar(audioPlayer);
    updateDurationCount(audioPlayer);
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
         // Continue playing the current song or start playing from the shuffled list
        // if (currentAudio) {
        //     playAudioAtCurrentIndex(shuffledList);
        // }
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
        // Reset to the original list if shuffle is turned off
        // if (currentAudio) {
        //     currentIndex = originalList.findIndex(item => item.audioPlayer === currentAudio);
        //     playAudioAtCurrentIndex(originalList);
        // }
        if (currentAudio) {
            // Set currentIndex to the original position of the current audio
            currentIndex = originalList.findIndex(item => item.audioPlayer === currentAudio);
            if (currentIndex === -1) {
                currentIndex = 0; // Default to the first song in originalList if not found
            }
        }
    }
    playAudioAtCurrentIndex(isShuffled ? shuffledList : originalList);
    // if (currentAudio) {
    //     playNext(); // Restart with the shuffled list
    // }
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}


