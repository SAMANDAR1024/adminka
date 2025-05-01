import { CatigoriesType } from "../type/type";
import api from "./api";

const CategoriesApi = {
  getAll: ({ limit = 10, page = 1 } = {}) => {
    return api.get(`/api/categories?limit=${limit}&page=${page}&order=ASC`);
  },

  getCategor: () => {
    return api.get(`/api/categories`);
  },

  delete: (id: number) => {
    return api.delete(`/api/categories/${id}`);
  },

  update: (item: any, values: CatigoriesType) => {
    return api.patch(`/api/categories/${item.id}`, {
      name: values.name,
      description: values.description,
    });
  },
  getAdd: (values: CatigoriesType) => {
    return api.post(`/api/categories`, {
      name: values.name,
      description: values.description,
    });
  },
};

export default CategoriesApi;
