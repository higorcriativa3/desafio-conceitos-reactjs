import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepos(response.data);
      console.log(response.data)
    })
  }, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'https://github.com/higorcriativa3/bootcamp-gostack-desafios-node-conceitos',
      techs: 'ReactJS, NodeJS e React Native'
    });

    const repo = response.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`);

      setRepos(repos.filter(repo => repo.id !== id));
    } catch (err) {
      alert('Erro ao deletar o repositório, tente novamente.');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => <li key={repo.id}>
              <p>Nome: {repo.title} </p><br/>

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>)
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
