 import React, { useState } from 'react';
 import { useHistory, useParams } from 'react-router-dom';
 import axios from 'axios'


const Login = () => {

  return (
    <div>
      <div>
        <label>Email:</label>
        <input></input>
      </div>
      <div>
        <label>Senha:</label>
        <input></input>
      </div>
      <button>Entrar:</button>
      <button>Cadastrar:</button>
    </div>
  )
}

export default Login;