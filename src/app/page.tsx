import { SiteHeader } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { SobreMamu } from "@/components/site/sobre";
import { Especialidades } from "@/components/site/especialidades";
import { MenuSection } from "@/components/site/menu";
import { Galeria } from "@/components/site/galeria";
import { Eventos } from "@/components/site/eventos";
import { ComoLlegar } from "@/components/site/como-llegar";
import { FAQ } from "@/components/site/faq";
import { Reservas } from "@/components/site/reservas";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* H1 está en el Hero: "Merendá en un campo de lavanda" */}
        <Hero />
        <SobreMamu />
        <Especialidades />
        <MenuSection />
        <Galeria />
        <Eventos />
        <ComoLlegar />
        <FAQ />
        <Reservas />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
