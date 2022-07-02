import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { HasRolesDirective } from './directives/has-roles.directive';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { AppStoreModule } from './app-store.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { localStorageSync } from 'ngrx-store-localstorage';
import { PlacesComponent } from './pages/places/places.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PlacesNewComponent } from './pages/places-new/places-new.component';
import { ImagePipe } from './pipes/image.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { PlaceComponent } from './pages/place/place.component';
import { MatSelectModule } from '@angular/material/select';
import { PicturesComponent } from './pages/pictures/pictures.component';


export const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{'users': ['user']}],
    rehydrate: true
  })(reducer);
};


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HasRolesDirective,
    CenteredCardComponent,
    FileInputComponent,
    HasRolesDirective,
    LoginComponent,
    RegisterComponent,
    PlacesComponent,
    PlacesNewComponent,
    ImagePipe,
    ReviewsComponent,
    PlaceComponent,
    PicturesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    FlexModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
