import { TUser } from "./user.dto";

export type GetUsersResponseDTO = {
  total: number;
  skip: number;
  limit: number;
  users: TUser[];
};
