console.log("APP JS CARGADO");

// =========================
// SUPABASE
// =========================

const supabaseUrl = "https://nnewexplofyzbcahdaab.supabase.co";
const supabaseKey = "TU_ANON_KEY_AQUI";

const clienteSupabase = supabase.createClient(supabaseUrl, supabaseKey);

// =========================
// ENVÍO DE TESTIMONIO + ANÁLISIS
// =========================

async function enviarTestimonio() {

    const textarea = document.getElementById("testimonio");
    const mensaje = document.getElementById("mensaje");

    if (!textarea || !mensaje) return;

    const texto = textarea.value.trim();

    if (!texto) {
        mensaje.innerHTML = "⚠ Escribe un testimonio primero.";
        return;
    }

    // =========================
    // GUARDAR EN SUPABASE
    // =========================

    const { error } = await clienteSupabase
        .from("testimonios")
        .insert([
            {
                testimonio: texto,
                fecha: new Date().toISOString()
            }
        ]);

    if (error) {
        console.error(error);
        mensaje.innerHTML = "❌ Error al enviar testimonio.";
        return;
    }

    // =========================
    // ANALIZAR TEXTO
    // =========================

    analizarTestimonio(texto);

    textarea.value = "";

    mensaje.innerHTML += `
        <p style="margin-top:10px; color:green;">
            ✔ Testimonio enviado correctamente.
        </p>
    `;
}

window.enviarTestimonio = enviarTestimonio;

// =========================
// ANALIZADOR INTELIGENTE
// =========================

function analizarTestimonio(texto) {

    texto = texto.toLowerCase();

    let riesgo = "🟢 Riesgo Bajo";
    let color = "#22c55e";
    let tipo = "Sin señales graves";

    let explicacion = "Tu caso fue analizado automáticamente.";
    let acciones = [];

    // 🔴 ALTO RIESGO
    if (
        texto.includes("amenaza") ||
        texto.includes("matar") ||
        texto.includes("extorsión") ||
        texto.includes("doxing")
    ) {
        riesgo = "🔴 Riesgo Alto";
        color = "#dc2626";
        tipo = "Posible violencia digital";

        explicacion = "Tu situación requiere atención inmediata.";

        acciones = [
            "Guarda evidencia",
            "No respondas",
            "Bloquea al agresor",
            "Habla con un adulto",
            "Llama al 911 si es urgente"
        ];
    }

    // 🟠 MEDIO
    else if (
        texto.includes("insulto") ||
        texto.includes("burla") ||
        texto.includes("rumor") ||
        texto.includes("molestan")
    ) {
        riesgo = "🟡 Riesgo Medio";
        color = "#facc15";
        tipo = "Posible acoso digital";

        explicacion = "Hay señales de ciberacoso.";

        acciones = [
            "No respondas",
            "Bloquea usuarios",
            "Guarda evidencia",
            "Habla con alguien de confianza"
        ];
    }

    // =========================
    // MOSTRAR RESULTADO
    // =========================

    mostrarResultadoInteligente(riesgo, color, tipo, explicacion, acciones);
}

function mostrarResultadoInteligente(riesgo, color, tipo, explicacion, acciones) {

    const mensaje = document.getElementById("mensaje");
    if (!mensaje) return;

    let lista = "";

    acciones.forEach(a => {
        lista += `<li>${a}</li>`;
    });

    mensaje.innerHTML = `
        <div style="
            margin-top:15px;
            padding:15px;
            border-radius:10px;
            background:${color};
            color:white;
        ">
            <h3>${riesgo}</h3>
            <p><b>${tipo}</b></p>

            <p>${explicacion}</p>

            <h4>📌 Qué hacer:</h4>
            <ul>${lista}</ul>

            <hr>

            <h4>📞 Líneas de ayuda (México)</h4>
            <ul>
                <li>911 Emergencias</li>
                <li>088 Policía Cibernética</li>
                <li>800 911 2000 Línea de la Vida</li>
            </ul>

            <h4>🏫 Apoyo adicional</h4>
            <ul>
                <li>Profesor o tutor</li>
                <li>DIF o centro de salud</li>
                <li>Plataforma donde ocurrió el caso</li>
            </ul>
        </div>
    `;
}

// =========================
// VIOLENTÓMETRO
// =========================

function evaluarViolentometro() {

    const checks = document.querySelectorAll(".riesgo:checked");
    const resultado = document.getElementById("resultadoViolentometro");

    if (!resultado) return;

    let puntos = 0;

    checks.forEach(c => puntos += Number(c.value));

    if (puntos === 0) {
        resultado.className = "resultado-violentometro verde";
        resultado.innerHTML = "<h3>🟢 Riesgo Bajo</h3><p>Sin señales importantes.</p>";
    }

    else if (puntos <= 4) {
        resultado.className = "resultado-violentometro alerta";
        resultado.innerHTML = "<h3>🟡 Riesgo Medio</h3><p>Habla con alguien de confianza.</p>";
    }

    else {
        resultado.className = "resultado-violentometro peligro";
        resultado.innerHTML = "<h3>🔴 Riesgo Alto</h3><p>Busca ayuda inmediata.</p>";
    }
}

window.evaluarViolentometro = evaluarViolentometro;

// =========================
// AYUDA
// =========================

function mostrarAyuda() {
    const guia = document.getElementById("guiaAyuda");
    if (!guia) return;

    guia.style.display = guia.style.display === "block" ? "none" : "block";
}

window.mostrarAyuda = mostrarAyuda;

// =========================
// NIVEL VIOLENTÓMETRO
// =========================

window.mostrarAyudaNivel = function (nivel) {

    const resultado = document.getElementById("resultadoViolento");
    if (!resultado) return;

    if (nivel === "amarillo") {
        resultado.innerHTML = "<h3>🟡 Amarillo</h3><p>Ignora, bloquea y evita interacción.</p>";
    }

    if (nivel === "naranja") {
        resultado.innerHTML = "<h3>🟠 Naranja</h3><p>Reporta y guarda evidencia.</p>";
    }

    if (nivel === "rojo") {
        resultado.innerHTML = "<h3>🔴 Rojo</h3><p>Busca ayuda inmediata (911).</p>";
    }
};
