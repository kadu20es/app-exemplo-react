//import logo from './logo.svg';
//import './App.css';
// https://viacep.com.br/ws/29023547/json


import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});


  async function handleSearch(){
    if (input === "") {
      alert("Preencha algum CEP");
      return;
    }

    try { // faz a requisição no service/api. o ${input}/json complementa com o resto do que precisa ser enviado

      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data); // passa o valor obtido para const [cep]
      setInput(""); // limpa o campo


    } catch (e) {

      console.log("Não foi possível completar a requisição", e);
      alert("Não foi possível completar a requisição", e);
      setInput(""); // limpa o campo
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Digite seu cep..."
          value={input}
          onChange={ (evento) => setInput(evento.target.value) } // pega o que o user digitou e passa para o useState input
          />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && ( // exibe a div se tiver akguma informaççao no objeto cep
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Logradouro: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

      </main>
      )}

    </div>




  );
}

export default App;
