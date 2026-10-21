import { PrintProduto } from "@/components/ui/print-produto";
import atendimentoMobile from "@/public/nexiatend/atendimento_mobile.webp";
import funilDetalhe from "@/public/nexiatend/funil_detalhe.webp";
import rastreamento from "@/public/nexiatend/rastreamento.webp";

// Conjunto de três peças para o bloco do NexIAtend na Home: a conversa com a
// origem do cliente registrada, o funil de vendas e a lista de atendimentos no
// celular. Cada peça mostra uma capacidade diferente. No mobile o celular sai
// e as janelas empilham sem sobreposição.
export function VisualNexiatend() {
  return (
    <div className="relative">
      <div className="md:w-[88%]">
        <PrintProduto
          src={rastreamento}
          alt="Conversa no NexIAtend com um cartão de rastreamento que registra a origem do cliente, a campanha, o título do anúncio e a página de acesso"
          sizes="(min-width: 768px) 500px, 100vw"
          legenda="// origem registrada na conversa"
        />
      </div>
      <div className="relative mt-4 md:-mt-6 md:ml-auto md:w-[88%]">
        <PrintProduto
          src={funilDetalhe}
          alt="Três colunas do funil de vendas (Prospecção, Contrato e Visita), com cartões de clientes, responsáveis, valores e um cartão em atraso destacado em vermelho"
          sizes="(min-width: 768px) 500px, 100vw"
          legenda="// funil de vendas"
        />
      </div>
      <div className="absolute -right-3 top-1/2 hidden w-28 -translate-y-1/2 lg:block xl:-right-8 xl:w-32">
        <PrintProduto
          src={atendimentoMobile}
          alt="Lista de atendimentos no celular, com abas Novos, Meus e Outros, etiquetas dos clientes, equipe responsável e tempo de espera"
          sizes="128px"
          variante="aparelho"
        />
      </div>
    </div>
  );
}
