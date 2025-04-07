import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { CatigoriesType } from "../../type/type";
import AddCatigories from "./AddCatigories";
import EditCategories from "./EditCategories";

function Catigories() {
  const [catigories, setCatigories] = useState<CatigoriesType[]>([]);
  const [categoriesSelected, setCategoriesSelected] =
    useState<CatigoriesType>();
  const [loading, setloading] = useState(true);

  const fetchCatigories = () => {
    setloading(true)
    api
      .get("/api/categories?limit=10&page=1&order=ASC")
      .then((res) => {
        setCatigories(res.data.items);
      })
      .catch((e) => {
        console.log("Xato", e);
      }).finally(()=>{
        setloading(false)
      })
  };
  useEffect(() => {
    fetchCatigories();
  }, []);

  // if (!catigories.length) {
  //   return (
  //     <div className=" absolute left-[50%] top-[50%]  inset-0">
  //       <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
  //     </div>
  //   );
  // }

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
      loading={loading}
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
            render: (id, categories_m) => {
              return (
                <div className="flex gap-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      setCategoriesSelected(categories_m);
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

      <EditCategories
        item={categoriesSelected}
        set={setCategoriesSelected}
        fetchCatigories={fetchCatigories}
      />
    </div>
  );
}

export default Catigories;
