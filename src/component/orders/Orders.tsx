
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/api";
import ProductApi from "../../api/ProductApi";
import UserApi from "../../api/UserApi";
import {
  OrderItemsType,
  OrderType,
  ProductType,
  UserType,
} from "../../type/type";

function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType[]>([]);
  const [product, setProduct] = useState<ProductType[]>([]);

  const fetchOrders = () => {
    setLoading(true);
    api
      .get("/api/orders?limit=10&page=1&order=ASC")
      .then((res) => {
        setOrders(res.data.items);
      })
      .catch((e) => {
        console.log("Xato", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchOrders();
    UserApi.getAll({ limit: 10, page: 1 }).then((res) => {
      setUser(res.data.items);
    });

    ProductApi.getAll().then((res) => {
      setProduct(res.data.items);
    });
  }, []);

  if (loading) {
    return (
      <div className=" absolute left-[50%] top-[50%]  inset-0">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  function Delete(id: number) {
    api
      .delete(`/api/orders/${id}`)
      .then(() => {
        setOrders((i) => i.filter((item) => item.id !== id));
      })
      .catch((e) => {
        console.log("XATO!", e);
      });
  }

  return (
    <div className="pl-40  p-10 overflow-y-auto h-[600px]">
      <div className=" flex justify-between items-center mb-5">
      </div>
      <Table
        style={{ height: 100 }}
        dataSource={orders}
        rowKey={"id"}
        columns={[
          {
            key: "id",
            title: "Id",
            dataIndex: "id",
          },

          {
            key: "customerId",
            title: "Name",
            dataIndex: "customerId",
            render: (customerId) => {
              const NewUser = user.find((item) => {
                return customerId === item.id;
              });
              return NewUser?.name;
            },
          },
          {
            key: "productId",
            title: "Maxsulot Nomi",
            dataIndex: "items",
            render: (items: any) => {
              return (
                <div>
                  {items.map((i: OrderItemsType) => {
                    const newProduct = product.find((ProductItem) => {
                      return ProductItem.id === i.productId;
                    });
                    return newProduct?.name;
                  })}
                </div>
              );
            },
          },
          {
            key: "status",
            title: "status",
            dataIndex: "status",
          },
          {
            key: "totalPrice",
            title: "Price",
            dataIndex: "totalPrice",
            render: (i, narx) => {
              return <div key={i}>{(narx.totalPrice).toLocaleString("ru")} So`m</div>;
            },
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
            key: "id",
            dataIndex: "id",
            title: "Delete / Edit",
            render: (id) => {
              return (
                <div className="flex gap-2">
                  <Button
                    className="cursor-pointer"
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
    </div>
  );
}

export default Orders;
