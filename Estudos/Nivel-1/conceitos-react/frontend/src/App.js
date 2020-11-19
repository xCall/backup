import React, { useState, useEffect } from 'react'
import Header from './components/Header'

import api from './service/api'

import './App.css'



function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  //useState retorna um array com 2 posições
  //1. Variável com o seu valor inicial
  //2. Função para atualizarmos esse valor

  async function handlerAddProject() {
    // projects.push(`Novo projeto ${Date.now()}`)

    // setProjects([...projects, `Novo projeto ${Date.now()}`])

    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      Owner: "Carlos Daniel"
    })
    const project = response.data

    setProjects([...projects, project])
  }

  return (
    <>
      <Header title="Homepage">
        <ul>
          {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>
      </Header>

      <button type="button" onClick={handlerAddProject}>Adicionar projeto</button>
    </>
  )
}

export default App