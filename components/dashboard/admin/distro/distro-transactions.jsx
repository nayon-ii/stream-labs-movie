import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAdminDistroReportQuery } from "@/redux/store/api/adminApi";

export default function DistroTransactions() {
  const { data: distroResponse, isLoading } = useGetAdminDistroReportQuery();
  const userWiseData = distroResponse?.user_wise || [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Loading transactions...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded h-12"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          Review the latest payment activities, including status, method, and
          amount.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Total Earnings</TableHead>
              <TableHead>Total clicks</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userWiseData.length > 0 ? (
              userWiseData.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell
                    className={
                      user.status === "failed"
                        ? "text-destructive"
                        : user.status === "pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {user.status === "failed" ? "" : "+"}$
                    {user.total_earning}
                  </TableCell>
                  <TableCell>{user.total_clicks}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "failed"
                          ? "destructive"
                          : user.status === "pending"
                          ? "warning"
                          : "success"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
