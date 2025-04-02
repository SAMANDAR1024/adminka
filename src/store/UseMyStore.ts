import { create } from "zustand";
import api from "../api/api";
import { AuthType } from "../type/type";
const UseMyStore = create<AuthType>((setState) => {
  const ls_strin = localStorage.getItem("auth");

  const ls = ls_strin ? JSON.parse(ls_strin) : undefined;

  if (ls) {
    api.defaults.headers.accessToken = `Bearer ${ls.accessToken}`;
  }

  return {
    accessToken: ls?.accessToken,
    user: ls?.user,
    logout: () => {
      localStorage.removeItem("auth");

      setState({
        user: null,
        accessToken: "",
      });
    },
  };
});
export default UseMyStore;
