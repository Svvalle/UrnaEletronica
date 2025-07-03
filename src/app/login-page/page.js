import { LoginControls } from '@/components/buttons';
import React, { useState } from 'react';
import styles from '../page.module.css';
import { Router } from 'next/router';

const LoginPage = () => {
    const [matriculaInput, setMatriculaInput] = useState('');
    const [eleitoresQueVotaram, setEleitoresQueVotaram] = useState(new Set());
    const [alerta, setAlerta] = useState({ mensagem: '', tipo: '' });
    const [eleitorAtual, setEleitorAtual] = useState('');
    const [votosAtuais, setVotosAtuais] = useState({});

    const validarEleitor = (matricula) => {
        if (!matricula) {
            alert('Por favor, digite uma matrícula válida.', 'error');
            return;
        }

        if (eleitoresQueVotaram.has(matricula)) {
            alert('Esta matrícula já votou! Cada eleitor pode votar apenas uma vez.', 'error');
            return;
        }

        setEleitorAtual(matricula);
        resetVotosAtuais();
        Router.push('/urna-eletronica');// Ajuste o caminho conforme necessário
        setTelaAtual('votacao');

    };

    const resetVotosAtuais = () => {
        setVotosAtuais({});
        // setPosicaoAtual('representante');

      };
    
    const handleValidar = () => {
        const matricula = matriculaInput.trim();
        validarEleitor(matricula);
        setMatriculaInput('');
    };

    const mostrarAlerta = (mensagem, tipo = 'error') => {
        setAlerta({ mensagem, tipo });
        setTimeout(() => setAlerta({ mensagem: '', tipo: '' }), 3000);
      };

      // useEffect que carrega eleitores que votaram do local storage

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
            <LoginControls
                onLogin={handleValidar}
                onViewResults={() => setTelaAtual('resultados')}
            ></LoginControls>
        </div>
    )
}

export default LoginPage;