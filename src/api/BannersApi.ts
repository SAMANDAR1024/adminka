import { BannersType } from "../type/type";
import api from "./api";

const BannersApi = {
  getOne: (id: number) => {
    return api.get(`/api/banners/${id}`);
  },

  getAll: (params: { limit: number; page: number }) => {
    return api.get(`/api/banners`, {
      params: params,
    });
  },
  delete: (id: number) => {
    return api.get(`/api/banners/${id}`);
  },

  update: (item: any, values: BannersType) => {
    return api.patch(`/api/banners/${item.id}`, {
      title: values.title,
      isActive: values.isActive,
      imageUrl: values.imageUrl,
    });
  },
  getAdd: (values: BannersType) => {
    return api.post(`/api/banners`, {
      title: values.title,
      isActive: values.isActive,
      imageUrl: values.imageUrl,
    });
  },
};

export default BannersApi;
