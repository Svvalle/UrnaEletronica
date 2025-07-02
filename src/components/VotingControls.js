import React from 'react';

const VotingControls = ({ hasVote, onNext, isLastStep }) => {
    return (
        <div className="voting-controls">
            <div className="vote-status">
                {hasVote ? (
                    <span className="vote-confirmed">✅ Voto confirmado</span>
                ) : (
                    <span className="vote-pending">⏳ Selecione seu voto</span>
                )}
            </div>
            
            <button 
                className={`next-button ${hasVote ? 'enabled' : 'disabled'}`}
                onClick={onNext}
                disabled={!hasVote}
            >
                {isLastStep ? '🗳️ Finalizar Votação' : '➡️ Próximo Cargo'}
            </button>
        </div>
    );
};

export default VotingControls;