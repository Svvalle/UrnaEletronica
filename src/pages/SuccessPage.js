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

      <SuccessControls
              onNextVoter={proximoEleitor}
              onViewResults={() => setTelaAtual('resultados')}
            />
          </div>
        )}

export default SuccessPage;

