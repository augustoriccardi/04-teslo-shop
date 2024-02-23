export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified?: Date | null;
  password?: string | null;
  role: string;
  image?: string | null;
}
