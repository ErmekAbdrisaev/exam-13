import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { PlacesNewComponent } from './pages/places-new/places-new.component';

const routes: Routes = [
  {path: '', component: PlacesComponent},
  {
    path: 'place-new',
    component: PlacesNewComponent,
    data: {roles: ['user']},
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
