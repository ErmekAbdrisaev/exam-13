import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPlaceData, Place, PlaceData } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { createPlacesRequest, deletePlacesRequest, fetchPlaceRequest } from '../../store/places.actions';
import { User } from '../../models/user.model';
import { Review, ReviewData } from '../../models/review.model';
import { NgForm } from '@angular/forms';
import { createReviewsRequest } from '../../store/reviews.actions';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  user: Observable<User | null>;
  place!: Observable<Place | null>;
  reviews: Observable<Review[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  placeId!: ApiPlaceData;
  token!: string;
  newUser!: User | null;
  arrQlty = [1, 2, 3, 4 ,5];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.user = store.select(state => state.users.user);
    this.place = store.select(state => state.places.place);
    this.reviews = store.select(state => state.reviews.reviews);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.store.dispatch(fetchPlaceRequest({id: id}));
    });
    this.place.subscribe(id => {
      this.placeId = <ApiPlaceData>id;
    })
  }

  onSubmit(){
    const reviewData: ReviewData = this.form.value;
    reviewData.place = this.placeId._id;
    this.store.dispatch(createReviewsRequest({reviewsData: reviewData}))
  }

  onDelete(id: string){
    this.store.dispatch(deletePlacesRequest({id: id}))
  }
}
