const btnSendToLogIn = document.querySelector("#SignLogIn");
const btnSendToSignUp = document.querySelector("#LogSignUp");
const LogIn = document.querySelector(".login");
const SignUp = document.querySelector(".signup");
const btnLogin = document.querySelector("#btnLogin");
const btnSignUp = document.querySelector("#btnSignUp");

const SignUpPseudo = document.querySelector("#signupPseudo");
const SignUpSurName = document.querySelector("#signupSurName");
const SignUpFirstName = document.querySelector("#signupFirstName");
const SignUpPass = document.querySelector("#signupPass");
const LogInPseudo = document.querySelector("#LogInPseudo");
const LogInPass = document.querySelector("#loginPass");
const signUpError = document.querySelector("#signupError");
const loginError = document.querySelector("#loginError");

const loginLink = document.querySelector("#showLoginForm");
const loginForm = document.querySelector("#loginForm")
const gallery = document.querySelector("#gallery")
const pHello = document.querySelector("#pHello");

// For the disconnection
const disconnectForm = document.querySelector("#disconnectForm");
const btnDisconnect = document.querySelector("#btnDisconnect");

// Check if the user is connected

let connected;

fetch(`./src/PHP/isConnected.php`)

    .then(response =>
    {
        if (!response.ok)
        {
            throw new Error('Network failed');
        }
        return response.json();
    })

    .then(data =>
    {
        if(data.connected === true)
        {
            connected = true;
            pHello.textContent = "Hello " + data.pseudo;
            loginForm.classList.toggle('hidden');
            gallery.classList.toggle('blur');
        }
        else
        {
            connected = false;
        }
    })

    .catch(error => console.error('Error:', error))

    .finally(() =>
    {
        // Display the disconnection menu
        loginLink.addEventListener("click", (evt) => {

            evt.preventDefault();

            if(connected === true)
            {
                disconnectForm.classList.toggle('hidden');
                gallery.classList.toggle('blur');
            }

        });

        loginForm.addEventListener("click", (evt) => {

            evt.stopPropagation();

        });

        // The button to create a new user
        btnSignUp.addEventListener("click", () =>
        {
            const signUpPseudoValue = encodeURIComponent(SignUpPseudo.value);
            const signUpSurNameValue = encodeURIComponent(SignUpSurName.value);
            const signUpFirstNameValue = encodeURIComponent(SignUpFirstName.value);
            const signUpPassValue = encodeURIComponent(SignUpPass.value);

            if(signUpPseudoValue === "")
            {
                signUpError.textContent = "The pseudo can't be empty !";
                return;
            }

            if(!checkCharOnly(signUpSurNameValue) || !checkCharOnly(signUpFirstNameValue))
            {
                signUpError.textContent = "The name and the firstname can't contain numbers or can't be empty !";
                return;
            }

            if(signUpPassValue === "")
            {
                signUpError.textContent = "The password can't be empty !";
                return;
            }

            fetch(`./src/PHP/signup.php?pseudo=${signUpPseudoValue}&surname=${signUpSurNameValue}&firstname=${signUpFirstNameValue}&password=${signUpPassValue}`)

                .then(response =>
                {
                    if (!response.ok)
                    {
                        throw new Error('Network failed');
                    }
                    return response.json();
                })

                .then(data =>
                {
                    if(data.error === "success")
                    {
                        connected = true;
                        pHello.textContent = "Hello " + SignUpPseudo.value;
                        loginForm.classList.toggle('hidden');
                        gallery.classList.toggle('blur');
                    }
                    else
                    {
                        signUpError.textContent = "The pseudo already exists !";
                    }
                })

                .catch(error => console.error('Error:', error))

        });

        // The button to connect a user already created
        btnLogin.addEventListener("click", () =>
        {
            const loginPseudoValue = encodeURIComponent(LogInPseudo.value);
            const loginPassValue = encodeURIComponent(LogInPass.value);
            fetch(`./src/PHP/login.php?pseudo=${loginPseudoValue}&password=${loginPassValue}`)

                .then(response =>
                {
                    if (!response.ok)
                    {
                        throw new Error('Network failed');
                    }
                    return response.json();
                })

                .then(data =>
                {
                    if(data.error === "success")
                    {
                        connected = true;
                        pHello.textContent = "Hello " + LogInPseudo.value;
                        loginForm.classList.toggle('hidden');
                        gallery.classList.toggle('blur');
                    }
                    else
                    {
                        loginError.textContent = data.error;
                    }
                })

                .catch(error => console.error('Error:', error))

        });

        // The button to disconnect a user
        btnDisconnect.addEventListener("click", () => {
            fetch(`./src/PHP/disconnect.php`)

                .then(response =>
                {
                    if (!response.ok)
                    {
                        throw new Error('Network failed');
                    }
                    return response.json();
                })

                .then(data =>
                {
                    console.log("Disconnected");
                })

                .catch(error => console.error('Error:', error))

                .finally(() =>{
                    window.location.reload();
                })
        });

        // Display the login menu
        btnSendToLogIn.addEventListener("click", () => {

            $(SignUp).fadeOut();
            $(LogIn).slideDown();

        });

        // Display the signup menu
        btnSendToSignUp.addEventListener("click", () => {

            $(LogIn).fadeOut();
            $(SignUp).slideDown();

        });

        SignUpPseudo.addEventListener("input", () => {

            LogInPseudo.value = SignUpPseudo.value;

        });

        LogInPseudo.addEventListener("input", () => {

            SignUpPseudo.value = LogInPseudo.value;

        });

        SignUpPass.addEventListener("input", () => {

            LogInPass.value = SignUpPass.value;

        });

        LogInPass.addEventListener("input", () => {

            SignUpPass.value = LogInPass.value;

        });

        const allInputs = document.querySelectorAll(".input");

        allInputs.forEach(input => {

            input.addEventListener("click", function () {

                this.select();

            });

        });
    })

// A function to verify if a string contains only characters
function checkCharOnly(name)
{
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

document.addEventListener("DOMContentLoaded", function() {

    var gifBusterGhost = "./Image/BusterGhost.gif";
    var gif2048 = "./Image/2048.gif";
    var gifIndiannaDungeon = "./Image/IndiannaDungeon.gif";
    var gifBagger288 = "./Image/Bagger288.gif";
    var gifAimTrainer = "./Image/AimTrainer.gif";

    var busterGhostImg = document.querySelectorAll(".game img.BusterGhost");
    busterGhostImg.forEach(function(img) {
        img.addEventListener("mouseover", function() {
            this.src = gifBusterGhost;
        });
        img.addEventListener("mouseout", function() {
            this.src = this.dataset.originalSrc;
        });
    });

    var img2048 = document.querySelectorAll(".game img.Lu2048");
    img2048.forEach(function(img) {
        img.addEventListener("mouseover", function() {
            this.src = gif2048;
        });
        img.addEventListener("mouseout", function() {
            this.src = this.dataset.originalSrc;
        });
    });

    var indiannaDungeonImg = document.querySelectorAll(".game img.IndiannaDungeon");
    indiannaDungeonImg.forEach(function(img) {
        img.addEventListener("mouseover", function() {
            this.src = gifIndiannaDungeon;
        });
        img.addEventListener("mouseout", function() {
            this.src = this.dataset.originalSrc;
        });
    });

    var bagger288Img = document.querySelectorAll(".game img.Bagger288");
    bagger288Img.forEach(function(img) {
        img.addEventListener("mouseover", function() {
            this.src = gifBagger288;
        });
        img.addEventListener("mouseout", function() {
            this.src = this.dataset.originalSrc;
        });
    });

    var aimTrainerImg = document.querySelectorAll(".game img.AimTrainer");
    aimTrainerImg.forEach(function(img) {
        img.addEventListener("mouseover", function() {
            this.src = gifAimTrainer;
        });
        img.addEventListener("mouseout", function() {
            this.src = this.dataset.originalSrc;
        });
    });
});
