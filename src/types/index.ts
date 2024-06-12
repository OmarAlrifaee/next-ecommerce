export type UserType = {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin: boolean;
  createdAt: Date;
  id: string;
};
export type ProductType = {
  title: string;
  desc: string;
  price: number;
  category: string;
  img?: string;
  color?: string;
  size?: string;
  createdAt: Date;
  id: string;
};
export type CategoryType = {
  title: string;
  img?: string;
  id: string;
  createdAt: Date;
};
