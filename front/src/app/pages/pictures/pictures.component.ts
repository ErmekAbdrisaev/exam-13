import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Picture } from '../../models/pictures.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { deletePicturesRequest, fetchPicturesRequest } from '../../store/pictures.actions';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.sass']
})
export class PicturesComponent implements OnInit {
  user: Observable<User | null>;
  pictures: Observable<Picture[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.user = store.select(state => state.users.user);
    this.pictures = store.select(state => state.pictures.pictures);
    this.loading = store.select(state => state.pictures.fetchLoading);
    this.error = store.select(state => state.pictures.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPicturesRequest());
  }

  onDeletePicture(id: string){
    this.store.dispatch(deletePicturesRequest({id}));

  }

}
