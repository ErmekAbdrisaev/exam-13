import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiReviewData, Review } from '../../models/review.model';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { fetchReviewssRequest } from '../../store/reviews.actions';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.sass']
})
export class ReviewsComponent implements OnInit {
  review!: Observable<Review | null>;
  reviews: Observable<Review[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  user: Observable<User | null>;
  token!: string;
  reviewId!: ApiReviewData;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.review = store.select(state => state.reviews.review);
    this.reviews = store.select(state => state.reviews.reviews);
    this.loading = store.select(state => state.reviews.fetchLoading);
    this.error = store.select(state => state.reviews.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
    let id = params['id'];
      this.store.dispatch(fetchReviewssRequest({id: id}));
    })
    this.review.subscribe(id => {
      this.reviewId = <ApiReviewData>id;
    })
  }
}
