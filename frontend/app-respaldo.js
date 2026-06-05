console.log("APP JS CARGADO");

const supabaseUrl = 'https://nnewexplofyzbcahdaab.supabase.co';

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uZXdleHBsb2Z5emJjYWhkYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0NDE1NzAsImV4cCI6MjA5NjAxNzU3MH0.uFdXdg74Wi4_tc1_rpmjTK5OwD797ao5pNakCGsAEUw';

const clienteSupabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);

async function enviarTestimonio() {

  const textarea = document.getElementById('testimonio');
  const mensaje = document.getElementById('mensaje');

  const testimonio = textarea.value;

  if (!testimonio.trim()) {
    mensaje.innerText = 'Por favor escribe un testimonio.';
    return;
  }

  const { error } = await clienteSupabase
    .from('testimonios')
    .insert([
      {
        testimonio: testimonio,
        fecha: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error(error);
    mensaje.innerText = 'Error al enviar el testimonio.';
    return;
  }

  const frases = [
    'Gracias por compartir tu experiencia. Tu voz importa.',
    'No estás solo. Buscar ayuda es un acto de valentía.',
    'Hablar sobre lo que ocurre puede ser el primer paso para solucionarlo.',
    'Tu bienestar es importante y mereces apoyo.',
    'Gracias por confiar en este espacio seguro.'
  ];

  const aleatoria =
    frases[Math.floor(Math.random() * frases.length)];

  mensaje.innerText = aleatoria;

  textarea.value = '';
}

window.enviarTestimonio = enviarTestimonio;
// --- CÓDIGO PARA EL VIOLENTÓMETRO INTERACTIVO ---

function mostrarAyuda(nivel) {
  const resultado = document.getElementById('resultadoViolento');
  if (!resultado) return;

  // Limpiamos lo que haya tenido antes y aseguramos que se vea
  resultado.innerHTML = "";
  resultado.style.display = "block";

  if (nivel === 'amarillo') {
    resultado.innerHTML = `
      <h3>🟡 Herramientas para Nivel Amarillo</h3>
      <p>Aunque parezcan "bromas", estas conductas dañan la convivencia. Te recomendamos:</p>
      <ul>
        <li><strong>Establece límites:</strong> Expresa claramente que no te gustan esos comentarios o apodos.</li>
        <li><strong>No ignores la señal:</strong> Habla con un amigo, familiar o un docente de confianza sobre cómo te sientes.</li>
        <li><strong>Reporta en redes:</strong> Si las burlas son en plataformas digitales, usa las herramientas de reporte de la aplicación para bloquear la publicación.</li>
      </ul>
    `;
  } else if (nivel === 'naranja') {
    resultado.innerHTML = `
      <h3>🟠 Herramientas para Nivel Naranja</h3>
      <p>El ciberacoso constante requiere acciones firmes para proteger tu tranquilidad:</p>
      <ul>
        <li><strong>Guarda evidencias:</strong> Toma capturas de pantalla de los mensajes, perfiles falsos o publicaciones. No borres nada.</li>
        <li><strong>Bloqueo inmediato:</strong> Corta toda comunicación bloqueando las cuentas del agresor en todas tus redes.</li>
        <li><strong>Busca ayuda institucional:</strong> Reporta la situación con las autoridades de la escuela o tus padres para que intervengan.</li>
      </ul>
    `;
  } else if (nivel === 'rojo') {
    resultado.innerHTML = `
      <h3>🔴 Herramientas para Nivel Rojo</h3>
      <p>¡Atención! Estás ante una situación de riesgo alto que puede constituir un delito digital. Haz lo siguiente:</p>
      <ul>
        <li><strong>No cedas a la extorsión:</strong> Si te amenazan con publicar fotos o información, no accedas a sus peticiones ni envíes más material.</li>
        <li><strong>Resguarda pruebas:</strong> Anota enlaces a los perfiles de los agresores y exporta los chats completos.</li>
        <li><strong>Denuncia formalmente:</strong> Solicita apoyo de la Policía Cibernética (088 o al 911) o acude con un adulto a la Fiscalía para reportar el caso bajo leyes como la Ley Olimpia.</li>
      </ul>
    `;
  }
}

// Hacemos que la función esté disponible para los botones del HTML
window.mostrarAyuda = mostrarAyuda;