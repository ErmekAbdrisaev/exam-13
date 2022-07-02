import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  createPlacesFailure,
  createPlacesRequest,
  createPlacesSuccess,
  deletePlacesFailure,
  deletePlacesRequest,
  deletePlacesSuccess,
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

@Injectable()
export class PlacesEffects {

  fetchPlaces = createEffect(() => this.actions.pipe(
    ofType(fetchPlacesRequest),
    mergeMap(id => this.placesService.getPlaces().pipe(
      map(places => fetchPlacesSuccess({places})),
      catchError(() =>of(fetchPlacesFailure({error: "Something goes wrong!"})))
    ))
  ));

  fetchPlace = createEffect(() => this.actions.pipe(
    ofType(fetchPlaceRequest),
    mergeMap(({id}) => this.placesService.getPlace(id).pipe(
      map(place => fetchPlaceSuccess({place})),
      catchError(() =>of(fetchPlaceFailure({error: "Something goes wrong!"})))
    ))
  ));

  createPlaces = createEffect(() => this.actions.pipe(
    ofType(createPlacesRequest),
    mergeMap(({placeData}) => this.placesService.createPlace(placeData)
      .pipe(
        map(() => createPlacesSuccess()),
        tap(() => {
          return this.router.navigate(['/']);
        }),
        catchError(()=>{
          return of(createPlacesFailure({
            error: 'Wrong data'
          }));
        })
      )
    )
  ));

  deletePlace = createEffect(() => this.actions.pipe(
    ofType(deletePlacesRequest),
    mergeMap(({id}) => this.placesService.removePlace(id).pipe(
      map( () => deletePlacesSuccess()),
      catchError(() => of(deletePlacesFailure({error: 'Not deleted'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private placesService: PlacesService,
    private router: Router
  ){}
}
