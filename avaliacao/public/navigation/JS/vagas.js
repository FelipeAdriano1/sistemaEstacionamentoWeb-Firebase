import { db, collection, getDoc, doc, updateDoc } from '../../../../src/index.js'

addEventListener('DOMContentLoaded', function () {

    getDoc(doc(db, 'estacionamento', 'vagas'))
        .then((query) => {

            const vagas = query.data()

            this.document.getElementById('caminhao').value = vagas.caminhao
            this.document.getElementById('carro').value = vagas.carro
            this.document.getElementById('moto').value = vagas.moto

            this.document.getElementById('buttonEditPreco').addEventListener('click', function () {

                alterarVagas(vagas)
            })
        })
})

function alterarVagas(vagas) {

    const caminhao = document.getElementById('caminhao').value
    const carro = document.getElementById('carro').value
    const moto = document.getElementById('moto').value


    if (!caminhao || !carro || !moto) {
        alert('Preencha todos os campos para editar as vagas')
        return
    }
    if (caminhao < vagas.quantOcupCaminhao || carro < vagas.quantOcupCarro || moto < vagas.quantOcupMoto) {
        alert('Número de vagas não pode ser menor do que o número de clientes estacionados.')
        return
    }
    else {

        vagas.caminhao = caminhao
        vagas.carro = carro
        vagas.moto = moto
        vagas.quantDispCaminhao = caminhao - vagas.quantOcupCaminhao
        vagas.quantDispCarro = carro - vagas.quantOcupCarro
        vagas.quantDispMoto = moto - vagas.quantOcupMoto



        updateDoc(doc(db, 'estacionamento', 'vagas'), vagas)
            .then(() => {

                alert('Vagas alteradas com sucesso.')
                window.location.reload()
            })
            .catch((error) => {

                alert('Não foi possível alterar os preços')
                console.log(error)
            })
    }
}