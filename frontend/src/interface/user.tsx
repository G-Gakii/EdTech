export interface LoginUserInterface {
  username: string;
  password: string;
}

export interface UserInterface extends LoginUserInterface {
  email: string;
  password2: string;
}
