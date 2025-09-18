import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApproveOrRejectFilmMutation } from "@/redux/store/api/adminApi";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function FilmApprovalTable({ films = [], isLoading = false }) {
  const [approveOrRejectFilm, { isLoading: isProcessing }] = useApproveOrRejectFilmMutation();

  const handleApproval = async (filmId, action) => {
    try {
      await approveOrRejectFilm({ film_id: filmId, action }).unwrap();
      toast.success(`Film ${action.toLowerCase()}d successfully`);
    } catch (error) {
      console.error("Error processing film:", error);
      toast.error(error?.data?.message || `Failed to ${action.toLowerCase()} film`);
    }
  };

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><div className="bg-muted animate-pulse rounded h-16"></div></TableCell>
              <TableCell><div className="bg-muted animate-pulse rounded h-4"></div></TableCell>
              <TableCell><div className="bg-muted animate-pulse rounded h-8"></div></TableCell>
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
          <TableHead>Preview</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {films.length > 0 ? (
          films.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell className="flex items-center gap-3">
                <Link href={`/film/${movie.id}`} className="shrink-0">
                  <Image
                    src={movie.thumbnail}
                    alt={movie.title}
                    width={50}
                    height={100}
                    className="rounded-sm object-cover aspect-[2/3] w-10 h-16"
                  />
                </Link>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-medium truncate">
                    {movie.title}
                  </h3>
                  <p className="text-left text-secondary-foreground">
                    {movie.film_type}
                  </p>
                </div>
              </TableCell>
              <TableCell>{movie.release_date}</TableCell>
              <TableCell>
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="secondary"
                    onClick={() => handleApproval(movie.id, "Approve")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Approve"}
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleApproval(movie.id, "Reject")}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Reject"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="flex items-center gap-3">
              No films pending approval
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
