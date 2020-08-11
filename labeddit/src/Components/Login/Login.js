 import React, { useState } from 'react';
 import useForm from '../../Hooks/useForm'
 import { useHistory, useParams } from 'react-router-dom';
 import axios from 'axios';
 import { Container } from './style'


const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit";



const Login = () => {
  let history = useHistory();
  const {form, onChange } = useForm({
    email: "",
    password: ""
  }) 

  const handleInputChange = event => {
    const { name, value } = event.target

    onChange(name, value)
  }

  const handleLogin = event => {
    event.preventDefault();
    
    const body = {
      email: form.email,
      password: form.password
    }
    axios
    .post(`${baseUrl}/login`, body)
    .then(response => {
      console.log(response.data)
      history.push("/feed")
      window.localStorage.setItem("token", response.data.token)
      alert(`Login efetuado com sucesso! Seja bem vindo(a) ${form.email}`)
    }).catch(err => {
      console.log(err.message)
    })
  }

  const onClickSignUp = () => { 
    history.push("/")
  }

  return (
    <Container>
      <div>
        <h2>Efetue o Login</h2>
        <form onSubmit={handleLogin}>
            <label>Email:</label>
          <div>
            <input
              type="text"
              onChange={handleInputChange}
              name="email"
              value={form.email}
              placeholder="Digite seu email"
              required
            ></input>
          </div>
            <label>Senha:</label>
          <div>
            <input
              type="password"
              onChange={handleInputChange}
              name="password"
              value={form.password}
              placeholder="Digite sua senha"
              required
            ></input>
          </div>
          <button>Entrar</button>
        </form>
        <button onClick={onClickSignUp}>Cadastrar</button>
      </div>
    </Container>
  )
}

export default Login;