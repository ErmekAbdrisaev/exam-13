import { createAction, props } from '@ngrx/store';
import { Place, PlaceData } from '../models/place.model';

export const fetchPlacesRequest = createAction(
  '[Places] Fetch Request');
export const fetchPlacesSuccess = createAction(
  '[Places] Fetch Success',
  props<{places: Place[]}>()
);
export const fetchPlacesFailure = createAction(
  '[Places] Fetch Failure',
  props<{error: string}>()
);

export const createPlacesRequest = createAction(
  '[Places] Create Request',
  props<{placeData: PlaceData}>()
);
export const createPlacesSuccess = createAction(
  '[Place] Create Success'
);
export const createPlacesFailure = createAction(
  '[Place] Create Failure',
  props<{error: string}>()
);

export const fetchPlaceRequest = createAction(
  '[Places] FetchOne Request',
  props<{id: string}>()
);
export const fetchPlaceSuccess = createAction(
  '[Places] FetchOne Success',
  props<{place: Place}>()
);
export const fetchPlaceFailure = createAction(
  '[Places] FetchOne Failure',
  props<{error: string}>()
);

export const deletePlacesRequest = createAction(
  '[Place] Delete Request',
  props<{ id: string }>());
export const deletePlacesSuccess = createAction(
  '[Place] Delete Success');
export const deletePlacesFailure = createAction(
  '[Place] Delete Failure',
  props<{ error: string }>());
