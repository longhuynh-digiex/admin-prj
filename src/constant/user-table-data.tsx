import { TUser } from "@/dtos/user/user.dto";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserTableColumnsProps = {
  onDeleteClick: (user: TUser) => void;
};

export const getUserTableColumns = ({
  onDeleteClick,
}: UserTableColumnsProps): ColumnDef<TUser>[] => [
  {
    id: "No.",
    header: () => "No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
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
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => {
      return <div>{row.original.firstName}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => {
      return <div>{row.original.lastName}</div>;
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
    cell: ({ row }) => (
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
          <DropdownMenuItem
            variant='destructive'
            onClick={() => onDeleteClick(row.original)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
