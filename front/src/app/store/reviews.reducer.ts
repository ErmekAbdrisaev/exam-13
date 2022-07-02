import { ReviewsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createReviewsFailure,
  createReviewsRequest, createReviewsSuccess, deleteReviewsFailure, deleteReviewsRequest, deleteReviewsSuccess,
  fetchReviewsFailure,
  fetchReviewssRequest,
  fetchReviewsSuccess
} from './reviews.actions';

const initialState: ReviewsState = {
  reviews: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const reviewsReducer = createReducer(
  initialState,
  on(fetchReviewssRequest, state => ({...state, fetchLoading: true})),
  on(fetchReviewsSuccess, (state, {reviews}) =>({...state, fetchLoading: false, reviews})),
  on(fetchReviewsFailure, (state, {error}) =>({...state, fetchLoading: false, fetchError: error})),

  on(createReviewsRequest, state => ({...state, createLoading: true})),
  on(createReviewsSuccess, state => ({...state, createLoading: false})),
  on(createReviewsFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(deleteReviewsRequest, state => ({...state, createLoading: true})),
  on(deleteReviewsSuccess, state => ({...state, createLoading: false})),
  on(deleteReviewsFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
)

