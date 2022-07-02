import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PlacesComponent } from './pages/places/places.component';
import { PlacesNewComponent } from './pages/places-new/places-new.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { PlaceComponent } from './pages/place/place.component';
import { PicturesComponent } from './pages/pictures/pictures.component';

const routes: Routes = [
  {path: '', component: PlacesComponent},
  {
    path: 'place-new',
    component: PlacesNewComponent,
    data: {roles: ['user']},
  }, {
    path: 'place/:id',
    component: PlaceComponent,
  },{path: 'pictures', component: PicturesComponent},
  {
    path: 'review',
    component: ReviewsComponent,
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
