import { NavLink } from "react-router";

function Saidbar() {
  return (
    <div className="fixed bg-slate-800 justify-between  text-white w-36 h-screen overflow-hidden ">
      <div className=" flex flex-col p-2 gap-3">
        {[
          {
            to: "/users",
            label: "Users",
          },
          {
            to: "/banners",
            label: "Banners",
          },
         
          {
            to: "/products",
            label: "Products",
          },
          {
            to: "/catigories",
            label: "Catigories",
          },
          {
            to: "/orders",
            label: "Orders",
          },
        ].map((item) => {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({isActive}) =>
                `p-2 rounded text-center ${
                  isActive
                    ? "bg-white text-black font-bold"
                    : "bg-slate-500 hover:bg-slate-500"
                }`
              }
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Saidbar;
