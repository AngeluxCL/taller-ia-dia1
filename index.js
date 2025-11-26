// Función sencilla para sumar dos números
// Este archivo está pensado para principiantes: usamos sintaxis clásica (sin ES6)

// Definimos una función llamada 'suma' que recibe dos parámetros: 'a' y 'b'
// Cada línea incluye un comentario para explicar qué hace.
function suma(a, b) {
	// Convierte el primer valor a número por si viene como texto
	var numA = Number(a);
	// Convierte el segundo valor a número por si viene como texto
	var numB = Number(b);
	// Suma los dos números y guarda el resultado en la variable 'resultado'
	var resultado = numA + numB;
	// Devuelve (retorna) el valor almacenado en 'resultado' al que llamó a la función
	return resultado;
}

// EJEMPLO DE USO:
// Aquí creamos dos variables con números y llamamos a la función 'suma'
var x = 5; // primer número
var y = 8; // segundo número
// Llamamos a la función 'suma' pasando 'x' y 'y', y guardamos el resultado
var resultadoFinal = suma(x, y);
// Mostramos en la consola el resultado para que puedas verlo al ejecutar el archivo
console.log('La suma de', x, 'y', y, 'es:', resultadoFinal);
