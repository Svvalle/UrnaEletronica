'use client';

import React, { useState } from 'react';
import Header from '../components/header/header';
import Alert from '../components/alert/alert';
import LoginPage from '../pages/LoginPage';
import VotingPage from '../pages/VotingPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import SuccessPage from '../pages/SuccessPage';
import ResultsPage from '../pages/ResultsPage';
import { candidatos, posicoes, getInitialVotes } from '../utils/candidatos';
import { contabilizarVoto, calcularResultados } from '../utils/helpers';
import '../styles/urna.css';
 
const UrnaEletronica = () => {
  // Estados principais
  const [eleitoresQueVotaram, setEleitoresQueVotaram] = useState(new Set());
  const [votos, setVotos] = useState(getInitialVotes());
  const [votosAtuais, setVotosAtuais] = useState({});
  const [posicaoAtual, setPosicaoAtual] = useState('representante');
  const [indicePosicao, setIndicePosicao] = useState(0);
  const [eleitorAtual, setEleitorAtual] = useState('');
  const [telaAtual, setTelaAtual] = useState('login');
  const [alerta, setAlerta] = useState({ mensagem: '', tipo: '' });

  // Função para mostrar alertas
  const mostrarAlerta = (mensagem, tipo = 'error') => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => setAlerta({ mensagem: '', tipo: '' }), 3000);
  };

  // Validar eleitor
  const validarEleitor = (matricula) => {
    if (!matricula) {
      mostrarAlerta('Por favor, digite uma matrícula válida.', 'error');
      return;
    }

    if (eleitoresQueVotaram.has(matricula)) {
      mostrarAlerta('Esta matrícula já votou! Cada eleitor pode votar apenas uma vez.', 'error');
      return;
    }

    setEleitorAtual(matricula);
    resetVotosAtuais();
    setTelaAtual('votacao');
  };

  // Reset dos votos atuais
  const resetVotosAtuais = () => {
    setVotosAtuais({});
    setPosicaoAtual('representante');
    setIndicePosicao(0);
  };

  // Função para votar
  const votar = (posicao, voto) => {
    setVotosAtuais(prev => ({
      ...prev,
      [posicao]: voto
    }));
  };

  // Próxima posição
  const proximaPosicao = () => {
    const novoIndice = indicePosicao + 1;
    setIndicePosicao(novoIndice);

    if (novoIndice < posicoes.length) {
      setPosicaoAtual(posicoes[novoIndice]);
    } else {
      setTelaAtual('confirmacao');
    }
  };

  // Voltar para votação
  const voltarVotacao = () => {
    setIndicePosicao(0);
    setPosicaoAtual(posicoes[0]);
    setTelaAtual('votacao');
  };

  // Confirmar votos
  const confirmarVotos = () => {
    setEleitoresQueVotaram(prev => new Set([...prev, eleitorAtual]));

    const novosVotos = { ...votos };
    posicoes.forEach(posicao => {
      contabilizarVoto(novosVotos, posicao, votosAtuais[posicao], candidatos);
    });
    setVotos(novosVotos);

    setTelaAtual('sucesso');
  };

  // Próximo eleitor
  const proximoEleitor = () => {
    setEleitorAtual('');
    resetVotosAtuais();
    setTelaAtual('login');
  };

  // Nova eleição
  const novaEleicao = () => {
    if (window.confirm('Tem certeza que deseja iniciar uma nova eleição? Todos os votos atuais serão perdidos.')) {
      setEleitoresQueVotaram(new Set());
      setVotos(getInitialVotes());
      setVotosAtuais({});
      setPosicaoAtual('representante');
      setIndicePosicao(0);
      setEleitorAtual('');
      setTelaAtual('login');
    }
  };

  // Props compartilhadas
  const sharedProps = {
    candidatos,
    posicoes,
    votos,
    votosAtuais,
    posicaoAtual,
    indicePosicao,
    eleitorAtual,
    eleitoresQueVotaram,
    mostrarAlerta,
    validarEleitor,
    votar,
    proximaPosicao,
    voltarVotacao,
    confirmarVotos,
    proximoEleitor,
    novaEleicao,
    setTelaAtual,
    calcularResultados: () => calcularResultados(votos)
  };

  return (
    <div className="urna-container">
      <Header />
      <div className="screen">
        <Alert alerta={alerta} />
        
        {telaAtual === 'login' && <LoginPage {...sharedProps} />}
        {telaAtual === 'votacao' && <VotingPage {...sharedProps} />}
        {telaAtual === 'confirmacao' && <ConfirmationPage {...sharedProps} />}
        {telaAtual === 'sucesso' && <SuccessPage {...sharedProps} />}
        {telaAtual === 'resultados' && <ResultsPage {...sharedProps} />}
      </div>
    </div>
  );
};

export default UrnaEletronica;
