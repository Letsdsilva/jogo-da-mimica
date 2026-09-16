function atualizarInformacoes() {

    const dupla = duplas[indiceDupla];

    document.getElementById("nomeDuplaAtual")
        .textContent = dupla.nome;

    document.getElementById("pontuacaoAtual")
        .textContent = dupla.pontos + pontosRodada;

    document.getElementById("numeroRodada")
        .textContent = `${rodadaDaDupla} / 3`;

    // Rodada 1 e 3: função inicial
    // Rodada 2: troca de função

    if (rodadaDaDupla === 2) {

        document.getElementById("quemFaz")
            .textContent = dupla.jogador2;

        document.getElementById("quemAdivinha")
            .textContent = dupla.jogador1;

    } else {

        document.getElementById("quemFaz")
            .textContent = dupla.jogador1;

        document.getElementById("quemAdivinha")
            .textContent = dupla.jogador2;

    }

}
