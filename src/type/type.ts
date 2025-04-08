export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  createdAt: string;
};
export type OrderType=  {
  id: number
  customerId: number
  totalPrice:number
  status: string
  createdAt: string
  items: [
    {
      id: number
      orderId:number
      productId: number
      quantity: number
      price: string
    }
  ]
}
export type BannersType={
  id: number
  title: string
  imageUrl: string
  isActive: boolean,
  createdAt: string
}

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