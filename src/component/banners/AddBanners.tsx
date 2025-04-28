import { Button, Drawer, Form, Input, Switch, Upload } from "antd";
import { useState } from "react";
import BannersApi from "../../api/BannersApi";
function AddBanners({ onBannersAdded }: { onBannersAdded?: () => void }) {
  const [openDriwer, setOpenDraver] = useState(false);
  const [loading, setloading] = useState(false);

  return (
    <div className="container m-auto">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl p-2">Banners</h1>
        <Button type="primary" onClick={() => setOpenDraver(true)}>
          + Add Banners
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
            BannersApi.getAdd(values)
              .then((res) => {
                console.log("Serverdan javob:", res.data);
                setOpenDraver(false);
                onBannersAdded?.();
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
            rules={[{ required: true }]}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Image URL"
          >
            <Upload
              name="file"
              action={`https://nt.softly.uz/api/files/upload`}
            >
              <Button>Click to Upload</Button>
            </Upload>{" "}
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

export default AddBanners;
