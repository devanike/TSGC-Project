const clearSearchField = document.getElementById("clear")
const searchInput = document.getElementById("search-input")
const profilePicture = document.getElementById("profile-pic")
const profileDropDown = document.getElementById("profile-dropdown")
const navMenu = document.getElementById("menu")
const navItems = document.querySelectorAll(".navitem")
// const hiddenNav = document.getElementById("hidden-nav")
const closeBtn = document.getElementById("close")
const mobileSideNav = document.getElementById("navbar")
const desktopSideNav = document.getElementById("desktop-nav")
const searchIcon = document.getElementById("search-icon")
const closeSearchBar = document.getElementById("close-search")
const clearSearchBar = document.getElementById("mobile-clear")
const mobileSearchBar = document.getElementById("mobile-search")
const mobileSearchInput = document.getElementById("mobile-search-input")
const thumbs = document.querySelectorAll(".thumbs")
// const playPauseIcon = document.getElementById("play-icon")
const playIcons = document.querySelectorAll('.image-overlay > span');


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
navMenu.addEventListener("click", () => DisplayDiv(desktopSideNav))


// SCROLLING ---NOT WORKING YET
const scrollAmount = 400;
const scrollContainer = document.getElementById('content');
const scrollArtist = document.getElementById('artist-content');
const scrollCategory = document.getElementById('category-content');
const arrowRight = document.getElementById('arrow-right');
const arrowRight1 = document.querySelector('.arrow-right-1');
const arrowLeft = document.getElementById('arrow-left');
const arrowLeft1 = document.querySelector('.arrow-left-1');

document.querySelectorAll('.scroll-container').forEach(container => {
    const leftArrow = container.querySelector('.arrow-left');
    const rightArrow = container.querySelector('.arrow-right');
    const scrollContent = container.querySelector('.scroll-content');

    if (leftArrow && rightArrow && scrollContent) {
        leftArrow.addEventListener('click', () => ScrollLeft(scrollContent));
        rightArrow.addEventListener('click', () => ScrollRight(scrollContent));
    }
});

function ScrollLeft (container) {
    container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
}

function ScrollRight (container) {
    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

arrowLeft1.addEventListener('click', () => {
    ScrollLeft(scrollContainer)
})

arrowRight1.addEventListener('click', () => {
    ScrollRight(scrollContainer)
})



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

// moving to a new page when the song title is clicked
document.querySelectorAll('.song-title').forEach(title => {
    title.addEventListener('click', event => {
        event.preventDefault(); // Prevent default link behavior

        // Get song details from data attributes
        const song_title = event.target.getAttribute('data-song');
        const artist = event.target.getAttribute('data-artist');
        const src = event.target.getAttribute('data-src');
        const image = event.target.getAttribute('data-image');

        // Store song details in localStorage
        localStorage.setItem('currentSong', JSON.stringify({ song_title, artist, src, image }));

        // Redirect to the new page
        window.location.href = 'Song-Title.html'; // Change this to your target page
    });
});

// change this to a function
document.querySelectorAll('.song-title').forEach(title => {
    title.addEventListener('click', event => {
        event.preventDefault(); // Prevent default link behavior

        // Get song details from data attributes
        const song_title = event.target.getAttribute('data-song');
        const artist = event.target.getAttribute('data-artist');
        const src = event.target.getAttribute('data-src');
        const image = event.target.getAttribute('data-image');

        // Store song details in localStorage
        localStorage.setItem('currentSong', JSON.stringify({ song_title, artist, src, image }));

        // Redirect to the new page
        window.location.href = 'Song-Title.html'; // Change this to your target page
    });
});


// EVENT SLIDE
let slideIndex = 0
showSlides()

function showSlides() {
    let i;
    let slides = document.getElementsByClassName('event')

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
}