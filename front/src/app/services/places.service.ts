import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiPlaceData, Place, PlaceData } from '../models/place.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  constructor(private http: HttpClient) { }

  getPlaces(){
    return this.http.get<ApiPlaceData[]>(environment.apiUrl + '/places').pipe(
      map(response => {
        return response.map(placeData => {
          return new Place(
            placeData._id,
            placeData.title,
            placeData.user,
            placeData.image,
            placeData.description,
          );
        });
      })
    );
  }

  getPlace(id: string){
    return this.http.get<ApiPlaceData>(environment.apiUrl + `/places/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  createPlace(placeData: PlaceData){
    const formData = new FormData();
    Object.keys(placeData).forEach(key => {
      if(placeData[key] !== null) {
        formData.append(key, placeData[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/places', formData);
  }

  removePlace(id: string){
    return this.http.delete(environment.apiUrl + `/places${id}`);
  }
}
