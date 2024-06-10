import { db, collection, doc, addDoc, getDoc, getDocs, onAuthStateChanged, auth, where, updateDoc, query } from '../../../../src/index.js'
let vagas

addEventListener('DOMContentLoaded', function () {

    getDoc(doc(db, 'estacionamento', 'vagas'))
        .then((response) => {

            vagas = response.data()

            if (vagas.quantDispCaminhao == 0) {
                this.document.querySelector('#selectTipoVeiculo option[value="caminhao"]').disabled = true
            }
            else if (vagas.quantDispCarro == 0) {
                this.document.querySelector('#selectTipoVeiculo option[value="carro"]').disabled = true
            }
            if (vagas.quantDispMoto == 0) {
                this.document.querySelector('#selectTipoVeiculo option[value="moto"]').disabled = true
            }

            document.getElementById('selectTipoVeiculo').addEventListener('change', function () {

                let select = document.getElementById('selectTipoVeiculo').value

                if (select == 'caminhao') {
                    document.getElementById('quantVagas').value = vagas.caminhao
                    document.getElementById('quantDisponivel').value = vagas.quantDispCaminhao

                }
                else if (select == 'carro') {
                    document.getElementById('quantVagas').value = vagas.carro
                    document.getElementById('quantDisponivel').value = vagas.quantDispCarro
                }
                else if (select == 'moto') {
                    document.getElementById('quantVagas').value = vagas.moto
                    document.getElementById('quantDisponivel').value = vagas.quantDispMoto
                }
            })
        })
})

document.getElementById('buttonCadastrar').addEventListener('click', function () {

    const date = new Date()
    const dia = date.getDate().toString().padStart(2, '0')
    const mes = (date.getMonth() + 1).toString().padStart(2, '0')
    const ano = date.getFullYear()
    const hora = date.getHours().toString().padStart(2, '0')
    const minuto = date.getMinutes().toString().padStart(2, '0')
    const horaFormat = `${ano}-${mes}-${dia}T${hora}:${minuto}`

    const modelo = document.getElementById('modelo').value
    const placa = document.getElementById('placa').value
    const tipo = document.getElementById('selectTipoVeiculo').value

    if (!modelo || !placa || tipo == 'vazio') {

        alert('Preencha todos os campos e selecione um tipo de veículo.')
        return
    }

    if (tipo == 'caminhao') {
        vagas.quantDispCaminhao--
        vagas.quantOcupCaminhao++
    }
    else if (tipo == 'carro') {
        vagas.quantDispCarro--
        vagas.quantOcupCarro++
    }
    else if (tipo == 'moto') {
        vagas.quantDispMoto--
        vagas.quantOcupMoto++
    }

    onAuthStateChanged(auth, (user) => {
        getDocs(query(collection(db, 'commonUsers'), where('uidAccount', '==', user.uid)))
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(element => {
                        const users = element.data()

                        const nomeReserva = `"Reserva: ${users.nome} - ${horaFormat}"`

                        addDoc(collection(db, 'reservas'), {

                            nomeReserva: nomeReserva,
                            nomeProprietario: users.nome,
                            endereco: users.endereco,
                            telefone: users.telefone,
                            modeloVeiculo: modelo,
                            placa: placa,
                            tipo: tipo,
                            horaEntrada: horaFormat,
                            uidAccount: user.uid,
                        })
                            .then(() => {

                                updateDoc(doc(db, 'estacionamento', 'vagas'), vagas)

                                alert('Reserva efetuada com sucesso !')
                                window.location.reload()
                            })
                            .catch((error) => {
                                alert('Não foi possível realizar a reserva.')
                                console.log(error)
                            })

                    })
                }
                else {
                    getDocs(query(collection(db, 'admins'), where('uidAccount', '==', user.uid)))
                        .then((querySnapshot) => {
                            if (!querySnapshot.empty) {
                                querySnapshot.forEach(element => {
                                    const users = element.data()

                                    const nomeReserva = `"Reserva: ${users.nome} - ${horaFormat}"`

                                    addDoc(collection(db, 'reservas'), {

                                        nomeReserva: nomeReserva,
                                        nomeProprietario: users.nome,
                                        endereco: users.endereco,
                                        telefone: users.telefone,
                                        modeloVeiculo: modelo,
                                        placa: placa,
                                        tipo: tipo,
                                        horaEntrada: horaFormat,
                                        uidAccount: user.uid,
                                    })
                                        .then(() => {

                                            updateDoc(doc(db, 'estacionamento', 'vagas'), vagas)

                                            alert('Reserva efetuada com sucesso !')
                                            window.location.reload()
                                        })
                                        .catch((error) => {
                                            alert('Não foi possível realizar a reserva.')
                                            console.log(error)
                                        })

                                })
                            }
                        })
                }
            })
    })
})