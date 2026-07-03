import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 CONEXIÓN SUPABASE (REEMPLAZA ESTO)
const supabaseUrl = "https://TU_PROYECTO.supabase.co";
const supabaseKey = "TU_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================
// NAVEGACIÓN
// ==========================
function mostrar(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

window.mostrar = mostrar;

// ==========================
// BUZÓN IA + SUPABASE
// ==========================
async function enviar() {
  let msg = document.getElementById("mensaje").value.toLowerCase();

  if (!msg) return;

  let nivel = "";
  let respuesta = "";

  // 🔴 GRAVE
  if (
    msg.includes("amenaza") ||
    msg.includes("extorsión") ||
    msg.includes("matar") ||
    msg.includes("foto") ||
    msg.includes("video privado")
  ) {
    nivel = "Grave";
    respuesta = `
🚨 CASO GRAVE DETECTADO

✔ Guarda evidencia
✔ No respondas al agresor
✔ Bloquea inmediatamente
✔ Reporta en la plataforma
✔ Llama al 911 si hay peligro

📌 Recomendación: busca apoyo adulto o psicológico inmediato.
    `;
  }

  // 🟡 MEDIO
  else if (
    msg.includes("insulto") ||
    msg.includes("burla") ||
    msg.includes("rumor") ||
    msg.includes("acoso")
  ) {
    nivel = "Medio";
    respuesta = `
⚠️ CASO DE ACOSO DIGITAL

✔ No respondas
✔ Bloquea usuarios
✔ Reporta contenido
✔ Guarda evidencia
✔ Habla con un adulto

📌 Recomendación: si continúa, puede escalar a grave.
    `;
  }

  // 🟢 LEVE
  else {
    nivel = "Bajo";
    respuesta = `
🟢 CASO LEVE

✔ Mantén la calma
✔ No compartas datos personales
✔ Observa si se repite
✔ Busca apoyo si aumenta
    `;
  }

  // ==========================
  // 💾 GUARDAR EN SUPABASE (TESTIMONIOS)
  // ==========================
  const { error } = await supabase
    .from("testimonios")   // 👈 AQUÍ ESTÁ EL CAMBIO
    .insert([
      {
        mensaje: msg,
        nivel: nivel,
        respuesta: respuesta
      }
    ]);

  if (error) {
    console.log("Error Supabase:", error);
    document.getElementById("respuesta").innerText =
      "❌ Error al guardar en la base de datos";
    return;
  }

  document.getElementById("respuesta").innerText = respuesta;
  document.getElementById("mensaje").value = "";
}

window.enviar = enviar;
