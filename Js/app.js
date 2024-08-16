// getting the filename
document.querySelectorAll('input[type="file"]').forEach(file => {
    file.addEventListener('change', (event) => {
        let files = event.target.files;
        let fileName = files[0].name;
        let fileInput = event.target.previousElementSibling; // Assuming the label is the previous element
        fileInput.textContent = fileName;
    });
});

const mobileSearchBar = document.getElementById("mobile-search")
const closeSearchBar = document.getElementById("close-search")
const searchIcon = document.getElementById("search-icon")

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

