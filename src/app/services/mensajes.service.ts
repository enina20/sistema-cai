import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeCorrecto(titulo:string, mensaje:string){
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje,
      showConfirmButton: true
    });
  }
  mensajeAdvertencia(titulo:string, mensaje:string){
    Swal.fire({
      icon: 'warning',
      title: titulo,
      text: mensaje,
      showConfirmButton: true
    });
  }
  mensajeError(titulo:string, mensaje:string){
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
      showConfirmButton: true
    });
  }
}


