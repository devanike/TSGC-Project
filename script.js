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

// function formatDuration(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
// }


const musicDivs = document.querySelectorAll('.music');
const playAudioBar = document.getElementById('play-pause-button')
let currentAudio = null;

musicDivs.forEach(musicDiv => {
    const playIcon = musicDiv.querySelector('#play-icon');
    const audioPlayer = musicDiv.querySelector('.audio-player');

    playIcon.addEventListener('click', () => {
        const isPlaying = playIcon.textContent === 'pause';

        // Pause the current audio if it's playing
        if (currentAudio && isPlaying) {
            currentAudio.pause();
            // currentAudio.previousElementSibling.textContent = 'play_arrow';
            // playAudioBar.textContent = 'pause'
        }

        if (isPlaying) {
            // Change the icon to play and pause the audio
            playIcon.textContent = 'play_arrow';
            playAudioBar.textContent = 'play_arrow'
            audioPlayer.pause();
            currentAudio = null;
        } else {
            // Change the icon to pause and play the audio
            playIcon.textContent = 'pause';
            playAudioBar.textContent = 'pause'
            audioPlayer.play();
            currentAudio = audioPlayer;
        }
    });
});


// // Function to update duration in p tag
// function updateDuration(audioElement) {
//     const durationElement = audioElement.closest('.music').querySelector('.duration');
//     audioElement.addEventListener('loadedmetadata', () => {
//         const duration = formatDuration(audioElement.duration);
//         durationElement.textContent = duration;
//     });
// }

// // Initialize duration for each audio element
// document.querySelectorAll('.audio-player').forEach(audio => {
//     updateDuration(audio);
// });

// const bottomAudio = document.getElementById('bottom-audio');
// const audioControlsBar = document.getElementById('audio-controls-bar');

// let currentAudio = null;
// let currentIcon = null;

// playIcons.forEach(icon => {
//     icon.addEventListener('click', () => {
//         const musicDiv = icon.closest('.music');
//         const audio = musicDiv.querySelector('.audio-player');
//         const audioSrc = audio.querySelector('source').src;
        
//         // Check if the clicked audio is already playing
//         if (bottomAudio.src !== audioSrc) {
//             // Update the bottom audio source and play
//             bottomAudio.src = audioSrc;
//             bottomAudio.play();
            
//             // Update the icon of the previously playing audio, if any
//             if (currentIcon) {
//                 currentIcon.textContent = 'play_arrow';
//             }
            
//             // Set the new icon as the current icon
//             currentIcon = icon;
//             icon.textContent = 'pause';
//             // audioControlsBar.style.display = 'flex'; 
//         } else {
//             // Toggle play/pause based on audio state
//             if (bottomAudio.paused) {
//                 bottomAudio.play();
//                 icon.textContent = 'pause';
//                 // audioControlsBar.style.display = 'flex'; 
//             } else {
//                 bottomAudio.pause();
//                 icon.textContent = 'play_arrow';
//                 // audioControlsBar.style.display = 'none'; 
//             }
//         }
//     });
// });

// // Listen for the pause event on the bottom audio controls
// bottomAudio.addEventListener('pause', () => {
//     if (currentIcon) {
//         currentIcon.textContent = 'play_arrow';
//     }
//     // audioControlsBar.style.display = 'none'; 
// });

// // Listen for the play event on the bottom audio controls to ensure sync
// bottomAudio.addEventListener('play', () => {
//     if (currentIcon) {
//         currentIcon.textContent = 'pause';
//     }
// });


// closeBtn.addEventListener("click", () => DisplayDiv(hiddenNav)) 

// navMenu.addEventListener("click", () => {
//     centerContent.classList.add("expanded")
// })

// closeBtn.addEventListener("click", () => {
//     centerContent.classList.remove("expanded")
// })

// this.classList.add('active');

// navMenu.addEventListener("click", () => {
//     // adding the left margin
//     centerContent.style.marginLeft = '30px';
// })

// // Changing the TopBar and NavBar's color after scrolling
// window.onscroll = () => {
//     if (window.scrollY > 0) {
//         topBar.classList.add('scroll-active');
//         sideNav.classList.add('scroll-active');
//     } else {
//         topBar.classList.remove('scroll-active');
//         sideNav.classList.remove('scroll-active');
//     }
// };