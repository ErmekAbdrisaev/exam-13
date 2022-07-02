import { PlacesState } from './types';
import { createReducer, on } from '@ngrx/store';
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

const initialState: PlacesState = {
  place: null,
  places: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  publishLoading: false,
};

export const placesReducer = createReducer(
  initialState,
  on(fetchPlacesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlacesSuccess, (state, {places}) => ({...state, fetchLoading: false, places})),
  on(fetchPlacesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createPlacesRequest, state => ({...state, createLoading: true})),
  on(createPlacesSuccess, state => ({...state, createLoading: false})),
  on(createPlacesFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(fetchPlaceRequest, state => ({...state, fetchLoading: true})),
  on(fetchPlaceSuccess, (state, {place}) => ({...state, fetchLoading: false, place})),
  on(fetchPlaceFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(deletePlacesRequest, state => ({...state, createLoading: true})),
  on(deletePlacesSuccess, state => ({...state, createLoading: false})),
  on(deletePlacesFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

);
