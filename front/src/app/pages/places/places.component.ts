import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AppState } from '../../store/types';
import { MatDialog } from '@angular/material/dialog';
import { fetchPlacesRequest } from '../../store/places.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.sass']
})
export class PlacesComponent implements OnInit {
  places: Observable<Place[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  user: Observable<User | null>;
  token!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private dialog: MatDialog) {
    this.places = store.select(state => state.places.places);
    this.loading = store.select(state => state.places.fetchLoading);
    this.error = store.select(state => state.places.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPlacesRequest());
  }

  // openDialog(id: string){
  //   this.store.dispatch(fetchPlacesRequest({id}));
  //   this.dialog.open(DialogComponent);
  // }

  // onDelete(id: string){
  //   // this.store.dispatch(deletePictureRequest({id}))
  // }

}
