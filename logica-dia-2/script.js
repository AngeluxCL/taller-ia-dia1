//Ejercicio: Array y objetos 
// 1. array (listas)
//crea una lista de tus 3 comidas favotitas
var comidasFavoritas = ['Pizza', 'Sushi', 'Helado'];

// 2. objeto ( key y value )
var persona = {
    nombre: 'Juan',
    edad: 30,
    ciudad: 'Madrid',
    habilidades: ['programación', 'dibujo', 'cocina'],
    estatura: 1.75, 
    programador:true
};
//como accedo a las propiedad nombre de mi objeto persona
console.log(persona.nombre); // Juan
//como accedo a la propiedad habilidades de mi objeto persona
console.log('Habilidades',persona.habilidades);
//como accedo a la habilidad dibujo de mi objeto persona
console.log('Habilidad dibujo:',persona.habilidades[1]); 

//3. array de objetos
//crea una lista de 3 alumnos (objetos) con nombre y calificación 
var alumnos = [
    { nombre: 'Ana', calificacion: 85 },
    { nombre: 'Luis', calificacion: 92 },
    {nombre: 'Marta', calificacion: 78 }
];
//escribe un bucle que recorra el array de alumnos e imprima solo los que tengan calificación mayor a 80
for (var i = 0; i < alumnos.length; i++) {
    if (alumnos[i].calificacion > 80) {
        console.log('Alumno con calificación mayor a 80:', alumnos[i].nombre);
    }
}