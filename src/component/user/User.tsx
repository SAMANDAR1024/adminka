import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { UserType } from "../../type/type";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

function User() {
  const [user, setUser] = useState<UserType[]>([]);
  const [selectedState, setSelectedState] = useState<UserType>();
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(6);
  const limit = 1;
  const fetchUsers = (pageNumber = 1) => {
    setloading(true);
    UserApi.getAll({ limit, page: pageNumber })
      .then((res) => {
        setUser(res.data.items);
        setTotal(res.data.total);
      })
      .catch((e) => {
        console.log("Xato", e);
      })
      .finally(() => {
        setloading(false);
      });
  };
  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  function Delete(id: number) {
    const User = user.find((item) => item.id === id);

    if (User?.role === "admin") {
      return message.error("Admin foydalanuvchini o'chirish mumkin emas");
    }

    UserApi.getOne(id)
      .then(() => {
        setUser((i) => i.filter((item) => item.id !== id));
        fetchUsers();
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
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          onChange: (page) => setPage(page),
          showTotal: (total) => `Jami: ${total} foydalanuvchi`,
        }}
        
        loading={loading}
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
            key: "phone",
            title: "Phone",
            dataIndex: "phone",
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


      <EditUser
        item={selectedState}
        set={setSelectedState}
        fetchUsers={fetchUsers}
      />
      
    </div>
    
  );
}

export default User;
