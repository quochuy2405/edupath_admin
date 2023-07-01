import { IMyDocument } from "..";

export type IChapter = {
  course_id: Schema.Types.ObjectId;
  chapter_name: string;
  course_name: string;
} & IMyDocument;
