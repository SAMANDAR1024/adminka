import { UserType } from "../type/type";
import api from "./api";

const UserApi = {
  getOne: (id: number) => {
    return api.delete(`/api/users/${id}`);
  },

  getAll: (params: { limit: number; page: number }) => {
    return api.get(`/api/users`, {
      params: params,
    });
  },

  update: (values: UserType, item: any) => {
    return api.patch(`/api/users/${item.id}`, {
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
      role: values.role,
    });
  },

  getAdd: (values: UserType) => {
    return api.post(`/api/users`, {
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
      role: values.role,
    });
  },
};

export default UserApi;
