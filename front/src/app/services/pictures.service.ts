import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiPictureData, Picture, PictureData } from '../models/pictures.model';

@Injectable({
  providedIn: 'root'
})

export class PicturesService {
  constructor(private http: HttpClient) { }

  getPictures(){
    return this.http.get<ApiPictureData[]>(environment.apiUrl + '/pictures').pipe(
      map(response => {
        return response.map(pictureData => {
          return new Picture(
            pictureData._id,
            pictureData.place,
            pictureData.user,
            pictureData.image,
          );
        });
      })
    );
  }

  getPicture(id: string){
    return this.http.get<ApiPictureData>(environment.apiUrl + `/pictures/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  createPicture(pictureData: PictureData){
    const formData = new FormData();
    Object.keys(pictureData).forEach(key => {
      if(pictureData[key] !== null) {
        formData.append(key, pictureData[key]);
      }
    });
    return this.http.post(environment.apiUrl + '/pictures', formData);
  }

  removePicture(id: string){
    return this.http.delete(environment.apiUrl + `/pictures${id}`);
  }
}
