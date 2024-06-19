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
  stock: number;
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
export type CartType = {
  id: string;
  createdAt: Date;
  products: { id: string; quantity: number }[];
  userId: string;
};
export type OrderType = {
  userId: string;
  username: string;
  paymentId: string;
  total: number;
  createdAt: Date;
  id: string;
};
