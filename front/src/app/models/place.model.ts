export class Place {
  constructor(
    public _id: string,
    public title: string,
    public user: {
      _id: string,
      displayName:string
    },
    public image: string,
    public review: string,
  ){}
}

export interface PlaceData{
  [key: string]: any;
  title: string;
  user: string,
  image: File | null;
  review: string,
}

export interface ApiPlaceData{
  _id: string,
  title: string,
  user: {
    _id: string,
    displayName: string,
  },
  image: string,
  review: string,

}

