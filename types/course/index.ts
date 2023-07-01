export enum ELevel {
  NONE,
  ALL_LEVELS,
  BEGINNER,
  INTERMEDIATE,
  EXPERT
}

export enum ELanguage {
  NONE,
  VIETNAMESE,
  ENGLISH
}

export enum EApprovalsStatus {
  NONE,
  ACCEPT,
  DENY,
  WATTING
}

export enum ECourseStatus {
  NONE,
  WATTING,
  OPEN,
  CLOSE,
  FULL_ACCESS
}

export type ICourse = {
  author_id: Schema.Types.ObjectId
  detail_id: Schema.Types.ObjectId
  course_level: ELevel
  course_language: ELanguage
  course_name: string
  approval_status: EApprovalsStatus
  course_fee: number
  description: string
  course_status: ECourseStatus
  fullname: string
  detail_name: string
}
