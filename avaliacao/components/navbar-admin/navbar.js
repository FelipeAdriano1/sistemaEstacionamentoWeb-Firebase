import { signOut, auth, onAuthStateChanged, getDocs, collection, db, query, where } from "../../src/index.js"

document.addEventListener("DOMContentLoaded", async function () {

    let caminho = ''

    await onAuthStateChanged(auth, (user) => {
        if (user) 
            {
            getDocs(query(collection(db, "commonUsers"), where('uidAccount', '==', user.uid)))
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {

                        querySnapshot.forEach(element => {

                            const user = element.data()

                            if (user.tipo == 'user') {

                                caminho = '/components/navbar-admin/navbar-user.html'
                                loadNavbar(caminho)
                            }
                            else {
                                alert('Carregando...')
                            }
                        })
                    }
                    else {
                        getDocs(query(collection(db, "admins"), where('uidAccount', '==', user.uid)))
                            .then((querySnapshot) => {
                                if (!querySnapshot.empty) {

                                    querySnapshot.forEach(element => {

                                        const user = element.data()

                                        if (user.tipo == 'admin') {

                                            caminho = '/components/navbar-admin/navbar.html'
                                            loadNavbar(caminho)
                                        }
                                    })
                                }
                            })
                    }
                })
        }
        else {
            alert('Você não está logado, por favor faça se login ou cadastre-se na plataforma.')
            window.location.href = '/components/pages/login/login.html'
        }
    })
})

function loadNavbar(caminho) {
    fetch(caminho)
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data

            document.getElementById('buttonLogout').addEventListener('click', function () {
                logout(signOut, auth)
            })
        })
        .catch(error => console.error('Erro ao carregar a barra de navegação:', error))
}

function logout(signOut, auth) {
    signOut(auth)
        .then(() => {

            window.location.href = "/components/pages/login/login.html"
        })
        .catch((error) => {
            console.error("Não foi possível realizar o logout. ", error)
        })
}