import { getDoc, doc, db } from '../../../../src/index.js'

getDoc(doc(db, 'contato', 'contatoAdmin'))
    .then((query) => {

        const dados = query.data()

        document.getElementById('nome').value = dados.nome 
        document.getElementById('telefone').value = dados.telefone
        document.getElementById('email').value = dados.email
    })