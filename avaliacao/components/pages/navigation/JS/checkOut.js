import { db, getDocs, where, auth, collection, onAuthStateChanged, query, getDoc, doc, addDoc, deleteDoc, updateDoc } from "../../../../src/index.js"

var precoFixo
var precoHora
var precoPorMinuto
var idAccount
var minutosTotais = 0

addEventListener('DOMContentLoaded', function () {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            let consulta

            if (user.uid === '2bQUx6HC6YfMO0bS7IfcJ4sFDHE2') {
                consulta = getDocs(collection(db, 'reservas'))
            }
            else {
                consulta = getDocs(query(collection(db, 'reservas'), where('uidAccount', '==', user.uid)))
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

                            html += `<option value="${idDoc[i]}">${reservas[i].nomeReserva}</option>`
                        }
                        document.getElementById('selectReserva').innerHTML = html
                    })

                    addEventListener('change', function () {

                        const idSelect = document.getElementById('selectReserva').value

                        querySnapshot.forEach(element => {

                            if (idSelect == element.id) {
                                const dados = element.data()

                                idAccount = dados.uidAccount

                                this.document.getElementById('nomeProp').value = dados.nomeProprietario
                                this.document.getElementById('telefone').value = dados.telefone
                                this.document.getElementById('tipoCad').value = dados.tipo
                                this.document.getElementById('nomeVeiculo').value = dados.modeloVeiculo
                                this.document.getElementById('placaCarro').value = dados.placa
                                this.document.getElementById('horaEntrada').value = dados.horaEntrada
                                this.document.getElementById('endereco').value = dados.endereco
                            }
                        })
                    })
                }
                else {
                    console.log('Usuário não encontrado')
                }
            })
            getDoc(doc(db, 'estacionamento', 'precos'))
                .then((query) => {

                    const precos = query.data()

                    precoFixo = precos.precoFixo
                    precoHora = precos.precoHora

                    precoPorMinuto = precos.precoPorMinuto

                    this.document.getElementById('precoFixo').value = precos.precoFixo
                    this.document.getElementById('precoHora').value = precos.precoHora
                })
        }
        else {
            console.log('usuário não autenticado')
        }
    })
})

document.getElementById('horaSaida').addEventListener('input', function () {

    var horaSaida = new Date(document.getElementById('horaSaida').value)
    var horaEntrada = new Date(document.getElementById('horaEntrada').value)

    if (horaSaida.getDate() === horaEntrada.getDate()) {
        minutosTotais = (horaSaida - horaEntrada) / (1000 * 60)
    } else {
        var inicioDoDiaEntrada = new Date(horaEntrada)
        inicioDoDiaEntrada.setHours(0, 0, 0, 0)

        var fimDoDiaEntrada = new Date(horaEntrada)
        fimDoDiaEntrada.setHours(23, 59, 59, 999)

        minutosTotais += (fimDoDiaEntrada - horaEntrada) / (60000)

        var diasIntermediarios = Math.floor((horaSaida - fimDoDiaEntrada) / (1000 * 60 * 60 * 24))
        minutosTotais += diasIntermediarios * 24 * 60

        var inicioDoDiaSaida = new Date(horaSaida)
        inicioDoDiaSaida.setHours(0, 0, 0, 0)

        minutosTotais += (horaSaida - inicioDoDiaSaida) / (60000)
    }

    var precoTotal = (minutosTotais * precoPorMinuto).toFixed(1) + precoFixo

    document.getElementById('precoTotal').value = precoTotal
})

getDoc(doc(db, 'estacionamento', 'vagas'))
    .then((query) => {

        const vagas = query.data()

        document.getElementById('buttonCheckOut').addEventListener('click', function () {

            const nome = document.getElementById('nomeProp').value
            const telefone = document.getElementById('telefone').value
            const modelo = document.getElementById('nomeVeiculo').value
            const tipoVeiculo = document.getElementById('tipoCad').value
            const placaCarro = document.getElementById('placaCarro').value
            const horaEntrada = document.getElementById('horaEntrada').value
            const horaSaida = document.getElementById('horaSaida').value
            const precoFixo = document.getElementById('precoFixo').value
            const precoHora = document.getElementById('precoHora').value
            const precoTotal = document.getElementById('precoTotal').value
            const endereco = document.getElementById('endereco').value

            const id = document.getElementById('selectReserva').value

            if (!nome || !telefone || !modelo || !tipoVeiculo || !placaCarro || !horaEntrada
                || !horaSaida || !precoFixo || !precoHora || !precoTotal) {

                alert('Por favor, preencha todos os campos para emitir o check out')
                return
            }

            if (tipoVeiculo == 'caminhao') {
                vagas.quantDispCaminhao++
                vagas.quantOcupCaminhao--
            }
            else if (tipoVeiculo == 'carro') {
                vagas.quantDispCarro++
                vagas.quantOcupCarro--
            }
            else if (tipoVeiculo == 'moto') {
                vagas.quantDispMoto++
                vagas.quantOcupMoto--
            }

            updateDoc(doc(db, 'estacionamento', 'vagas'), vagas)
                .then(() => {

                    addDoc(collection(db, 'comprovantes'), {

                        nome: nome,
                        telefone: telefone,
                        endereco: endereco,
                        modeloVeiculo: modelo,
                        tipoVeiculo: tipoVeiculo,
                        placaCarro: placaCarro,
                        horaEntrada: horaEntrada,
                        horaSaida: horaSaida,
                        precoFixo: precoFixo,
                        precoHora: precoHora,
                        precoTotal: precoTotal,
                        idAccount: idAccount
                    })
                        .then(() => {
                            deleteDoc(doc(db, 'reservas', id))
                                .then(() => {

                                    alert('Comprovante salvo com sucesso !')
                                    window.location.reload()
                                })
                                .catch((error) => {

                                    alert('Não foi possível excluir a reserva. ')
                                    console.log(error)
                                })
                        })
                        .catch((error) => {

                            alert('Não foi possível salvar o comprovante. Para mais detalhes sobre o erro, consulte o console')
                            console.log(error)
                        })
                })
        })

        document.getElementById('buttonExcluirReserva').addEventListener('click', function () {

            excluirReserva()
        })

        function excluirReserva() {

            const select = document.getElementById('selectReserva').value
            const horaSaida = document.getElementById('horaSaida').value

            if (!select == 'vazio' || horaSaida) {
                if (minutosTotais < 15) {

                    const tipoVeiculo = document.getElementById('tipoCad').value

                    if (tipoVeiculo == 'caminhao') {
                        vagas.quantDispCaminhao++
                        vagas.quantOcupCaminhao--
                    }
                    else if (tipoVeiculo == 'carro') {
                        vagas.quantDispCarro++
                        vagas.quantOcupCarro--
                    }
                    else if (tipoVeiculo == 'moto') {
                        vagas.quantDispMoto++
                        vagas.quantOcupMoto--
                    }

                    updateDoc(doc(db, 'estacionamento', 'vagas'), vagas)
                        .then(() => {

                            deleteDoc(doc(db, 'reservas', select))
                                .then(() => {

                                    alert('Reserva excluida com sucesso !')
                                    window.location.reload()
                                })
                                .catch((error) => {

                                    alert('Não foi possível excluir a reserva')
                                    console.log(error)
                                })
                        })
                }
                else {
                    alert('Tempo de permanência maior do que 15 minutos. Faça o check out')
                }
            }
            else {
                alert('Selecione uma reserva')
            }

        }
    })
