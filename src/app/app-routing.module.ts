import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CoursesComponent } from './components/courses/courses.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { RegisteredListComponent } from './components/registered-list/registered-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';

const routes: Routes = [
  {path: 'estudiantes-inscritos', component: RegisteredListComponent},
  {path: 'inscribir-estudiante', component: InscriptionComponent},
  {path: 'listar-estudiantes', component: UsersListComponent},
  {path: 'listar-docentes', component: UsersListComponent},
  {path: 'listar-personal', component: UsersListComponent},
  {path: 'agregar-estudiante', component: AddUserComponent},
  {path: 'editar-estudiante/:estudianteID', component: AddUserComponent},
  {path: 'cursos', component: CoursesComponent},
  {path: '', pathMatch:'full', component: RegisteredListComponent },
  {path: '**', pathMatch:'full', component: RegisteredListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
