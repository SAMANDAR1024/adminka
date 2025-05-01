import { Button, Drawer, Form, Input, Switch } from "antd";
import { useState } from "react";
import BannersApi from "../../api/BannersApi";
import { BannersType } from "../../type/type";

function EditBanner({
  item,
  set,
  fetchBanners,
}: {
  item?: BannersType;
  set: any;
  fetchBanners: () => void;
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

            if (!item?.id) {
              console.error("ID topilmadi");
              return;
            }
            setloading(true);

            BannersApi.update(item, values)

              .then(() => {
                set(false);
                fetchBanners?.();
              })
              .catch((err) => {
                console.error("Xatolik yuz berdi", err.message);
              })
              .finally(() => setloading(false));
          }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Title Yozing...." />
          </Form.Item>
          <Form.Item
            name="isActive"
            label="isActive"
            valuePropName="checked"
            rules={[{ required: true }]}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Input placeholder="Rasm URL manzilini kiriting" />
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

export default EditBanner;
