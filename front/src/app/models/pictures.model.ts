export class Picture {
  constructor(
    public _id: string,
    public place: string,
    public user: {
      _id: string,
      displayName:string,
    },
    public image: string,
  ){}
}

export interface PictureData{
  [key: string]: any;
  place: string;
  user: string;
  image: string;
  }

export interface ApiPictureData{
  _id: string,
  place: string,
  user: {
    _id: string,
    displayName: string,
  },
  image: string,
}

