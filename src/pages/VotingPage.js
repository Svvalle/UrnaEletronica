import React from 'react';
import { getPosicaoNome } from '../utils/helpers';

const VotingPage = ({
  candidatos,
  posicaoAtual,
  indicePosicao,
  posicoes,
  eleitorAtual,
  votosAtuais,
  votar,
  proximaPosicao
}) => {
  return (
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
  );
};

export default VotingPage;