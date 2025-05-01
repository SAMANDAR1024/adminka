

import { Button, Drawer, Form, Input } from "antd";
import { useState } from "react";
import CategoriesApi from "../../api/CategoriesApi";
import { CatigoriesType } from "../../type/type";

function EditCategories({
  item,
  set,
  fetchCatigories,
}: {
  item?: CatigoriesType;
  set: any;
  fetchCatigories: () => void;
}) {
  const [loading, setloading] = useState(false);
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
            setloading(true);

            CategoriesApi.update(item, values)
              .then(() => {
                set(false);
                fetchCatigories?.();
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
          <Form.Item
            name="description"
            label="description"
            rules={[{ required: true }]}
          >
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
      )}
    </Drawer>
  );
}

export default EditCategories;
