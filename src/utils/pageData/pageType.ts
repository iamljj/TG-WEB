// login
export interface User {
  phone: number
  vercode: string
}
export interface Rules {
  phone: (
    | {
        required: boolean
        message: string
        trigger: string
        min?: undefined
        max?: undefined
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
        required?: undefined
      }
  )[]
  vercode: {
    required: boolean
    message: string
    trigger: string
  }[]
}
export interface tableType {
  name: string
  prop: string
  width: number
}

export interface tableDataType {
  name: string
  phone: string
  time: string
}
