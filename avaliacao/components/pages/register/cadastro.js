import { db, collection, addDoc, createUserWithEmailAndPassword, auth, doc, updateDoc, increment, sendEmailVerification} from "../../../src/index.js"
import { emailIsValid } from "../../../src/function.js"

document.getElementById('buttonCadastro').addEventListener('click', async function () {

    let nome = document.getElementById('nomePropCad').value
    let telefone = document.getElementById('telefoneCad').value
    let endereco = document.getElementById('enderecoCad').value

    let email = document.getElementById('emailCad').value
    let senha = document.getElementById('passwordCad').value

    if (!nome || !telefone || !endereco) {
        alert('Preencha todos os campos para realizar o cadastro.')
        return
    }

    if (senha.length < 6) {
        alert('Por favor, insira uma senha com mais 6 caracteres. ')
        return
    }

    if (!emailIsValid(email)) {
        alert('Insira um email válido !')
        return
    }

    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user

            if (!user.emailVerified) {
                sendEmailVerification(auth.currentUser)
                    .then(() => {

                        console.log(user)
                        alert('Email de verificação enviado. Por favor verifique seu email')
                        salvarDados(user)
                    })
                    .catch((error) => {

                        alert('Não foi possível enviar o email de verificação. ')
                        console.log(error)
                        return
                    })
            }
            else {
            }
        })
        .catch((error) => {
            if (error.message === 'auth/email-already-in-use') {
                alert('Cadastro já existente. ')
            }
            else {
                alert('Não foi possível realizar o cadastro. ')
            }
        })

    async function salvarDados(user) {
        try {
            await addDoc(collection(db, "commonUsers"), {
                nome: nome,
                endereco: endereco,
                telefone: telefone,
                uidAccount: user.uid,
                tipo: 'user'
            })
                .then(() => {
                    controleUsuarios(doc, updateDoc, db, increment)

                    alert('Cadastro efetuado com sucesso ! ')

                    window.location.href = '../navigation/home.html'
                })
        } catch (error) {
            alert('Não foi possivel salvar o cadastro. ')
        }
    }
})

async function controleUsuarios() {

    const docRef = doc(db, 'controleUsuarios', 'users')

    await updateDoc(docRef, {

        cadastrados: increment(1),
        conectados: increment(1)
    })
    console.log('Controle de usuários realizado com sucesso. ')
    alert('Controle de usuários realizado com sucesso.')
}


