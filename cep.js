'use strict';
//   Explicacao
// const aluno = {
//     nome: "Maria",
//     nota: 8,
//     semestre: 3,
//     email:'maria@gmail.com',
// };

// const  { notas, email } = aluno;

const pesquisarCep = async (cep) => {
    //Faz a requisição da API VIA CEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);          //Resposta do servidor
    const data = await response.json();         //Dados
    return data;
}

const preencherFormulario = async (evento) => {
    // const cep = document.querySelector('#cep').value;
    const cep = evento.target.value;
    
    const limparFrmulario = () =>{
        document.querySelector('#endereco').value = '';
        document.querySelector('#bairro').value = '';
        document.querySelector('#cidade').value = '';
        document.querySelector('#estado').value = '';
        // return '';
    }

    const cepValido = (cep) => /^[0-9]{8}$/.test(cep);
    limparFrmulario()
    if (cepValido(cep)){
        const infoCep = await pesquisarCep(cep);
        document.querySelector('#endereco').value = infoCep.logradouro;
        document.querySelector('#bairro').value = infoCep.bairro;
        document.querySelector('#cidade').value = infoCep.localidade;
        document.querySelector('#estado').value = infoCep.uf;
    }
    else {
        document.querySelector('#endereco').value = 'cep incorreto!!';
    }

};

document.querySelector('#cep').addEventListener('focusout', preencherFormulario);
