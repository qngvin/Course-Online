import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { AreaChart, Area } from "recharts";

export default function StatisticsChart({
  title,
  icon,
  bgIcon,
  total,
  data,
  dataKey,
  growth,
}) {
  const iconStyle = {
    width: "1.1rem",
    height: "1.1rem",
    color: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    backgroundColor: bgIcon,
  };
  return (
    <div className="col-span-3 p-2 h-32 border border-solid border-[#e8e8e8] rounded-[5px] hover:transform hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-box_shadow_10 transition-transform duration-300">
      <div className="flex items-center gap-4 pb-4">
        <FontAwesomeIcon style={iconStyle} icon={icon} />
        <h1>{title}</h1>
      </div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold text-[20px]">
            {title === "Overall earnings" ? `$ ${total/20000}` : total}
          </h1>
          <p className={`${growth < 0 ? "text-red-500" : "text-[#3c7b42]"}`}>
            <FontAwesomeIcon
              icon={growth < 0 ? faArrowTrendDown : faArrowTrendUp}
              className="mr-2"
            />
            {growth}% last month
          </p>
        </div>
        <div>
          <AreaChart
            width={100}
            height={70}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 20,
            }}
          >
            {growth > 0 ? (
              <>
                {" "}
                <defs>
                  <linearGradient
                    id="earningsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={"#82ca9d"} stopOpacity={0.9} />
                    <stop
                      offset="95%"
                      stopColor={"#82ca9d"}
                      stopOpacity={0.2}
                    />
                  </linearGradient>
                </defs>
              </>
            ) : (
              <defs>
                <linearGradient
                  id="earningsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={"#ff0011"} stopOpacity={0.9} />
                  <stop offset="95%" stopColor={"#ff0011"} stopOpacity={0.2} />
                </linearGradient>
              </defs>
            )}

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="transparent"
              fill="url(#earningsGradient)"
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
}
