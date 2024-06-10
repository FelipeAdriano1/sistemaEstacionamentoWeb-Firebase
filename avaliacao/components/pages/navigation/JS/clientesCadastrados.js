import { collection, getDocs, db, deleteDoc, doc, auth, onAuthStateChanged, where, query } from "../../../../src/index.js"

document.addEventListener('DOMContentLoaded', async function () {

    await getUsers()
})

async function getUsers() {

    await onAuthStateChanged(auth, (user) => {
        getDocs(query(collection(db, 'commonUsers'), where('uidAccount', '==', user.uid)))
            .then((querySnapshot) => {

                if (!querySnapshot.empty) {
                    querySnapshot.forEach(element => {
                        const users = element.data()
                        const idDoc = element.id

                        document.getElementById('nomeProp').value = users.nome
                        document.getElementById('telefone').value = users.telefone
                        document.getElementById('endereco').value = users.endereco
                        document.getElementById('email').value = user.email
                        document.getElementById('idUser').value = idDoc
                    })
                }
                else {
                    getDocs(query(collection(db, "admins"), where('uidAccount', '==', user.uid)))
                        .then((querySnapshot) => {

                            if (!querySnapshot.empty) {
                                querySnapshot.forEach(element => {
                                    const users = element.data()
                                    const idDoc = element.id

                                    if (users.uidAccount == 'gjFSzzNV3nNZzrLj97KNN6lfBQN2') {
                                        document.getElementById('buttonExcluir').hidden = true
                                    }

                                    document.getElementById('nomeProp').value = users.nome
                                    document.getElementById('telefone').value = users.telefone
                                    document.getElementById('endereco').value = users.endereco
                                    document.getElementById('email').value = user.email
                                    document.getElementById('idUser').value = idDoc
                                })
                            }
                        })
                }
            })
    })
}

document.getElementById('buttonExcluir').addEventListener('click', function () {

    deleteRegister()
})

function deleteRegister() {

    let uid = document.getElementById('idUser').value

    deleteDoc(doc(db, 'commonUsers', uid))
        .then(() => {

            auth.currentUser.delete()
                .then(() => {

                    alert('Conta excluida com sucesso !')
                    window.location.href = "../register/cadastro.html"
                })
                .catch((error) => {
                    alert('Erro ao remover cadastro: ' + error)
                })
        })
        .catch((error) => {
            alert('Não foi possível remover o cadastro.' + error)
        })
}