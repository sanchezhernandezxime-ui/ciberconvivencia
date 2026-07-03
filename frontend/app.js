import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔐 PON AQUÍ TUS DATOS
const supabaseUrl = "https://TU_PROYECTO.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZXdleHBsb2Z5emJjYWhkYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1NzAsImV4cCI6MjA5NjAxNzU3MH0.uFdXdg74Wi4_tc1_rpmjTK5OwD797ao5pNakCGsAEUw";
const supabase = createClient(supabaseUrl, supabaseKey);

// NAV
function mostrar(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.add("oculto"));
  document.getElementById(id).classList.remove("oculto");
}

// BUZÓN INTELIGENTE + SUPABASE
async function enviar() {
  let msg = document.getElementById("mensaje").value.toLowerCase();

  if (!msg) return;

  let nivel = "Bajo";
  let respuesta = "";

  if (msg.includes("amenaza") || msg.includes("extorsión")) {
    nivel = "Grave";
    respuesta = `
🚨 CASO GRAVE DETECTADO<br>
✔ Guarda evidencia<br>
✔ No respondas<br>
✔ Llama al 911<br>
✔ Busca apoyo inmediato
    `;
  }

  else if (msg.includes("insulto") || msg.includes("burl")) {
    nivel = "Bajo";
    respuesta = `
🟢 CASO LEVE<br>
✔ Bloquea usuario<br>
✔ Reporta<br>
✔ No respondas
    `;
  }

  else {
    nivel = "Medio";
    respuesta = `
🟡 CASO MEDIO<br>
✔ Guarda evidencia<br>
✔ Habla con un adulto<br>
✔ Bloquea agresor
    `;
  }

  // 🔥 GUARDAR EN SUPABASE
  const { error } = await supabase
    .from("casos")
    .insert([
      {
        mensaje: msg,
        nivel: nivel,
        respuesta: respuesta
      }
    ]);

  if (error) {
    document.getElementById("respuesta").innerHTML = "Error al enviar";
    console.log(error);
    return;
  }

  document.getElementById("respuesta").innerHTML = respuesta;
  document.getElementById("mensaje").value = "";
}

window.enviar = enviar;
window.mostrar = mostrar;
