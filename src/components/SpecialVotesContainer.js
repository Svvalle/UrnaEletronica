import React from 'react';

const SpecialVotesContainer = ({ votoSelecionado, onVotar }) => {
    const handleVotoBranco = () => {
        onVotar('BRANCO');
    };

    const handleVotoNulo = () => {
        onVotar('NULO');
    };

    return (
        <div className="special-votes">
            <div className="special-votes-buttons">
                <button
                    className={`vote-button ${votoSelecionado === 'BRANCO' ? 'selected' : ''}`}
                    onClick={handleVotoBranco}
                >
                    🗳️ Voto em Branco
                </button>
                <button
                    className={`vote-button ${votoSelecionado === 'NULO' ? 'selected' : ''}`}
                    onClick={handleVotoNulo}
                >
                    ❌ Voto Nulo
                </button>
            </div >
        </div >
    );
};

export default SpecialVotesContainer;