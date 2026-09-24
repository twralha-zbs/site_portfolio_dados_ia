import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Chrome do site institucional (Header, Footer e widget de chat). As páginas
// de bio (app/bio) ficam fora deste grupo e não herdam nada disso.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Script
        strategy="afterInteractive"
        src="https://cdn.wts.chat/scripts/widget/v2/h-widget-min.js"
        data-companyid="3ddb8ffa-5ca3-40ac-9644-222dcaadfb42"
        data-widgetid="4dae94ba-a742-44e7-baa2-9802342682ce"
      />
    </>
  );
}
