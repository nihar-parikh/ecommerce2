import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function FeaturedInfo() {
  // const adminId = useSelector((state) => state.user.currentUser.otherInfo._id);
  // console.log("adminId: ", adminId);

  const [income, setIncome] = useState([]);
  const [incomePercent, setIncomePercent] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        // const res = await userRequest.get(`orders/income/${adminId}`);
        const res = await userRequest.get(
          `orders/income/6194ffccd6fdfb0d7791619d`
        );
        setIncome(res.data);
        setIncomePercent(
          ((res.data[1].total - res.data[0].total) / res.data[0].total) * 100
        );
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, []);
  console.log("income: ", income);
  console.log(incomePercent);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            INR {income[1] ? income[1].total : 2541}
          </span>
          {/* <span className="featuredMoney">INR 2514</span> */}
          <span className="featuredMoneyRate">
            {Math.floor(incomePercent)}%
            {incomePercent > 0 ? (
              <ArrowUpward className="featuredIcon" />
            ) : (
              <ArrowDownward className="featuredIcon negative" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
