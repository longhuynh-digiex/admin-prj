"use client";
import { useGetUsers } from "@/queries/useUser";
import { DataTable, DragHandle } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { TUser } from "@/dtos/user/user.dto";
import { Badge } from "./ui/badge";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const columns: ColumnDef<TUser>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "username",
    header: "User Name",
    cell: ({ row }) => {
      return <div>{row.original.username}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.image!}
        width={60}
        height={60}
        alt='image'
      />
    ),
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      <div className='w-32'>
        <div className='text-muted-foreground px-1.5'>{row.original.age}</div>
      </div>
    ),
  },

  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
            size='icon'
          >
            <IconDotsVertical />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-32'
        >
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
function UserTable() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { refetch, data, isPending, isError, error, isSuccess } = useGetUsers(
    pageIndex,
    pageSize
  );

  console.log({
    data,
  });

  const handlePageChange = (pageIndex: number, pageSize: number) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };
  useEffect(() => {
    refetch();
  }, [pageIndex, pageSize]);
  if (isPending) return null;
  if (isError) return <div>{error.message}</div>;
  return (
    isSuccess && (
      <DataTable
        data={data.data.users}
        columns={columns}
        total={data.data.total}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    )
  );
}

export default UserTable;
