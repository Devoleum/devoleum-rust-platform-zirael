import { ILod } from "./ILod";

export interface IHistory {
    public: boolean;
    featured: boolean;
    rating: number;
    numReviews: number;
    _id: string;
    user: string;
    name: string;
    uri: string;
    category: string;
    reviews: any[];
    data: ILod;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}