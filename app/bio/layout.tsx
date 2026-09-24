// Layout das páginas de bio: sem Header, Footer nem widget de chat (esses
// vivem em app/(site)/layout.tsx). Pensado para celular; no desktop a
// coluna fica centralizada com a mesma largura.
export default function BioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col px-4 pt-12 pb-8">
      {children}
    </main>
  );
}
