console.log("APP CARGADO");

// ================= SUPABASE =================
const clienteSupabase = supabase.createClient(
  "https://nnewexplofyzbcahdaab.supabase.co",
  "TU-KEY"
);

// ================= VIOLENTÓMETRO =================
function evaluarViolentometro() {

  const checks = document.querySelectorAll(".riesgo:checked");
  const resultado = document.getElementById("resultadoViolentometro");

  let puntos = 0;
  checks.forEach(c => puntos += Number(c.value));

  if (puntos === 0) {
    resultado.innerHTML = "🟢 Bajo riesgo";
  } else if (puntos <= 4) {
    resultado.innerHTML = "🟡 Riesgo medio";
  } else {
    resultado.innerHTML = "🔴 Riesgo alto";
  }
}

window.evaluarViolentometro = evaluarViolentometro;

// ================= BOTONES NIVEL =================
function mostrarAyudaNivel(nivel) {

  const div = document.getElementById("resultadoViolento");

  if (nivel === "amarillo") {
    div.innerHTML = "<h3>🟡 Amarillo</h3><p>Ignora insultos y bloquea usuarios</p>";
  }

  if (nivel === "naranja") {
    div.innerHTML = "<h3>🟠 Naranja</h3><p>Guarda evidencia y reporta</p>";
  }

  if (nivel === "rojo") {
    div.innerHTML = "<h3>🔴 Rojo</h3><p>Denuncia al 911 o policía cibernética</p>";
  }
}

window.mostrarAyudaNivel = mostrarAyudaNivel;

// ================= BUZÓN =================
async function enviarTestimonio() {

  const texto = document.getElementById("testimonio").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!texto) {
    mensaje.innerHTML = "Escribe algo";
    return;
  }

  // GUARDAR EN SUPABASE
  await clienteSupabase.from("testimonios").insert([
    {
      testimonio: texto,
      fecha: new Date().toISOString()
    }
  ]);

  // ANALIZAR
  let riesgo = "🟢 Seguro";
  let ayuda = "Todo parece normal";

  if (texto.includes("amenaza") || texto.includes("matar")) {
    riesgo = "🔴 Alto riesgo";
    ayuda = "Llama al 911 y guarda evidencia";
  }

  else if (texto.includes("insulto")) {
    riesgo = "🟡 Medio";
    ayuda = "Bloquea y reporta";
  }

  document.getElementById("respuestaVictima").style.display = "block";

  document.getElementById("nivelRiesgo").innerHTML = riesgo;
  document.getElementById("explicacionCaso").innerHTML = ayuda;

  mensaje.innerHTML = "Enviado correctamente";
}

window.enviarTestimonio = enviarTestimonio;
