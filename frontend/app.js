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