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
