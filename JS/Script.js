// ==========================================
// 1. ORIENTACIÓN A OBJETOS (POO) & ES6 IMPORTS
// ==========================================
import { Tarea } from './Tarea.js';

class GestorTareas {
  constructor() {
    this.tareas = [];
    this.contadorId = 1;
  }

  agregarTarea = (descripcion) => {
    const nuevaTarea = new Tarea(this.contadorId++, descripcion);
    this.tareas = [...this.tareas, nuevaTarea];
    return nuevaTarea;
  };

  eliminarTarea = (id) => {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
  };

  obtenerTarea = (id) => {
    return this.tareas.find((tarea) => tarea.id === id);
  };
}

// Instancia principal del gestor
const gestor = new GestorTareas();

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const notification = document.getElementById('notification');
const countdownBanner = document.getElementById('countdown-banner');

// ==========================================
// 3. MANIPULACIÓN DEL DOM Y EVENTOS
// ==========================================

// Renderizado dinámico de la tabla
const renderizarTareas = () => {
  taskList.innerHTML = '';

  gestor.tareas.forEach((tarea) => {
    const { id, descripcion, estado, fechaCreacion } = tarea;

    const tr = document.createElement('tr');
    const estadoClass = estado === 'Pendiente' ? 'estado-pendiente' : 'estado-completada';

    tr.innerHTML = `
      <td>${id}</td>
      <td>${descripcion}</td>
      <td class="${estadoClass}">${estado}</td>
      <td>${fechaCreacion}</td>
      <td>
        <button class="btn-action btn-toggle" data-id="${id}">Cambiar Estado</button>
        <button class="btn-action btn-delete" data-id="${id}">Eliminar</button>
      </td>
    `;

    // Eventos mouseover y mouseout
    tr.addEventListener('mouseover', () => tr.classList.add('row-hover'));
    tr.addEventListener('mouseout', () => tr.classList.remove('row-hover'));

    taskList.appendChild(tr);
  });
};

// Evento Submit: Agregar tarea con simulación de retardo (setTimeout)
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const descripcion = taskInput.value.trim();

  if (!descripcion) return;

  setTimeout(() => {
    const nuevaTarea = gestor.agregarTarea(descripcion);
    renderizarTareas();
    guardarTareaEnAPI(nuevaTarea);
    mostrarNotificacion(`¡Tarea "${descripcion}" agregada con éxito!`);
    taskInput.value = '';
  }, 300);
});

// Evento Click Delegado (Cambiar Estado / Eliminar)
taskList.addEventListener('click', (e) => {
  const target = e.target;
  const id = Number(target.getAttribute('data-id'));

  if (!id) return;

  if (target.classList.contains('btn-toggle')) {
    const tarea = gestor.obtenerTarea(id);
    if (tarea) {
      tarea.cambiarEstado();
      renderizarTareas();
    }
  }

  if (target.classList.contains('btn-delete')) {
    gestor.eliminarTarea(id);
    renderizarTareas();
    mostrarNotificacion('Tarea eliminada correctamente.');
  }
});

// Evento Keyup en el Input
taskInput.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    taskInput.value = '';
  }
});

// ==========================================
// 4. FUNCIONES DE TIEMPO (setTimeout / setInterval)
// ==========================================

const mostrarNotificacion = (mensaje) => {
  notification.textContent = mensaje;
  notification.classList.remove('hidden');

  setTimeout(() => {
    notification.classList.add('hidden');
  }, 2000);
};

const iniciarContadorRegresivo = (segundos) => {
  let tiempoRestante = segundos;
  
  const intervalo = setInterval(() => {
    if (tiempoRestante > 0) {
      countdownBanner.textContent = `Sincronización activa. Próximo chequeo en: ${tiempoRestante}s`;
      tiempoRestante--;
    } else {
      countdownBanner.textContent = '¡Sincronización con el servidor completada!';
      clearInterval(intervalo);
    }
  }, 1000);
};

// ==========================================
// 5. CONSUMO DE APIS (fetch, async/await, try/catch)
// ==========================================

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Cargar tareas de la API personalizando los textos con los requeridos
const cargarTareasDeAPI = async () => {
  try {
    const respuesta = await fetch(`${API_URL}?_limit=2`);
    if (!respuesta.ok) throw new Error('Error al conectar con la API');
    
    // Nombres requeridos por defecto
    const nombresDefecto = ["Revisar correo", "Agendar reuniones"];

    const datos = await respuesta.json();
    
    datos.forEach((item, index) => {
      const textoTarea = nombresDefecto[index] || item.title;
      const tareaApi = gestor.agregarTarea(textoTarea);
      
      if (item.completed) {
        tareaApi.cambiarEstado();
      }
    });

  } catch (error) {
    console.warn('API no disponible. Cargando tareas locales por defecto:', error);
    // Respaldo en caso de fallo de red para mantener las tareas por defecto
    gestor.agregarTarea("Revisar correo");
    gestor.agregarTarea("Agendar reuniones");
  } finally {
    renderizarTareas();
  }
};

const guardarTareaEnAPI = async (tarea) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: tarea.descripcion,
        completed: tarea.estado === 'Completada',
      }),
    });

    if (!respuesta.ok) throw new Error('Error al guardar en la API');
    
    const data = await respuesta.json();
    console.log('Tarea guardada en servidor:', data);
  } catch (error) {
    console.error('Error al guardar tarea en la API:', error);
  }
};

// ==========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Carga las tareas de la API personalizadas con los textos "Revisar correo" y "Agendar reuniones"
  cargarTareasDeAPI();
  iniciarContadorRegresivo(10);
});