export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  accessToken: string;
  role: string;
}

export interface LoginVo {
  username: string;
  password: string;
}

export interface RegisterVo {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  username: string;
}
