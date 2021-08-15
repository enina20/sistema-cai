import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss']
})
export class RegisteredListComponent implements OnInit {

  estudiantes: any[] = new Array<any>();
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection(`estudiantes`).get().subscribe((resultado)=>{
      this.estudiantes.length = 0;
      resultado.docs.forEach((item) => {
        let estudiante: any = item.data();
        estudiante.id = item.id;
        estudiante.ref = item.ref;
        this.estudiantes.push(estudiante)
      });
    });
  }

}
