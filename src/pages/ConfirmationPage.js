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
  // Verificações de segurança
  if (!candidatos || !posicoes || !eleitorAtual || !votosAtuais) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="confirmation-screen">
      <h2>📋 CONFIRMAÇÃO DOS VOTOS</h2>
      <p>Eleitor: <strong>{eleitorAtual}</strong></p>
      
      <div className="vote-review">
        <h3>Revise seus votos:</h3>
        
        {posicoes.map(posicao => {
          const voto = votosAtuais[posicao];
          const posicaoNome = getPosicaoNome(posicao);
          let votoTexto = '';
          
          if (voto === 'branco') {
            votoTexto = 'VOTO EM BRANCO';
          } else if (voto === 'nulo') {
            votoTexto = 'VOTO NULO';
          } else if (voto && candidatos[posicao]) {
            const candidato = candidatos[posicao].find(c => c.numero === voto);
            votoTexto = candidato ? `${candidato.nome} (${candidato.numero})` : 'Não selecionado';
          } else {
            votoTexto = 'Não selecionado';
          }
          
          return (
            <div key={posicao} className="vote-item">
              <span><strong>{posicaoNome}:</strong></span>
              <span>{votoTexto}</span>
            </div>
          );
        })}
      </div>
      
      <div className="confirmation-controls">
        <button onClick={voltarVotacao}>Voltar</button>
        <button onClick={confirmarVotos}>Confirmar</button>
      </div>
    </div>
  );
};

export default ConfirmationPage;