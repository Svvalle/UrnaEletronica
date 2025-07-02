import React, { useState } from 'react';

const LoginPage = ({ validarEleitor, setTelaAtual }) => {
  const [matriculaInput, setMatriculaInput] = useState('');

  const handleValidar = () => {
    const matricula = matriculaInput.trim();
    validarEleitor(matricula);
    setMatriculaInput('');
  };

  return (
    <div className="login-screen">
      <h2>🔐 Identificação do Eleitor</h2>
      <img className='logo-senai' src='images/logo_senai-removebg-preview.png' alt="Logo SENAI" />
      <div className="input-group">
        <label>Digite sua matrícula:</label>
        <input
          type="text"
          value={matriculaInput}
          onChange={(e) => setMatriculaInput(e.target.value)}
          placeholder="Ex: 123456"
          maxLength="6"
          onKeyPress={(e) => e.key === 'Enter' && handleValidar()}
        />
      </div>
      <div className="controls">
        <button className="btn btn-primary" onClick={handleValidar}>
          Entrar
        </button>
        <button className="btn btn-warning" onClick={() => setTelaAtual('resultados')}>
          Ver Resultados
        </button>
      </div>
    </div>
  );
};

export default LoginPage;