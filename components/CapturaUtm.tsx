"use client";

import { useEffect } from "react";
import { guardarUtm } from "@/lib/origemClareia";

// Guarda os UTMs da primeira página da visita para a inscrição na ClareIA
// (components/FormularioClareia.tsx). Não desenha nada.
export function CapturaUtm() {
  useEffect(() => {
    guardarUtm();
  }, []);
  return null;
}
