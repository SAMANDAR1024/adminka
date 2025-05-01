import { Button, Drawer, Form, Input, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import CategoriesApi from "../../api/CategoriesApi";
import ProductApi from "../../api/ProductApi";
import { CatigoriesType } from "../../type/type";
function AddProducts({ onProductAdded }: { onProductAdded?: () => void }) {
  const [openDriwer, setOpenDraver] = useState(false);
  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState<CatigoriesType[]>([]);

  useEffect(() => {
    CategoriesApi.getAll().then((res) => {
      setCategories(res.data.items);
    });
  }, []);
  return (
    <div className="container m-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Product</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Add Product
        </Button>
      </div>

      <Drawer
        title="New Product"
        width={500}
        onClose={() => setOpenDraver(false)}
        open={openDriwer}
        styles={{
          body: { paddingBottom: 80 },
        }}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            setloading(true);

            ProductApi.getAdd(values)
              .then(() => {
                setOpenDraver(false);
                onProductAdded?.();
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
            <Upload
              name="file"
              action={`https://nt.softly.uz/api/files/upload`}
            >
              <Button>Click to Upload</Button>
            </Upload>
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
          </Form.Item>
          <Form.Item>
            <div className="flex gap-5 justify-end">
              <Button loading={loading} htmlType="submit" type="primary">
                {loading ? "Jo‘natilmoqda..." : "+ Qo‘shish"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default AddProducts;
