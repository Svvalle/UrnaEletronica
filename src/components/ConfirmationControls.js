import React from 'react';

const ConfirmationControls = ({ onBack, onConfirm }) => {
  return (
    <div className="controls">
    <button className="btn btn-danger" onClick={voltarVotacao}>
      ← Voltar e Alterar
    </button>
    <button className="btn btn-success" onClick={confirmarVotos}>
      ✓ Confirmar Votos
    </button>
  </div>
  );
};

export default ConfirmationControls;