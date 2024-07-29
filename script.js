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

navMenu.addEventListener("click", () => DisplayDiv(mobileSideNav))
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