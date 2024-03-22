// Cacher Log In ou SignUp
const btnSendToLogIn = document.querySelector("#SignLogIn");
const btnSendToSignUp = document.querySelector("#LogSignUp");
const LogIn = document.querySelector(".login");
const SignUp = document.querySelector(".signup");
const btnLogin = document.querySelector("#btnLogin");

// Écrire ce qu'il y a dans le nom ou le password dans l'un l'autre
const SignUpName = document.querySelector("#signupName");
const LogInPseudo = document.querySelector("#LogInPseudo");
const SignUpPass = document.querySelector("#signupPass");
const LogInPass = document.querySelector("#loginPass");
const CheckBoxSignUp = document.querySelector("#rememberMesignUp");
const CheckBoxLogIn = document.querySelector("#rememberMelogIn");

btnLogin.addEventListener("click", () =>
{
    const loginPseudoValue = encodeURIComponent(LogInPseudo.value);
    const loginPassValue = encodeURIComponent(LogInPass.value);

    fetch(`./src/PHP/login.php?pseudo=${loginPseudoValue}&password=${loginPassValue}`)
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('Réponse réseau non OK');
            }
            return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error('Il y a eu un problème avec votre requête fetch:', error))
        .finally(() => console.log('Ceci est exécuté quoi qu\'il arrive.'));

    console.log('Ceci est exécuté directement.');
});

btnSendToLogIn.addEventListener("click", () => {

    $(SignUp).fadeOut();
    $(LogIn).slideDown();

});

btnSendToSignUp.addEventListener("click", () => {

    $(LogIn).fadeOut();
    $(SignUp).slideDown();

});

SignUpName.addEventListener("input", () => {

    LogInPseudo.value = SignUpName.value;

});

LogInPseudo.addEventListener("input", () => {

    SignUpName.value = LogInPseudo.value;

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


