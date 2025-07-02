import React from 'react';
import { getPosicaoNome } from '../utils/helpers';

const ConfirmationPage = ({
  candidatos,
  posicoes,
  eleitorAtual,
  votosAtuais,
  voltarVotacao,
  confirmarVotos
}) => {
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

  return (
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
  );
};

export default ConfirmationPage;