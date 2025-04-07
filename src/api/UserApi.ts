import api from "./api";

const UserApi = {
  getOne: (id: number) => {
    return api.get(`/api/users/${id}`);
  },

  getAll: (params: { limit: number; page: number }) => {
    return api.get(`/api/users`, {
      params: params,
    });
  },

  update: (values:any, item:any ) => {
    return api.patch(`/api/users/${item.id}`, {
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.image,
      role: values.role,
    });
  },
};

export default UserApi;
