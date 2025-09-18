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
import { useGetAdminPaymentsQuery } from "@/redux/store/api/adminApi";
import {
  ArrowDownLeft01Icon,
  ArrowUpRight01Icon,
  ReloadIcon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";

export default function RecentTransactionsTable() {
  const { data: paymentsResponse, isLoading } = useGetAdminPaymentsQuery();
  const transactions = paymentsResponse?.transactions_list || [];

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
              <TableHead>Type</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Pay. Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction, i) => (
                <TableRow key={i}>
                  <TableCell className="flex gap-2 justify-center">
                    <HugeiconsIcon
                      icon={
                        transaction.status === "Failed"
                          ? ArrowDownLeft01Icon
                          : transaction.status === "Pending"
                          ? ReloadIcon
                          : ArrowUpRight01Icon
                      }
                      className={
                        transaction.status === "Failed"
                          ? "text-destructive"
                          : transaction.status === "Pending"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    />
                    {transaction.tx_type}
                  </TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell
                    className={
                      transaction.status === "Failed"
                        ? "text-destructive"
                        : transaction.status === "Pending"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {transaction.status === "Failed" ? "" : "+"}
                    ${transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.payment_method}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Failed"
                          ? "destructive"
                          : transaction.status === "Pending"
                          ? "warning"
                          : "success"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="flex gap-2 justify-center">
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
