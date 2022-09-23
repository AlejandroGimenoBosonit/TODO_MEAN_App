export interface UserInfo {
  _id?: string;
  name?: string;
  secondName?: string;
  age?: number;
  email?: string;
  // TODO: MODIFY BACKEND TO AVOID SEND IN THE RESPONSE
  password?: string;
  __v?: number;
}

export interface Card {
  _id?: string;
  user?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  __v?: number;
}

export interface loginForm {
  email: string;
  password: string;
}

export interface authResponse {
  process_ok: boolean;
  token?: string;
  user?: UserInfo;
  card_list?: Card[];
}
