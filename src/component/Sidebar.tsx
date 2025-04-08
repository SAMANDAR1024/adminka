import { NavLink } from "react-router";
import {
  AppstoreOutlined,
  FileImageOutlined,
  UsergroupAddOutlined,
  BarsOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
function Saidbar() {
  return (
    <div className="fixed  justify-between  text-white w-36 h-screen overflow-hidden ">
      <div className=" flex flex-col p-2 gap-3">
        {[
          {
            to: "/",
            label: "Dashboard",
            icon: <AppstoreOutlined />,
          },
          {
            to: "/users",
            label: "Users",
            icon: <UsergroupAddOutlined />,
          },
          

          {
            to: "/products",
            label: "Products",
            icon: <ShoppingOutlined />,
          },
          {
            to: "/catigories",
            label: "Catigories",
            icon: <BarsOutlined />,
          },
          {
            to: "/orders",
            label: "Orders",
            icon: <ShoppingCartOutlined />,
          },
          {
            to: "/banners",
            label: "Banners",
            icon: <FileImageOutlined />,
          },
        ].map((item) => {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `p-2 rounded  ${
                  isActive
                    ? "bg-black text-white font-bold"
                    : "text-black hover:bg-neutral-200"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Saidbar;
