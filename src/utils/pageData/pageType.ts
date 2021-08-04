// login
export interface User {
  phone: string
  code: string
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
  code: {
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
  id: number
  name: string
  type: string
  price: string
  img: string
  base: string
}
export interface formType {
  id: string
  name: string
  type: string
  price: string
  img: string
  base: string
}

export interface optionData {
  value: string
  label: string
}

export interface rulesChange {
  id: {
    require: boolean
    message: string
    trigger: string
  }[]
  name: {
    required: boolean
    message: string
    trigger: string
  }[]
  type: {
    required: boolean
    message: string
    trigger: string
  }[]
  price: {
    required: boolean
    message: string
    trigger: string
  }[]
  img: {
    required: boolean
    message: string
    trigger: string
  }[]
  base: {
    required: boolean
    message: string
    trigger: string
  }[]
}
