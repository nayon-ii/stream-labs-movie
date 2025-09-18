import React from "react";
import StatsCard from "../stats-card";
import { useGetAdminDistroReportQuery } from "@/redux/store/api/adminApi";
import { 
  Dollar01Icon, 
  MouseLeftClick06Icon, 
  UserIcon 
} from "@hugeicons/core-free-icons/index";

export default function AdminDistroStats() {
  const { data: distroResponse, isLoading } = useGetAdminDistroReportQuery();
  const {
    total_earning = 0,
    total_clicks = 0,
    user_wise = [],
  } = distroResponse || {};

  const adminDistroStats = [
    {
      heading: "Total Earnings",
      value: total_earning,
      icon: Dollar01Icon,
      isDollar: true,
      isGreen: true,
    },
    {
      heading: "Total Clicks",
      value: total_clicks,
      icon: MouseLeftClick06Icon,
    },
    {
      heading: "Active Users",
      value: user_wise.length,
      icon: UserIcon,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-secondary animate-pulse rounded-md h-24"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminDistroStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
