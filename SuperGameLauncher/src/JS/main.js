let connected = false;

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
const CheckBoxSignUp = document.querySelector("#rememberMesignUp");
const CheckBoxLogIn = document.querySelector("#rememberMelogIn");

const loginLink = document.querySelector("#showLoginForm");
const loginForm = document.querySelector("#loginForm")
const gallery = document.querySelector("#gallery")

loginLink.addEventListener("click", (evt) => {

    evt.preventDefault();
    if(connected === true)
    {
        loginForm.classList.toggle('hidden');
        gallery.classList.toggle('blur');
    }

});

loginForm.addEventListener("click", (evt) => {

    evt.stopPropagation();

});

btnSignUp.addEventListener("click", () =>
{
    const signUpPseudoValue = encodeURIComponent(SignUpPseudo.value);
    const signUpSurNameValue = encodeURIComponent(SignUpSurName.value);
    const signUpFirstNameValue = encodeURIComponent(SignUpFirstName.value);
    const signUpPassValue = encodeURIComponent(SignUpPass.value);
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
                loginForm.classList.toggle('hidden');
                gallery.classList.toggle('blur');
            }
            else
            {
                console.log("Failed connection");
            }
        })

        .catch(error => console.error('Error:', error))

});

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
                loginForm.classList.toggle('hidden');
                gallery.classList.toggle('blur');
            }
        })

        .catch(error => console.error('Error:', error))

});

btnSendToLogIn.addEventListener("click", () => {

    $(SignUp).fadeOut();
    $(LogIn).slideDown();

});

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

CheckBoxLogIn.addEventListener("change", () => {

    CheckBoxSignUp.checked = CheckBoxLogIn.checked;

});

CheckBoxSignUp.addEventListener("change", () => {

    CheckBoxLogIn.checked = CheckBoxSignUp.checked;

});


const allInputs = document.querySelectorAll(".input");

allInputs.forEach(input => {

    input.addEventListener("click", function () {

        this.select();

    });

});