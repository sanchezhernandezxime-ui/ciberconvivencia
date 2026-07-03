import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 TU SUPABASE (REEMPLAZA ESTO)
const supabaseUrl = "https://TU_PROYECTO.supabase.co";
const supabaseKey = "TU_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

// =====================
// VIOLENTÓMETRO
// =====================
function evaluar() {
  let checks = document.querySelectorAll("input[type=checkbox]:checked");
  let score = 0;

  checks.forEach(c => score += parseInt(c.value));

  let nivel = "";
  let info = "";

  if (score <= 2) {
    nivel = "🟢 Riesgo bajo";
    info = `
      ✔ Mantén comunicación respetuosa  
      ✔ No normalices insultos  
      ✔ Si continúa, pide apoyo a un adulto  
    `;
  }

  else if (score <= 5) {
    nivel = "🟡 Riesgo medio";
    info = `
      ⚠️ Estás en una situación de alerta  
      ✔ Guarda evidencia (capturas)  
      ✔ Bloquea cuentas agresoras  
      ✔ Habla con un adulto o docente  
      📞 Apoyo: orientación escolar o psicólogo  
    `;
  }

  else {
    nivel = "🔴 Riesgo alto";
    info = `
      🚨 SITUACIÓN GRAVE  
      ✔ No respondas a agresores  
      ✔ Guarda TODA evidencia  
      ✔ Reporta a escuela o autoridades  
      ✔ Busca ayuda inmediata  
      📞 México: 911 o orientación escolar  
    `;
  }

  document.getElementById("nivel").innerText = nivel;
  document.getElementById("info").innerHTML = info;
}

// =====================
// BUZÓN ANÓNIMO + SUPABASE
// =====================
async function enviar() {
  let mensaje = document.getElementById("mensaje").value;

  if (mensaje.trim() === "") {
    document.getElementById("estado").innerText = "Escribe tu mensaje";
    return;
  }

  // detectar nivel automáticamente
  let nivel = document.getElementById("nivel").innerText || "Sin evaluar";

  const { error } = await supabase
    .from("mensajes")
    .insert([
      {
        mensaje: mensaje,
        nivel: nivel
      }
    ]);

  if (error) {
    document.getElementById("estado").innerText = "Error al enviar";
    console.log(error);
  } else {
    document.getElementById("estado").innerText =
      "✅ Mensaje enviado de forma anónima. Recibirás orientación.";
    document.getElementById("mensaje").value = "";
  }
}

// 👇 necesario para HTML
window.evaluar = evaluar;
window.enviar = enviar; 