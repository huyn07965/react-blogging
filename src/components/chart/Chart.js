import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ post, user }) => {
  const [postLength, setPostLength] = useState([]);
  const [userLength, setUserLength] = useState([]);

  useEffect(() => {
    const groupDataByMonth = (data) => {
      const postLengthByMonth = Array(12).fill(0);
      data.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const month = createdAt.getMonth();
        postLengthByMonth[month]++;
      });
      return postLengthByMonth;
    };
    const groupedData = groupDataByMonth(post);
    setPostLength(groupedData);
  }, [post]);

  useEffect(() => {
    const groupDataByMonth = (data) => {
      const userLengthByMonth = Array(12).fill(0);
      data.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const month = createdAt.getMonth();
        userLengthByMonth[month]++;
      });
      return userLengthByMonth;
    };
    const groupedData = groupDataByMonth(user);
    setUserLength(groupedData);
  }, [user]);

  console.log("userLength", userLength);

  const data = {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Bài viết",
        data: postLength?.map((postLength) => postLength),
        backgroundColor: "#33FFBD",
        borderColor: "#33FFBD",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Tài khoản",
        data: userLength?.map((userLength) => userLength),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={data} />
    </div>
  );
};

export default Chart;
