import { reactive, ref } from 'vue'
import { options } from './activityData'
import { binddealer, bind } from '@/service/dealer'

export const tableData = ref([])
export const getDealer = ref()
export const daleteDealer = ref([])
export const getdealer = async (params) => {
  let { data } = await binddealer(params)
  let business = null
  if (data.code == 200) {
    business = data.data
  } else {
    business = []
  }
  return business
}
export const BindDealer = async (params) => {
  let { data } = await bind(params)
  if (data.code == 200) {
    return data
  } else {
    return data
  }
}


