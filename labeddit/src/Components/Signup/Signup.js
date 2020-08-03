import React from 'react';
import { Container } from './styles';
import useForm from '../../Hooks/useForm'
import axios from 'axios'

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup"

function Signup() {
  const { form, onChange } = useForm({
    userName: "",
    email: "",
    password: ""
  })

  const handleInputChange = event => {
    const { name, value } = event.target

    onChange(name, value)
  }

  const handleSignUp = event => {
    event.preventDefault()
    const body = {
      "email": form.email,
      "password": form.password,
      "username": form.userName
    }

    axios
    .post(baseUrl, body)
    .then(response => {
      console.log(response.data)
    }).catch(err => {
      console.log(err.message)
    })
  } 
  return (
    <Container>
      <h2>Sign up</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          value={form.userName}
          onChange={handleInputChange}
          name="userName"
          placeholder="Nome de usuário"
          required
        />

        <input
          type="email"
          value={form.email}
          onChange={handleInputChange}
          name="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={form.password}
          onChange={handleInputChange}
          name="password"
          placeholder="Senha"
          required
        />

        <button>Cadastrar</button>
      </form>
    </Container>
  )
}

export default Signup;