export interface INewAccount {
  email: string;
  userName: string;
  password: string;
}

export interface ILogin {
  userName?: string;
  email?: string;
  password: string;
}
