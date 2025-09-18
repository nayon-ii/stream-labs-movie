import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SubscriberDeleteAlert from "./subscriber-delete-alert";

export default function RenderSubscribersTable({ subscribers = [], isLoading = false }) {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><div className="bg-muted animate-pulse rounded h-4"></div></TableCell>
              <TableCell><div className="bg-muted animate-pulse rounded h-4"></div></TableCell>
              <TableCell><div className="bg-muted animate-pulse rounded h-4"></div></TableCell>
              <TableCell><div className="bg-muted animate-pulse rounded h-4"></div></TableCell>
              <TableCell><div className="bg-muted animate-pulse rounded h-4"></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscribers.length > 0 ? (
          subscribers.map((subscriber, i) => (
            <TableRow key={i}>
              <TableCell>{subscriber.full_name}</TableCell>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>{subscriber.plan_name}</TableCell>
              <TableCell>{subscriber.current_period_start}</TableCell>
              <TableCell>
                <SubscriberDeleteAlert subscriber={subscriber} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              No subscribers found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
