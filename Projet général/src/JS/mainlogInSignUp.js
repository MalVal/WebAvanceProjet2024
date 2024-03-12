//Cacher Log In ou SignUp
const btnSendToLogIn = document.querySelector("#SignLogIn");
const btnSendToSignUp = document.querySelector("#LogSignUp");
const LogIn = document.querySelector(".login");
const SignUp = document.querySelector(".signup");


btnSendToLogIn.addEventListener("click", () => {

    $(SignUp).fadeOut();
    $(LogIn).slideDown();

});

btnSendToSignUp.addEventListener("click", () => {

    $(LogIn).fadeOut();
    $(SignUp).slideDown();

});


//Écrire ce qu'il y a dans le nom ou le password dans l'un l'autre
const SignUpName = document.querySelector("#signupName");
const LogInName = document.querySelector("#loginName");
const SignUpPass = document.querySelector("#signupPass");
const LogInPass = document.querySelector("#loginPass");
const CheckBoxSignUp = document.querySelector("#rememberMesignUp");
const CheckBoxLogIn = document.querySelector("#rememberMelogIn");

SignUpName.addEventListener("input", () => {

    LogInName.value = SignUpName.value;

});

LogInName.addEventListener("input", () => {

    SignUpName.value = LogInName.value;

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


