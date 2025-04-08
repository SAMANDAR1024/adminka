import { CatigoriesType } from "../type/type";
import api from "./api";

const CategoriesApi = {
  getAll: () => {
    return api.get("/api/categories?limit=10&page=1&order=ASC");
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
