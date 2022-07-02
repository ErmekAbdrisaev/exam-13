import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { PlacesEffects } from './store/places.effects';
import { placesReducer } from './store/places.reducer';
import { ReviewsEffects } from './store/reviews.effects';
import { reviewsReducer } from './store/reviews.reducer';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true,
  })(reducer);
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  users: usersReducer,
  places: placesReducer,
  reviews: reviewsReducer,
};

const effects = [UsersEffects, PlacesEffects, ReviewsEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}
