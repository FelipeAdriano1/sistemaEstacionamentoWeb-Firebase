import { db, collection, getDoc, doc, updateDoc } from '../../../../src/index.js'

addEventListener('DOMContentLoaded', function () {

    getDoc(doc(db, 'estacionamento', 'precos'))
        .then((query) => {

            const precos = query.data()

            this.document.getElementById('precoFixo').value = precos.precoFixo
            this.document.getElementById('precoHora').value = precos.precoHora
            this.document.getElementById('precoMinuto').value = precos.precoPorMinuto

            this.document.getElementById('buttonEditPreco').addEventListener('click', function() {

                alterarPrecos(precos)
            })
        })
})

function alterarPrecos(precos) {

    const precoFixo = document.getElementById('precoFixo').value
    const precoHora = document.getElementById('precoHora').value
    const precoPorMinuto = (precoHora / 60).toFixed(2)

    console.log(precoPorMinuto)


    if(!precoFixo || !precoHora || !precoPorMinuto){
        alert('Preencha todos os campos para salvar os preços')
        return
    }

    precos.precoFixo = precoFixo
    precos.precoHora = precoHora
    precos.precoPorMinuto = precoPorMinuto

    

    updateDoc(doc(db, 'estacionamento', 'precos'), precos)
    .then(()=> {

        alert('Preços alterados com sucesso.')
        window.location.reload()
    })
    .catch((error) => {

        alert('Não foi possível alterar os preços')
        console.log(error)
    })
}