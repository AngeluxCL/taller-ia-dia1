// app.js - Calculadora clásica con soporte de teclado
// Comentarios línea por línea para facilitar el aprendizaje.

// Seleccionamos elementos principales de la interfaz
var display = document.getElementById('display'); // pantalla principal
var historyEl = document.getElementById('history'); // pequeña historia (última operación)
var buttons = document.querySelectorAll('.buttons .btn'); // todos los botones

// Estado interno: la expresión actual que se está construyendo
var expression = '';
// Última operación realizada (historial)
var lastOperation = '';

// Función auxiliar: actualiza la pantalla con la expresión actual
function updateDisplay() {
  // Si no hay expresión mostramos 0
  if (!expression) {
    display.textContent = '0';
  } else {
    display.textContent = expression;
  }
}

// Función para añadir un carácter a la expresión (números, operadores, punto)
function appendChar(ch) {
  // Evitar caracteres no permitidos (solo dígitos, operadores y punto)
  if (!/^[0-9.+\-*/%]$/.test(ch)) return;

  // Evitar dos puntos seguidos en el mismo número: comprobamos el último número
  if (ch === '.') {
    // Encontrar la parte después del último operador
    var parts = expression.split(/[-+*/%]/);
    var last = parts[parts.length - 1];
    // Si ya existe un punto, no añadimos otro
    if (last.indexOf('.') !== -1) return;
    // Si expresión vacía y punto pulsado, añadimos '0.' para que sea válido
    if (expression === '' ) {
      expression = '0.';
      updateDisplay();
      return;
    }
  }

  // Evitar operadores dobles (p.ej. '+*' o '--')
  if (/[-+*/%]/.test(ch)) {
    if (expression === '') return; // no permitir empezar con operador salvo '-'
    // si el último carácter es operador, reemplazarlo por el nuevo
    if (/[-+*/%]$/.test(expression)) {
      expression = expression.slice(0, -1) + ch;
      updateDisplay();
      return;
    }
  }

  // Añadimos el carácter
  expression += ch;
  updateDisplay();
}

// Función para borrar el último carácter (backspace)
function backspace() {
  if (!expression) return;
  expression = expression.slice(0, -1);
  updateDisplay();
}

// Función para limpiar la expresión (clear)
function clearAll() {
  expression = '';
  updateDisplay();
}

// Función para evaluar la expresión de forma segura
function evaluateExpression() {
  if (!expression) return;

  // Reemplazamos símbolos visibles por operadores JS válidos
  var safeExpr = expression.replace(/÷/g, '/').replace(/×/g, '*');

  // Seguridad: permitimos sólo dígitos, operadores y puntos
  if (!/^[0-9.+\-*/%() ]+$/.test(safeExpr)) {
    display.textContent = 'Entrada inválida';
    return;
  }

  try {
    // Calculamos usando Function (minimizar riesgos comprobando antes)
    var result = Function('return (' + safeExpr + ')')();
    // Manejo de división por cero o resultados no finitos
    if (typeof result === 'number' && !isFinite(result)) {
      display.textContent = 'Error: división por cero';
      return;
    }

    // Guardamos la operación en historial y mostramos resultado
    lastOperation = expression + ' = ' + String(result);
    historyEl.textContent = lastOperation;
    expression = String(result);
    updateDisplay();
  } catch (e) {
    display.textContent = 'Error de cálculo';
  }
}

// Manejador de pulsación de botón (click)
function handleButtonClick(e) {
  var key = e.currentTarget.getAttribute('data-key');
  handleKey(key);
}

// Mapeo de teclas físicas a acciones
function handleKey(key) {
  // Algunos botones usan nombres de teclado (Enter, Backspace, Escape)
  if (key === 'Enter') {
    evaluateExpression();
    return;
  }
  if (key === 'Backspace') { backspace(); return; }
  if (key === 'Escape') { clearAll(); historyEl.textContent = '—'; return; }

  // Tecla '=' también calcula
  if (key === '=') { evaluateExpression(); return; }

  // Si es un operador visual (÷,×) convertiremos al operador JS
  if (key === '÷') key = '/';
  if (key === '×') key = '*';

  // Añadimos número/operador/punto
  appendChar(key);
}

// Conectar eventos click en todos los botones
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', handleButtonClick);
}

// Escuchar teclado físico: keydown para capturar Enter, Backspace, etc.
document.addEventListener('keydown', function (ev) {
  var k = ev.key;

  // Mapeamos tecla '=' a 'Enter' dependiendo del teclado
  if (k === '=') { ev.preventDefault(); handleKey('='); return; }

  // Para teclas numéricas, punto y operadores simples permitimos la acción
  if (/^[0-9]$/.test(k) || k === '.' || k === '+' || k === '-' || k === '*' || k === '/' || k === '%') {
    ev.preventDefault(); handleKey(k); return;
  }

  // Teclas especiales
  if (k === 'Enter' || k === 'Backspace' || k === 'Escape') {
    ev.preventDefault(); handleKey(k); return;
  }
});

// Inicializar pantalla al cargar
updateDisplay();

// Fin de app.js

// ------------------
// Toggle del menú (mobile)
var menuToggle = document.getElementById('menuToggle');
var navListEl = document.getElementById('navList');
if (menuToggle && navListEl) {
  menuToggle.addEventListener('click', function () {
    var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navListEl.classList.toggle('show');
  });
  // Cerrar el menú al pulsar un enlace
  var navLinks = navListEl.querySelectorAll('a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
      navListEl.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  }
}

// ------------------
// [CONTEXTO] Estoy creando un conversor de temperaturas.
// [ACCIÓN] Crea una función
// [DETALLES] que convierta de Celsius a Fahrenheit y Kelvin,
// [FORMATO] en JavaScript con comentarios explicativos.

// Convierte grados Celsius a Fahrenheit
// Fórmula: (°C × 9/5) + 32 = °F
function celsiusToFahrenheit(celsius) {
  // Convertimos la entrada a número por si viene como string
  var c = Number(celsius);
  // Si no es un número válido, devolvemos NaN
  if (Number.isNaN(c)) return NaN;
  // Aplicamos la fórmula y retornamos el resultado
  return (c * 9 / 5) + 32;
}

// Convierte grados Celsius a Kelvin
// Fórmula: °C + 273.15 = K
function celsiusToKelvin(celsius) {
  // Convertimos la entrada a número
  var c = Number(celsius);
  if (Number.isNaN(c)) return NaN;
  // Sumamos 273.15 para obtener Kelvin
  return c + 273.15;
}

// Función auxiliar que devuelve ambos valores en un objeto
// Útil para llamadas desde la consola: convertFromCelsius(25)
function convertFromCelsius(celsius) {
  var fahr = celsiusToFahrenheit(celsius);
  var kelv = celsiusToKelvin(celsius);
  // Devolvemos un objeto con las tres representaciones
  return {
    celsius: Number(celsius),
    fahrenheit: fahr,
    kelvin: kelv
  };
}

// Ejemplos que se muestran en la consola al cargar la página
console.log('Conversor de temperaturas cargado. Ejemplos:');
console.log('celsiusToFahrenheit(0) ->', celsiusToFahrenheit(0));
console.log('celsiusToKelvin(0) ->', celsiusToKelvin(0));
console.log('convertFromCelsius(25) ->', convertFromCelsius(25));

// ------------------
// Conexión del conversor en la UI
var celsiusInput = document.getElementById('celsiusInput');
var btnConvertTemp = document.getElementById('btnConvertTemp');
var outFahrenheit = document.getElementById('outFahrenheit');
var outKelvin = document.getElementById('outKelvin');

function handleConvertClick() {
  if (!celsiusInput) return;
  var raw = celsiusInput.value;
  var res = convertFromCelsius(raw);
  // Validación: si la conversión devuelve NaN, avisamos
  if (Number.isNaN(res.fahrenheit) || Number.isNaN(res.kelvin)) {
    outFahrenheit.textContent = 'Entrada inválida';
    outKelvin.textContent = 'Entrada inválida';
    return;
  }
  // Mostramos resultados con formato
  outFahrenheit.textContent = Number(res.fahrenheit).toFixed(2);
  outKelvin.textContent = Number(res.kelvin).toFixed(2);
}

if (btnConvertTemp) {
  btnConvertTemp.addEventListener('click', handleConvertClick);
}

// Soportar Enter en el input para convertir
if (celsiusInput) {
  celsiusInput.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      handleConvertClick();
    }
  });
}
