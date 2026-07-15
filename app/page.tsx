export default function Home() {
  return (
    <div className="font-sans flex min-h-screen items-center justify-center p-8">
      <main className="flex max-w-xl flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-black/[.08] px-4 py-1 text-sm text-black/60 dark:border-white/[.145] dark:text-white/60">
          Site em construção
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Transformo dados dispersos em decisões
        </h1>
        <p className="text-lg text-black/70 dark:text-white/70">
          Dashboards Power BI, automações Power Platform e IA aplicada para
          operações que não podem esperar.
        </p>
        <p className="text-sm text-black/50 dark:text-white/50">
          [SEU_NOME] — portfólio e estudos de caso em breve.
        </p>
      </main>
    </div>
  );
}
