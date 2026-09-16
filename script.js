
/* ======================================================
   MEGA MÍMICA
   3 CIRCUITOS • 6 PARTICIPANTES • 18 TURNOS
====================================================== */

const TEMPO_RODADA = 60;
const PASSES_INICIAIS = 5;
const TOTAL_CIRCUITOS = 3;
const TOTAL_PARTICIPANTES = 6;

/* ======================================================
   PALAVRAS
====================================================== */

const palavras = [
"Cachorro","Gato","Leão","Tigre","Elefante","Macaco","Girafa","Zebra","Cavalo","Vaca",
"Porco","Galinha","Galo","Pato","Coelho","Rato","Cobra","Sapo","Tartaruga","Peixe",
"Tubarão","Golfinho","Baleia","Polvo","Caranguejo","Pinguim","Pavão","Papagaio","Águia","Coruja",
"Morcego","Borboleta","Abelha","Formiga","Aranha","Mosquito","Canguru","Urso","Lobo","Raposa",
"Rinoceronte","Hipopótamo","Crocodilo","Camelo","Gorila","Preguiça","Flamingo","Caracol","Esquilo","Veado",

"Correr","Pular","Andar","Dançar","Dormir","Comer","Beber","Nadar","Chorar","Rir",
"Gritar","Cantar","Assobiar","Bater palmas","Aplaudir","Acenar","Abraçar","Beijar","Espirrar","Tossir",
"Bocejar","Pentear","Escovar os dentes","Tomar banho","Se maquiar","Barbear","Vestir","Tirar a roupa","Cozinhar","Lavar",
"Varrer","Passar roupa","Digitar","Escrever","Ler","Desenhar","Fotografar","Filmar","Dirigir","Pedalar",
"Escalar","Cavar","Empurrar","Puxar","Carregar","Levantar","Sentar","Deitar","Cair","Tropeçar",
"Esconder","Procurar","Abrir","Fechar","Bater","Chutar","Arremessar","Apontar","Pensar","Fingir",

"Médico","Enfermeiro","Dentista","Professor","Policial","Bombeiro","Cozinheiro","Garçom","Cabeleireiro","Barbeiro",
"Pintor","Pedreiro","Eletricista","Mecânico","Motorista","Piloto","Astronauta","Fotógrafo","Cantor","Ator",
"Dançarino","Mágico","Palhaço","Veterinário","Jardineiro","Padeiro","Carteiro","Juiz","Repórter","Advogado",

"Futebol","Basquete","Vôlei","Tênis","Natação","Boxe","Judô","Karatê","Balé","Ginástica",
"Ciclismo","Corrida","Surfe","Skate","Patinação","Golfe","Beisebol","Handebol","Futsal","Tênis de mesa",
"Arco e flecha","Esgrima","Remo","Hipismo","Rugby","Boliche","Pesca","Mergulho","Paraquedismo","Atletismo",

"Pizza","Hambúrguer","Hot dog","Batata frita","Pipoca","Sorvete","Bolo","Brigadeiro","Chocolate","Pirulito",
"Sanduíche","Macarrão","Lasanha","Arroz","Feijão","Sushi","Pastel","Coxinha","Pão de queijo","Taco",
"Salada","Sopa","Churrasco","Milho","Banana","Maçã","Melancia","Morango","Abacaxi","Açaí",

"Celular","Computador","Teclado","Mouse","Televisão","Controle remoto","Telefone","Câmera","Relógio","Óculos",
"Guarda-chuva","Chave","Carteira","Mochila","Bolsa","Mala","Livro","Caderno","Lápis","Caneta",
"Tesoura","Cola","Borracha","Régua","Garrafa","Copo","Prato","Colher","Garfo","Faca",
"Panela","Vassoura","Rodo","Esponja","Ferro de passar","Travesseiro","Cama","Cadeira","Sofá","Espelho",

"Carro","Moto","Bicicleta","Ônibus","Trem","Metrô","Avião","Helicóptero","Navio","Barco",
"Táxi","Ambulância","Escola","Hospital","Restaurante","Cinema","Academia","Praia","Parque","Supermercado",

"Super-herói","Superman","Batman","Homem-Aranha","Hulk","Homem de Ferro","Mulher-Maravilha","Papai Noel","Bruxa","Fantasma",
"Vampiro","Pirata","Rei","Rainha","Princesa","Príncipe","Detetive","Robô","Zumbi","Ninja",

"Bebê","Idoso","Modelo","Gigante","Estátua","Manequim","Boneca","Fantoche","Marionete","Monstro",
"Alienígena","Vilão","Anjo","Palhaço de circo","Mestre-cuca","Surfista","Cowboy","Índio","Soldado","Astrólogo"
];

/* ======================================================
   ESTADO DO JOGO
====================================================== */

let duplas = [];

let circuitoAtual = 1;
let indiceParticipante = 0;

let pontosRodada = 0;
let passesRestantes = PASSES_INICIAIS;
let tempoRestante = TEMPO_RODADA;

let intervalo = null;
let jogoPausado = false;
let rodadaFinalizada = false;

let palavraAtual = "";
let palavrasDisponiveis = [];
let audioContext = null;

/* ======================================================
   INICIAR JOGO
====================================================== */

function iniciarJogo() {

    duplas = [
        criarDupla("dupla1Nome", "dupla1Jogador1", "dupla1Jogador2", "Dupla 1"),
        criarDupla("dupla2Nome", "dupla2Jogador1", "dupla2Jogador2", "Dupla 2"),
        criarDupla("dupla3Nome", "dupla3Jogador1", "dupla3Jogador2", "Dupla 3")
    ];

    circuitoAtual = 1;
    indiceParticipante = 0;
    pontosRodada = 0;
    palavrasDisponiveis = [...palavras];

    mostrarListaDuplas();
    mostrarTela("telaDuplas");
}

/* ======================================================
   CRIAR DUPLA
====================================================== */

function criarDupla(idNome, idJogador1, idJogador2, nomePadrao) {

    const nome =
        document.getElementById(idNome).value.trim() || nomePadrao;

    const jogador1 =
        document.getElementById(idJogador1).value.trim() || "Jogador 1";

    const jogador2 =
        document.getElementById(idJogador2).value.trim() || "Jogador 2";

    return {
        nome,
        jogador1,
        jogador2,
        pontos: 0
    };
}

/* ======================================================
   MOSTRAR DUPLAS
====================================================== */

function mostrarListaDuplas() {

    const lista = document.getElementById("listaDuplas");
    lista.innerHTML = "";

    duplas.forEach((dupla, index) => {

        const card = document.createElement("div");
        card.className = "dupla-card";

        card.innerHTML = `
            <h3>👥 ${index + 1}ª DUPLA</h3>
            <p><strong>${dupla.nome}</strong></p>
            <p>🎭 ${dupla.jogador1}</p>
            <p>🎭 ${dupla.jogador2}</p>
        `;

        lista.appendChild(card);
    });
}

/* ======================================================
   IDENTIFICAR PARTICIPANTE ATUAL
====================================================== */

function obterParticipanteAtual() {

    const indiceDupla = Math.floor(indiceParticipante / 2);
    const jogadorNumero = indiceParticipante % 2;

    const dupla = duplas[indiceDupla];

    if (jogadorNumero === 0) {

        return {
            dupla,
            indiceDupla,
            quemFaz: dupla.jogador1,
            quemAdivinha: dupla.jogador2
        };

    } else {

        return {
            dupla,
            indiceDupla,
            quemFaz: dupla.jogador2,
            quemAdivinha: dupla.jogador1
        };
    }
}

/* ======================================================
   INICIAR TURNO
====================================================== */

function iniciarProximaRodada() {

    clearInterval(intervalo);

    pontosRodada = 0;
    passesRestantes = PASSES_INICIAIS;
    tempoRestante = TEMPO_RODADA;
    jogoPausado = false;
    rodadaFinalizada = false;

    const tempoBox = document.getElementById("tempoBox");

    if (tempoBox) {
        tempoBox.classList.remove("urgente");
    }

    atualizarInformacoes();
    atualizarTempo();
    atualizarBotaoPassar();

    document.getElementById("btnPausar").textContent = "⏸️ PAUSAR";

    prepararAudio();
    mostrarNovaPalavra();
    mostrarTela("telaJogo");
    iniciarCronometro();
}

/* ======================================================
   ATUALIZAR INFORMAÇÕES
====================================================== */

function atualizarInformacoes() {

    const participante = obterParticipanteAtual();
    const dupla = participante.dupla;

    document.getElementById("nomeDuplaAtual")
        .textContent = dupla.nome;

    document.getElementById("pontuacaoAtual")
        .textContent = dupla.pontos + pontosRodada;

    document.getElementById("numeroRodada")
        .textContent =
        `Circuito ${circuitoAtual}/${TOTAL_CIRCUITOS} • Participante ${indiceParticipante + 1}/${TOTAL_PARTICIPANTES}`;

    document.getElementById("quemFaz")
        .textContent = participante.quemFaz;

    document.getElementById("quemAdivinha")
        .textContent = participante.quemAdivinha;
}

/* ======================================================
   NOVA PALAVRA
====================================================== */

function mostrarNovaPalavra() {

    if (palavrasDisponiveis.length === 0) {

        document.getElementById("palavra").textContent = "SEM PALAVRAS";
        return;
    }

    const indice = Math.floor(
        Math.random() * palavrasDisponiveis.length
    );

    palavraAtual = palavrasDisponiveis[indice];

    palavrasDisponiveis.splice(indice, 1);

    document.getElementById("palavra")
        .textContent = palavraAtual.toUpperCase();
}

/* ======================================================
   CRONÔMETRO
====================================================== */

function iniciarCronometro() {

    clearInterval(intervalo);

    intervalo = setInterval(() => {

        if (jogoPausado || rodadaFinalizada) return;

        tempoRestante--;

        atualizarTempo();

        if (tempoRestante <= 10 && tempoRestante > 0) {

            document.getElementById("tempoBox")
                .classList.add("urgente");

            tocarRelogio();
        }

        if (tempoRestante <= 0) {

            clearInterval(intervalo);
            finalizarRodada();
        }

    }, 1000);
}

/* ======================================================
   ATUALIZAR TEMPO
====================================================== */

function atualizarTempo() {

    document.getElementById("tempo")
        .textContent = tempoRestante;
}

/* ======================================================
   ACERTOU
====================================================== */

function acertou() {

    if (jogoPausado || rodadaFinalizada) return;

    pontosRodada++;

    atualizarInformacoes();
    mostrarNovaPalavra();
}

/* ======================================================
   ERRO
====================================================== */

function errou() {

    if (jogoPausado || rodadaFinalizada) return;

    mostrarNovaPalavra();
}

/* ======================================================
   PASSAR
====================================================== */

function passar() {

    if (jogoPausado || rodadaFinalizada) return;

    if (passesRestantes <= 0) return;

    passesRestantes--;

    atualizarBotaoPassar();
    mostrarNovaPalavra();
}

/* ======================================================
   BOTÃO PASSAR
====================================================== */

function atualizarBotaoPassar() {

    const botao = document.getElementById("btnPassar");

    botao.textContent = `⏭️ PASSAR (${passesRestantes})`;
    botao.disabled = passesRestantes <= 0;
}

/* ======================================================
   PAUSAR
====================================================== */

function pausarJogo() {

    if (rodadaFinalizada) return;

    jogoPausado = !jogoPausado;

    const botao = document.getElementById("btnPausar");

    if (jogoPausado) {

        botao.textContent = "▶️ CONTINUAR";

    } else {

        botao.textContent = "⏸️ PAUSAR";
        prepararAudio();
    }
}

/* ======================================================
   FINALIZAR TURNO
====================================================== */

function finalizarRodada() {

    if (rodadaFinalizada) return;

    rodadaFinalizada = true;

    clearInterval(intervalo);

    const participante = obterParticipanteAtual();
    const dupla = participante.dupla;

    dupla.pontos += pontosRodada;

    document.getElementById("tempoBox")
        .classList.remove("urgente");

    document.getElementById("resultadoDupla")
        .textContent = dupla.nome;

    document.getElementById("pontosRodadaResultado")
        .textContent = pontosRodada;

    document.getElementById("totalDuplaResultado")
        .textContent = dupla.pontos;

    tocarVitoria();

    mostrarTela("telaResultado");
}

/* ======================================================
   CONTINUAR JOGO
====================================================== */

function continuarJogo() {

    indiceParticipante++;

    /*
       Quando os 6 participantes terminarem,
       começa o próximo circuito.
    */

    if (indiceParticipante >= TOTAL_PARTICIPANTES) {

        indiceParticipante = 0;
        circuitoAtual++;
    }

    /*
       Depois do terceiro circuito,
       mostra o ranking final.
    */

    if (circuitoAtual > TOTAL_CIRCUITOS) {

        mostrarRanking();
        return;
    }

    iniciarProximaRodada();
}

/* ======================================================
   RANKING FINAL
====================================================== */

function mostrarRanking() {

    clearInterval(intervalo);

    const ranking = [...duplas].sort(
        (a, b) => b.pontos - a.pontos
    );

    const container = document.getElementById("rankingFinal");

    container.innerHTML = "";

    ranking.forEach((dupla, index) => {

        let medalha = "";

        if (index === 0) medalha = "🥇";
        else if (index === 1) medalha = "🥈";
        else if (index === 2) medalha = "🥉";

        const item = document.createElement("div");

        item.className = "ranking-item";

        item.innerHTML = `
            <div class="ranking-posicao">
                ${medalha || `${index + 1}º`}
            </div>

            <div class="ranking-nome">
                ${dupla.nome}
            </div>

            <div class="ranking-pontos">
                ${dupla.pontos}
            </div>
        `;

        container.appendChild(item);
    });

    mostrarTela("telaRanking");
}

/* ======================================================
   CAMPEÃO
====================================================== */

function mostrarCampeao() {

    const ranking = [...duplas].sort(
        (a, b) => b.pontos - a.pontos
    );

    const campeao = ranking[0];

    document.getElementById("nomeCampeao")
        .textContent = campeao.nome;

    document.getElementById("pontuacaoCampeao")
        .textContent = `${campeao.pontos} PONTOS`;

    mostrarTela("telaCampeao");
}

/* ======================================================
   TROCAR TELA
====================================================== */

function mostrarTela(idTela) {

    document.querySelectorAll(".tela")
        .forEach(tela => {
            tela.classList.remove("ativa");
        });

    document.getElementById(idTela)
        .classList.add("ativa");
}

/* ======================================================
   ÁUDIO
====================================================== */

function prepararAudio() {

    try {

        if (!audioContext) {

            audioContext = new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

    } catch (erro) {

        console.log("Áudio não disponível.");

    }
}

/* ======================================================
   SOM DO RELÓGIO
====================================================== */

function tocarRelogio() {

    if (!audioContext) return;

    try {

        const agora = audioContext.currentTime;

        const oscilador = audioContext.createOscillator();
        const ganho = audioContext.createGain();

        oscilador.type = "square";
        oscilador.frequency.value = 750;

        ganho.gain.setValueAtTime(0.0001, agora);

        ganho.gain.exponentialRampToValueAtTime(
            0.12,
            agora + 0.01
        );

        ganho.gain.exponentialRampToValueAtTime(
            0.0001,
            agora + 0.12
        );

        oscilador.connect(ganho);
        ganho.connect(audioContext.destination);

        oscilador.start(agora);
        oscilador.stop(agora + 0.13);

    } catch (erro) {

        console.log("Erro no áudio.");

    }
}

/* ======================================================
   SOM DE VITÓRIA
====================================================== */

function tocarVitoria() {

    if (!audioContext) return;

    try {

        const notas = [
            523.25,
            659.25,
            783.99,
            1046.50
        ];

        notas.forEach((frequencia, index) => {

            const oscilador = audioContext.createOscillator();
            const ganho = audioContext.createGain();

            const inicio =
                audioContext.currentTime + index * 0.16;

            oscilador.type = "sine";
            oscilador.frequency.value = frequencia;

            ganho.gain.setValueAtTime(0.0001, inicio);

            ganho.gain.exponentialRampToValueAtTime(
                0.18,
                inicio + 0.02
            );

            ganho.gain.exponentialRampToValueAtTime(
                0.0001,
                inicio + 0.35
            );

            oscilador.connect(ganho);
            ganho.connect(audioContext.destination);

            oscilador.start(inicio);
            oscilador.stop(inicio + 0.36);

        });

    } catch (erro) {

        console.log("Erro no áudio.");

    }
}
