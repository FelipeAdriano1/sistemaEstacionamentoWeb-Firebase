import { getDocs, collection, db } from "../../../../src/index.js"

addEventListener('DOMContentLoaded', function () {

    getDocs(collection(db, 'estacionamento'))
        .then((query) => {
            if (!query.empty) {
                const precos = []
                const vagas = []
                query.forEach(element => {

                    if (element.id === 'vagas') {
                        vagas.push(element.data())
                    }
                    else if (element.id === 'precos') {
                        precos.push(element.data())
                    }
                })
                
                this.document.getElementById('precoFixo').value = precos[0].precoFixo
                this.document.getElementById('precoHora').value = precos[0].precoHora

                this.document.getElementById('quantMoto').value = vagas[0].quantOcupMoto
                this.document.getElementById('quantCarro').value = vagas[0].quantOcupCarro
                this.document.getElementById('quantCaminhao').value = vagas[0].quantOcupCaminhao

                this.document.getElementById('quantMotoDisp').value = vagas[0].quantDispMoto
                this.document.getElementById('quantCarroDisp').value = vagas[0].quantDispCarro
                this.document.getElementById('quantCaminhaoDisp').value = vagas[0].quantDispCaminhao
            }
        })
})