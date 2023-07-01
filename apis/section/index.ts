import { IFormik } from "~/components/organisms/section/Add";
import AxiosServices from "../axiosServices";
import { ISection } from "~/types/section";

export const addSection = (data: IFormik) => {
  return new AxiosServices().post(`admin/section/add`, data);
};

export const allSections = () => {
  return new AxiosServices().get<ISection[]>(`admin/section/all`);
};

export const removeSection = (_id: string) => {
  return new AxiosServices().delete<ISection>(`admin/section/remove/${_id}`);
};
