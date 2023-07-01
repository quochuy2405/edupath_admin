import { IUser } from "~/types";
import AxiosServices from "../axiosServices";

export const allUsers = () => {
  return new AxiosServices().get<IUser[]>("/admin/user/all");
};
