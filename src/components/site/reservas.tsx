'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart, Clock, Users, User, Mail, Phone, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "5491157496667";

const TIME_SLOTS = [
  "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00",
];

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export function Reservas() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.date || !form.time || !form.guests) {
      toast({
        title: "Faltan datos",
        description: "Completa nombre, fecha, hora y cantidad de personas.",
        variant: "destructive",
      });
      return;
    }

    // Build WhatsApp message
    const msg =
      `¡Hola MAMU! 🌿 Quisiera hacer una reserva:\n\n` +
      `• Nombre: ${form.name}\n` +
      `• Fecha: ${form.date}\n` +
      `• Hora: ${form.time}\n` +
      `• Personas: ${form.guests}\n` +
      (form.phone ? `• Teléfono: ${form.phone}\n` : "") +
      (form.email ? `• Email: ${form.email}\n` : "") +
      (form.message ? `\nComentarios: ${form.message}\n` : "") +
      `\n¿Tienen disponibilidad? ¡Gracias!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

    toast({
      title: "Reserva lista para enviar",
      description: "Te estamos abriendo WhatsApp con el mensaje preparado. Tocá enviar para confirmar.",
    });

    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 600);
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section id="reservas" className="relative py-20 lg:py-28 overflow-hidden bg-paper">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#B5A8C9]/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#8FA586]/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:sticky lg:top-24"
          >
            <span className="font-accent italic text-[#6D5D8A] text-xl">Reservá tu mesa</span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#3D3530] leading-tight text-balance">
              Un lugar entre las flores te espera
            </h2>
            <p className="mt-5 text-[#3D3530]/80 leading-relaxed">
              Para asegurarte una mesa los fines de semana o para eventos especiales, te recomendamos
              reservar con anticipación. Completá el formulario y te abrimos WhatsApp con el mensaje
              listo para enviar.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FFFBF4] border border-[#E0D4BD]">
                <CalendarHeart className="h-5 w-5 text-[#6D5D8A] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-medium text-[#3D3530]">
                    Disponibilidad
                  </h3>
                  <p className="text-sm text-[#6B5F55] mt-0.5">
                    Vie · Sáb · Dom desde las 17 h. Para eventos o grupos de más de 6 personas,
                    consultá por horarios especiales.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FFFBF4] border border-[#E0D4BD]">
                <Phone className="h-5 w-5 text-[#5F7558] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif text-base font-medium text-[#3D3530]">
                    También podés reservar por teléfono
                  </h3>
                  <a
                    href="tel:+541157496667"
                    className="text-sm text-[#6D5D8A] hover:text-[#5B4B78] font-medium"
                  >
                    11 5749 6667
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-[#FFFBF4] border border-[#E0D4BD] shadow-xl p-6 sm:p-8 lg:p-10"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="sm:col-span-2">
                  <Label htmlFor="name" className="text-[#3D3530] font-medium">
                    Nombre y apellido *
                  </Label>
                  <div className="mt-1.5 relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5F55]" />
                    <Input
                      id="name"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Tu nombre"
                      className="pl-10 bg-[#FBF6EE] border-[#E0D4BD] focus-visible:ring-[#8B7BA8]"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-[#3D3530] font-medium">
                    Teléfono
                  </Label>
                  <div className="mt-1.5 relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5F55]" />
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="Ej: 11 5555 5555"
                      className="pl-10 bg-[#FBF6EE] border-[#E0D4BD] focus-visible:ring-[#8B7BA8]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-[#3D3530] font-medium">
                    Email
                  </Label>
                  <div className="mt-1.5 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5F55]" />
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="tu@email.com"
                      className="pl-10 bg-[#FBF6EE] border-[#E0D4BD] focus-visible:ring-[#8B7BA8]"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="date" className="text-[#3D3530] font-medium">
                    Fecha *
                  </Label>
                  <div className="mt-1.5 relative">
                    <CalendarHeart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5F55] z-10" />
                    <Input
                      id="date"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={update("date")}
                      className="pl-10 bg-[#FBF6EE] border-[#E0D4BD] focus-visible:ring-[#8B7BA8]"
                      required
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <Label className="text-[#3D3530] font-medium">
                    Personas *
                  </Label>
                  <div className="mt-1.5 relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5F55] z-10" />
                    <Select
                      value={form.guests}
                      onValueChange={(v) => setForm((f) => ({ ...f, guests: v }))}
                    >
                      <SelectTrigger className="pl-10 bg-[#FBF6EE] border-[#E0D4BD] focus:ring-[#8B7BA8]">
                        <SelectValue placeholder="Cantidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {GUEST_OPTIONS.map((g) => (
                          <SelectItem key={g} value={g}>{g} {g === "1" ? "persona" : "personas"}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Time */}
                <div className="sm:col-span-2">
                  <Label className="text-[#3D3530] font-medium">
                    Hora *
                  </Label>
                  <div className="mt-1.5 relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5F55] z-10" />
                    <Select
                      value={form.time}
                      onValueChange={(v) => setForm((f) => ({ ...f, time: v }))}
                    >
                      <SelectTrigger className="pl-10 bg-[#FBF6EE] border-[#E0D4BD] focus:ring-[#8B7BA8]">
                        <SelectValue placeholder="Elegí un horario" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((t) => (
                          <SelectItem key={t} value={t}>{t} hs</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="text-[#3D3530] font-medium">
                    Comentarios
                  </Label>
                  <div className="mt-1.5 relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-[#6B5F55]" />
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={update("message")}
                      placeholder="Algún pedido especial: opciones veganas, sin gluten, mesa al aire libre, mesa para un evento..."
                      className="pl-10 pt-3 min-h-[100px] bg-[#FBF6EE] border-[#E0D4BD] focus-visible:ring-[#8B7BA8] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 bg-[#6D5D8A] hover:bg-[#5B4B78] text-[#FBF6EE] rounded-full gap-2 h-12 shadow-md"
                >
                  <Send className="h-4 w-4" />
                  Enviar reserva por WhatsApp
                </Button>
              </div>

              <p className="mt-4 text-xs text-[#6B5F55] text-center leading-relaxed">
                Al enviar, vas a pasar a WhatsApp con el mensaje pre-armado. La confirmación final
                de la reserva la hacen las chicas de MAMU.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
