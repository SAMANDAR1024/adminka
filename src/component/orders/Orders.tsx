// function Orders() {
//   return (
//     <div>Orders</div>
//   )
// }

// export default Orders

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { OrderType } from "../../type/type";

function Orders() {

  const [orders, setOrders] = useState<OrderType[]>([])  
  const [loading, setLoading] = useState(true);
  //   const [ProductSelected, setProductSelected] = useState<ProductType>();

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
    // api.get("/api/categories?limit=10&page=1&order=ASC").then((res) => {
    //   setCatigoria(res.data.items);
    // });
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
      .delete(`/api/products/${id}`)
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
        {/* <AddOrders onProductAdded={fetchOrders} /> */}
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
                  <Button
                    className="cursor-pointer"
                    // onClick={() => {
                    //   setProductSelected(m);
                    // }}
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
      {/* <EditOrders
        item={ProductSelected}
        set={setProductSelected}
        fetchOrders={fetchOrders}
      /> */}
    </div>
  );
}

export default Orders;
