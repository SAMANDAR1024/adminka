export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  createdAt: string;
};
export type OrderType = {
  id: number;
  customerId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItemsType[];
};

export type RecentOrder = {
  id: number;
  customerId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
};

export type TopProduct = {
  id: number;
  name: string;
  totalSold: number;
};

export type DashboardType = {
  totalUsers: string;
  totalOrders: string;
  totalProducts: string;
  totalRevenue: string;
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
};
export type OrderItemsType = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
};
export type BannersType = {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
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

export type CatigoriesType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};
