# 📝 Gestor de Tareas Interactiva (Proyecto Frontend)

¡Hola! Este es mi proyecto de **Gestor de Tareas**, desarrollado como estudiante de desarrollo frontend. Es una aplicación web interactiva que permite crear, administrar, cambiar de estado y eliminar tareas de forma eficiente utilizando JavaScript moderno (ES6+), Programación Orientada a Objetos (POO), manipulación del DOM, eventos, temporizadores asíncronos y consumo de APIs externas.

---

## 🗂️ Estructura del Proyecto

Para mantener el código ordenado, modular y escalable, el proyecto está dividido estrictamente en tres archivos independientes (sin estilos embebidos en el HTML):

* **`index.html`**: Contiene la estructura base (el "esqueleto") de la aplicación: el título, la caja de notificaciones, el formulario para ingresar tareas y la tabla donde se muestran los datos.
* **`styles.css`**: Define todo el diseño visual (colores, alineaciones, tabla y estilos de los botones de acción).
* **`Script.js`**: Contiene la lógica del programa, las clases, los eventos del DOM, la asincronía y la comunicación con la API.
* **`Tarea.js`**: Archivo de módulo donde se define la clase `Tarea` y se exporta para su uso en `Script.js`.

---

## 🚀 Requerimientos e Implementaciones

### 1. Orientación a Objetos (POO)
* **Clase `Tarea`**: Representa cada tarea individual con las propiedades `id`, `descripcion`, `estado` y `fechaCreacion`. Cuenta con un método para alternar su estado entre *Pendiente* y *Completada*.
* **Clase `GestorTareas`**: Administra la lista (arreglo) de tareas. Permite agregar nuevas tareas, buscarlas y eliminarlas por su ID.

### 2. JavaScript ES6+
* **`let` y `const`**: Manejo adecuado de variables según cambien o no de valor.
* **Template Literals**: Creación dinámica de filas en la tabla HTML mediante comillas invertidas (`` ` ````).
* **Arrow Functions**: Métodos y funciones escritas con la sintaxis `() => {}`.
* **Destructuring & Spread Operator**: Desestructuración de propiedades (`const { id, descripcion, ... } = tarea`) y clonación/actualización de arreglos con `[...this.tareas, nuevaTarea]`.
* **Import / Export**: Separación de la clase `Tarea` en un módulo propio utilizando `export` e importándola en `Script.js` mediante `import`.

### 3. Eventos y Manipulación del DOM
* Captura de eventos `submit` en el formulario para agregar tareas.
* Delegación de eventos `click` en la tabla para cambiar estado o eliminar filas.
* Eventos `mouseover` y `mouseout` en las filas para mejorar la interactividad visual.
* Evento `keyup` en el campo de texto (presionar `Escape` borra el contenido).

### 4. JavaScript Asíncrono
* **`setTimeout`**: Simula un pequeño retardo al agregar una tarea y oculta la notificación en pantalla tras 2 segundos.
* **`setInterval`**: Un contador regresivo que muestra en un banner la frecuencia de sincronización con el servidor.

### 5. Consumo de APIs
* Uso de **`fetch()`** con sintaxis **`async/await`** y manejo de errores con **`try/catch`**.
* Carga inicial de datos desde la API pública `JSONPlaceholder` (`[https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos)`).
* Envío de peticiones de tipo `POST` para simular el guardado de nuevas tareas en el servidor.

---

## 💡 Reflexión y Proceso de Aprendizaje

Durante el desarrollo de esta aplicación me enfrenté a varios desafíos técnicos, especialmente al organizar la lógica de JavaScript. Integrar conceptos avanzados como módulos ES6 (`import`/`export`), asincronía con `fetch` y la orientación a objetos al mismo tiempo generó algunos conflictos en el código (como errores de sintaxis al duplicar clases, problemas de carga al iniciar la API y bloqueos al abrir archivos de forma local).

Para resolver estos inconvenientes y continuar avanzando, **utilicé Inteligencia Artificial (IA) como herramienta de apoyo**. La IA me ayudó a identificar los errores específicos en la estructura del código, corregir los conflictos entre variables/importaciones y comprender la razón detrás de cada fallo. Gracias a este proceso de corrección guiada no solo logré solucionar los problemas y cumplir con todo lo solicitado en el proyecto, sino que también aprendí a depurar código de manera más eficiente y a entender mejor cómo interactúan los módulos en JavaScript.