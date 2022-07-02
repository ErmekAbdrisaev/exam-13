import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createPlacesRequest } from '../../store/places.actions';
import { PlaceData } from '../../models/place.model';

@Component({
  selector: 'app-places-new',
  templateUrl: './places-new.component.html',
  styleUrls: ['./places-new.component.sass']
})
export class PlacesNewComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  user!: Observable<User | null>;
  newbe!: User | null;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.places.createLoading);
    this.error = store.select(state => state.places.createError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.user.subscribe(user => {
      this.newbe = user;
    })
  }

  onSubmit(){
    const placeData: PlaceData = this.form.value;
    this.store.dispatch((createPlacesRequest({placeData})));
  }

}
