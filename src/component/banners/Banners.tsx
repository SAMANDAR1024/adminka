import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { BannersType } from "../../type/type";
import AddBanners from "./AddBanners";
import EditBanner from "./EditBanner";
import BannersApi from "../../api/BannersApi";

function Banners() {
  const [banners, setBanners] = useState<BannersType[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerSelected, setBannerSelected] = useState<BannersType>();

  const fetchBanners = () => {
    setLoading(true);
    BannersApi.getAll({ limit: 10, page: 1 })
      .then((res) => {
        setBanners(res.data.items);
      })
      .catch((e) => {
        console.log("Xato", e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchBanners();
  }, []);

  //   if (loading) {
  //     return (
  //       <div className=" absolute left-[50%] top-[50%]  inset-0">
  //         <div className="w-16 h-16 border-4 border-t-transparent border-gray-900 rounded-full animate-spin"></div>
  //       </div>
  //     );
  //   }

  function Delete(id: number) {
    api
      .delete(`/api/banners/${id}`)
      .then(() => {
        setBanners((i) => i.filter((item) => item.id !== id));
      })
      .catch((e) => {
        console.log("XATO!", e);
      });
  }

  return (
    <div className="pl-40  p-10 overflow-y-auto h-[600px]">
      <div className=" flex justify-between items-center mb-5">
        <AddBanners onBannersAdded={fetchBanners} />
      </div>
      <Table
        loading={loading}
        style={{ height: 100 }}
        dataSource={banners}
        columns={[
          {
            key: "id",
            title: "Id",
            dataIndex: "id",
          },
          {
            key: "title",
            title: "Title",
            dataIndex: "title",
          },

          {
            key: "imageUrl",
            title: "Image",
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
            key: "isActive",
            title: "isActive",
            dataIndex: "isActive",
            render: (isActive, record) => {
              const handleToggle = (checked: boolean) => {
                setBanners((prev) =>
                  prev.map((item) => {
                    return item.id === record.id
                      ? { ...item, isActive: checked }
                      : item;
                  })
                );
                api
                  .patch(`/api/banners/${record.id}`, { isActive: checked })
                  .then(() => {
                    message.success(`Banner holati yangilandi`);
                  })
                  .catch(() => {
                    message.error(`Xatolik yuz berdi`);
                  });
              };

              return <Switch checked={isActive} onChange={handleToggle} />;
            },
          },
          {
            key: "createdAt",
            title: "CreatedAt",
            dataIndex: "createdAt",
          },
          {
            key: "id",
            dataIndex: "id",
            title: "Delete / Edit",
            render: (id, malumot) => {
              return (
                <div className="flex gap-2">
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      setBannerSelected(malumot);
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
      <EditBanner
        item={bannerSelected}
        set={setBannerSelected}
        fetchBanners={fetchBanners}
      />
    </div>
  );
}

export default Banners;
