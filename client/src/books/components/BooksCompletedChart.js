// BooksCompletedChart.js
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axios from "axios";

const BooksCompletedChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/statistics/books-completed", {
        auth: {
          username: "admin@local.com",
          password: "password",
        },
      })
      .then((response) => {
        const data = response.data;
        const categories = Object.keys(data);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const series = categories.map((category) => ({
          name: category,
          type: "bar",
          data: data[category],
        }));

        setChartData({ months, series });
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  }, []);

  if (!chartData) return <div>Loading...</div>;

  const option = {
    title: {
      //   text: "Books Completed by Genre in 2024",
      //   top: "-1%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: chartData.series.map((s) => s.name),
    },
    xAxis: {
      type: "category",
      data: chartData.months,
      //   name: "Month",
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      name: "Books Read",
    },
    series: chartData.series,
  };

  return <ReactECharts option={option} />;
};

export default BooksCompletedChart;
