export interface ICartItem {
  productId: string;
  productVariant: string;
  quantity: number;
  price?: number;
}

export interface IUserAddress {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
  isDefault?: boolean;
}

export interface IUserCart {
  cartItems: ICartItem[];
  voucherCode: string;
  totalPrice: number;
  discountPrice: number;
  deliveryFee: number;
  subTotalPrice: number;
}

export interface IUserAuth {
  _id: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  password: string;
  cart: IUserCart;
  listAddresses: IUserAddress;
  role: number;
}
