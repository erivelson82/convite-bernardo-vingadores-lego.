const CONFIG = Object.freeze({
  dataFesta: "2026-12-12T12:00:00",   // ← data da festa
  whatsapp: "5511999998888",          // ← seu número com DDI+DDD
  localizacao: "https://maps.google.com/?q=Seu+Endereco",  // ← link do Maps
  ...
});
/* =====================================================
   BERNARDO 4 ANOS · VINGADORES LEGO
   Sistema de convite interativo — 4 etapas
===================================================== */

(() => {
  "use strict";

  /* =====================================================
     CONFIGURAÇÃO
  ===================================================== */

  const CONFIG = Object.freeze({
    dataFesta: "2026-12-12T12:00:00",
    whatsapp: "", // Ex.: "5511999998888" (DDI+DDD+número, sem símbolos)
    localizacao:
      "https://www.google.com/maps/search/?api=1&query=Minha+Casa",
    urlConvite: window.location.href,
  });

  const TOTAL_ETAPAS = 4;
  const DURACAO_ABERTURA = 700;
  const DURACAO_TOAST = 3200;

  const MENSAGENS = Object.freeze({
    confirmacao: {
      texto:
        "Olá! Quero confirmar minha presença na festa de 4 anos do Bernardo! 🦸⚡🎂",
      semWhatsapp:
        "A confirmação pelo WhatsApp será configurada em breve. 🚀",
    },
    compartilhar: {
      titulo: "Bernardo 4 Anos · Vingadores LEGO",
      texto:
        "🦸⚡ VOCÊ FOI CONVOCADO! ⚡🦸\n\n" +
        "Bernardo está completando 4 anos! 🎂\n\n" +
        "📅 12 de dezembro de 2026\n" +
        "⏰ 12:00\n" +
        "📍 Minha casa\n\n" +
        "Venha participar dessa missão especial! 🚀",
    },
    feedback: {
      copiado: "Convite copiado! 🚀",
      erroCopia: "Não foi possível copiar. Tente novamente.",
      semLocalizacao: "A localização ainda não foi configurada.",
    },
  });

  /* =====================================================
     ESTADO
  ===================================================== */

  const state = {
    etapaAtual: 1,
    intervalId: null,
  };

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================================================
     HELPERS
  ===================================================== */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const on = (el, evt, handler, opts) =>
    el && el.addEventListener(evt, handler, opts);

  /* =====================================================
     TOAST
  ===================================================== */

  const toast = (() => {
    let el = null;
    let timeoutId = null;

    const criar = () => {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      document.body.appendChild(el);
      return el;
    };

    const mostrar = (mensagem) => {
      if (!el) criar();

      el.textContent = mensagem;
      el.classList.add("toast--visivel");

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        el.classList.remove("toast--visivel");
      }, DURACAO_TOAST);
    };

    return { mostrar };
  })();

  /* =====================================================
     NAVEGAÇÃO ENTRE ETAPAS
  ===================================================== */

  const scrollParaTopo = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const atualizarProgresso = (etapa) => {
    $$(".ponto").forEach((ponto) => {
      const num = Number(ponto.dataset.etapa);
      const ativo = num === etapa;

      ponto.classList.toggle("ativo", ativo);

      if (ativo) {
        ponto.setAttribute("aria-current", "step");
      } else {
        ponto.removeAttribute("aria-current");
      }
    });
  };

  const mostrarEtapa = (numero) => {
    if (numero < 1 || numero > TOTAL_ETAPAS) return;

    state.etapaAtual = numero;

    $$(".etapa").forEach((el) => el.classList.remove("ativa"));

    const etapa = $(`#etapa-${numero}`);
    if (!etapa) return;

    // Força reflow para reexecutar a animação
    void etapa.offsetWidth;
    etapa.classList.add("ativa");

    atualizarProgresso(numero);
    scrollParaTopo();
  };

  const proximaEtapa = () => {
    if (state.etapaAtual < TOTAL_ETAPAS) {
      mostrarEtapa(state.etapaAtual + 1);
    }
  };

  const etapaAnterior = () => {
    if (state.etapaAtual > 1) {
      mostrarEtapa(state.etapaAtual - 1);
    }
  };

  /* =====================================================
     ABERTURA
  ===================================================== */

  const entrarNaMissao = () => {
    const abertura = $("#abertura");
    const convite = $("#convite");

    if (!abertura || !convite) return;

    abertura.classList.add("fechar");

    setTimeout(() => {
      convite.hidden = false;
      convite.classList.add("mostrar");

      mostrarEtapa(1);
      scrollParaTopo();

      setTimeout(() => {
        abertura.setAttribute("aria-hidden", "true");
      }, DURACAO_ABERTURA);
    }, DURACAO_ABERTURA);
  };

  /* =====================================================
     CONTAGEM REGRESSIVA
  ===================================================== */

  const pad2 = (n) => String(n).padStart(2, "0");

  const atualizarContador = () => {
    const alvo = new Date(CONFIG.dataFesta).getTime();
    const agora = Date.now();
    const diff = alvo - agora;

    if (diff <= 0) {
      ["dias", "horas", "minutos", "segundos"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = "00";
      });
      return;
    }

    const dias = Math.floor(diff / 86_400_000);
    const horas = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutos = Math.floor((diff % 3_600_000) / 60_000);
    const segundos = Math.floor((diff % 60_000) / 1000);

    const valores = {
      dias: pad2(dias),
      horas: pad2(horas),
      minutos: pad2(minutos),
      segundos: pad2(segundos),
    };

    Object.entries(valores).forEach(([id, valor]) => {
      const el = document.getElementById(id);
      if (el && el.textContent !== valor) el.textContent = valor;
    });
  };

  const iniciarContador = () => {
    atualizarContador();
    if (state.intervalId) clearInterval(state.intervalId);
    state.intervalId = setInterval(atualizarContador, 1000);
  };

  /* =====================================================
     CONFIRMAR PRESENÇA
  ===================================================== */

  const confirmarPresenca = () => {
    const numero = CONFIG.whatsapp.trim();

    if (!numero) {
      toast.mostrar(MENSAGENS.confirmacao.semWhatsapp);
      return;
    }

    const url =
      `https://wa.me/${numero}?text=` +
      encodeURIComponent(MENSAGENS.confirmacao.texto);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  /* =====================================================
     COMPARTILHAR
  ===================================================== */

  const copiarTexto = async (texto) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(texto);
        toast.mostrar(MENSAGENS.feedback.copiado);
        return;
      }

      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;left:-9999px;opacity:0;";

      document.body.appendChild(ta);
      ta.select();

      const ok = document.execCommand("copy");
      document.body.removeChild(ta);

      toast.mostrar(
        ok ? MENSAGENS.feedback.copiado : MENSAGENS.feedback.erroCopia
      );
    } catch {
      toast.mostrar(MENSAGENS.feedback.erroCopia);
    }
  };

  const compartilharConvite = async () => {
    const payload = {
      title: MENSAGENS.compartilhar.titulo,
      text: MENSAGENS.compartilhar.texto,
      url: CONFIG.urlConvite,
    };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
      }
    }

    await copiarTexto(
      `${MENSAGENS.compartilhar.texto}\n\n${CONFIG.urlConvite}`
    );
  };

  /* =====================================================
     LOCALIZAÇÃO
  ===================================================== */

  const abrirLocalizacao = () => {
    if (!CONFIG.localizacao) {
      toast.mostrar(MENSAGENS.feedback.semLocalizacao);
      return;
    }

    window.open(CONFIG.localizacao, "_blank", "noopener,noreferrer");
  };

  /* =====================================================
     DELEGAÇÃO DE EVENTOS
  ===================================================== */

  const ACOES = {
    entrar: entrarNaMissao,
    proxima: proximaEtapa,
    anterior: etapaAnterior,
    confirmar: confirmarPresenca,
    compartilhar: compartilharConvite,
    localizacao: abrirLocalizacao,
  };

  const registrarAcoes = () => {
    document.addEventListener("click", (event) => {
      const alvo = event.target.closest("[data-acao]");
      if (!alvo) return;

      const acao = alvo.dataset.acao;
      const handler = ACOES[acao];

      if (handler) {
        event.preventDefault();
        handler();
      }
    });
  };

  /* =====================================================
     INICIALIZAÇÃO
  ===================================================== */

  const init = () => {
    registrarAcoes();
    iniciarContador();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();