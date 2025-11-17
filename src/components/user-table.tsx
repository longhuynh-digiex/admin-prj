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
} from "@/components/ui/alert-dialog";
import { getUserTableColumns } from "@/constant/user-table-data";
import { TUser } from "@/dtos/user/user.dto";
import useDebounce from "@/hooks/use-debounce";
import { useDeleteUser, useGetUsers } from "@/queries/useUser";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "./data-table";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

function UserTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [queryString, setQueryString] = useState("");
  const [userToDelete, setUserToDelete] = useState<TUser | null>(null);
  const debounceQuery = useDebounce(queryString, 600);
  const { data, isError, error, isSuccess, isPending } = useGetUsers(
    pageIndex,
    pageSize,
    debounceQuery
  );
  const deleteUserMutation = useDeleteUser();

  const handlePageChange = (newPageIndex: number, newPageSize: number) => {
    setPageIndex(newPageIndex);
    setPageSize(newPageSize);
  };

  const handleDeleteClick = (user: TUser) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUserMutation.mutateAsync(userToDelete.id.toString());
      toast.success("User deleted", {
        description: `${userToDelete.username} has been deleted successfully.`,
      });
      setUserToDelete(null);
    } catch (error: any) {
      toast.error("Delete failed", {
        description:
          error?.message || "Failed to delete user. Please try again.",
      });
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  const columns = getUserTableColumns({ onDeleteClick: handleDeleteClick });

  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <div className=''>
        <Input
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
          placeholder='Search User'
        />
      </div>
      {isPending && (
        <div>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-8 w-[200px] rounded-md gap-1.5 px-3 has-[>svg]:px-2.5'></Skeleton>
            </div>
          </div>
          <Skeleton className='w-full h-10' />
        </div>
      )}
      {isSuccess && (
        <DataTable
          data={data.data.users}
          columns={columns}
          total={data.data.total}
          pageIndex={pageIndex}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={(open) => !open && handleCancelDelete()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user{" "}
              <span className='font-semibold text-foreground'>
                {userToDelete?.username}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelDelete}
              disabled={deleteUserMutation.isPending}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleteUserMutation.isPending}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              {deleteUserMutation.isPending && (
                <LoaderCircle className='animate-spin' />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default UserTable;
