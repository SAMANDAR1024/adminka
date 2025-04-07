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
};

export default BannersApi;
