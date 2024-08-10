// getting the filename
document.querySelectorAll('input[type="file"]').forEach(file => {
    file.addEventListener('change', (event) => {
        let files = event.target.files;
        let fileName = files[0].name;
        let fileInput = event.target.previousElementSibling; // Assuming the label is the next element
        fileInput.textContent = fileName;
    });
});

// toggle between email and phone number inputs
// const toggleInput = document.getElementById('toggle-input');
// const emailGroup = document.getElementById('email-group');
// const phoneGroup = document.getElementById('phone-group');

// toggleInput.addEventListener('click', function(e) {
//     e.preventDefault();

//     if (toggleInput.textContent === 'Use Phone Number Instead') {
//         toggleInput.textContent = 'Use Email Instead';
//         emailGroup.style.display = 'none';
//         phoneGroup.style.display = 'block';
//     } else {
//         toggleInput.textContent = 'Use Phone Number Instead';
//         emailGroup.style.display = 'block';
//         phoneGroup.style.display = 'none';
//     }
// })

