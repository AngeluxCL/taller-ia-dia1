// ============================================
// GENERADOR DE COLORES ALEATORIOS
// ============================================

// Referencias a los elementos del DOM
const colorDisplay = document.getElementById('colorDisplay');
const colorCode = document.getElementById('colorCode');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

// Variable para almacenar el color actual
let currentColor = '#FFFFFF';

/**
 * Genera un color hexadecimal aleatorio
 * @returns {string} Código de color en formato hexadecimal (#RRGGBB)
 */
function generateRandomColor() {
    // Generar tres números aleatorios entre 0 y 255
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    // Convertir a hexadecimal y rellenar con ceros si es necesario
    const hex = '#' + 
                r.toString(16).padStart(2, '0').toUpperCase() + 
                g.toString(16).padStart(2, '0').toUpperCase() + 
                b.toString(16).padStart(2, '0').toUpperCase();
    
    return hex;
}

/**
 * Actualiza el color mostrado en la página
 * Cambia el fondo del div y actualiza el código hexadecimal
 */
function updateColor() {
    // Generar nuevo color
    currentColor = generateRandomColor();
    
    // Actualizar el fondo del div con transición suave
    colorDisplay.style.backgroundColor = currentColor;
    
    // Actualizar el texto del código
    colorCode.textContent = currentColor;
}

/**
 * Copia el código del color actual al portapapeles
 * Muestra confirmación visual mediante animación
 */
function copyToClipboard() {
    // Copiar el color al portapapeles usando la API moderna
    navigator.clipboard.writeText(currentColor).then(() => {
        // Cambiar temporalmente el estilo del botón para feedback visual
        copyBtn.classList.add('copy-success');
        
        // Cambiar el texto del botón temporalmente
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '¡Copiado!';
        
        // Restaurar después de 2 segundos
        setTimeout(() => {
            copyBtn.classList.remove('copy-success');
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        // Fallback si la API de clipboard no funciona
        alert('No se pudo copiar. Por favor, intenta de nuevo.');
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

// Evento para generar color cuando se hace clic en el botón
generateBtn.addEventListener('click', updateColor);

// Evento para copiar el código cuando se hace clic en el botón de copiar
copyBtn.addEventListener('click', copyToClipboard);

// Evento para generar un color cuando se presiona la tecla Enter
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        updateColor();
    }
});

// ============================================
// INICIALIZACIÓN
// ============================================

// Generar un color inicial al cargar la página
updateColor();
