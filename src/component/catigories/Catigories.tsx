import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { CatigoriesType } from "../../type/type";
import AddCatigories from "./AddCatigories";

function Catigories() {
  const [catigories, setCatigories] = useState<CatigoriesType[]>([]);
 
  const fetchCatigories = () => {
    api
      .get("/api/categories?limit=10&page=1&order=ASC")
      .then((res) => {
        setCatigories(res.data.items);
      })
      .catch((e) => {
        console.log("Xato", e);
      });
  };
  useEffect(() => {
    fetchCatigories();
  }, []);

  if (!catigories.length) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  function Delete(id: number) {
  

    api
      .delete(`/api/categories/${id}`)
      .then(() => {
        setCatigories((i) => i.filter((item) => item.id !== id));
      })
      .catch((e) => {
        console.log("XATO!", e);
      });
  }

  return (
    <div className="pl-40  p-10 overflow-y-auto h-[600px]">
      <div className=" flex justify-between items-center mb-5">
        <AddCatigories onCatigoriesAdded={fetchCatigories} />
      </div>
      <Table
        style={{ height: 100 }}
        dataSource={catigories.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        })}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "description",
            dataIndex: "description",
            key: "description",
          },
          {
            key: "id",
            dataIndex: "id",
            title: "Delete / Edit",
            render: (id) => {
              return (
                <div className="flex gap-2">
                  <Button className="cursor-pointer" onClick={() => Delete(id)}>
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
    </div>
  );
}

export default Catigories;
