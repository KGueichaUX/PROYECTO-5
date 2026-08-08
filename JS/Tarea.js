// Archivo Tarea.js para usar el export
export class Tarea {
  constructor(id, descripcion, estado = 'Pendiente', fechaCreacion = new Date().toLocaleString()) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
  }

  // Método para alternar estado
  cambiarEstado = () => {
    this.estado = this.estado === 'Pendiente' ? 'Completada' : 'Pendiente';
  };
}