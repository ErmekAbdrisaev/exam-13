import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createPlacesFailure,
  createPlacesRequest, createPlacesSuccess, deletePlacesFailure, deletePlacesRequest, deletePlacesSuccess,
  fetchPlaceFailure,
  fetchPlaceRequest,
  fetchPlacesFailure,
  fetchPlacesRequest,
  fetchPlacesSuccess,
  fetchPlaceSuccess
} from './places.actions';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlacesService } from '../services/places.service';
import { Router } from '@angular/router';
import {
  createPicturesFailure,
  createPicturesRequest, createPicturesSuccess, deletePicturesFailure, deletePicturesRequest, deletePicturesSuccess,
  fetchPicturesFailure,
  fetchPicturesRequest,
  fetchPicturesSuccess
} from './pictures.actions';
import { PicturesService } from '../services/pictures.service';

@Injectable()
export class PicturesEffects {

  fetchPictures = createEffect(() => this.actions.pipe(
    ofType(fetchPicturesRequest),
    mergeMap(id => this.picturesService.getPictures().pipe(
      map(pictures => fetchPicturesSuccess({pictures})),
      catchError(() =>of(fetchPicturesFailure({error: "Something goes wrong!"})))
    ))
  ));

  createPictures = createEffect(() => this.actions.pipe(
    ofType(createPicturesRequest),
    mergeMap(({pictureData}) => this.picturesService.createPicture(pictureData)
      .pipe(
        map(() => createPicturesSuccess()),
        tap(() => {
          return this.router.navigate(['/']);
        }),
        catchError(()=>{
          return of(createPicturesFailure({
            error: 'Wrong data'
          }));
        })
      )
    )
  ));

  deletePicture = createEffect(() => this.actions.pipe(
    ofType(deletePicturesRequest),
    mergeMap(({id}) => this.picturesService.removePicture(id).pipe(
      map( () => deletePicturesSuccess()),
      catchError(() => of(deletePicturesFailure({error: 'Not deleted'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private picturesService: PicturesService,
    private router: Router
  ){}
}
