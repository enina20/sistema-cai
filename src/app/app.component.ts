import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sistema-cai-bolivia';
  usuario: any;
  cargando: boolean = true;

  constructor(public auth: AngularFireAuth)  {
    this.auth.user.subscribe((user)=>{
      setTimeout(() => {
        this.cargando = false;
        this.usuario = user;
      }, 1000);
    });

  }
  // login() {
  //   this.auth.signInWithEmailAndPassword('enina1515@gmail.com', 'EEdsoNN1551');
  // }
  // logout() {
  //   this.auth.signOut();
  // }
}
