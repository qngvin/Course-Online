import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getTotalEarning } from "../../store/slices/adminSlice";

export default function RevenueChart() {
  const dispatch = useDispatch();
  const { revenue } = useSelector((state) => state.adminReducer);
  let currentTime = new Date();
  let year = currentTime.getFullYear();
  const months = [
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
  ];
  const formattedData = revenue?.map((item) => ({
    month: months[item.month - 1],
    money: item.earning,
  }));
  let totalRevenue = formattedData?.reduce((acc, month) => {
    return acc + month.money;
  }, 0);
  const formatEarning = (totalRevenue) => {
    if (totalRevenue >= 1000 && totalRevenue < 1000000) {
      return (totalRevenue / 1000).toFixed(1) + "k";
    } else if (totalRevenue >= 1000000 && totalRevenue < 1000000000) {
      return (totalRevenue / 1000000).toFixed(1) + "m";
    } else if (totalRevenue >= 1000000000) {
      return (totalRevenue / 1000000).toFixed(1) + "m";
    } else return totalRevenue
  };
  const totalrevenue = formatEarning(totalRevenue);
  return (
    <div className="col-span-8 relative h-96 p-4 border border-solid border-[#e8e8e8] rounded-[5px] hover:transform hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-box_shadow_10 transition-transform duration-300">
      <h1 className="text-center text-[20px] font-semibold">
        Revenue in Year ($)
      </h1>
      <div className="flex w-full justify-between">
        <h1 className="text-[20px] font-semibold text-[#61A3BA]">
          $ {totalrevenue}
        </h1>
        <div className="flex items-center gap-4">
          <button className="border border-solid py-2 px-4 rounded-[20px] bg-[#61A3BA] text-white">
            Month
          </button>
          <button className="border border-solid py-2 px-4 rounded-[20px] bg-[#f3f3f3] text-black">
            Quarter
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={formattedData}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 30,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#61A3BA" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#61A3BA" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="money"
            stroke="61A3BA"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
