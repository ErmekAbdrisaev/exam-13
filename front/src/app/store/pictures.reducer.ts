import { PicturesState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createPicturesFailure,
  createPicturesRequest,
  createPicturesSuccess,
  deletePicturesFailure,
  deletePicturesRequest,
  deletePicturesSuccess,
  fetchPictureFailure, fetchPictureRequest,
  fetchPicturesFailure,
  fetchPicturesRequest,
  fetchPicturesSuccess, fetchPictureSuccess
} from './pictures.actions';

const initialState: PicturesState = {
  picture: null,
  pictures: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const picturesReducer = createReducer(
  initialState,
  on(fetchPicturesRequest, state => ({...state, fetchLoading: true})),
  on(fetchPicturesSuccess, (state, {pictures}) => ({...state, fetchLoading: false, pictures})),
  on(fetchPicturesFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(createPicturesRequest, state => ({...state, createLoading: true})),
  on(createPicturesSuccess, state => ({...state, createLoading: false})),
  on(createPicturesFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(fetchPictureRequest, state => ({...state, fetchLoading: true})),
  on(fetchPictureSuccess, (state, {picture}) => ({...state, fetchLoading: false, picture})),
  on(fetchPictureFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),

  on(deletePicturesRequest, state => ({...state, createLoading: true})),
  on(deletePicturesSuccess, state => ({...state, createLoading: false})),
  on(deletePicturesFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

);
