export interface IProduct {
  _id: string;
  productName: string;
  productPrice: number;
  isDiscount: boolean;
  discountPercents: number;
  productImage: string;
  productColor: string;
  productCategory: string;
  productReviews: IProductReview[];
  productComments: IProductComment[];
  productRating: number;
  productStock: number;
  isDeleted: boolean;
  isActive: boolean;
  soldCount: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductComment {
  _id: string;
  userName: string;
  commentContent: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductReview {
  _id: string;
  userName: string;
  reviewContent: string;
  reviewStar: number;
  createdAt: string;
  updatedAt: string;
}

export type TypeFilter = 'all' | 't-shirts' | 'shirts' | 'shorts' | 'hoodies';
