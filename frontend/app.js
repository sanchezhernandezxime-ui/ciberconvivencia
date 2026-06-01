async function enviarTestimonio() {

const textarea = document.getElementById('testimonio');
const mensaje = document.getElementById('mensaje');
const testimonio = textarea.value;

if (testimonio.trim() === '') {
mensaje.innerHTML = "⚠️ Por favor escribe un testimonio.";
return;
}

try {

const respuesta = await fetch('http://localhost:3000/guardar-testimonio', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({ testimonio })
});

const data = await respuesta.json();

const mensajesMotivacionales = [

"💙 Gracias por compartir tu experiencia. Tu voz puede ayudar a otras personas.",

"🌟 Hablar es un acto de valentía. Hoy diste un paso importante.",

"🤝 No estás solo. Existen personas dispuestas a ayudarte.",

"💪 Tu experiencia tiene valor y merece ser escuchada.",

"✨ Gracias por confiar en este espacio seguro."

];

const aleatorio = mensajesMotivacionales[
Math.floor(Math.random() * mensajesMotivacionales.length)
];

mensaje.innerHTML = `

<div style="background:#d4edda;padding:15px;border-radius:10px;margin-top:10px;">
<h3>✅ Testimonio enviado correctamente</h3>
<p>${aleatorio}</p>
</div>
`;

textarea.value = '';

} catch (error) {

mensaje.innerHTML = `

<div style="background:#f8d7da;padding:15px;border-radius:10px;margin-top:10px;">
❌ Error al enviar el testimonio.
</div>
`;

}

}

function mostrarAyuda(nivel){

const resultado = document.getElementById("resultadoViolento");

if(nivel === "amarillo"){

resultado.innerHTML = `

<h3>🟡 Nivel Amarillo</h3>

<p><strong>Situaciones:</strong></p>

<ul>
<li>Burlas constantes.</li>
<li>Apodos ofensivos.</li>
<li>Comentarios hirientes.</li>
<li>Memes para ridiculizar.</li>
</ul>

<p><strong>Herramientas recomendadas:</strong></p>

<ul>
<li>Aprender sobre alfabetización emocional.</li>
<li>Fortalecer la autoestima.</li>
<li>Hablar con una persona de confianza.</li>
<li>Identificar conductas dañinas.</li>
</ul>
`;
}

if(nivel === "naranja"){

resultado.innerHTML = `

<h3>🟠 Nivel Naranja</h3>

<p><strong>Situaciones:</strong></p>

<ul>
<li>Difusión de rumores.</li>
<li>Perfiles falsos.</li>
<li>Exclusión digital.</li>
<li>Mensajes ofensivos frecuentes.</li>
</ul>

<p><strong>Herramientas recomendadas:</strong></p>

<ul>
<li>Guardar capturas de pantalla.</li>
<li>Bloquear usuarios agresores.</li>
<li>Reportar contenido.</li>
<li>Solicitar apoyo escolar.</li>
</ul>
`;
}

if(nivel === "rojo"){

resultado.innerHTML = `

<h3>🔴 Nivel Rojo</h3>

<p><strong>Situaciones:</strong></p>

<ul>
<li>Sextorsión.</li>
<li>Amenazas.</li>
<li>Doxing.</li>
<li>Difusión de contenido íntimo.</li>
</ul>

<p><strong>Herramientas recomendadas:</strong></p>

<ul>
<li>Guardar toda la evidencia.</li>
<li>No responder al agresor.</li>
<li>Solicitar ayuda inmediata.</li>
<li>Realizar denuncia formal.</li>
</ul>
`;
}

}

window.enviarTestimonio = enviarTestimonio;
window.mostrarAyuda = mostrarAyuda;

