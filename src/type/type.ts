export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  createdAt: string;
};

export type AuthType = {
  accessToken: string;
  user: null;
  logout: () => void;
};

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt: string;
  imageUrl: string;
};

export type CatigoriesType={
  id: number,
  name: string
  description: string
  createdAt: string
}