import { Button, Drawer, Form, Input } from "antd";
import { useState } from "react";
import api from "../../api/api";
function AddProducts({ onProductAdded }: { onProductAdded?: () => void }) {
  const [openDriwer, setOpenDraver] = useState(false);
  const [loading, setloading] = useState(false);

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
            console.log("Yuborilayotgan ma’lumot:", values);
            setloading(true);

            api
              .post(`/api/products`, {
                name: values.name,
                description: values.description,
                price: Number(values.price),
                stock: Number(values.stock),
                imageUrl: values.imageUrl,
                categoryId: Number(values.categoryId),
              })
              .then((res) => {
                console.log("Serverdan javob:", res.data);
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
            <Input placeholder="Rasm URL manzilini kiriting" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="categoryId"
            rules={[{ required: true }]}
          >
            {/* <Select 
            options={}/> */}
            <Input placeholder="category Id kiriting" />
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
