import { signInWithEmailAndPassword, auth } from "/src/index.js"
import { emailIsValid } from "/src/function.js"

document.getElementById('buttonLogin').addEventListener('click', function () {

    login(signInWithEmailAndPassword, auth)

})

async function login(signInWithEmailAndPassword, auth) {

    var email = document.getElementById('emailLogin').value
    var password = document.getElementById('passwordLogin').value

    if (!email || !password) {
        alert('Preencha todos os campos para realizar o login. ')
        return
    }

    if (!emailIsValid(email)) {
        alert('Insira um email válido.')
        return
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCrendential) => {
            const user = userCrendential.user

            if (!user.emailVerified) {
                alert('Seu email ainda não está verificado. Por favor cheque sua caixa de emails')
            }

            alert('Você está logado ! ')
            window.location.href = "/navigation/home.html"
        })
        .catch((error) => {
            if (error.message = 'auth/invalid-credential') {
                alert('Não foi possível realizar o login. Email inválido ou inexistente')
            }
            else {
                alert('Não foi possível realizar o login.')
            }
        })
}
