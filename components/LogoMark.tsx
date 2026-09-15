type Props = {
  className?: string;
};

// Símbolo da marca TWR Tech (twr_brand/logo-mark.svg, variante clara para
// fundo escuro). aria-hidden porque o nome acessível do link vem do texto
// "TWR Tech" ao lado, não do ícone.
export function LogoMark({ className }: Props) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <polygon points="18,24 64,24 50,40 18,40" fill="#1087fe" />
      <polygon points="70,24 88,24 60,40" fill="#3dc5fd" />
      <polygon points="26,40 46,40 46,60 26,76" fill="#1087fe" />
    </svg>
  );
}
