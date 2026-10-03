/* =========================================================
   CONVITE BERNARDO FURTADO
   VINGADORES LEGO
   SCRIPT V2.1
   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES DA FESTA
   ========================================================= */

const DATA_FESTA = "2026-12-12T12:00:00";

/*
   Coloque aqui o número do WhatsApp futuramente.

   Exemplo:
   const WHATSAPP = "5521999999999";

   Por enquanto deixamos vazio.
*/
const WHATSAPP = "";


/*
   Localização da festa.

   Quando tiver o endereço/link correto do Google Maps,
   substitua o endereço abaixo.
*/
const LOCALIZACAO =
    "https://www.google.com/maps/search/?api=1&query=Minha+Casa";


/* =========================================================
   ELEMENTOS DA PÁGINA
   ========================================================= */

const abertura = document.getElementById("abertura");
const convite = document.getElementById("convite");

const btnEntrar = document.getElementById("btnEntrar");
const btnConfirmar = document.getElementById("btnConfirmar");
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

    const telaAbertura =
        document.getElementById("abertura");

    const telaConvite =
        document.getElementById("convite");


    /*
       Verificação de segurança.
    */

    if (!telaAbertura || !telaConvite) {

        alert(
            "Não foi possível carregar o convite. " +
            "Verifique se o HTML está correto."
        );

        return;
    }


    /*
       Fecha a tela inicial.
    */

    telaAbertura.classList.add("fechar");


    /*
       Mostra o convite depois da animação.
    */

    setTimeout(function () {

        telaConvite.classList.add("mostrar");

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    }, 700);

}


/* =========================================================
   CONFIRMAR PRESENÇA
   ========================================================= */

function confirmarPresenca() {

    /*
       Se o WhatsApp estiver configurado,
       abre uma conversa diretamente.
    */

    if (WHATSAPP && WHATSAPP.trim() !== "") {

        const mensagem =
            "Olá! Quero confirmar minha presença " +
            "na festa de 4 anos do Bernardo! 🦸⚡🎂";

        const url =
            "https://wa.me/" +
            WHATSAPP +
            "?text=" +
            encodeURIComponent(mensagem);

        window.open(url, "_blank");

        return;
    }


    /*
       Enquanto o WhatsApp não estiver configurado,
       usamos o compartilhamento do próprio celular.
    */

    compartilharTexto();

}


/* =========================================================
   COMPARTILHAR CONVITE
   ========================================================= */

async function compartilharConvite() {

    const texto =
        "🦸⚡ VOCÊ FOI CONVOCADO! ⚡🦸\n\n" +

        "Bernardo está completando 4 anos! 🎂\n\n" +

        "📅 12 de dezembro de 2026\n" +
        "⏰ 12:00\n" +
        "📍 Minha casa\n\n" +

        "Venha participar dessa missão especial! 🚀\n\n" +

        window.location.href;


    /*
       Compartilhamento nativo do celular.
    */

    if (navigator.share) {

        try {

            await navigator.share({

                title:
                    "Bernardo 4 Anos - Vingadores LEGO",

                text: texto,

                url: window.location.href

            });

            return;

        } catch (erro) {

            /*
               O usuário pode simplesmente ter
               fechado a janela de compartilhamento.
            */

            console.log(
                "Compartilhamento cancelado."
            );

        }

    }


    /*
       Caso o navegador não tenha navigator.share,
       tenta copiar o convite.
    */

    compartilharTexto();

}


/* =========================================================
   COPIAR TEXTO DO CONVITE
   ========================================================= */

async function compartilharTexto() {

    const texto =
        "🦸⚡ VOCÊ FOI CONVOCADO! ⚡🦸\n\n" +

        "Bernardo está completando 4 anos! 🎂\n\n" +

        "📅 12 de dezembro de 2026\n" +
        "⏰ 12:00\n" +
        "📍 Minha casa\n\n" +

        "Venha participar dessa missão especial! 🚀\n\n" +

        window.location.href;


    /*
       Tenta utilizar a área de transferência.
    */

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        try {

            await navigator.clipboard.writeText(texto);

            mostrarMensagem(
                "Convite copiado! Agora é só enviar para seus convidados. 🚀"
            );

            return;

        } catch (erro) {

            console.log(
                "Não foi possível copiar automaticamente."
            );

        }

    }


    /*
       Fallback para navegadores mais antigos.
    */

    const textarea =
        document.createElement("textarea");

    textarea.value = texto;

    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    try {

        document.execCommand("copy");

        mostrarMensagem(
            "Convite copiado! 🚀"
        );

    } catch (erro) {

        alert(
            "Copie manualmente este convite:\n\n" +
            texto
        );

    }

    document.body.removeChild(textarea);

}


/* =========================================================
   MENSAGEM TEMPORÁRIA
   ========================================================= */

function mostrarMensagem(mensagem) {

    /*
       Procura uma mensagem existente.
    */

    let aviso =
        document.getElementById("mensagemAviso");


    /*
       Se não existir, cria.
    */

    if (!aviso) {

        aviso =
            document.createElement("div");

        aviso.id = "mensagemAviso";

        aviso.style.position = "fixed";
        aviso.style.left = "50%";
        aviso.style.bottom = "25px";
        aviso.style.transform =
            "translateX(-50%)";

        aviso.style.zIndex = "10000";

        aviso.style.width = "calc(100% - 40px)";
        aviso.style.maxWidth = "420px";

        aviso.style.padding = "16px 20px";

        aviso.style.borderRadius = "14px";

        aviso.style.background =
            "rgba(0, 0, 0, 0.92)";

        aviso.style.color = "#ffffff";

        aviso.style.textAlign = "center";

        aviso.style.fontWeight = "700";

        aviso.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.35)";

        aviso.style.opacity = "0";

        aviso.style.transition =
            "opacity .3s ease";

        document.body.appendChild(aviso);

    }


    aviso.textContent = mensagem;

    aviso.style.opacity = "1";


    setTimeout(function () {

        aviso.style.opacity = "0";

    }, 3000);

}


/* =========================================================
   MOSTRAR CONFIRMAÇÃO
   ========================================================= */

function mostrarConfirmacao() {

    const confirmacao =
        document.getElementById("confirmacao");


    if (!confirmacao) {
        return;
    }


    const conteudo =
        confirmacao.querySelector(
            ".confirmacao-conteudo"
        );


    if (!conteudo) {
        return;
    }


    conteudo.innerHTML = `

        <div class="confirmacao-icon">
            🦸
        </div>

        <p class="secao-subtitulo">
            MISSÃO ACEITA!
        </p>

        <h2>
            PRESENÇA CONFIRMADA!
        </h2>

        <p>
            Bernardo está muito feliz em ter
            você nessa aventura! 🎂⚡
        </p>

        <div style="
            font-size: 3rem;
            margin-top: 20px;
        ">
            🎉 🦸 ⚡ 🎂
        </div>

    `;

}


/* =========================================================
   ABRIR LOCALIZAÇÃO
   ========================================================= */

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


/* =========================================================
   CONTAGEM REGRESSIVA
   ========================================================= */

function atualizarContador() {

    const dataFesta =
        new Date(DATA_FESTA).getTime();

    const agora =
        new Date().getTime();

    const distancia =
        dataFesta - agora;


    /*
       Se a festa já começou/terminou.
    */

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
        formatarNumero(dias)
    );


    atualizarNumero(
        "horas",
        formatarNumero(horas)
    );


    atualizarNumero(
        "minutos",
        formatarNumero(minutos)
    );


    atualizarNumero(
        "segundos",
        formatarNumero(segundos)
    );

}


/* =========================================================
   ATUALIZAR NÚMERO
   ========================================================= */

function atualizarNumero(id, valor) {

    const elemento =
        document.getElementById(id);

    if (elemento) {

        elemento.textContent =
            valor;

    }

}


/* =========================================================
   FORMATAR NÚMERO
   ========================================================= */

function formatarNumero(numero) {

    return String(numero)
        .padStart(2, "0");

}


/* =========================================================
   EVENTOS
   ========================================================= */

/*
   O botão de entrada também possui
   onclick diretamente no HTML.

   Aqui adicionamos o evento como
   segunda camada de segurança.
*/

if (btnEntrar) {

    btnEntrar.addEventListener(
        "click",
        entrarNaMissao
    );

}


if (btnConfirmar) {

    btnConfirmar.addEventListener(
        "click",
        confirmarPresenca
    );

}


if (btnConfirmarFinal) {

    btnConfirmarFinal.addEventListener(
        "click",
        mostrarConfirmacao
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


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           Atualiza o contador imediatamente.
        */

        atualizarContador();


        /*
           Atualiza o contador a cada segundo.
        */

        setInterval(
            atualizarContador,
            1000
        );

    }
);


/* =========================================================
   DISPONIBILIZA A FUNÇÃO PARA O HTML
   ========================================================= */

/*
   Isso garante que:

   onclick="entrarNaMissao()"

   consiga encontrar a função.
*/

window.entrarNaMissao =
    entrarNaMissao;

window.confirmarPresenca =
    confirmarPresenca;

window.compartilharConvite =
    compartilharConvite;

window.abrirLocalizacao =
    abrirLocalizacao;