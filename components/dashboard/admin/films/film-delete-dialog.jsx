"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Delete02Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import { useDeleteFilmMutation } from "@/redux/store/api/adminApi";
import { toast } from "sonner";
import { useState } from "react";

export default function FilmDeleteDialog({ film }) {
  const [deleteFilm, { isLoading }] = useDeleteFilmMutation();
  const [open, setOpen] = useState(false);

  const handleDeleteFilm = async (e) => {
    e.preventDefault();
    
    try {
      await deleteFilm(film.id).unwrap();
      toast.success("Film deleted successfully");
      setOpen(false);
    } catch (error) {
      console.error("Error deleting film:", error);
      toast.error(error?.data?.message || "Failed to delete film");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-red-500"
        >
          <span>
            <HugeiconsIcon icon={Delete02Icon} />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-black">{film.title}</span> film and
            remove film data from your server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            variant="destructive" 
            onClick={handleDeleteFilm}
            disabled={isLoading}
          >
            {isLoading ? "Removing..." : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
