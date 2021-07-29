import dayjs from 'dayjs'
// https://www.npmjs.com/package/dayjs
/**
 * dateFormat
 * @date 2021-07-24
 * @param {string | number | Date} date Date.now()
 * @param {string} forMat YYYY-MM-DD
 * @returns {string}
 */
export const dateFormat = (date: string | number | Date = Date.now(), forMat = 'YYYY-MM-DD') => {
  if (forMat == '0') {
    forMat = 'YYYY-MM-DD HH:mm:ss'
  }
  return dayjs(date).format(forMat)
}
