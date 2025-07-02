import React from 'react';
import { getPosicaoNome } from '../utils/helpers';

const ResultsPage = ({
  votos,
  eleitoresQueVotaram,
  proximoEleitor,
  novaEleicao,
  calcularResultados
}) => {
  const resultados = calcularResultados();

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

  return (
    <div className="results-screen">
      <h2>📊 APURAÇÃO DETALHADA</h2>
      <p>Total de eleitores que votaram: <strong>{eleitoresQueVotaram.size}</strong></p>

      {renderResultadoPosicao('Representante de Turma', 'representante', resultados.representante)}
      {renderResultadoPosicao('Monitor', 'monitor', resultados.monitor)}
      {renderResultadoPosicao('Orador', 'orador', resultados.orador)}

      <div className="controls">
        <button className="btn btn-primary" onClick={proximoEleitor}>
          Continuar Votação
        </button>
        <button className="btn btn-danger" onClick={novaEleicao}>
          Nova Eleição
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;