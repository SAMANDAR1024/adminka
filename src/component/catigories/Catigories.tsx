import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import CategoriesApi from "../../api/CategoriesApi";
import { CatigoriesType } from "../../type/type";
import AddCatigories from "./AddCatigories";
import EditCategories from "./EditCategories";

function Catigories() {
  const [catigories, setCatigories] = useState<CatigoriesType[]>([]);
  const [categoriesSelected, setCategoriesSelected] =
    useState<CatigoriesType>();
  const [loading, setloading] = useState(true);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(6);
  const limit = 2;

  const fetchCatigories = useCallback((pageNumber = 1) => {
    setloading(true);
    CategoriesApi.getAll({ limit: limit, page: pageNumber })
      .then((res) => {
        setCatigories(res.data.items);
        setTotal(res.data.total);
      })
      .catch((e) => {
        console.log("Xato", e);
      })
      .finally(() => {
        setloading(false);
      });
  }, []);
  useEffect(() => {
    fetchCatigories(page);
  }, [page]);

  function Delete(id: number) {
    CategoriesApi.delete(id)
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
        pagination={{
          pageSize: limit,
          defaultCurrent: page,
          total: total,
          onChange: (page) => setPage(page),
        }}
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
