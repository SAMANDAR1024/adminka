import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import CategoriesApi from "../../api/CategoriesApi";
import ProductApi from "../../api/ProductApi";
import { CatigoriesType, ProductType } from "../../type/type";
import AddProducts from "./AddProduct";
import EditProduct from "./EditProduct";

function Product() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [catigoria, setCatigoria] = useState<CatigoriesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [ProductSelected, setProductSelected] = useState<ProductType>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(6);
  const limit = 2;

  const fetchProducts = useCallback((pageNumber = 1) => {
    setLoading(true);
    ProductApi.getAll({ limit: limit, page: pageNumber })
      .then((res) => {
        setProducts(res.data.items);
        setTotal(res.data.total);
      })
      .catch((e) => {
        console.log("Xato", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    ProductApi.getAll({ limit, page }) // ← bevosita page dan foydalanamiz
      .then((res) => {
        setProducts(res.data.items);
        setTotal(res.data.total);
      })
      .catch((e) => console.log("Xato", e))
      .finally(() => setLoading(false));

    CategoriesApi.getAll()
    .then((res) => {
      setCatigoria(res.data.items);
      
    }).catch((e)=>{
      console.error("Kategoriyaadan hatooo" , e);
      
    })
  }, [page]);

  function Delete(id: number) {
    ProductApi.delete(id)
      .then(() => {
        fetchProducts(page);
      })
      .catch((e) => {
        console.log("XATO!", e);
      });
  }

  return (
    <div>
      <div className="pl-40  p-10 overflow-y-auto h-[600px]">
        <div className=" flex justify-between items-center mb-5">
          <AddProducts onProductAdded={() => fetchProducts(page)} />
        </div>
        <Table
          loading={loading}
          pagination={{
            pageSize:limit,
            defaultCurrent:page,
            total:total,
            onChange: (page) => setPage(page),
          }}
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
              render: (id, m) => {
                return (
                  <div className="flex gap-2">
                    <Button
                      className="cursor-pointer"
                      onClick={() => {
                        setProductSelected(m);
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
        <EditProduct
          item={ProductSelected}
          set={setProductSelected}
          fetchProducts={() => fetchProducts(page)}
        />
      </div>
      
    </div>
  );
}

export default Product;
