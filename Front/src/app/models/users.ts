export interface User {
  id: string;
  login: string;
  password?: string; // Optional because API doesn't return password
  lastname: string;
  firstname: string;
}
