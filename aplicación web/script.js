// ===================================
// ANALIZADOR DE TEXTO - SCRIPT PRINCIPAL
// ===================================

// Seleccionamos los elementos del DOM que necesitamos
const textarea = document.getElementById('textarea');
const charactersCount = document.getElementById('charactersCount');
const charactersNoSpacesCount = document.getElementById('charactersNoSpacesCount');
const wordsCount = document.getElementById('wordsCount');
const sentencesCount = document.getElementById('sentencesCount');
const readingTime = document.getElementById('readingTime');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const notification = document.getElementById('notification');

// ===================================
// FUNCIÓN: Contar caracteres (incluyendo espacios)
// ===================================
/**
 * Cuenta el total de caracteres en el texto incluyendo espacios
 * @param {string} text - El texto a analizar
 * @returns {number} Total de caracteres
 */
function countCharacters(text) {
    try {
        if (!text || typeof text !== 'string') {
            return 0;
        }
        return text.length;
    } catch (error) {
        console.error('Error al contar caracteres:', error);
        return 0;
    }
}

// ===================================
// FUNCIÓN: Contar caracteres sin espacios
// ===================================
/**
 * Cuenta el total de caracteres excluyendo espacios en blanco
 * @param {string} text - El texto a analizar
 * @returns {number} Total de caracteres sin espacios
 */
function countCharactersNoSpaces(text) {
    try {
        if (!text || typeof text !== 'string') {
            return 0;
        }
        // Reemplaza todos los espacios en blanco (espacios, tabulaciones, saltos de línea)
        return text.replace(/\s/g, '').length;
    } catch (error) {
        console.error('Error al contar caracteres sin espacios:', error);
        return 0;
    }
}

// ===================================
// FUNCIÓN: Contar palabras
// ===================================
/**
 * Cuenta el número de palabras en el texto
 * Considera espacios múltiples y caracteres especiales
 * @param {string} text - El texto a analizar
 * @returns {number} Total de palabras
 */
function countWords(text) {
    try {
        if (!text || typeof text !== 'string') {
            return 0;
        }
        // Trim elimina espacios al inicio y final
        const trimmedText = text.trim();
        
        // Si el texto está vacío después del trim, retornamos 0
        if (trimmedText.length === 0) {
            return 0;
        }
        
        // Divide por espacios en blanco (uno o más) y filtra strings vacíos
        const words = trimmedText.split(/\s+/).filter(word => word.length > 0);
        return words.length;
    } catch (error) {
        console.error('Error al contar palabras:', error);
        return 0;
    }
}

// ===================================
// FUNCIÓN: Contar oraciones
// ===================================
/**
 * Cuenta el número de oraciones basado en puntuación
 * Considera puntos (.), signos de interrogación (?) y exclamación (!)
 * @param {string} text - El texto a analizar
 * @returns {number} Total de oraciones
 */
function countSentences(text) {
    try {
        if (!text || typeof text !== 'string') {
            return 0;
        }
        
        // Busca puntos, signos de interrogación y exclamación
        // El patrón \S+[.!?] busca cualquier carácter no-espacio seguido de puntuación
        const sentenceRegex = /[.!?]+/g;
        const matches = text.match(sentenceRegex);
        
        // Si no hay coincidencias, retorna 0
        return matches ? matches.length : 0;
    } catch (error) {
        console.error('Error al contar oraciones:', error);
        return 0;
    }
}

// ===================================
// FUNCIÓN: Calcular tiempo de lectura
// ===================================
/**
 * Calcula el tiempo estimado de lectura basado en 200 palabras por minuto
 * Esta es la velocidad de lectura promedio según estudios
 * @param {number} wordCount - Número total de palabras
 * @returns {number} Tiempo de lectura en minutos (redondeado)
 */
function calculateReadingTime(wordCount) {
    try {
        const wordsPerMinute = 200;
        
        // Calculamos el tiempo dividiendo las palabras entre la velocidad
        const readingTimeInMinutes = wordCount / wordsPerMinute;
        
        // Si el resultado es menor que 1, redondeamos a 0 o 1 mínimo
        return Math.ceil(readingTimeInMinutes);
    } catch (error) {
        console.error('Error al calcular tiempo de lectura:', error);
        return 0;
    }
}

// ===================================
// FUNCIÓN: Actualizar estadísticas en tiempo real
// ===================================
/**
 * Actualiza todos los contadores en tiempo real
 * Se ejecuta cada vez que el usuario escribe o modifica el texto
 */
function updateStatistics() {
    try {
        // Obtenemos el texto actual del textarea
        const text = textarea.value;
        
        // Calculamos cada una de las métricas
        const characters = countCharacters(text);
        const charactersNoSpaces = countCharactersNoSpaces(text);
        const words = countWords(text);
        const sentences = countSentences(text);
        const readingTimeMinutes = calculateReadingTime(words);
        
        // Actualizamos el contenido de cada elemento en el DOM
        charactersCount.textContent = characters;
        charactersNoSpacesCount.textContent = charactersNoSpaces;
        wordsCount.textContent = words;
        sentencesCount.textContent = sentences;
        readingTime.textContent = readingTimeMinutes;
        
    } catch (error) {
        console.error('Error al actualizar estadísticas:', error);
        showNotification('Error al actualizar estadísticas', 'error');
    }
}

// ===================================
// FUNCIÓN: Limpiar todo
// ===================================
/**
 * Limpia el textarea y reinicia todas las estadísticas a 0
 * Se ejecuta cuando el usuario hace clic en el botón "Limpiar"
 */
function clearContent() {
    try {
        // Limpiamos el textarea
        textarea.value = '';
        
        // Reiniciamos todas las estadísticas a 0
        charactersCount.textContent = '0';
        charactersNoSpacesCount.textContent = '0';
        wordsCount.textContent = '0';
        sentencesCount.textContent = '0';
        readingTime.textContent = '0';
        
        // Mostramos una notificación de confirmación
        showNotification('✓ Contenido limpiado', 'success');
        
        // Devolvemos el foco al textarea
        textarea.focus();
    } catch (error) {
        console.error('Error al limpiar contenido:', error);
        showNotification('Error al limpiar el contenido', 'error');
    }
}

// ===================================
// FUNCIÓN: Copiar estadísticas
// ===================================
/**
 * Copia las estadísticas actuales al portapapeles en un formato legible
 * Se ejecuta cuando el usuario hace clic en el botón "Copiar estadísticas"
 */
function copyStatistics() {
    try {
        // Validamos que haya contenido para copiar
        if (textarea.value.trim() === '') {
            showNotification('⚠️ No hay texto para analizar', 'error');
            return;
        }
        
        // Compilamos las estadísticas en un formato legible
        const statistics = `
📊 ESTADÍSTICAS DEL TEXTO
═════════════════════════════════════
📝 Caracteres (con espacios): ${charactersCount.textContent}
🔤 Caracteres (sin espacios): ${charactersNoSpacesCount.textContent}
💬 Palabras: ${wordsCount.textContent}
✍️ Oraciones: ${sentencesCount.textContent}
⏱️ Tiempo de lectura: ${readingTime.textContent} min (200 pal/min)
═════════════════════════════════════
        `.trim();
        
        // Copiamos al portapapeles
        navigator.clipboard.writeText(statistics)
            .then(() => {
                showNotification('✓ Estadísticas copiadas al portapapeles', 'success');
            })
            .catch((error) => {
                console.error('Error al copiar al portapapeles:', error);
                // Si falla el portapapeles moderno, intentamos con el método antiguo
                fallbackCopyToClipboard(statistics);
            });
    } catch (error) {
        console.error('Error al copiar estadísticas:', error);
        showNotification('Error al copiar las estadísticas', 'error');
    }
}

// ===================================
// FUNCIÓN: Copiar al portapapeles (método alternativo)
// ===================================
/**
 * Método alternativo para copiar al portapapeles para navegadores antiguos
 * @param {string} text - El texto a copiar
 */
function fallbackCopyToClipboard(text) {
    try {
        // Creamos un elemento textarea temporal
        const textarea = document.createElement('textarea');
        textarea.value = text;
        
        // Lo añadimos al documento
        document.body.appendChild(textarea);
        
        // Seleccionamos el texto
        textarea.select();
        textarea.setSelectionRange(0, 99999); // Para dispositivos móviles
        
        // Copiamos con el comando antiguo
        document.execCommand('copy');
        
        // Removemos el elemento temporal
        document.body.removeChild(textarea);
        
        showNotification('✓ Estadísticas copiadas al portapapeles', 'success');
    } catch (error) {
        console.error('Error en método alternativo:', error);
        showNotification('Error al copiar las estadísticas', 'error');
    }
}

// ===================================
// FUNCIÓN: Mostrar notificaciones
// ===================================
/**
 * Muestra una notificación temporal en la pantalla
 * @param {string} message - El mensaje a mostrar
 * @param {string} type - El tipo de notificación ('success' o 'error')
 */
function showNotification(message, type = 'success') {
    try {
        // Limpiamos las clases previas
        notification.className = 'notification';
        
        // Establecemos el mensaje
        notification.textContent = message;
        
        // Añadimos la clase del tipo
        notification.classList.add(type, 'show');
        
        // Configuramos un timeout para ocultar la notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } catch (error) {
        console.error('Error al mostrar notificación:', error);
    }
}

// ===================================
// EVENT LISTENERS - MANEJADORES DE EVENTOS
// ===================================

/**
 * Evento: Escucha cambios en el textarea
 * Actualiza las estadísticas en tiempo real mientras el usuario escribe
 */
textarea.addEventListener('input', updateStatistics);

/**
 * Evento: Botón Limpiar
 * Limpia el contenido y reinicia las estadísticas
 */
clearBtn.addEventListener('click', clearContent);

/**
 * Evento: Botón Copiar estadísticas
 * Copia las estadísticas actuales al portapapeles
 */
copyBtn.addEventListener('click', copyStatistics);

// ===================================
// INICIALIZACIÓN
// ===================================
/**
 * Inicializamos la aplicación cuando el DOM está completamente cargado
 * Enfocamos el textarea para mejorar la experiencia del usuario
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Enfocamos el textarea para que el usuario pueda empezar a escribir inmediatamente
        textarea.focus();
        
        // Inicializamos las estadísticas (aunque estarán en 0)
        updateStatistics();
        
        console.log('✓ Aplicación de análisis de texto cargada correctamente');
    } catch (error) {
        console.error('Error durante la inicialización:', error);
        showNotification('Error al inicializar la aplicación', 'error');
    }
});

// ===================================
// MANEJO DE ERRORES GLOBAL
// ===================================
/**
 * Captura errores no manejados en la aplicación
 */
window.addEventListener('error', (event) => {
    console.error('Error global detectado:', event.error);
    showNotification('Ocurrió un error inesperado', 'error');
});
