const loginLink = document.querySelector("#showLoginForm")
const loginForm = document.querySelector("#loginForm")
const gallery = document.querySelector(".gallery")

loginLink.addEventListener("click", (evt) => {

    evt.preventDefault();
    loginForm.classList.toggle('hidden');
    gallery.classList.toggle('blur');

});

loginForm.addEventListener("click", (evt) => {

    evt.stopPropagation();

});

