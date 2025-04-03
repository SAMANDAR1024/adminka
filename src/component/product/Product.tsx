import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { CatigoriesType, ProductType } from "../../type/type";
import AddProducts from "./AddProduct";

function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [catigoria, setCatigoria] = useState<CatigoriesType[]>([]);

  const fetchProducts = () => {
    api
      .get("/api/products?limit=10&page=1&order=ASC")
      .then((res) => {
        setProducts(res.data.items);
      })
      .catch((e) => {
        console.log("Xato", e);
      });
  };
  useEffect(() => {
    fetchProducts();

    api.get("/api/categories?limit=10&page=1&order=ASC").then((res) => {
      // console.log(res.data.items);

      setCatigoria(res.data.items);
    });
  }, []);

  if (!products.length) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  function Delete(id: number) {
    api
      .delete(`/api/products/${id}`)
      .then(() => {
        setProducts((i) => i.filter((item) => item.id !== id));
      })
      .catch((e) => {
        console.log("XATO!", e);
      });
  }

  return (
    <div className="pl-40  p-10 overflow-y-auto h-[600px]">
      <div className=" flex justify-between items-center mb-5">
        <AddProducts onProductAdded={fetchProducts} />
      </div>
      <Table
        style={{ height: 100 }}
        dataSource={products}
        rowKey={"id"}
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
            key: "categoryId",
            title: "CategoryId",
            dataIndex: "categoryId",
            render: (categoryId) => {
              const categor = catigoria.find((i) => {
                return i.id === categoryId;
              });
              return categor?.name;
            },
          },
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
          },
          {
            key: "price",
            title: "Price",
            dataIndex: "price",
            render: (i, narx) => {
              return <div key={i}>${narx.price}</div>;
            },
          },
          {
            key: "stock",
            title: "Qolganlar",
            dataIndex: "stock",
          },
          {
            key: "createdAt",
            title: "Vaqti",
            dataIndex: "createdAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
            },
          },
          {
            key: "imageUrl",
            title: "imageUrl",
            dataIndex: "imageUrl",
            render: (imageUrl) => {
              return (
                <>
                  <img className="rounded w-10" src={imageUrl} alt="" />
                </>
              );
            },
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

export default Product;
