import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/api";
import UseMyStore from "../../store/UseMyStore";
import { ProductType } from "../../type/type";
import AddProducts from "./AddProduct";

function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const Token =
    localStorage.getItem("accessToken") ||
    UseMyStore((state) => state.accessToken);

  const fetchProducts = () => {
    api
      .get("/api/products?limit=10&page=1&order=ASC", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setProducts(res.data.items);
      })
      .catch((e) => {
        console.log("Xato", e);
      });
  };
  useEffect(() => {
    fetchProducts();
  }, [Token]);

  if (!products.length) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  function Delete(id: number) {
    api
      .delete(`/api/products/${id} `, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
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
        dataSource={products.map((item) => {
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
            title: "Qolganlar",
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
