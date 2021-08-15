import { Estudiante } from "./estudiante.model";

export class Inscripcion {
  estudiante: Estudiante = new Estudiante();
  curso: string = '';
  planPago: string = '';
  pagoInicial: string = '';
  fechaInscripcion: Date = new Date();
  fechaPago: Date = new Date();
  constructor() {
  }
}
