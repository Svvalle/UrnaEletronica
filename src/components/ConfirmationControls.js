import React from 'react';

const ConfirmationControls = ({ onBack, onConfirm }) => {
  return (
    <div className="controls">
    <button className="btn btn-danger" onClick={onBack}>
      ← Voltar e Alterar
    </button>
    <button className="btn btn-success" onClick={onConfirm}>
      ✓ Confirmar Votos
    </button>
  </div>
  );
};

export default ConfirmationControls;