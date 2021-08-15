import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  estudiantes: any[] = new Array<any>();

  tipoUsuario:string = '';

  constructor(private firestore: AngularFirestore,
              private activeRoute: ActivatedRoute)

  {
    this.verificarUsuario();

    this.firestore.collection(`${this.tipoUsuario}`).get().subscribe((resultado)=>{
      resultado.docs.forEach((item) => {
        let estudiante: any = item.data();
        estudiante.id = item.id;
        estudiante.ref = item.ref;
        this.estudiantes.push(estudiante)
      });
    });
  }

  ngOnInit(): void {
  }

  verificarUsuario(){
    let path = this.activeRoute.snapshot.url[0].path;
    this.tipoUsuario = path.substring(path.lastIndexOf('-'));
    this.tipoUsuario = this.tipoUsuario.substr(1, this.tipoUsuario.length);
  }
}
