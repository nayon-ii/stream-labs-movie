import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete02Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import FilmDeleteDialog from "./film-delete-dialog";
import { Badge } from "@/components/ui/badge";

export default function AllFilmsTable({ films = [], isLoading = false }) {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Revenue</TableHead>
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
          <TableHead>Title</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Upload Date</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Revenue</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {films.length > 0 ? (
          films.map((film) => (
            <TableRow key={film.id}>
              <TableCell className="flex items-center gap-3 justify-center">
                <Link href={`/film/${film.id}`} className="hover:underline">
                  {film.title}
                </Link>
              </TableCell>
              <TableCell>{film.filmmaker}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    film.status === "Published" ? "success" : "destructive"
                  }
                >
                  {film.status}
                </Badge>
              </TableCell>
              <TableCell>{film.film_type}</TableCell>
              <TableCell>{film.release_date}</TableCell>
              <TableCell>{film.total_views}</TableCell>
              <TableCell className={film.total_earning > 0 && "text-green-500"}>
                {film.total_earning > 0 && "$"}
                {film.total_earning}
              </TableCell>
              <TableCell>
                <FilmDeleteDialog film={film} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="hover:bg-transparent">
            <TableCell className="flex items-center gap-3 justify-center">
              No films found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
