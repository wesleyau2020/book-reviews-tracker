// BooksCompletedChart.js
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const BooksCompletedChart = (books) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios
      .get("http://localhost:8080/api/statistics/books-completed", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
  }, [books]);

  if (!chartData) return <CircularProgress />;

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
