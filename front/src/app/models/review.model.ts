export class Review {
  constructor(
    public _id: string,
    public user: {
      _id: string,
      displayName:string
    },
    public foodQlty: number,
    public serviceQlty: number,
    public interiorQlty: number,
    public description: string,
  ){}
}

export interface ReviewData{
  place: string;
  foodQlty: number;
  serviceQlty: number;
  interiorQlty: number;
  description: string;
}

export interface ApiReviewData{
  _id: string,
  user: {
    _id: string,
    displayName: string,
  },
  foodQlty: number,
  serviceQlty: number,
  interiorQlty: number,
  description: string
}
