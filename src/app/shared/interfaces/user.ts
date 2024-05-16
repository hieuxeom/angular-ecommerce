export interface ICartItem {
  productId: string;
  quantity: number;
}

export interface IUserAddress {
  fullName: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
  isDefault: boolean;
}

export interface IUserCart {
  cartItems: ICartItem[];
  voucherCode: string;
}

export interface IUser {
  userName: string;
  email: string;
  password: string;
  cart: IUserCart;
  listAddresses: IUserAddress[];
  accessToken: string;
}
