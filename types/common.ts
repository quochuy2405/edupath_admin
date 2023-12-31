export type TMainTypes = {
  _id: number
  type_name: string
  is_active: number
  is_deleted: number
  createAt: Date
  updateAt: Date
}
export type TSection = {
  _id: string
  maintype_id: string
  section_name: string
  createAt: Date
  updateAt: Date
}

export type TInvoice = {
  _id: string
  fullname?: string
  course_name?: string
  total_amount: string
  payment_status: string
  createAt: Date
  updateAt: Date
}
export type TReview = {
  _id: string
  user_name: string
  course_name: string
  content: string
  course_review_star: string
  createAt: Date
  updateAt: Date
}
export type TDetails = {
  _id: string
  section_id: string
  tag_id: string
  detail_name: string
  createAt: Date
  updateAt: Date
}
export type TTag = {
  _id: string
  tag_name: string
  createAt: Date
  updateAt: Date
}

export type TCourse = {
  _id: number
  courseTypeID: number
  course_name: string
  courseImage: string
  courseFee: number
  description: string
  courseState: number
  commission: number
  is_active: number
  is_deleted: number
  createAt: Date
  updateAt: Date
}

export type TChapter = {
  _id: number
  courseID: number
  chapter_name: string
  is_active: number
  is_deleted: number
  createAt: Date
  updateAt: Date
}
export type TLesson = {
  _id: number
  chapterID: number
  lesson_name: string
  lessonURL: string
  duration: number
  is_active: number
  is_deleted: number
  createAt: Date
  updateAt: Date
}
