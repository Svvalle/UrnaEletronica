import React from 'react';

const SuccessPage = ({ eleitorAtual, proximoEleitor, setTelaAtual }) => {
  return (
    <div className="success-screen">
      <div className="alert success">
        ✅ VOTO REGISTRADO COM SUCESSO!
      </div>
      <h2>🎉 Obrigado por votar!</h2>
      <p>
        Eleitor: <strong>{eleitorAtual}</strong><br />
        Seus votos foram registrados com segurança.
      </p>

      <div className="controls">
        <button className="btn btn-primary" onClick={proximoEleitor}>
          Próximo Eleitor
        </button>
        <button className="btn btn-warning" onClick={() => setTelaAtual('resultados')}>
          Ver Resultados
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;