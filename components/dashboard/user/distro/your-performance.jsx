import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PerformanceTable from "./performance-table";
import { useGetDistroBalanceQuery } from "@/redux/store/api/distroApi";

export default function YourPerformance() {
  const { data: distroResponse, isLoading } = useGetDistroBalanceQuery();
  const performanceData = distroResponse?.per_film || [];

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>Your Performance</CardTitle>
        <CardDescription>Track your Distro sharing results</CardDescription>
      </CardHeader>
      <CardContent>
        <PerformanceTable performanceData={performanceData} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
