
// function AddCatigories() {
//   return (
//     <div>AddCatigories</div>
//   )
// }

// export default AddCatigories
import { Button, Drawer, Form, Input } from "antd";
import { useState } from "react";
import api from "../../api/api";
function AddCatigories({ onCatigoriesAdded }: { onCatigoriesAdded?: () => void }) {
  const [openDriwer, setOpenDraver] = useState(false);
  const [loading, setloading] = useState(false);


  return (
    <div className="container m-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Catigories</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Add user
        </Button>
      </div>

      <Drawer
        title="New Catigories"
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
              .post(
                `/api/categories`,
                {
                    name: values.name,
                    description: values.description,
                }
              )
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                setOpenDraver(false);
                onCatigoriesAdded?.();
              })
              .catch((err) => {
                console.error("Xatolik yuz berdi", err.message);
              })
              .finally(() => setloading(false));
          }}
        >
           <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input placeholder="Foydalanuvchi ismi" />
          </Form.Item>
          <Form.Item name="description" label="description" rules={[{ required: true }]}>
            <Input placeholder="descriptionni kiriting" />
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

export default AddCatigories;
