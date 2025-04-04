import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { UserType } from "../../type/type";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

function User() {
  const [user, setUser] = useState<UserType[]>([]);
  const [selectedState, setSelectedState] = useState<UserType>();
  const fetchUsers = () => {
    api
      .get("/api/users?limit=10&page=1&order=ASC")
      .then((res) => {
        setUser(res.data.items);
        
      })
      .catch((e) => {
        console.log("Xato", e);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (!user.length) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  function Delete(id: number) {
    const User = user.find((item) => item.id === id);

    if (User?.role === "admin") {
      return message.error("Admin foydalanuvchini o'chirish mumkin emas");
    }

    api
      .delete(`/api/users/${id}`)
      .then(() => {
        setUser((i) => i.filter((item) => item.id !== id));
      })
      .catch((e) => {
        console.log("XATO!", e);
      });
  }

  return (
    <div className="pl-40  p-10 overflow-y-auto h-[600px]">
      <div className=" flex justify-between items-center mb-5">
        <AddUser onUserAdded={fetchUsers} />
      </div>
      <Table
        style={{ height: 100 }}
        dataSource={user.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        })}
        columns={[
          {
            key: "id",
            title: "Id",
            dataIndex: "id",
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "email",
            title: "Email",
            dataIndex: "email",
          },
          {
            key: "role",
            title: "Role",
            dataIndex: "role",
          },
          {
            key: "createdAt",
            title: "CreatedAt",
            dataIndex: "createdAt",
          },
          {
            key: "image",
            title: "Image",
            dataIndex: "image",
            render: (image) => {
              return (
                <>
                  <img className="rounded w-10" src={image} alt="" />
                </>
              );
            },
          },
          {
            key: "id",
            dataIndex: "id",
            title: "Delete / Edit",
            render: (id, toliqMalumot) => {
              return (
                <div className="flex gap-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedState(toliqMalumot);
                    }}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    danger
                    className="cursor-pointer"
                    onClick={() => Delete(id)}
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              );
            },
          },
        ]}
      />

      <EditUser item={selectedState} set={setSelectedState} fetchUsers={fetchUsers} />
    </div>
  );
}

export default User;
