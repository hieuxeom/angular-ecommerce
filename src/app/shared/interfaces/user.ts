interface CartItem {
  productId: string;
  quantity: number;
}

interface UserAddress {
  provinceId: string;
  districtId: string;
  wardId: string;
  fullAddress: string;
  isDefault: boolean;
}

interface UserCart {
  cartItems: CartItem[];
  voucherCode: string;
}

export interface IUser {
  userName: string;
  email: string;
  password: string;
  cart: UserCart;
  listAddresses: UserAddress[];
}
