import { IFormik } from "~/components/organisms/detail/Add";
import AxiosServices from "../axiosServices";
import { IDetail } from "~/types/detail";

export const addDetail = (data: IFormik) => {
  return new AxiosServices().post(`admin/detail/add`, data);
};

export const allDetails = () => {
  return new AxiosServices().get<IDetail[]>(`admin/detail/all`);
};

export const removeDetail = (_id: string) => {
  return new AxiosServices().delete<IDetail>(`admin/detail/remove/${_id}`);
};
