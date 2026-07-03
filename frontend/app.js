console.log("APP JS CARGADO");

// =========================
// SUPABASE
// =========================

const supabaseUrl =
'https://nnewexplofyzbcahdaab.supabase.co';

const supabaseKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZXdleHBsb2Z5emJjYWhkYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1NzAsImV4cCI6MjA5NjAxNzU3MH0.uFdXdg74Wi4_tc1_rpmjTK5OwD797ao5pNakCGsAEUw';

const clienteSupabase =
window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

// =========================
// BUZÓN ANÓNIMO
// =========================

async function enviarTestimonio() {

  const textarea =
    document.getElementById('testimonio');

  const mensaje =
    document.getElementById('mensaje');

  const testimonio =
    textarea.value.trim();

  if (!testimonio) {

    mensaje.innerText =
      'Por favor escribe un testimonio.';

    return;
  }

  const { error } =
    await clienteSupabase
      .from('testimonios')
      .insert([
        {
          testimonio: testimonio,
          fecha: new Date().toISOString()
        }
      ]);

  if (error) {

    console.error(error);

    mensaje.innerText =
      'Error al enviar el testimonio.';

    return;
  }

  const frases = [

    'Gracias por compartir tu experiencia. Tu voz importa.',

    'No estás solo. Buscar ayuda es un acto de valentía.',

    'Hablar sobre lo que ocurre puede ser el primer paso para solucionarlo.',

    'Tu bienestar es importante y mereces apoyo.',

    'Gracias por confiar en este espacio seguro.'
  ];

  mensaje.innerText =
    frases[
      Math.floor(
        Math.random() * frases.length
      )
    ];

  textarea.value = '';
}

window.enviarTestimonio =
enviarTestimonio;

// =========================
// VIOLENTÓMETRO
// =========================

function evaluarViolentometro() {

  const checks =
    document.querySelectorAll(
      '.riesgo:checked'
    );

  const resultado =
    document.getElementById(
      'resultadoViolentometro'
    );

  if (!resultado) return;

  let puntos = 0;

  checks.forEach(check => {

    puntos +=
      Number(check.value);

  });

  if (puntos === 0) {

    resultado.className =
      'resultado-violentometro verde';

    resultado.innerHTML = `
      <h3>🟢 Riesgo Bajo</h3>
      <p>
      No se detectan señales importantes
      de ciberacoso.
      </p>
    `;

  } else if (puntos <= 4) {

    resultado.className =
      'resultado-violentometro alerta';

    resultado.innerHTML = `
      <h3>🟡 Riesgo Medio</h3>
      <p>
      Existen señales de alerta.
      Habla con una persona de confianza.
      </p>
    `;

  } else {

    resultado.className =
      'resultado-violentometro peligro';

    resultado.innerHTML = `
      <h3>🔴 Riesgo Alto</h3>
      <p>
      Guarda evidencias,
      bloquea al agresor
      y busca ayuda inmediatamente.
      </p>
    `;
  }
}

window.evaluarViolentometro =
evaluarViolentometro;

// =========================
// BOTÓN NECESITO AYUDA
// =========================

function mostrarAyuda() {

  const guia =
    document.getElementById(
      'guiaAyuda'
    );

  if (!guia) return;

  if (
    guia.style.display ===
    'block'
  ) {

    guia.style.display =
      'none';

  } else {

    guia.style.display =
      'block';
  }
}

window.mostrarAyuda =
mostrarAyuda;

console.log(
  "APP COMPLETO CARGADO"
);
window.mostrarAyudaNivel = function (nivel) {
    const resultado = document.getElementById("resultadoViolento");
    if (!resultado) return;

    if (nivel === "amarillo") {
        resultado.innerHTML = `
            <h3>🟡 Nivel Amarillo - Herramientas</h3>
            <ul>
                <li>Ignora insultos.</li>
                <li>Bloquea usuarios.</li>
                <li>No respondas provocaciones.</li>
            </ul>
        `;
    }

    if (nivel === "naranja") {
        resultado.innerHTML = `
            <h3>🟠 Nivel Naranja - Herramientas</h3>
            <ul>
                <li>Reporta cuentas falsas.</li>
                <li>Guarda evidencia.</li>
                <li>Habla con un adulto.</li>
            </ul>
        `;
    }

    if (nivel === "rojo") {
        resultado.innerHTML = `
            <h3>🔴 Nivel Rojo - Herramientas</h3>
            <ul>
                <li>Denuncia inmediato.</li>
                <li>No respondas amenazas.</li>
                <li>Contacta autoridades (911).</li>
            </ul>
        `;
    }
};

// =========================
// ANALIZADOR INTELIGENTE
// =========================

function analizarTestimonio(texto) {

    texto = texto.toLowerCase();

    let riesgo = "🟢 Riesgo Bajo";
    let color = "#22c55e";

    let tipo = "Situación de ciberacoso";

    let explicacion = `
    Tu testimonio fue analizado automáticamente.
    La situación que describes merece atención.
    No debes normalizar ninguna forma de violencia digital.
    `;

    let acciones = [];

    //-------------------------------------------------
    // AMENAZAS
    //-------------------------------------------------

    if (
        texto.includes("amenaza") ||
        texto.includes("matar") ||
        texto.includes("golpear") ||
        texto.includes("muerte")
    ){

        riesgo = "🔴 Riesgo Alto";
        color = "#dc2626";

        tipo = "Amenazas";

        explicacion = `
        Detectamos posibles amenazas.
        Tu seguridad es la prioridad.
        Es importante buscar ayuda inmediatamente.
        `;

        acciones = [

            "📸 Guarda capturas de pantalla.",

            "🚫 No respondas al agresor.",

            "🔒 Bloquea la cuenta.",

            "👨‍👩‍👧 Habla con un adulto de confianza.",

            "🚔 Si existe peligro inmediato llama al 911."

        ];
    }

    //-------------------------------------------------
    // SEXTORSIÓN
    //-------------------------------------------------

    if (

        texto.includes("foto íntima") ||

        texto.includes("desnuda") ||

        texto.includes("sextorsion") ||

        texto.includes("sextorsión")

    ){

        riesgo = "🔴 Riesgo Alto";

        color = "#dc2626";

        tipo = "Sextorsión";

        explicacion = `
        Detectamos un posible caso de sextorsión.
        Nunca envíes dinero ni más imágenes.
        Buscar ayuda inmediata puede evitar que la situación empeore.
        `;

        acciones = [

            "🚫 No envíes más fotografías.",

            "🚫 No pagues dinero.",

            "📸 Guarda todas las conversaciones.",

            "🚔 Acude a la Policía Cibernética.",

            "👨‍👩‍👧 Busca apoyo de un adulto."
        ];
    }

    //-------------------------------------------------
    // PERFIL FALSO
    //-------------------------------------------------

    if (

        texto.includes("perfil falso") ||

        texto.includes("cuenta falsa") ||

        texto.includes("suplant")

    ){

        riesgo = "🟠 Riesgo Medio";

        color = "#f97316";

        tipo = "Suplantación de identidad";

        explicacion = `
        Detectamos una posible suplantación de identidad.
        Esto puede afectar tu reputación y seguridad.
        `;

        acciones = [

            "📸 Guarda evidencia.",

            "📢 Reporta el perfil.",

            "🔑 Cambia tu contraseña.",

            "🛡 Activa la verificación en dos pasos.",

            "👨‍👩‍👧 Informa a familiares y escuela."

        ];
    }

    //-------------------------------------------------
    // INSULTOS
    //-------------------------------------------------

    if (

        texto.includes("insulta") ||

        texto.includes("burla") ||

        texto.includes("humilla")

    ){

        riesgo = "🟡 Riesgo Medio";

        color = "#eab308";

        tipo = "Hostigamiento";

        explicacion = `
        Detectamos conductas de hostigamiento.
        Aunque parezcan pequeñas, pueden afectar tu bienestar emocional.
        `;

        acciones = [

            "🚫 No respondas provocaciones.",

            "🚫 Bloquea al agresor.",

            "📸 Guarda evidencia.",

            "👨‍🏫 Habla con un orientador.",

            "💙 Busca apoyo emocional."

        ];
    }

    //-------------------------------------------------

    mostrarResultadoInteligente(
        riesgo,
        color,
        tipo,
        explicacion,
        acciones
    );

}
function mostrarResultadoInteligente(riesgo, color, tipo, explicacion, acciones) {

    const mensaje = document.getElementById("mensaje");

    if (!mensaje) return;

    let accionesHTML = "";

    acciones.forEach(a => {
        accionesHTML += `<li>${a}</li>`;
    });

    mensaje.innerHTML = `
        <div style="
            margin-top:20px;
            padding:20px;
            border-radius:12px;
            background:${color};
            color:white;
        ">
            <h2>${riesgo}</h2>
            <h3>${tipo}</h3>

            <p style="margin-top:10px;">
                ${explicacion}
            </p>

            <h4>📌 Qué hacer ahora:</h4>
            <ul>
                ${accionesHTML}
            </ul>

            <hr style="margin:15px 0;">

            <h4>📞 Líneas de ayuda en México:</h4>
            <ul>
                <li><strong>911</strong> Emergencias</li>
                <li><strong>088</strong> Policía Cibernética</li>
                <li><strong>800 911 2000</strong> Línea de la Vida</li>
            </ul>

            <h4>🏫 Apoyo adicional:</h4>
            <ul>
                <li>Habla con un profesor o tutor</li>
                <li>Acude al DIF o centro de salud más cercano</li>
                <li>Reporta en la plataforma donde ocurrió el acoso</li>
            </ul>
        </div>
    `;
}
