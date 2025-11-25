//"¿Qué es un commit y por qué es importante?

//Un commit es una instantánea de los cambios realizados en el código fuente de un proyecto en un sistema de control de versiones, como Git. Cada commit registra el estado del proyecto en un momento específico, incluyendo qué archivos fueron modificados, añadidos o eliminados, junto con un mensaje descriptivo que explica el propósito de esos cambios.
// Los commits son importantes porque permiten a los  
// desarrolladores rastrear el historial de cambios en un proyecto, facilitando la colaboración entre múltiples personas. Además, los commits permiten revertir a versiones anteriores del código si se introduce un error o si se necesita recuperar una funcionalidad previa. En resumen, los commits son esenciales para mantener la integridad y la organización del desarrollo de software."

//Cuál es la diferencia entre git add y git commit

// git add y git commit son dos comandos fundamentales en Git que cumplen funciones diferentes en el proceso de gestión de cambios en un proyecto.
// - git add: Este comando se utiliza para agregar cambios específicos al área de preparación (staging area). Cuando ejecutas git add, estás indicando a Git que deseas incluir ciertos archivos o modificaciones en el próximo commit. Puedes agregar archivos individuales, múltiples archivos o incluso todos los cambios realizados en el proyecto utilizando git add . (punto).
// - git commit: Este comando se utiliza para crear un nuevo commit con los cambios que han sido agregados al área de preparación. Al ejecutar git commit, Git toma una instantánea de los cambios preparados y los guarda en el historial del proyecto junto con un mensaje descriptivo que explica el propósito de esos cambios.
// En resumen, git add prepara los cambios para ser incluidos en el próximo commit, mientras que git commit crea efectivamente el commit con esos cambios preparados."

//Explícame qué hace el comando git push.
// El comando git push se utiliza para subir los commits locales de un repositorio Git a un repositorio remoto. Cuando trabajas en un proyecto, puedes hacer cambios y crear commits en tu copia local del repositorio. Sin embargo, para compartir esos cambios con otros colaboradores o para mantener una copia de seguridad en un servidor remoto (como GitHub, GitLab o Bitbucket), necesitas usar git push.
// Al ejecutar git push, Git envía los commits que has realizado en tu repositorio local al repositorio remoto especificado. Esto actualiza el historial del repositorio remoto con los nuevos commits, permitiendo que otros colaboradores vean y accedan a los cambios que has realizado.
// En resumen, git push es el comando que permite sincronizar los cambios locales con un repositorio remoto, facilitando la colaboración y el intercambio de código entre desarrolladores."
