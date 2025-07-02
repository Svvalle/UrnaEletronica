import { useState } from 'react';

// Dados dos candidatos
export const candidatos = {
  representante: [
    { numero: 1, nome: 'Pedro' },
    { numero: 2, nome: 'João' },
    { numero: 3, nome: 'Rogério' }
  ],
  monitor: [
    { numero: 1, nome: 'Pedro' },
    { numero: 2, nome: 'Gabriel' },
    { numero: 3, nome: 'Marcelo' }
  ],
  orador: [
    { numero: 1, nome: 'Matheus' },
    { numero: 2, nome: 'Daniel' },
    { numero: 3, nome: 'Felipe' }
  ]
};

// Posições disponíveis
export const posicoes = ['representante', 'monitor', 'orador'];

// Estado inicial dos votos (estrutura mais limpa)
export const getInitialVotes = () => ({
  representante: {
    candidatos: { 
      pedro: 0, 
      joao: 0, 
      rogerio: 0 
    },
    branco: 0,
    nulo: 0
  },
  monitor: {
    candidatos: { 
      pedro: 0, 
      gabriel: 0, 
      marcelo: 0 
    },
    branco: 0,
    nulo: 0
  },
  orador: {
    candidatos: { 
      matheus: 0, 
      daniel: 0, 
      felipe: 0 
    },
    branco: 0,
    nulo: 0
  }
});

// Hook personalizado para gerenciar a votação
export const useVotacao = () => {
  const [votacao, setVotacao] = useState(getInitialVotes());

  // Função para votar em um candidato
  const votar = (cargo, candidato) => {
    setVotacao(prev => ({
      ...prev,
      [cargo]: {
        ...prev[cargo],
        candidatos: {
          ...prev[cargo].candidatos,
          [candidato.toLowerCase()]: prev[cargo].candidatos[candidato.toLowerCase()] + 1
        }
      }
    }));
  };

  // Função para votar em branco
  const votarBranco = (cargo) => {
    setVotacao(prev => ({
      ...prev,
      [cargo]: {
        ...prev[cargo],
        branco: prev[cargo].branco + 1
      }
    }));
  };

  // Função para votar nulo
  const votarNulo = (cargo) => {
    setVotacao(prev => ({
      ...prev,
      [cargo]: {
        ...prev[cargo],
        nulo: prev[cargo].nulo + 1
      }
    }));
  };

  // Função para resetar a votação
  const resetarVotacao = () => {
    setVotacao(getInitialVotes());
  };

  // Função para obter o total de votos de um cargo
  const getTotalVotos = (cargo) => {
    const cargoVotos = votacao[cargo];
    const votosCandidatos = Object.values(cargoVotos.candidatos).reduce((sum, votos) => sum + votos, 0);
    return votosCandidatos + cargoVotos.branco + cargoVotos.nulo;
  };

  // Função para obter o vencedor de um cargo
  const getVencedor = (cargo) => {
    const cargoVotos = votacao[cargo].candidatos;
    let maxVotos = 0;
    let vencedor = null;

    Object.entries(cargoVotos).forEach(([nome, votos]) => {
      if (votos > maxVotos) {
        maxVotos = votos;
        vencedor = nome;
      }
    });

    return { nome: vencedor, votos: maxVotos };
  };

  return {
    votacao,
    setVotacao,
    votar,
    votarBranco,
    votarNulo,
    resetarVotacao,
    getTotalVotos,
    getVencedor
  };
};

// Componente de exemplo de uso
export const ExemploUso = () => {
  const { 
    votacao, 
    votar, 
    votarBranco, 
    votarNulo, 
    resetarVotacao, 
    getTotalVotos, 
    getVencedor 
  } = useVotacao();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema de Votação</h1>
      
      {posicoes.map(cargo => (
        <div key={cargo} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-3 capitalize">{cargo}</h2>
          
          {/* Botões para votar nos candidatos */}
          <div className="mb-3">
            <h3 className="font-medium mb-2">Candidatos:</h3>
            {candidatos[cargo].map(candidato => (
              <button
                key={candidato.numero}
                onClick={() => votar(cargo, candidato.nome)}
                className="mr-2 mb-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {candidato.numero} - {candidato.nome} 
                ({votacao[cargo].candidatos[candidato.nome.toLowerCase()] || 0} votos)
              </button>
            ))}
          </div>

          {/* Botões para voto branco e nulo */}
          <div className="mb-3">
            <button
              onClick={() => votarBranco(cargo)}
              className="mr-2 px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Branco ({votacao[cargo].branco} votos)
            </button>
            <button
              onClick={() => votarNulo(cargo)}
              className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500"
            >
              Nulo ({votacao[cargo].nulo} votos)
            </button>
          </div>

          {/* Informações do cargo */}
          <div className="text-sm text-gray-600">
            <p>Total de votos: {getTotalVotos(cargo)}</p>
            <p>Líder atual: {getVencedor(cargo).nome || 'Nenhum'} 
               ({getVencedor(cargo).votos} votos)</p>
          </div>
        </div>
      ))}

      <button
        onClick={resetarVotacao}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Resetar Votação
      </button>
    </div>
  );
};