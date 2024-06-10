import { onAuthStateChanged, auth, getDocs, collection, db, where, query, deleteDoc, doc } from '../../../../src/index.js'

addEventListener('DOMContentLoaded', function () {

    onAuthStateChanged(auth, (user) => {
        if (user) {

            let consulta

            if (user.uid === '2bQUx6HC6YfMO0bS7IfcJ4sFDHE2') {
                consulta = getDocs(collection(db, 'comprovantes'))
            }
            else {
                consulta = getDocs(query(collection(db, 'comprovantes'), where('idAccount', '==', user.uid)))
            }

            consulta.then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const reservas = []
                    const idDoc = []
                    querySnapshot.forEach(element => {

                        idDoc.push(element.id)
                        reservas.push(element.data())

                        let html = '<option value="vazio">Selecione uma reserva</option>'
                        for (let i = 0; i < reservas.length; i++) {

                            html += `<option value="${idDoc[i]}">${reservas[i].nome}</option>`
                        }
                        document.getElementById('selectComprovante').innerHTML = html
                    })

                    addEventListener('change', function () {

                        const idSelect = document.getElementById('selectComprovante').value

                        querySnapshot.forEach(element => {

                            if (idSelect == element.id) {
                                const dados = element.data()

                                this.document.getElementById('nomeProp').value = dados.nome
                                this.document.getElementById('telefone').value = dados.telefone
                                this.document.getElementById('endereco').value = dados.endereco
                                this.document.getElementById('tipoCad').value = dados.tipoVeiculo
                                this.document.getElementById('nomeVeiculo').value = dados.modeloVeiculo
                                this.document.getElementById('placaCarro').value = dados.placaCarro
                                this.document.getElementById('horaEntrada').value = dados.horaEntrada
                                this.document.getElementById('horaSaida').value = dados.horaSaida
                                this.document.getElementById('precoFixo').value = dados.precoFixo
                                this.document.getElementById('precoHora').value = dados.precoHora
                                this.document.getElementById('precoTotal').value = dados.precoTotal
                            }
                        })
                    })

                    document.getElementById('buttonExcluirComp').addEventListener('click', function () {

                        const select = document.getElementById('selectComprovante').value
                        if (select == 'vazio') {
                            alert('Selecione um comprovante para ser excluido')
                        }
                        else {
                            deleteDoc(doc(db, 'comprovantes', select))
                                .then(() => {

                                    alert('Comprovante excluído com sucesso !')
                                    window.location.reload()
                                })
                                .catch((error) => {
                                    alert('Não foi possível excluir o comprovante')
                                })
                        }
                    })
                }
                else {
                    console.log('Usuário não encontrado')
                }
            })
        }
        else {
            console.log('usuário não autenticado')
        }
    })
})

document.getElementById('buttonImprimir').addEventListener('click', function () {

    const select = document.getElementById('selectComprovante').value
    if (select == 'vazio') {
        alert('Selecione um comprovante para imprimir')
    }
    else {
        window.print()
        return false
    }

})
