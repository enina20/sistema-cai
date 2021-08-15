import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  nombreEstudiante:string = '';
  estudiantes: any[] = new Array<any>();
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.firestore.collection(`estudiantes`).get().subscribe((resultado)=>{
      this.estudiantes.length = 0;
      resultado.docs.forEach((item) => {
        let estudiante: any = item.data();
        estudiante.id = item.id;
        estudiante.ref = item.ref;
        estudiante.visible = false;
        this.estudiantes.push(estudiante)
      });
    });
  }

  buscarEstudiante(nombre:string){
    this.estudiantes.forEach((estudiante)=>{
      if(estudiante.nombre.toLowerCase().includes(nombre.toLowerCase())){
        estudiante.visible = true
      }else{
        estudiante.visible = false
      }
    });
  }
  cancelarEstudiante(){
    this.nombreEstudiante = '';
  }

  seleccionarEstudiante(estudiante:any){
    this.nombreEstudiante = `${estudiante.nombre} ${estudiante.apellido}`;
    this.estudiantes.forEach((estudiante)=>{estudiante.visible = false})
  }
}
