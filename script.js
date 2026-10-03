```javascript id="w8k2pz"
/* =========================================================
   BERNARDO 4 ANOS
   VINGADORES LEGO
   JAVASCRIPT — V2
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

// Data e horário da festa
const DATA_FESTA = "2026-11-29T12:00";

// Número do WhatsApp do responsável.
//
// IMPORTANTE:
// Coloque aqui o número com DDI + DDD,
// somente números.
//
// Exemplo:
// 5521999999999
//
// Por enquanto deixamos vazio para evitar
// enviar para um número incorreto.
const WHATSAPP = "";

// Link da localização.
//
// Depois vamos colocar o endereço/local exato.
// Por enquanto deixamos o Google Maps como destino
// provisório.
const LOCALIZACAO =
    "https://www.google.com/maps/search/?api=1&query=Minha+Casa";


/* =========================================================
   ELEMENTOS
========================================================= */

const abertura =
    document.getElementById("abertura");

const convite =
    document.getElementById("convite");

const btnEntrar =
    document.getElementById("btnEntrar");

const btnConfirmar =
    document.getElementById("btnConfirmar");

const btnConfirmarFinal =
    document.getElementById("btnConfirmarFinal");

const btnCompartilhar =
    document.getElementById("btnCompartilhar");

const btnLocalizacao =
    document.getElementById("btnLocalizacao");

const countdown =
    document.getElementById("countdown");


/* =========================================================
   ENTRAR NA MISSÃO
========================================================= */

function entrarNaMissao() {

    if (!abertura || !convite) {
        return;
    }

    abertura.classList.add("fechar");

    setTimeout(function () {

        convite.classList.add("mostrar");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 700);
}


/* =========================================================
   CONFIRMAÇÃO DE PRESENÇA
========================================================= */

function confirmarPresenca() {

    const mensagem =
        "Olá! Quero confirmar minha presença no aniversário de 4 anos do Bernardo! 🎉🦸";

    /*
     * Se o número do WhatsApp estiver configurado,
     * abrimos diretamente a conversa.
     *
     * Se ainda estiver vazio, usamos o compartilhamento
     * geral do celular.
     */

    if (WHATSAPP.trim() !== "") {

        const url =
            "https://wa.me/" +
            WHATSAPP +
            "?text=" +
            encodeURIComponent(mensagem);

        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

        return;
    }

    compartilharTexto(
        mensagem
    );
}


/* =========================================================
   COMPARTILHAMENTO
========================================================= */

async function compartilharConvite() {

    const dados = {

        title:
            "🎉 Bernardo faz 4 anos!",

        text:
            "Você foi convocado para uma missão muito especial! 🦸⚡",

        url:
            window.location.href

    };

    /*
     * Em celulares modernos,
     * navigator.share abre o menu nativo
     * de compartilhamento.
     */

    if (
        navigator.share &&
        typeof navigator.share === "function"
    ) {

        try {

            await navigator.share(dados);

            return;

        } catch (erro) {

            /*
             * Se o usuário cancelar o compartilhamento,
             * simplesmente não fazemos nada.
             */

            if (
                erro &&
                erro.name === "AbortError"
            ) {
                return;
            }

        }
    }


    /*
     * Fallback:
     * copia o endereço do convite.
     */

    compartilharTexto(
        window.location.href
    );
}


/* =========================================================
   COMPARTILHAR TEXTO / FALLBACK
========================================================= */

async function compartilharTexto(texto) {

    /*
     * Tenta utilizar a área de transferência.
     */

    if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
    ) {

        try {

            await navigator.clipboard.writeText(
                texto
            );

            mostrarMensagem(
                "📋 Link copiado! Agora é só enviar para seus convidados."
            );

            return;

        } catch (erro) {

            // Continua para o próximo método.
        }
    }


    /*
     * Fallback para navegadores antigos.
     */

    const textarea =
        document.createElement("textarea");

    textarea.value = texto;

    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(
        textarea
    );

    textarea.select();

    try {

        document.execCommand(
            "copy"
        );

        mostrarMensagem(
            "📋 Link copiado! Agora é só enviar para seus convidados."
        );

    } catch (erro) {

        mostrarMensagem(
            "Copie o endereço do site e envie para seus convidados."
        );

    }

    textarea.remove();
}


/* =========================================================
   MENSAGEM TEMPORÁRIA
========================================================= */

function mostrarMensagem(texto) {

    const mensagemExistente =
        document.querySelector(
            ".mensagem-temporaria"
        );

    if (mensagemExistente) {
        mensagemExistente.remove();
    }

    const mensagem =
        document.createElement("div");

    mensagem.className =
        "mensagem-temporaria";

    mensagem.textContent =
        texto;

    mensagem.style.position =
        "fixed";

    mensagem.style.left =
        "50%";

    mensagem.style.bottom =
        "25px";

    mensagem.style.transform =
        "translateX(-50%)";

    mensagem.style.width =
        "calc(100% - 30px)";

    mensagem.style.maxWidth =
        "420px";

    mensagem.style.padding =
        "15px 18px";

    mensagem.style.borderRadius =
        "12px";

    mensagem.style.background =
        "#111111";

    mensagem.style.color =
        "#ffffff";

    mensagem.style.border =
        "2px solid #ffd400";

    mensagem.style.textAlign =
        "center";

    mensagem.style.fontSize =
        "14px";

    mensagem.style.fontWeight =
        "700";

    mensagem.style.zIndex =
        "10000";

    mensagem.style.boxShadow =
        "0 8px 30px rgba(0,0,0,0.4)";

    document.body.appendChild(
        mensagem
    );

    setTimeout(function () {

        mensagem.style.opacity =
            "0";

        mensagem.style.transition =
            "opacity 0.4s ease";

        setTimeout(function () {

            mensagem.remove();

        }, 400);

    }, 3000);
}


/* =========================================================
   MISSÃO CONFIRMADA
========================================================= */

function mostrarConfirmacao() {

    const confirmacao =
        document.getElementById(
            "confirmacao"
        );

    if (!confirmacao) {
        return;
    }

    confirmacao.innerHTML = `
        <div class="confirmacao-conteudo">

            <div class="confirmacao-icon">
                🎉
            </div>

            <p class="secao-tag">
                MISSÃO ACEITA!
            </p>

            <h2>
                PRESENÇA CONFIRMADA!
            </h2>

            <p>
                O Bernardo está esperando
                você para essa grande aventura!
            </p>

            <div
                style="
                    margin-top: 20px;
                    font-size: 42px;
                "
            >
                🦸 ⚡ 🧱 🎂 🎉
            </div>

        </div>
    `;

    confirmacao.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =========================================================
   LOCALIZAÇÃO
========================================================= */

function abrirLocalizacao() {

    if (!LOCALIZACAO) {

        mostrarMensagem(
            "📍 A localização ainda será configurada."
        );

        return;
    }

    window.open(
        LOCALIZACAO,
        "_blank",
        "noopener,noreferrer"
    );
}


/* =========================================================
   CONTAGEM REGRESSIVA
========================================================= */

const dataFesta =
    new Date(
        DATA_FESTA
    ).getTime();


function atualizarContagem() {

    if (!countdown) {
        return;
    }

    const agora =
        Date.now();

    const distancia =
        dataFesta - agora;


    /*
     * Festa já começou
     */

    if (
        Number.isNaN(dataFesta) ||
        distancia <= 0
    ) {

        countdown.innerHTML = `
            <div class="tempo">
                <div style="grid-column: 1 / -1;">
                    <strong>🎉</strong>
                    <span>
                        A MISSÃO COMEÇOU!
                    </span>
                </div>
            </div>
        `;

        return;
    }


    const dias =
        Math.floor(
            distancia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (
                distancia %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutos =
        Math.floor(
            (
                distancia %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const segundos =
        Math.floor(
            (
                distancia %
                (1000 * 60)
            ) /
            1000
        );


    countdown.innerHTML = `

        <div class="tempo">

            <div>
                <strong>
                    ${dias}
                </strong>

                <span>
                    DIAS
                </span>
            </div>


            <div>
                <strong>
                    ${horas}
                </strong>

                <span>
                    HORAS
                </span>
            </div>


            <div>
                <strong>
                    ${minutos}
                </strong>

                <span>
                    MIN
                </span>
            </div>


            <div>
                <strong>
                    ${segundos}
                </strong>

                <span>
                    SEG
                </span>
            </div>

        </div>
    `;
}


/* =========================================================
   EVENTOS
========================================================= */


/*
 * Botão da tela de abertura
 */

if (btnEntrar) {

    btnEntrar.addEventListener(
        "click",
        entrarNaMissao
    );

}


/*
 * Botão principal de confirmação
 */

if (btnConfirmar) {

    btnConfirmar.addEventListener(
        "click",
        confirmarPresenca
    );

}


/*
 * Botão final de confirmação
 */

if (btnConfirmarFinal) {

    btnConfirmarFinal.addEventListener(
        "click",
        function () {

            mostrarConfirmacao();

            /*
             * Também abre o WhatsApp
             * se o número já tiver sido configurado.
             */

            if (
                WHATSAPP.trim() !== ""
            ) {

                setTimeout(
                    confirmarPresenca,
                    500
                );

            }

        }
    );

}


/*
 * Botão compartilhar
 */

if (btnCompartilhar) {

    btnCompartilhar.addEventListener(
        "click",
        compartilharConvite
    );

}


/*
 * Botão localização
 */

if (btnLocalizacao) {

    btnLocalizacao.addEventListener(
        "click",
        function (evento) {

            evento.preventDefault();

            abrirLocalizacao();

        }
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

atualizarContagem();


/*
 * Atualiza o contador a cada segundo.
 */

const intervaloContador =
    setInterval(
        atualizarContagem,
        1000
    );


/*
 * Limpa o intervalo quando a página
 * deixa de estar ativa.
 */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden
        ) {

            clearInterval(
                intervaloContador
            );

        }

    }
);
```


