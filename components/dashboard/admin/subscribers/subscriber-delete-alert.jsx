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
import { useDeleteSubscriberMutation } from "@/redux/store/api/adminApi";
import { toast } from "sonner";
import { useState } from "react";

export default function SubscriberDeleteAlert({ subscriber = {} }) {
  const { user_id, full_name } = subscriber;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteSubscriber] = useDeleteSubscriberMutation();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteSubscriber(user_id).unwrap();
      toast.success("Subscriber deleted successfully");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete subscriber");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent text-red-500"
          asChild
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
            This action cannot be undone. This will permanently remove{" "}
            <span className="font-black text-primary">{full_name || "This User"}</span>{" "}
            subscription and remove data from your database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
