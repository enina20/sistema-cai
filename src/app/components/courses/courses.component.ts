import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  formularioCurso: FormGroup;
  cursos: any[] = new Array<any>();

  constructor( private fb: FormBuilder,
               private storage: AngularFireStorage,
               private afs: AngularFirestore,
               private msj:MensajesService )

  {

    this.cargarCursos();


    this.formularioCurso = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      duracion: ['', Validators.required],
      responsable: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  cargarCursos(){
    this.cursos.length = 0;
    this.afs.collection('cursos').get().subscribe((resultado)=>{
      resultado.docs.forEach((item) => {
        let curso: any = item.data();
        curso.id = item.id;
        curso.ref = item.ref;
        this.cursos.push(curso)
      });
    });
  }


  agregarCurso(){
    console.log(this.formularioCurso.value);
    // this.formularioCurso.value.imgUrl = this.imagenUrl;
    // this.formularioCurso.value.fechaNacimiento = new Date(this.formularioCurso.value.fechaNacimiento);
    // console.log(this.formularioCurso.value);
    this.afs.collection('cursos').add(this.formularioCurso.value).then(()=>{
      // console.log('registro Creado');
      this.msj.mensajeCorrecto('Registro exitoso',
      `Se agrego correctamente el curso ${this.formularioCurso.value.nombre}`);
      this.formularioCurso.reset();
      this.cargarCursos();
    });
  }

  editarCurso(){

  }

  eliminarCurso(){

  }


}
