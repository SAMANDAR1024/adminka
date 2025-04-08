import { Button, Drawer, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import CategoriesApi from "../../api/CategoriesApi";
import ProductApi from "../../api/ProductApi";
import { CatigoriesType, ProductType } from "../../type/type";

function EditProduct({
  item,
  set,
  fetchProducts,
}: {
  item?: ProductType;
  set: any;
  fetchProducts: () => void;
}) {
  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState<CatigoriesType[]>([]);

  useEffect(() => {
    CategoriesApi.getAll().then((res) => {
      setCategories(res.data.items);
    });
  }, []);
  if (!item) return null;
  return (
    <Drawer
      onClose={() => {
        set(undefined);
      }}
      open={item ? true : false}
    >
      {item && (
        <Form
          layout="vertical"
          initialValues={item}
          onFinish={(values) => {
            console.log("Yuborilayotgan ma’lumot:", values);
            setloading(true);

            ProductApi.update(item, values)
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                set(false);
                fetchProducts?.();
              })
              .catch((err) => {
                console.error(
                  "Xatolik yuz berdi:",
                  err.response?.data || err.message
                );
              })
              .finally(() => setloading(false));
          }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Foydalanuvchi ismi" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input placeholder="descriptionni kiriting" />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" placeholder="Narx Kiritin...!" />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <Input type="number" placeholder="MAxsulot sonini Kiritin...!" />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Input placeholder="Rasm URL manzilini kiriting" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="categoryId"
            rules={[{ required: true }]}
          >
            <Select
              options={categories.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
            />
            {/* <Input placeholder="category Id kiriting" /> */}
          </Form.Item>
          <Form.Item>
            <div className="flex gap-5 justify-end">
              <Button loading={loading} htmlType="submit" type="primary">
                {loading ? "Jo‘natilmoqda..." : "+ Qo‘shish"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}

export default EditProduct;
