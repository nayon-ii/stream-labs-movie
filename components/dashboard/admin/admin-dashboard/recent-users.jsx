import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersTable from "../users-table";
import { useGetAdminDashboardQuery } from "@/redux/store/api/adminApi";

export default function RecentUsers() {
  const { data: dashboardResponse, isLoading } = useGetAdminDashboardQuery();
  const newSignups = dashboardResponse?.new_signups || [];

  return (
    <Card className="my-5">
      <CardHeader>
        <CardTitle>New Signups</CardTitle>
        <CardDescription>
          See who recently registered and joined your community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable users={newSignups.map(user => ({
          id: user.user_id,
          name: user.full_name,
          email: user.email,
          joiningDate: user.joining_date,
        }))} />
      </CardContent>
    </Card>
  );
}
