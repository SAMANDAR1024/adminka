import { Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChartType, DashboardType } from "../../type/type";
import { ApexCart } from "./ApexCart";


function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardType>();
  const [loading, setLoading] = useState(true);
  const [chart, setChart] = useState<ChartType>([]);
  const [value1, setValue1] = useState("2025-04-10");
  const [value2, setValue2] = useState("2025-04-29");
  useEffect(() => {
    axios
      .get(`https://nt.softly.uz/api/statistics/dashboard`)
      .then((res) => {
        setDashboard(res.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("xatolik");
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .post(`https://nt.softly.uz/api/statistics/daily-order-counts`, {
        startDate: value1,
        endDate: value2,
      })
      .then((res) => {
        setChart(res.data);
      })
      .catch((err) => {
        console.error("Xatolik yuz berdi:", err.response?.data || err.message);
      });
  }, [value1, value2]);

  return (
    <div className="container pl-40 mx-auto p-8 bg-gray-50 h-[620px] overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <p className="text-gray-600 text-sm mb-2">Foydalanuvchilar</p>
          <div className="text-2xl font-bold text-gray-900">
            {loading ? <Spin size="small" /> : `${dashboard?.totalUsers} ta`}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <p className="text-gray-600 text-sm mb-2">Mahsulotlar</p>
          <div className="text-2xl font-bold text-gray-900">
            {loading ? <Spin size="small" /> : `${dashboard?.totalProducts} ta`}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <p className="text-gray-600 text-sm mb-2">Umumiy Daromad</p>
          <div className="text-2xl font-bold text-emerald-600">
            {loading ? (
              <Spin size="small" />
            ) : (
              `${Number(dashboard?.totalRevenue).toLocaleString("ru")} som`
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
          <p className="text-gray-600 text-sm mb-2">Buyurtmalar</p>
          <div className="text-2xl font-bold text-gray-900">
            {loading ? <Spin size="small" /> : `${dashboard?.totalOrders} ta`}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Oxirgi Buyurtmalar</h2>
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center">
                <Spin />
              </div>
            ) : (
              dashboard?.recentOrders.map((item) => (
                <div key={item.id} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Buyurtma #{item.id}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Yetkazildi"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Jarayonda"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Mijoz ID: {item.customerId}
                    </span>
                    <span className="font-medium">
                      {item.totalPrice.toLocaleString("ru")} so'm
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Top Mahsulotlar</h2>
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center">
                <Spin />
              </div>
            ) : (
              dashboard?.topProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.totalSold} ta sotilgan
                    </p>
                  </div>
                  <div className="max-w-32 ml-4">
                    <div className="h-2 bg-gray-200 rounded-full ">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${(item.totalSold / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ApexCart chart={chart} />
      <Form layout="vertical">
        <Form.Item
          name="startDate"
          label={"Boshlanish Sanasi...!"}
          rules={[{ required: true }]}
        >
          <Input
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            type="date"
            style={{ width: 300 }}
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          label={"Tugash sanasi!"}
          rules={[{ required: true }]}
        >
          <Input
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            type="date"
            style={{ width: 300 }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Dashboard;
