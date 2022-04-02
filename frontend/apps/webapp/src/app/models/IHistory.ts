import { ILod } from './ILod';

export interface IHistory {
  public: boolean;
  featured: boolean;
  rating: number;
  numReviews: number;
  _id: Id;
  user: User;
  name: string;
  uri: string;
  category: string;
  reviews: any[];
  data: ILod;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Id {
  $oid: string;
}

export interface User {
  $oid: string;
}
