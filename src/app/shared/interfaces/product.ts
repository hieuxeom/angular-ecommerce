export interface IProduct {
  _id: string;
  productName: string;
  productPrice: number;
  isDiscount: boolean;
  discountPercents: number;
  productImage: string;
  productColor: string;
  productCategory: string;
  productReviews: ProductReview[];
  productComments: ProductComment[];
  productRating: number;
  productStock: number;
  isDeleted: boolean;
}

export interface ProductComment {
  userName: string;
  commentContent: string;
}

export interface ProductReview {
  userName: string;
  reviewContent: string;
  reviewStar: number;
}
