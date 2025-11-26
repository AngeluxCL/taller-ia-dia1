// 🖱️ Ejercicio: DOM (Document Object Model)

// 1. Seleccionar elementos
// Pídele a la IA: "¿Cómo selecciono un elemento por su ID en JavaScript?"
// Selecciona el botón 'btnCambiarColor' y la 'miCaja'.

// Selección por ID: usamos `document.getElementById('<id>')`.
// Esto devuelve el elemento del DOM que tiene ese atributo `id`, o `null` si no existe.
// Usamos `var` (sintaxis clásica) para mantenerlo simple.
var btnCambiarColor = document.getElementById('btnCambiarColor');
var btnCambiarTexto = document.getElementById('btnCambiarTexto');
var miCaja = document.getElementById('miCaja');

// Comprobación (útil al depurar): imprimimos los elementos en la consola del navegador
console.log('btnCambiarColor ->', btnCambiarColor);
console.log('btnCambiarTexto ->', btnCambiarTexto);
console.log('miCaja ->', miCaja);

// Explicación corta:
// - `getElementById` busca en todo el documento el elemento con ese id.
// - Si el elemento existe, puedes leer/modificar sus propiedades, estilos y contenido.
// - Si devuelve `null`, significa que no encontró ningún elemento con ese id.

// 2. Escuchar eventos (Clicks)
// Pídele a la IA: "¿Cómo hago que pase algo cuando hago click en un botón?"

// Ejemplo práctico: escuchar clicks y modificar la caja
// Usamos `addEventListener` con una función clásica para manejar el evento 'click'.
if (btnCambiarColor && miCaja) {
	btnCambiarColor.addEventListener('click', function () {
		// Cambiamos el color de fondo de la caja a rojo
		miCaja.style.backgroundColor = 'red';
	});
}

// Reto: cambiar el texto de la caja cuando se pulsa el botón 'Cambiar Texto'
if (btnCambiarTexto && miCaja) {
	btnCambiarTexto.addEventListener('click', function () {
		// Cambiamos el contenido de la caja
		miCaja.textContent = '¡Hola DOM!';
	});
}


// 3. Modificar elementos
// Cuando den click en 'Cambiar Color', cambia el color de fondo de la caja a rojo.
// Pídele a la IA: "¿Cómo cambio el estilo background-color de un elemento con JS?"


// Reto:
// Haz que el botón 'Cambiar Texto' cambie lo que dice dentro de la caja por "¡Hola DOM!".

//[CONTEXTO] Estoy creando una Calculadora Básica
// Crea funciones sumar(), restar(), etc. y úsalas en la consola.
// en JavaScript con comentarios explicativos.

// -----------------------------
// Calculadora básica (para consola)
// Definimos funciones globales que puedes llamar desde la consola del navegador
// o desde otros scripts. Usamos sintaxis clásica para que sea fácil de entender.

// Función sumar: devuelve la suma de a y b
