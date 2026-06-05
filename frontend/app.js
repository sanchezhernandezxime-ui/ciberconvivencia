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