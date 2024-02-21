export interface User {
  id: string;
  name: string;
  email: string;
  emailVerifed?: Date | null;
  password: string;
  role: string;
  image?: string | null;
}
