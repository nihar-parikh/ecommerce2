import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const Months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  // const Months = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        // console.log(res.data);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        // console.log("list: ", list);
        list.map((item) =>
          setUserStats((prev) => [
            ...prev,
            {
              name: Months[item._id - 1],
              "Active User": item.total,
            },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUserStats();
  }, [Months]);

  // console.log(userStats);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
