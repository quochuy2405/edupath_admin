import { IFormik } from "~/components/organisms/tag/Add";
import AxiosServices from "../axiosServices";
import { ITag } from "~/types/tag";

export const addTag = (data: IFormik) => {
  return new AxiosServices().post(`admin/tag/add`, data);
};

export const allTags = () => {
  return new AxiosServices().get<ITag[]>(`admin/tag/all`);
};

export const removeTag = (_id: string) => {
  return new AxiosServices().delete<ITag>(`admin/tag/remove/${_id}`);
};
