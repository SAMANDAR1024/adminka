import { Button, Drawer, Form, Input, Radio } from "antd";
import { useState } from "react";
import UserApi from "../../api/UserApi";
function AddUser({ onUserAdded }: { onUserAdded?: () => void }) {
  const [openDriwer, setOpenDraver] = useState(false);
  const [loading, setloading] = useState(false);

  return (
    <div className="container m-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Users</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Add user
        </Button>
      </div>

      <Drawer
        title="New User"
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

            UserApi.getAdd(values)
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                setOpenDraver(false);
                onUserAdded?.();
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
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input placeholder="Emailni kiriting" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, min: 5 }]}
          >
            <Input type="password" placeholder="Kamida 5 ta belgi" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Input placeholder="Rasm URL manzilini kiriting" />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Radio.Group
              options={[
                { label: "Customer", value: "customer" },
                { label: "Admin", value: "admin" },
              ]}
              optionType="button"
              buttonStyle="solid"
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

export default AddUser;
