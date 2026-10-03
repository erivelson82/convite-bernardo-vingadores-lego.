/* =====================================================
   BERNARDO 4 ANOS
   VINGADORES LEGO
   SISTEMA DE 4 ETAPAS
===================================================== */


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const DATA_FESTA =
    "2026-12-12T12:00:00";

const WHATSAPP = "";

const LOCALIZACAO =
    "https://www.google.com/maps/search/?api=1&query=Minha+Casa";


/* =====================================================
   VARIÁVEL DA ETAPA
===================================================== */

let etapaAtual = 1;

const totalEtapas = 4;


/* =====================================================
   ENTRAR NA MISSÃO
===================================================== */

function entrarNaMissao() {

    const abertura =
        document.getElementById("abertura");

    const convite =
        document.getElementById("convite");


    if (!abertura || !convite) {

        alert(
            "Erro ao carregar o convite."
        );

        return;
    }


    abertura.classList.add("fechar");


    setTimeout(function () {

        convite.classList.add("mostrar");

        mostrarEtapa(1);

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });

    }, 700);

}


/* =====================================================
   MOSTRAR ETAPA
===================================================== */

function mostrarEtapa(numero) {

    if (
        numero < 1 ||
        numero > totalEtapas
    ) {
        return;
    }


    etapaAtual = numero;


    /* Remove etapa ativa */

    document
        .querySelectorAll(".etapa")
        .forEach(function (etapa) {

            etapa.classList.remove(
                "ativa"
            );

        });


    /* Ativa nova etapa */

    const etapa =
        document.getElementById(
            "etapa" + numero
        );


    if (etapa) {

        etapa.classList.add(
            "ativa"
        );

    }


    /* Atualiza os pontos */

    document
        .querySelectorAll(".ponto")
        .forEach(function (ponto) {

            const numeroPonto =
                Number(
                    ponto.dataset.etapa
                );


            ponto.classList.toggle(
                "ativo",
                numeroPonto === numero
            );

        });


    /* Vai para o topo */

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   PRÓXIMA ETAPA
===================================================== */

function proximaEtapa() {

    if (
        etapaAtual <
        totalEtapas
    ) {

        mostrarEtapa(
            etapaAtual + 1
        );

    }

}


/* =====================================================
   ETAPA ANTERIOR
===================================================== */

function etapaAnterior() {

    if (etapaAtual > 1) {

        mostrarEtapa(
            etapaAtual - 1
        );

    }

}


/* =====================================================
   CONFIRMAR PRESENÇA
===================================================== */

function confirmarPresenca() {

    if (
        WHATSAPP &&
        WHATSAPP.trim() !== ""
    ) {

        const mensagem =
            "Olá! Quero confirmar minha presença na festa de 4 anos do Bernardo! 🦸⚡🎂";


        const url =
            "https://wa.me/" +
            WHATSAPP +
            "?text=" +
            encodeURIComponent(
                mensagem
            );


        window.open(
            url,
            "_blank"
        );


        return;
    }


    mostrarMensagem(
        "A confirmação pelo WhatsApp será configurada em breve. 🚀"
    );

}


/* =====================================================
   COMPARTILHAR
===================================================== */

async function compartilharConvite() {

    const texto =
        "🦸⚡ VOCÊ FOI CONVOCADO! ⚡🦸\n\n" +

        "Bernardo está completando 4 anos! 🎂\n\n" +

        "📅 12 de dezembro de 2026\n" +
        "⏰ 12:00\n" +
        "📍 Minha casa\n\n" +

        "Venha participar dessa missão especial! 🚀";


    if (navigator.share) {

        try {

            await navigator.share({

                title:
                    "Bernardo 4 Anos - Vingadores LEGO",

                text:
                    texto,

                url:
                    window.location.href

            });

            return;

        } catch (erro) {

            console.log(
                "Compartilhamento cancelado."
            );

        }

    }


    copiarTexto(
        texto +
        "\n\n" +
        window.location.href
    );

}


/* =====================================================
   COPIAR TEXTO
===================================================== */

async function copiarTexto(texto) {

    try {

        await navigator.clipboard.writeText(
            texto
        );

        mostrarMensagem(
            "Convite copiado! 🚀"
        );

        return;

    } catch (erro) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            texto;

        textarea.style.position =
            "fixed";

        textarea.style.left =
            "-9999px";


        document.body.appendChild(
            textarea
        );


        textarea.select();


        try {

            document.execCommand(
                "copy"
            );

            mostrarMensagem(
                "Convite copiado! 🚀"
            );

        } catch (erro2) {

            alert(
                texto
            );

        }


        document.body.removeChild(
            textarea
        );

    }

}


/* =====================================================
   LOCALIZAÇÃO
===================================================== */

function abrirLocalizacao() {

    if (!LOCALIZACAO) {

        mostrarMensagem(
            "A localização ainda não foi configurada."
        );

        return;

    }


    window.open(
        LOCALIZACAO,
        "_blank"
    );

}


/* =====================================================
   CONTAGEM REGRESSIVA
===================================================== */

function atualizarContador() {

    const data =
        new Date(
            DATA_FESTA
        ).getTime();


    const agora =
        new Date().getTime();


    const distancia =
        data - agora;


    if (distancia <= 0) {

        atualizarNumero(
            "dias",
            "00"
        );

        atualizarNumero(
            "horas",
            "00"
        );

        atualizarNumero(
            "minutos",
            "00"
        );

        atualizarNumero(
            "segundos",
            "00"
        );

        return;

    }


    const dias =
        Math.floor(
            distancia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (distancia %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutos =
        Math.floor(
            (distancia %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const segundos =
        Math.floor(
            (distancia %
                (1000 * 60)) /
            1000
        );


    atualizarNumero(
        "dias",
        formatar(dias)
    );

    atualizarNumero(
        "horas",
        formatar(horas)
    );

    atualizarNumero(
        "minutos",
        formatar(minutos)
    );

    atualizarNumero(
        "segundos",
        formatar(segundos)
    );

}


/* =====================================================
   ATUALIZAR NÚMERO
===================================================== */

function atualizarNumero(
    id,
    valor
) {

    const elemento =
        document.getElementById(
            id
        );


    if (elemento) {

        elemento.textContent =
            valor;

    }

}


/* =====================================================
   FORMATAR NÚMERO
===================================================== */

function formatar(numero) {

    return String(numero)
        .padStart(
            2,
            "0"
        );

}


/* =====================================================
   MENSAGEM
===================================================== */

function mostrarMensagem(
    mensagem
) {

    let aviso =
        document.getElementById(
            "mensagemAviso"
        );


    if (!aviso) {

        aviso =
            document.createElement(
                "div"
            );


        aviso.id =
            "mensagemAviso";


        aviso.style.position =
            "fixed";

        aviso.style.left =
            "50%";

        aviso.style.bottom =
            "25px";

        aviso.style.transform =
            "translateX(-50%)";

        aviso.style.zIndex =
            "10000";

        aviso.style.width =
            "calc(100% - 40px)";

        aviso.style.maxWidth =
            "400px";

        aviso.style.padding =
            "16px";

        aviso.style.borderRadius =
            "14px";

        aviso.style.background =
            "#111111";

        aviso.style.color =
            "#ffffff";

        aviso.style.textAlign =
            "center";

        aviso.style.fontWeight =
            "700";

        aviso.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.4)";

        document.body.appendChild(
            aviso
        );

    }


    aviso.textContent =
        mensagem;


    aviso.style.opacity =
        "1";


    setTimeout(
        function () {

            aviso.style.opacity =
                "0";

        },
        3000
    );

}


/* =====================================================
   EVENTOS
===================================================== */

const btnConfirmar =
    document.getElementById(
        "btnConfirmarFinal"
    );


const btnCompartilhar =
    document.getElementById(
        "btnCompartilhar"
    );


const btnLocalizacao =
    document.getElementById(
        "btnLocalizacao"
    );


if (btnConfirmar) {

    btnConfirmar.addEventListener(
        "click",
        confirmarPresenca
    );

}


if (btnCompartilhar) {

    btnCompartilhar.addEventListener(
        "click",
        compartilharConvite
    );

}


if (btnLocalizacao) {

    btnLocalizacao.addEventListener(
        "click",
        abrirLocalizacao
    );

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        atualizarContador();

        setInterval(
            atualizarContador,
            1000
        );

    }
);


/* =====================================================
   DISPONIBILIZAR FUNÇÕES PARA O HTML
===================================================== */

window.entrarNaMissao =
    entrarNaMissao;

window.proximaEtapa =
    proximaEtapa;

window.etapaAnterior =
    etapaAnterior;

window.confirmarPresenca =
    confirmarPresenca;

window.compartilharConvite =
    compartilharConvite;

window.abrirLocalizacao =
    abrirLocalizacao;