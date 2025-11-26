// ============================================================
// RELOJ DIGITAL INTERACTIVO CON ALARMA
// Sistema completo de reloj con funcionalidad de alarma
// ============================================================

// Variables globales para controlar el estado de la alarma
let alarmTime = null;           // Hora de alarma configurada (HH:MM)
let isAlarmActive = false;      // Indica si hay una alarma activa
let is24HourFormat = true;      // Formato de hora: true = 24h, false = 12h
let alarmSoundPlayed = false;   // Previene múltiples reproduciones del sonido

// Obtener referencias a elementos del DOM
const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');
const greetingDisplay = document.getElementById('greeting');
const alarmTimeInput = document.getElementById('alarmTime');
const setAlarmBtn = document.getElementById('setAlarmBtn');
const cancelAlarmBtn = document.getElementById('cancelAlarmBtn');
const alarmStatusDiv = document.getElementById('alarmStatus');
const alarmMessageSpan = document.getElementById('alarmMessage');
const statusDot = document.querySelector('.status-dot');
const toggleFormatBtn = document.getElementById('toggleFormat');
const notificationDiv = document.getElementById('notification');
const dismissBtn = document.getElementById('dismissBtn');
const container = document.querySelector('.container');

// Nombres de meses en español
const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

// Nombres de días en español
const dayNames = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

// ============================================================
// FUNCIÓN: Formatear número con cero a la izquierda
// ============================================================
/**
 * Formatea un número añadiendo un cero a la izquierda si es menor a 10
 * @param {number} num - Número a formatear
 * @returns {string} Número formateado con dos dígitos
 */
function padZero(num) {
    return num < 10 ? '0' + num : num;
}

// ============================================================
// FUNCIÓN: Obtener hora formateada
// ============================================================
/**
 * Obtiene la hora actual y la formatea según el formato seleccionado
 * @returns {object} Objeto con horas, minutos, segundos y formato AM/PM
 */
function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // Variable para almacenar si es AM o PM (para formato 12h)
    let ampm = 'AM';
    
    // Si estamos en formato 12h, convertir horas
    if (!is24HourFormat) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 debe ser 12
    }
    
    return {
        hours: padZero(hours),
        minutes: padZero(minutes),
        seconds: padZero(seconds),
        ampm: ampm,
        rawHours: now.getHours(),
        rawMinutes: now.getMinutes()
    };
}

// ============================================================
// FUNCIÓN: Determinar saludo según la hora del día
// ============================================================
/**
 * Devuelve un saludo personalizado basado en la hora actual
 * @param {number} hours - Hora actual (formato 24h)
 * @returns {string} Saludo apropiado
 */
function getGreeting(hours) {
    if (hours >= 5 && hours < 12) {
        return 'Buenos días ☀️';
    } else if (hours >= 12 && hours < 18) {
        return 'Buenas tardes 🌤️';
    } else if (hours >= 18 && hours < 21) {
        return 'Buenas noches 🌆';
    } else {
        return 'Buenas noches 🌙';
    }
}

// ============================================================
// FUNCIÓN: Obtener fecha formateada en español
// ============================================================
/**
 * Formatea la fecha actual en español
 * @returns {string} Fecha formateada (Ej: Lunes, 26 de Noviembre de 2024)
 */
function getFormattedDate() {
    const now = new Date();
    const day = dayNames[now.getDay()];
    const date = padZero(now.getDate());
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    
    return `${day}, ${date} de ${month} de ${year}`;
}

// ============================================================
// FUNCIÓN: Actualizar el reloj
// ============================================================
/**
 * Actualiza la pantalla del reloj y la fecha cada segundo
 * Se ejecuta automáticamente mediante setInterval
 */
function updateClock() {
    // Obtener hora formateada
    const time = getFormattedTime();
    
    // Mostrar hora en el display
    if (is24HourFormat) {
        timeDisplay.textContent = `${time.hours}:${time.minutes}:${time.seconds}`;
    } else {
        timeDisplay.textContent = `${time.hours}:${time.minutes}:${time.seconds} ${time.ampm}`;
    }
    
    // Actualizar fecha
    dateDisplay.textContent = getFormattedDate();
    
    // Actualizar saludo
    greetingDisplay.textContent = getGreeting(time.rawHours);
    
    // Verificar si la alarma debe sonar
    if (isAlarmActive && alarmTime) {
        checkAlarm(time.rawHours, time.rawMinutes);
    }
}

// ============================================================
// FUNCIÓN: Verificar si la alarma debe sonar
// ============================================================
/**
 * Compara la hora actual con la hora de alarma configurada
 * @param {number} hours - Horas actuales
 * @param {number} minutes - Minutos actuales
 */
function checkAlarm(hours, minutes) {
    const currentTime = `${padZero(hours)}:${padZero(minutes)}`;
    
    // Si la hora actual coincide con la hora de alarma
    if (currentTime === alarmTime && !alarmSoundPlayed) {
        triggerAlarm();
    }
}

// ============================================================
// FUNCIÓN: Disparar la alarma
// ============================================================
/**
 * Se ejecuta cuando la alarma debe sonar
 * Muestra notificación, reproduce sonido y anima el reloj
 */
function triggerAlarm() {
    // Marcar que el sonido ya se reprodujo (para evitar múltiples reproducción)
    alarmSoundPlayed = true;
    
    // Agregar clase de animación parpadeo al reloj
    container.classList.add('alarm-active');
    
    // Mostrar notificación
    notificationDiv.style.display = 'block';
    
    // Reproducir sonido de alarma (simulado con alert y sonido del navegador)
    playAlarmSound();
    
    // Desactivar alarma automáticamente después de 1 minuto
    setTimeout(() => {
        disableAlarm();
    }, 60000);
}

// ============================================================
// FUNCIÓN: Reproducir sonido de alarma
// ============================================================
/**
 * Reproduce un sonido de alarma usando la API de Web Audio
 * Si falla, usa un alert como simulación
 */
function playAlarmSound() {
    try {
        // Crear contexto de audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Crear oscilador para generar un tono
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Configurar sonido (tono de 800Hz)
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        // Configurar volumen
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        
        // Reproducir durante 2 segundos
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 2);
        
        // Repetir 3 veces
        for (let i = 1; i < 3; i++) {
            const osc = audioContext.createOscillator();
            osc.connect(gainNode);
            osc.frequency.value = 800;
            osc.type = 'sine';
            osc.start(audioContext.currentTime + i * 2.5);
            osc.stop(audioContext.currentTime + i * 2.5 + 2);
        }
        
    } catch (error) {
        // Si falla, usar alert como simulación
        console.log('Sonido de alarma reproducido (simulado)');
    }
}

// ============================================================
// FUNCIÓN: Establecer alarma
// ============================================================
/**
 * Valida y establece la hora de alarma configurada
 * Verifica que la hora sea válida y futura
 */
function setAlarm() {
    const inputValue = alarmTimeInput.value;
    
    // Validar que se haya ingresado una hora
    if (!inputValue) {
        alert('Por favor, selecciona una hora para la alarma');
        return;
    }
    
    // Extraer horas y minutos
    const [inputHours, inputMinutes] = inputValue.split(':');
    
    // Obtener hora actual
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Validar que la hora de alarma sea futura
    if (parseInt(inputHours) < currentHours || 
        (parseInt(inputHours) === currentHours && parseInt(inputMinutes) <= currentMinutes)) {
        alert('La hora de alarma debe ser futura. Por favor, selecciona una hora posterior');
        return;
    }
    
    // Guardar la hora de alarma
    alarmTime = inputValue;
    isAlarmActive = true;
    alarmSoundPlayed = false;
    
    // Actualizar interfaz
    updateAlarmUI();
    
    console.log(`✓ Alarma establecida para las ${alarmTime}`);
}

// ============================================================
// FUNCIÓN: Actualizar interfaz de alarma
// ============================================================
/**
 * Actualiza la interfaz para mostrar el estado de la alarma
 */
function updateAlarmUI() {
    if (isAlarmActive && alarmTime) {
        // Mostrar que hay alarma activa
        statusDot.classList.add('active');
        alarmMessageSpan.textContent = `⏰ Alarma activa - Sonará a las ${alarmTime}`;
        
        // Mostrar/ocultar botones
        setAlarmBtn.style.display = 'none';
        alarmTimeInput.style.display = 'none';
        document.querySelector('.alarm-input-group label').style.display = 'none';
        cancelAlarmBtn.style.display = 'inline-block';
    } else {
        // No hay alarma activa
        statusDot.classList.remove('active');
        alarmMessageSpan.textContent = 'Sin alarma configurada';
        
        // Mostrar/ocultar botones
        setAlarmBtn.style.display = 'inline-block';
        alarmTimeInput.style.display = 'inline-block';
        document.querySelector('.alarm-input-group label').style.display = 'flex';
        cancelAlarmBtn.style.display = 'none';
    }
}

// ============================================================
// FUNCIÓN: Desactivar alarma
// ============================================================
/**
 * Desactiva la alarma actual y limpia la interfaz
 */
function disableAlarm() {
    isAlarmActive = false;
    alarmTime = null;
    alarmSoundPlayed = false;
    
    // Remover animación del reloj
    container.classList.remove('alarm-active');
    
    // Ocultar notificación
    notificationDiv.style.display = 'none';
    
    // Actualizar interfaz
    updateAlarmUI();
    
    // Limpiar input
    alarmTimeInput.value = '';
    
    console.log('✓ Alarma desactivada');
}

// ============================================================
// FUNCIÓN: Cancelar alarma
// ============================================================
/**
 * Cancela la alarma cuando el usuario hace clic en "Cancelar Alarma"
 */
function cancelAlarm() {
    disableAlarm();
}

// ============================================================
// FUNCIÓN: Alternar formato de hora
// ============================================================
/**
 * Cambia entre formato 24h y 12h
 */
function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    toggleFormatBtn.textContent = is24HourFormat ? '24h' : '12h';
    updateClock();
}

// ============================================================
// FUNCIÓN: Descartar notificación de alarma
// ============================================================
/**
 * Cierra la notificación cuando el usuario hace clic en "Aceptar"
 */
function dismissNotification() {
    disableAlarm();
}

// ============================================================
// EVENT LISTENERS - Configurar eventos
// ============================================================

// Botón "Establecer Alarma"
setAlarmBtn.addEventListener('click', setAlarm);

// Botón "Cancelar Alarma"
cancelAlarmBtn.addEventListener('click', cancelAlarm);

// Botón "Descartar" en la notificación
dismissBtn.addEventListener('click', dismissNotification);

// Botón para alternar formato de hora
toggleFormatBtn.addEventListener('click', toggleTimeFormat);

// Permitir establecer alarma presionando Enter en el input
alarmTimeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setAlarm();
    }
});

// ============================================================
// INICIALIZACIÓN
// ============================================================

// Actualizar reloj inmediatamente
updateClock();

// Actualizar reloj cada segundo (1000 milisegundos)
setInterval(updateClock, 1000);

// Actualizar interfaz de alarma
updateAlarmUI();

console.log('✓ Reloj Digital Interactivo iniciado correctamente');
console.log('Funcionalidades disponibles:');
console.log('- Reloj en tiempo real (24h/12h)');
console.log('- Alarma configurada');
console.log('- Saludo personalizado según hora del día');
console.log('- Fecha en español');
