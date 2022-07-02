import { createAction, props } from '@ngrx/store';
import { Picture, PictureData } from '../models/pictures.model';

export const fetchPicturesRequest = createAction(
  '[Pictures] Fetch Request');
export const fetchPicturesSuccess = createAction(
  '[Pictures] Fetch Success',
  props<{pictures: Picture[]}>()
);
export const fetchPicturesFailure = createAction(
  '[Pictures] Fetch Failure',
  props<{error: string}>()
);

export const fetchPictureRequest = createAction(
  '[Pictures] FetchOne Request',
  props<{id: string}>()
);
export const fetchPictureSuccess = createAction(
  '[Pictures] FetchOne Success',
  props<{picture: Picture}>()
);
export const fetchPictureFailure = createAction(
  '[Pictures] FetchOne Failure',
  props<{error: string}>()
);

export const createPicturesRequest = createAction(
  '[Pictures] Create Request',
  props<{pictureData: PictureData}>()
);
export const createPicturesSuccess = createAction(
  '[Pictures] Create Success'
);
export const createPicturesFailure = createAction(
  '[Pictures] Create Failure',
  props<{error: string}>()
);

export const deletePicturesRequest = createAction(
  '[Pictures] Delete Request',
  props<{ id: string }>());
export const deletePicturesSuccess = createAction(
  '[Pictures] Delete Success');
export const deletePicturesFailure = createAction(
  '[Pictures] Delete Failure',
  props<{ error: string }>());
