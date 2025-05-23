import { ProductType } from "../type/type";
import api from "./api";

const ProductApi = {
  getAll: ({ limit = 10, page = 1 } = {}) => {
    return api.get(`/api/products?limit=${limit}&page=${page}&order=ASC`);
  },

  delete: (id: number) => {
    return api.delete(`/api/products/${id}`);
  },

  update: (item: any, values: ProductType) => {
    return api.patch(`/api/products/${item.id}`, {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      stock: Number(values.stock),
      imageUrl: values.imageUrl,
      categoryId: Number(values.categoryId),
    });
  },

  getAdd: (values: any) => {
    return api.post(`/api/products`, {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      stock: Number(values.stock),
      imageUrl: values.imageUrl.file.response.url,
      categoryId: Number(values.categoryId),
    });
  },
};

export default ProductApi;
