export interface IQuessionnaire {
  quessionnaire_id: string
  mri_year: string
  status: string
  user_id: string
  created_at: string
  updated_at: string
  dimensions: IDimension[]
}

export interface IDimension {
  dimension_id: string
  title: string
  in_short: string
  description: string
  code: string
  progress: number
  quessionaire_id: string
  created_at: string
  updated_at: string
  subDimensions: ISubDimension[]
}

export interface ISubDimension {
  sub_dimension_id: string
  title: string
  code: string
  score: number
  progress: number
  dimension_id: string
  created_at: string
  updated_at: string
  parameters: IParameter[]
}

export interface IParameter {
  parameter_id: string
  title: string
  code: string
  sub_dimension_id: string
  created_at: string
  updated_at: string
  answers: IAnswer[]
}

export interface IAnswer {
  answer_id: string
  title: string
  code: string
  description: string
  parameter_code: string
  parameter_id: string
  created_at: string
  updated_at: string
  indikators: IIndikator[]
}

export interface IIndikator {
  dataMappingId?: string
  indikator_id: string
  code: string
  is_checked: boolean
  description: string
  color_text: string
  answer_id: string
  created_at: string
  updated_at: string
}

export type IAnswerTable = IIndikatorTable[][]

export interface IIndikatorTable {
  dataMappingId: string | undefined
  indikator_id?: string
  code?: string
  is_checked?: boolean
  description?: string
  color_text?: string
  answer_id?: string
  created_at?: string
  updated_at?: string
}
