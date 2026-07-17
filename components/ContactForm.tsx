"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Status = "inicial" | "enviando" | "sucesso" | "erro";

const estiloCampo =
  "w-full rounded-lg border border-linha bg-painel px-4 py-3 text-texto placeholder:text-apagado focus:border-acento focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("inicial");

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    setStatus("enviando");
    try {
      const resposta = await fetch(site.formspreeEndpoint, {
        method: "POST",
        body: new FormData(formulario),
        headers: { Accept: "application/json" },
      });
      if (resposta.ok) {
        setStatus("sucesso");
        formulario.reset();
      } else {
        setStatus("erro");
      }
    } catch {
      setStatus("erro");
    }
  }

  if (status === "sucesso") {
    return (
      <div className="rounded-2xl border border-linha bg-painel p-8" role="status">
        <h3 className="font-display text-2xl font-extrabold">Mensagem enviada.</h3>
        <p className="mt-3 max-w-[48ch] text-suave">
          Obrigado pelo contato. Respondo em até 1 dia útil. Se preferir
          adiantar, é só{" "}
          <a
            href={site.links.agenda}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-acento hover:underline"
          >
            agendar uma conversa
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-5">
      <div>
        <label htmlFor="nome" className="mb-1.5 block text-sm font-semibold">
          Nome
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          className={estiloCampo}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={estiloCampo}
        />
      </div>

      <div>
        <label htmlFor="empresa" className="mb-1.5 block text-sm font-semibold">
          Empresa <span className="font-normal text-apagado">(opcional)</span>
        </label>
        <input
          id="empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          className={estiloCampo}
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-1.5 block text-sm font-semibold">
          Qual é a sua dor de dados hoje?
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          rows={5}
          placeholder="Ex.: fecho o relatório do mês na mão, demora dias e ninguém confia no número."
          className={estiloCampo}
        />
      </div>

      {/* campo armadilha anti-spam do Formspree: fica invisível para pessoas */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === "erro" && (
        <p className="text-sm text-red-400" role="alert">
          Não consegui enviar agora. Tente de novo em instantes ou me chame no{" "}
          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            WhatsApp
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "enviando"}
        className="self-start rounded-full bg-acento px-7 py-3 font-bold text-acento-contraste transition-[filter] hover:brightness-110 disabled:opacity-60"
      >
        {status === "enviando" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
