import { Button, Drawer, Form, Input, Radio } from "antd";
import { useState } from "react";
import api from "../../api/api";
import { UserType } from "../../type/type";

function EditUser({ item, set, fetchUsers }: { item?: UserType; set: any ; fetchUsers:()=> void}) {
  const [loading, setloading] = useState(false);
  return (
    <Drawer
      onClose={() => {
        set(undefined);
      }}
      open={item ? true : false}
    >
      {/* {item && <div>{item.name}</div>} */}

      {item && (
        <Form
          initialValues={item}
          layout="vertical"
          onFinish={(values) => {
            setloading(true);

            api
              .patch(`/api/users/${item.id}`, {
                name: values.name,
                email: values.email,
                password: values.password,
                image: values.image,
                role: values.role,
              })
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                set(undefined)
                fetchUsers()
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
                {loading ? "O'zgartirilmoqda..." : "+ O'zgartirildi"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}

export default EditUser;
