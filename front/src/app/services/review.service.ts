import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiReviewData, Review, ReviewData } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  constructor(private http: HttpClient) {
  }

  getReviews() {
    return this.http.get<ApiReviewData[]>(environment.apiUrl + '/review').pipe(
      map(response => {
        return response.map(reviewData => {
          return new Review(
            reviewData._id,
            reviewData.user,
            reviewData.foodQlty,
            reviewData.serviceQlty,
            reviewData.interiorQlty,
            reviewData.description,
          );
        });
      })
    );
  }

  getReview(id: string){
    return this.http.get<ApiReviewData>(environment.apiUrl + `/review/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  // getReview(id: string) {
  //   return this.http.get<ApiReviewData[]>(environment.apiUrl + `review?user=&{id}`).pipe(
  //     map(response => {
  //       return response.map(reviewData => {
  //         return new Review(
  //           reviewData._id,
  //           reviewData.user,
  //           reviewData.foodQlty,
  //           reviewData.serviceQlty,
  //           reviewData.interiorQlty,
  //           reviewData.description,
  //         );
  //       });
  //     })
  //   );
  // }

  createReview(reviewData: ReviewData) {
    return this.http.post(environment.apiUrl + '/review', reviewData);
  }

  removeReview(id: string) {
    return this.http.delete(environment.apiUrl + `/review${id}`);
  }
}
