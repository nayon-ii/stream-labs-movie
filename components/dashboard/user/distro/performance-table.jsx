import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PerformanceTable({ performanceData = [], isLoading = false }) {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Film</TableHead>
            <TableHead>Shared Date</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Earning</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
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
          <TableHead>Film</TableHead>
          <TableHead>Shared Date</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Earning</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {performanceData.length > 0 ? (
          performanceData.map((film) => (
            <TableRow key={film.film_id}>
              <TableCell>{film.film_title}</TableCell>
              <TableCell>{film.first_click_date}</TableCell>
              <TableCell>{film.film_clicks}</TableCell>
              <TableCell className="text-green-500">${film.film_earning}</TableCell>
              <TableCell>
                <Badge variant={
                  film.status === "Completed" ? "success" : 
                  film.status === "Failed" ? "destructive" : "warning"
                }>
                  {film.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              No performance data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
