'use client';

import React, { useState, useEffect } from 'react';
import '../styles/urna.css';

const UrnaEletronica = () => {
  // Estados principais
  const [eleitoresQueVotaram, setEleitoresQueVotaram] = useState(new Set());
  const [votos, setVotos] = useState({
    representante: {
      candidatos: { pedro: 0, joao: 0, rogerio: 0 },
      branco: 0,
      nulo: 0
    },
    monitor: {
      candidatos: { pedro: 0, gabriel: 0, marcelo: 0 },
      branco: 0,
      nulo: 0
    },
    orador: {
      candidatos: { matheus: 0, daniel: 0, felipe: 0 },
      branco: 0,
      nulo: 0
    }
  });

  const [votacao, setVotacao] = useState(
    [
      {
        cargo: "Representante de Turma",
        representantes: [
          {
            nome: "Joao",
            votosRep: 0
          },
          {
            nome: "Pedro",
            votos: 0
          },
          {
            nome: "Rogério",
            votos: 0
          },
          {
            brancos: 0,
            nulos: 0
          }
        ]       
      },
      {
        cargo: "Monitor",
        representantes: [
          {
            nome: "Gabriel",
            votosRep: 0
          },
          {
            nome: "Pedro",
            votos: 0
          },
          {
            nome: "Marcelo",
            votos: 0
          },
          {
            brancos: 0,
            nulos: 0
          }
        ]
      },
      {
        cargo: "Orador",
        representantes: [
          {
            nome: "Matheus",
            votosRep: 0
          },
          {
            nome: "Daniel",
            votos: 0
          },
          {
            nome: "Felipe",
            votos: 0
          },
          {
            brancos: 0,
            nulos: 0
          }
        ]
      }
    ]);

  // votacao[0].representantes.map((representante) => {
  //   (
  //     <CardRepresentante nome:{representante.nome}/>
  //   )
  // }

  // Candidatos por posição
  const candidatos = {
    representante: [
      { numero: 1, nome: 'Pedro' },
      { numero: 2, nome: 'João' },
      { numero: 3, nome: 'Rogério' }
    ],
    monitor: [
      { numero: 1, nome: 'Pedro' },
      { numero: 2, nome: 'Gabriel' },
      { numero: 3, nome: 'Marcelo' }
    ],
    orador: [
      { numero: 1, nome: 'Matheus' },
      { numero: 2, nome: 'Daniel' },
      { numero: 3, nome: 'Felipe' }
    ]
  };

  const [votosAtuais, setVotosAtuais] = useState({});
  const [posicaoAtual, setPosicaoAtual] = useState('representante');
  const posicoes = ['representante', 'monitor', 'orador'];
  const [indicePosicao, setIndicePosicao] = useState(0);
  const [eleitorAtual, setEleitorAtual] = useState('');
  const [telaAtual, setTelaAtual] = useState('login');
  const [alerta, setAlerta] = useState({ mensagem: '', tipo: '' });
  const [matriculaInput, setMatriculaInput] = useState('');

  // Função para mostrar alertas
  const mostrarAlerta = (mensagem, tipo = 'error') => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => setAlerta({ mensagem: '', tipo: '' }), 3000);
  };

  // Validar eleitor
  const validarEleitor = () => {
    const matricula = matriculaInput.trim();

    if (!matricula) {
      mostrarAlerta('Por favor, digite uma matrícula válida.', 'error');
      return;
    }

    if (eleitoresQueVotaram.has(matricula)) {
      mostrarAlerta('Esta matrícula já votou! Cada eleitor pode votar apenas uma vez.', 'error');
      return;
    }

    setEleitorAtual(matricula);
    setMatriculaInput('');
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
    // Registrar que este eleitor já votou
    setEleitoresQueVotaram(prev => new Set([...prev, eleitorAtual]));

    // Contabilizar votos
    const novosVotos = { ...votos };
    posicoes.forEach(posicao => {
      contabilizarVoto(novosVotos, posicao, votosAtuais[posicao]);
    });
    setVotos(novosVotos);

    setTelaAtual('sucesso');
  };

  // Contabilizar voto
  const contabilizarVoto = (votosObj, posicao, voto) => {
    if (voto === 'branco') {
      votosObj[posicao].branco++;
    } else if (voto === 'nulo') {
      votosObj[posicao].nulo++;
    } else {
      const candidato = candidatos[posicao].find(c => c.numero === voto);
      if (candidato) {
        const nomeKey = candidato.nome.toLowerCase();
        votosObj[posicao].candidatos[nomeKey]++;
      }
    }
  };

  // Próximo eleitor
  const proximoEleitor = () => {
    setEleitorAtual('');
    resetVotosAtuais();
    setTelaAtual('login');
  };

  // Calcular resultados
  const calcularResultados = () => {
    const resultados = {};

    for (const posicao in votos) {
      const votosCandidatos = votos[posicao].candidatos;
      const entries = Object.entries(votosCandidatos);
      const maxVotos = Math.max(...Object.values(votosCandidatos));
      const vencedores = entries.filter(([nome, quantidade]) => quantidade === maxVotos && quantidade > 0);

      if (vencedores.length > 1) {
        resultados[posicao] = {
          empate: true,
          vencedores: vencedores.map(([nome]) => nome)
        };
      } else if (vencedores.length === 1) {
        resultados[posicao] = { vencedor: vencedores[0][0] };
      } else {
        resultados[posicao] = { vencedor: null };
      }
    }

    return resultados;
  };

  // Obter nome da posição
  const getPosicaoNome = (posicao) => {
    const nomes = {
      representante: 'Representante de Turma',
      monitor: 'Monitor',
      orador: 'Orador'
    };
    return nomes[posicao];
  };

  // Nova eleição
  const novaEleicao = () => {
    if (window.confirm('Tem certeza que deseja iniciar uma nova eleição? Todos os votos atuais serão perdidos.')) {
      setEleitoresQueVotaram(new Set());
      setVotos({
        representante: {
          candidatos: { pedro: 0, joao: 0, rogerio: 0 },
          branco: 0,
          nulo: 0
        },
        monitor: {
          candidatos: { pedro: 0, gabriel: 0, marcelo: 0 },
          branco: 0,
          nulo: 0
        },
        orador: {
          candidatos: { matheus: 0, daniel: 0, felipe: 0 },
          branco: 0,
          nulo: 0
        }
      });
      setVotosAtuais({});
      setPosicaoAtual('representante');
      setIndicePosicao(0);
      setEleitorAtual('');
      setTelaAtual('login');
    }
  };

  // Render revisão de votos
  const renderVoteReview = () => {
    return posicoes.map(posicao => {
      const voto = votosAtuais[posicao];
      const posicaoNome = getPosicaoNome(posicao);
      let votoTexto = '';

      if (voto === 'branco') {
        votoTexto = 'VOTO EM BRANCO';
      } else if (voto === 'nulo') {
        votoTexto = 'VOTO NULO';
      } else {
        const candidato = candidatos[posicao].find(c => c.numero === voto);
        votoTexto = candidato ? `${candidato.nome} (${candidato.numero})` : 'Não selecionado';
      }

      return (
        <div key={posicao} className="vote-item">
          <span><strong>{posicaoNome}:</strong></span>
          <span>{votoTexto}</span>
        </div>
      );
    });
  };

  // Render resultado por posição
  const renderResultadoPosicao = (titulo, posicao, resultado) => {
    const votosPos = votos[posicao];
    const votosCandidatos = votosPos.candidatos;
    const totalVotos = Object.values(votosCandidatos).reduce((a, b) => a + b, 0) + votosPos.branco + votosPos.nulo;

    return (
      <div key={posicao} className="results-section">
        <h3>{titulo}</h3>

        <h4>📋 Candidatos:</h4>
        {Object.entries(votosCandidatos).map(([nome, quantidade]) => {
          const percentage = totalVotos > 0 ? (quantidade / totalVotos * 100) : 0;
          const isWinner = resultado.vencedor && nome === resultado.vencedor.toLowerCase();
          const isTie = resultado.empate && resultado.vencedores && resultado.vencedores.includes(nome);

          return (
            <div key={nome}>
              <div className={`result-item ${isWinner && !resultado.empate ? 'winner' : ''} ${isTie ? 'tie' : ''}`}>
                <span>{nome.charAt(0).toUpperCase() + nome.slice(1)}</span>
                <span>{quantidade} voto{quantidade !== 1 ? 's' : ''} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
              </div>
            </div>
          );
        })}

        <h4>📄 Votos Especiais:</h4>
        <div className="result-item">
          <span>Votos em Branco</span>
          <span>{votosPos.branco} voto{votosPos.branco !== 1 ? 's' : ''} ({totalVotos > 0 ? (votosPos.branco / totalVotos * 100).toFixed(1) : 0}%)</span>
        </div>
        <div className="result-item">
          <span>Votos Nulos</span>
          <span>{votosPos.nulo} voto{votosPos.nulo !== 1 ? 's' : ''} ({totalVotos > 0 ? (votosPos.nulo / totalVotos * 100).toFixed(1) : 0}%)</span>
        </div>

        <div className="result-summary">
          {resultado.empate ?
            `🤝 EMPATE! Candidatos empatados: ${resultado.vencedores.map(v => v.toUpperCase()).join(', ')}` :
            resultado.vencedor ? `🏆 MAIS VOTADO: ${resultado.vencedor.toUpperCase()}` :
              totalVotos === 0 ? '⚠️ Nenhum voto registrado' : '⚠️ Apenas votos especiais'
          }
        </div>
      </div>
    );
  };

  // Componente principal
  return (
    <div className="urna-container">
      <div className="urna-header">
        <h1>🗳️ URNA ELETRÔNICA</h1>
        <p>Sistema de Votação Digital</p>
      </div>

      <div className="screen">
        {alerta.mensagem && (
          <div className={`alert ${alerta.tipo === 'success' ? 'success' : ''}`}>
            {alerta.mensagem}
          </div>
        )}

        {/* Tela de Login */}
        {telaAtual === 'login' && (
          <div className="login-screen">
            <h2>🔐 Identificação do Eleitor</h2>
            <img className='logo-senai' src='images/logo_senai-removebg-preview.png'></img>
            <div className="input-group">
              <label>Digite sua matrícula:</label>
              <input
                type="text"
                value={matriculaInput}
                onChange={(e) => setMatriculaInput(e.target.value)}
                placeholder="Ex: 123456"
                maxLength="6"
                onKeyPress={(e) => e.key === 'Enter' && validarEleitor()}
              />
            </div>
            <div className="controls">
              <button className="btn btn-primary" onClick={validarEleitor}>
                Entrar
              </button>
              <button className="btn btn-warning" onClick={() => setTelaAtual('resultados')}>
                Ver Resultados
              </button>
            </div>
          </div>
        )}

        {/* Tela de Votação */}
        {telaAtual === 'votacao' && (
          <div className="voting-screen">
            <div className="voter-info">
              👤 Eleitor: {eleitorAtual} | Cargo {indicePosicao + 1} de {posicoes.length}
            </div>

            <div className="position-voting">
              <h3>Vote para {getPosicaoNome(posicaoAtual).toUpperCase()}</h3>
              <div className="candidates">
                {candidatos[posicaoAtual].map(candidato => (
                  <div
                    key={candidato.numero}
                    className={`candidate ${votosAtuais[posicaoAtual] === candidato.numero ? 'selected' : ''}`}
                    onClick={() => votar(posicaoAtual, candidato.numero)}
                  >
                    <div className="candidate-number">{candidato.numero}</div>
                    <div className="candidate-name">{candidato.nome}</div>
                  </div>
                ))}
              </div>

              <div className="special-votes">
                <div
                  className={`special-vote ${votosAtuais[posicaoAtual] === 'branco' ? 'selected' : ''}`}
                  onClick={() => votar(posicaoAtual, 'branco')}
                >
                  VOTO EM BRANCO
                </div>
                <div
                  className={`special-vote ${votosAtuais[posicaoAtual] === 'nulo' ? 'selected' : ''}`}
                  onClick={() => votar(posicaoAtual, 'nulo')}
                >
                  VOTO NULO
                </div>
              </div>
            </div>

            <div className="controls">
              {votosAtuais[posicaoAtual] ? (
                <button className="btn btn-success" onClick={proximaPosicao}>
                  {indicePosicao < posicoes.length - 1 ? 'Próximo Cargo' : 'Revisar Votos'}
                </button>
              ) : (
                <p>Selecione uma opção para continuar</p>
              )}
            </div>
          </div>
        )}

        {/* Tela de Confirmação */}
        {telaAtual === 'confirmacao' && (
          <div className="confirmation-screen">
            <h2>📋 CONFIRMAÇÃO DOS VOTOS</h2>
            <p>Eleitor: <strong>{eleitorAtual}</strong></p>

            <div className="vote-review">
              <h3>Revise seus votos:</h3>
              {renderVoteReview()}
            </div>

            <div className="controls">
              <button className="btn btn-danger" onClick={voltarVotacao}>
                ← Voltar e Alterar
              </button>
              <button className="btn btn-success" onClick={confirmarVotos}>
                ✓ Confirmar Votos
              </button>
            </div>
          </div>
        )}

        {/* Tela de Sucesso */}
        {telaAtual === 'sucesso' && (
          <div className="success-screen">
            <div className="alert success">
              ✅ VOTO REGISTRADO COM SUCESSO!
            </div>
            <h2>🎉 Obrigado por votar!</h2>
            <p>
              Eleitor: <strong>{eleitorAtual}</strong><br />
              Seus votos foram registrados com segurança.
            </p>

            <div className="controls">
              <button className="btn btn-primary" onClick={proximoEleitor}>
                Próximo Eleitor
              </button>
              <button className="btn btn-warning" onClick={() => setTelaAtual('resultados')}>
                Ver Resultados
              </button>
            </div>
          </div>
        )}

        {/* Tela de Resultados */}
        {telaAtual === 'resultados' && (
          <div className="results-screen">
            <h2>📊 APURAÇÃO DETALHADA</h2>
            <p>Total de eleitores que votaram: <strong>{eleitoresQueVotaram.size}</strong></p>

            {(() => {
              const resultados = calcularResultados();
              return (
                <>
                  {renderResultadoPosicao('Representante de Turma', 'representante', resultados.representante)}
                  {renderResultadoPosicao('Monitor', 'monitor', resultados.monitor)}
                  {renderResultadoPosicao('Orador', 'orador', resultados.orador)}
                </>
              );
            })()}

            <div className="controls">
              <button className="btn btn-primary" onClick={proximoEleitor}>
                Continuar Votação
              </button>
              <button className="btn btn-danger" onClick={novaEleicao}>
                Nova Eleição
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrnaEletronica;