// Injeta JSON-LD no HTML renderizado no servidor. O "<" é escapado para que
// nenhum texto do conteúdo consiga fechar a tag <script>.
export function JsonLd({ dados }: { dados: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dados).replace(/</g, "\\u003c"),
      }}
    />
  );
}
