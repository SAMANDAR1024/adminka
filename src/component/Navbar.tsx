import {
  LeftCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Route, Routes } from "react-router";

import { Avatar, Dropdown } from "antd";
import Saidbar from "./Sidebar";
import UseMyStore from "../store/UseMyStore";
import User from "./user/User";
import Product from "./product/Product";
import Catigories from "./catigories/Catigories";
import Banners from "./banners/Banners";
function Navbar() {
  return (
    <div className=" container m-auto ">
      <div className=" flex p-2 justify-between bg-slate-800 text-white">
        <div className="text-2xl">Logo</div>
        <Dropdown
          menu={{
            items: [
              {
                key: 1,
                label: "Profilim",
                icon: <UserOutlined />,
              },
              {
                key: 2,
                label: "Sozlamalar",
                icon: <SettingOutlined />,
              },
              {
                key: 3,
                label: "Chiqish",
                danger: true,
                onClick: () => {
                  localStorage.removeItem("auth");
                  UseMyStore.setState({
                    user: null,
                    accessToken: "",
                  });
                },
                icon: <LeftCircleOutlined />,
              },
            ],
          }}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar
              className="cursor-pointer "
              size="large"
              icon={<UserOutlined />}
            />
            <div>
              <p>Zafarov Samandar</p>
              <p>zafarovsamandar5444@gmail.com</p>
            </div>
          </div>
        </Dropdown>
      </div>
      <Saidbar />

      <Routes>
        <Route path="/users" element={<User />} />
        <Route path="/products" element={<Product />} />
        <Route path="/catigories" element={<Catigories />} />
        <Route path="/banners" element={<Banners />} />
        <Route path="/orders" element={<Banners />} />
      </Routes>
    </div>
  );
}

export default Navbar;
