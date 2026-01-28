export interface User {
  id: number;
  login: string;
  password?: string; // Optional because API doesn't return password
  lastname: string;
  firstname: string;
}
