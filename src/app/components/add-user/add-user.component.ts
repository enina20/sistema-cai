import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from 'src/app/services/mensajes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  formularioEstudiante: FormGroup;
  porcentajeSubida:number = 0;
  imagenUrl:string = '';

  idEstudiante:string = '';
  esEditable: boolean = false;

  constructor( private fb: FormBuilder,
               private storage: AngularFireStorage,
               private afs: AngularFirestore,
               private activeRoute: ActivatedRoute,
               private msj:MensajesService )
  {
    this.formularioEstudiante = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      carnet: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      fechaNacimiento: ['', Validators.required],
      imgUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idEstudiante = this.activeRoute.snapshot.params.estudianteID;
    // console.log(idEstudiante);

    if (this.idEstudiante != undefined) {
      this.esEditable = true;

      this.afs.doc<any>(`estudiantes/${this.idEstudiante}`).valueChanges().subscribe((estudiante => {
        // console.log(estudiante);

        this.formularioEstudiante.setValue({
          nombre: estudiante.nombre,
          apellido: estudiante.apellido,
          carnet: estudiante.carnet,
          celular: estudiante.celular,
          correo: estudiante.correo,
          fechaNacimiento: new Date(estudiante.fechaNacimiento.seconds * 1000).toISOString().substr(0,10),
          imgUrl: '',
        });
        this.imagenUrl = estudiante.imgUrl;
      }));
    }
  }

  agregarEstudiante(){

    this.formularioEstudiante.value.imgUrl = this.imagenUrl;
    this.formularioEstudiante.value.fechaNacimiento = new Date(this.formularioEstudiante.value.fechaNacimiento);
    // console.log(this.formularioEstudiante.value);
    this.afs.collection('estudiantes').add(this.formularioEstudiante.value).then((termino)=>{
      // console.log('registro Creado');
      this.msj.mensajeCorrecto('Registro exitoso',
      `Se agrego correctamente a ${this.formularioEstudiante.value.nombre} ${this.formularioEstudiante.value.apellido}`);
    });
  }

  editarEstudiante(){
    this.formularioEstudiante.value.imgUrl = this.imagenUrl;
    this.formularioEstudiante.value.fechaNacimiento = new Date(this.formularioEstudiante.value.fechaNacimiento);
    this.afs.doc(`estudiantes/${this.idEstudiante}`).update(this.formularioEstudiante.value).then(()=>{
      this.msj.mensajeCorrecto('Edicion exitosa',
      `Se edito correctamente la informacion de  ${this.formularioEstudiante.value.nombre} ${this.formularioEstudiante.value.apellido}`);
    }).catch(()=>{
      this.msj.mensajeError('Error','Ocurrio algun error');
    });
  }

  subirImagenEstudiante($event:any) {

    if ($event.target.files.length > 0) {
      let archivo = $event.target.files[0];

      let nombreArchivo = new Date().getTime().toString();
      let extensionArchivo = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'));

      let filePath = `Estudiantes/${nombreArchivo}${extensionArchivo}`;
      let referencia = this.storage.ref(filePath);
      let task = referencia.put(archivo);
      task.then((objeto)=>{
        // console.log('imagen subida');
        referencia.getDownloadURL().subscribe((url)=>{
          console.log(url);
          this.imagenUrl = url;
        });
      });
      task.percentageChanges().subscribe((porcentaje:any) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
      });
    }
  }
}
