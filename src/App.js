import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  // const [title, setTitle] = useState('');
  // const [url, setUrl] = useState('');
  // const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    const data = {
      title: "Conceitos de React",
      url: "meusite.com",
      techs: [
        "Nodejs",
        "Reactjs"
      ]
    }

    const response = await api.post('repositories', data);

    const repository = response.data;

    setRepositories([...repositories, repository])


    // setTitle('');
    // setUrl('');
    // setTechs('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
{/*       
      <form onSubmit={handleAddRepository}>
        <label htmlFor="title">Title </label>
        <input name="title" id="title" value={title} onChange={ e => setTitle(e.target.value)}/>

        <label htmlFor="url">Url </label>
        <input name="url" id="url" value="url" onChange={ e => setUrl(e.target.value)}/>

        <label htmlFor="techs">Techs </label>
        <input name="techs" id="techs" value="techs" onChange={ e => setTechs(e.target.value)}/>

        <button onClick={} className="button" type="submit">Adicionar</button>
      </form> */}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
