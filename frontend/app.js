 import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 SUPABASE (REEMPLAZA ESTO)
const supabaseUrl = "https://TU_PROYECTO.supabase.co";
const supabaseKey = "TU_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

// =========================
// 🧭 NAVEGACIÓN SEGURA
// =========================
function mostrar(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.style.display = "none";
  });

  const target = document.getElementById(id);
  if (target) {
    target.style.display = "block";
  }
}

// =========================
// 🟢 INICIO DE PÁGINA
// =========================
window.onload = () => {
  document.querySelectorAll("section").forEach(sec => {
    sec.style.display = "none";
  });

  const v = document.getElementById("violentometro");
  if (v) v.style.display = "block";
};

// =========================
// 🤖 BUZÓN IA + SUPABASE
// =========================
async function enviar() {
  const input = document.getElementById("mensaje");
  const out = document.getElementById("respuesta");

  if (!input || !input.value.trim()) {
    out.innerText = "Escribe un mensaje primero";
    return;
  }

  let msg = input.value.toLowerCase();

  let nivel = "";
  let respuesta = "";

  // 🔴 GRAVE
  if (
    msg.includes("amenaza") ||
    msg.includes("extorsión") ||
    msg.includes("matar") ||
    msg.includes("foto privada") ||
    msg.includes("video")
  ) {
    nivel = "Grave";
    respuesta = `
🚨 CASO GRAVE DETECTADO

✔ Guarda evidencia
✔ No respondas
✔ Bloquea al agresor
✔ Reporta en la red social
✔ Llama al 911 si hay riesgo

💡 Esto puede ser un delito digital.
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
✔ Bloquea cuentas
✔ Guarda evidencia
✔ Habla con un adulto
✔ Reporta la cuenta
    `;
  }

  // 🟢 LEVE
  else {
    nivel = "Bajo";
    respuesta = `
🟢 CASO LEVE

✔ Mantén la calma
✔ No compartas información personal
✔ Observa si se repite
✔ Busca apoyo si aumenta
    `;
  }

  // =========================
  // 💾 GUARDAR EN SUPABASE
  // =========================
  const { error } = await supabase
    .from("testimonios")
    .insert([
      {
        mensaje: msg,
        nivel: nivel,
        respuesta: respuesta
      }
    ]);

  if (error) {
    console.log(error);
    out.innerText = "❌ Error al guardar en la base de datos";
    return;
  }

  out.innerText = respuesta;
  input.value = "";
}

// =========================
// 🌐 HACER FUNCIONES GLOBALES
// =========================
window.mostrar = mostrar;
window.enviar = enviar;
