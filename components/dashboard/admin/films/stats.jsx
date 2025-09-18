import { useGetAdminFilmsQuery } from "@/redux/store/api/adminApi";
import StatsCard from "../stats-card";
import { 
  Video01Icon, 
  Dollar01Icon, 
  CreditCardIcon 
} from "@hugeicons/core-free-icons/index";

export default function AdminFilmsStats() {
  const { data: filmsResponse, isLoading } = useGetAdminFilmsQuery();
  const stats = filmsResponse?.stats || {};

  const adminFilmsStats = [
    {
      heading: "Total Films",
      value: stats.total_films || 0,
      icon: Video01Icon,
    },
    {
      heading: "Total Buy Revenue",
      value: stats.total_buy || 0,
      icon: Dollar01Icon,
      isDollar: true,
      isGreen: true,
    },
    {
      heading: "Total Rent Revenue",
      value: stats.total_rent || 0,
      icon: CreditCardIcon,
      isDollar: true,
      isGreen: true,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-secondary animate-pulse rounded-md h-24"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 my-5">
      {adminFilmsStats.map((stat, i) => (
        <StatsCard key={i} stat={stat} />
      ))}
    </div>
  );
}
