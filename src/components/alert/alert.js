import React from 'react';

const Alert = ({ alerta }) => {
  if (!alerta.mensagem) return null;

  return (
    <div className={`alert ${alerta.tipo === 'success' ? 'success' : ''}`}>
      {alerta.mensagem}
    </div>
  );
};

export default Alert;