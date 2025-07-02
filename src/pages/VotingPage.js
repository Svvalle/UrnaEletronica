import React from 'react';
import { getPosicaoNome } from '../utils/helpers';
import { CandidatesContainer } from '@/components/buttons';
import SpecialVotesContainer from '@/components/SpecialVotesContainer';
import VotingControls from '@/components/VotingControls';

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
    // Adicione verificações para garantir que os dados existem
    if (!candidatos || !posicaoAtual || !posicoes || !eleitorAtual) {
        return <div>Carregando dados da votação...</div>;
    }

    // Garanta que votosAtuais seja um objeto
    const votosSeguro = votosAtuais || {};
    
    // Garanta que candidatos[posicaoAtual] existe
    const candidatosDaPosicao = candidatos[posicaoAtual] || [];

    return (
        <div className="voting-screen">
            <div className="voter-info">
                👤 Eleitor: {String(eleitorAtual)} | Cargo {(indicePosicao || 0) + 1} de {posicoes.length}
            </div>

            <div className="position-voting">
                <h3>Vote para {getPosicaoNome(posicaoAtual).toUpperCase()}</h3>
                
                <CandidatesContainer
                    candidatos={candidatosDaPosicao}
                    votoSelecionado={votosSeguro[posicaoAtual]}
                    onVotar={(voto) => votar && votar(posicaoAtual, voto)}
                />
                
                <SpecialVotesContainer
                    votoSelecionado={votosSeguro[posicaoAtual]}
                    onVotar={(voto) => votar && votar(posicaoAtual, voto)}
                />
            </div>

            <VotingControls
                hasVote={!!votosSeguro[posicaoAtual]}
                onNext={proximaPosicao}
                isLastStep={(indicePosicao || 0) >= posicoes.length - 1}
            />
        </div>
    );
};

export default VotingPage;