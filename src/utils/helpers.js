export const getPosicaoNome = (posicao) => {
    const nomes = {
      representante: 'Representante de Turma',
      monitor: 'Monitor',
      orador: 'Orador'
    };
    return nomes[posicao];
  };
  
  // Contabilizar voto
  export const contabilizarVoto = (votosObj, posicao, voto, candidatos) => {
    if (voto === 'branco') {
      votosObj[posicao].branco++;
    } else if (voto === 'nulo') {
      votosObj[posicao].nulo++;
    } else {
      const candidato = candidatos[posicao].find(c => c.numero === voto);
      if (candidato) {
        const nomeKey = candidato.nome.toLowerCase();
        votosObj[posicao].candidatos[nomeKey]++;
      }
    }
  };
  
  // Calcular resultados
  export const calcularResultados = (votos) => {
    const resultados = {};
  
    for (const posicao in votos) {
      const votosCandidatos = votos[posicao].candidatos;
      const entries = Object.entries(votosCandidatos);
      const maxVotos = Math.max(...Object.values(votosCandidatos));
      const vencedores = entries.filter(([nome, quantidade]) => quantidade === maxVotos && quantidade > 0);
  
      if (vencedores.length > 1) {
        resultados[posicao] = {
          empate: true,
          vencedores: vencedores.map(([nome]) => nome)
        };
      } else if (vencedores.length === 1) {
        resultados[posicao] = { vencedor: vencedores[0][0] };
      } else {
        resultados[posicao] = { vencedor: null };
      }
    }
  
    return resultados;
  };