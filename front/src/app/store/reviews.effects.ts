import { ReviewService } from '../services/review.service';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of, tap } from 'rxjs';
import {
  createReviewsFailure,
  createReviewsRequest,
  createReviewsSuccess,
  deleteReviewsFailure,
  deleteReviewsRequest,
  deleteReviewsSuccess, fetchReviewFailure,
  fetchReviewRequest,
  fetchReviewsFailure,
  fetchReviewssRequest,
  fetchReviewsSuccess, fetchReviewSuccess
} from './reviews.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class ReviewsEffects {

  fetchReviews = createEffect(() => this.actions.pipe(
    ofType(fetchReviewssRequest),
    mergeMap(() => this.reviewsService.getReviews().pipe(
      map(reviews => fetchReviewsSuccess({reviews})),
      catchError(() =>of(fetchReviewsFailure({error: "Something goes wrong!"})))
    ))
  ));

  fetchReview = createEffect(() => this.actions.pipe(
    ofType(fetchReviewRequest),
    mergeMap(({id}) => this.reviewsService.getReview(id).pipe(
      map(review => fetchReviewSuccess({review})),
      catchError(() => of(fetchReviewFailure({error: 'Something went wrong'})))
    ))
  ));

  createReview = createEffect(() => this.actions.pipe(
    ofType(createReviewsRequest),
    mergeMap(({reviewsData}) => this.reviewsService.createReview(reviewsData)
      .pipe(
        map(() => createReviewsSuccess()),
        tap(() => {
          return this.router.navigate(['/']);
        }),
        catchError(()=>{
          return of(createReviewsFailure({
            error: 'Wrong data'
          }));
        })
      )
    )
  ));

  deleteReviews = createEffect(() => this.actions.pipe(
    ofType(deleteReviewsRequest),
    mergeMap(({id}) => this.reviewsService.removeReview(id).pipe(
      map( () => deleteReviewsSuccess()),
      catchError(() => of(deleteReviewsFailure({error: 'Not deleted'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private reviewsService: ReviewService,
    private router: Router
  ){}
}
