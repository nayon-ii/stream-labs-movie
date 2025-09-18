import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetReelBuxBalanceQuery } from "@/redux/store/api/reelbuxApi";

export default function TransactionHistory() {
  const { data: reelBuxResponse, isLoading } = useGetReelBuxBalanceQuery();
  const transactions = reelBuxResponse?.txn_data || [];

  if (isLoading) {
    return (
      <div className="my-5 bg-secondary py-5 md:py-10 px-5 rounded-md">
        <h3 className="text-2xl font-medium">Transaction History</h3>
        <p className="text-secondary-foreground">Loading transactions...</p>
        <div className="mt-5 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-muted animate-pulse rounded h-12"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-5 bg-secondary py-5 md:py-10 px-5 rounded-md">
      <h3 className="text-2xl font-medium">Transaction History</h3>
      <p className="text-secondary-foreground">
        View your transaction history here
      </p>

      {/* rendering Table */}
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>{transaction.source}</TableCell>
                <TableCell>{transaction.tx_type}</TableCell>
                <TableCell className={
                  transaction.status === "Completed" ? "text-green-500" : 
                  transaction.status === "Failed" ? "text-destructive" : ""
                }>
                  {transaction.status === "Failed" ? "-" : "+"}${transaction.amount}
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Badge variant={
                    transaction.status === "Completed" ? "success" : 
                    transaction.status === "Failed" ? "destructive" : "warning"
                  }>
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
