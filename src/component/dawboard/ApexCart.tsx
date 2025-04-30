import ReactApexChart from "react-apexcharts";
import { ChartType } from "./Dashboard";

export const ApexCart = ({ chart }: { chart: ChartType }) => {
  return (
    <div>
      {chart ? (
        <ReactApexChart
          series={[
            {
              name: "series1",
              data: chart.map((item) => {
                return Number(item.count);
              }),
            },
          ]}
          options={{
            chart: {
              height: 350,
              type: "area",
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              type: "datetime",
              categories: chart.map((i) => {
                return i.date;
              }),
            },
            tooltip: {
              x: {
                format: "dd/MM/yy HH:mm",
              },
            },
          }}
          type="area"
          height={350}
        />
      ) : (
        <>
          <div>Malumot yoq </div>
        </>
      )}
    </div>
  );
};
