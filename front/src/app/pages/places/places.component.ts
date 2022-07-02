import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AppState } from '../../store/types';
import { fetchPlacesRequest } from '../../store/places.actions';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../../models/review.model';
import { fetchReviewssRequest } from '../../store/reviews.actions';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {
  places: Observable<Place[]>;
  reviews: Observable<Review[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  user: Observable<User | null>;
  token!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.places = store.select(state => state.places.places);
    this.reviews = store.select(state => state.reviews.reviews);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
    this.route.params.subscribe(params => {
    let id = params['id'];
      this.store.dispatch(fetchReviewssRequest({id: id}));
    });

    // this.reviews.subscribe(review => {
    // let id!: string;
    //     if (review) {
    //       id = review[0]?._id;
    //     }
    //     if (id !== undefined) {
    //     this.store.dispatch(fetchReviewssRequest({id: id}));
    //   }
    //   });
    //
    //   this.user.subscribe(user =>{
    //     if(user?.token){
    //       this.token = user.token;
    //     }
    // });
  }

  // onDelete(id: string){
  //   // this.store.dispatch(deletePictureRequest({id}))
  // }

}
