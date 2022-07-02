import { LoginError, RegisterError, User } from '../models/user.model';
import { Place } from '../models/place.model';
import { Review } from '../models/review.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type PlacesState = {
  place: Place | null,
  places: Place[],
  createLoading: boolean,
  createError: null | string,
  fetchLoading: boolean,
  fetchError: null | string,
  publishLoading: boolean,
}

export type ReviewsState = {
  reviews: Review[],
  createLoading: boolean,
  createError: null | string,
  fetchLoading: boolean,
  fetchError: null | string,
}

export type AppState = {
  users: UsersState,
  places: PlacesState,
  reviews: ReviewsState
 }
