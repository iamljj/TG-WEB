// key为节点唯一属性值，类似id
export const arrayToJson = (array: Array<any>, key) => {
  return array.reduce((obj, curr) => {
    obj[curr[key]] = curr
    return obj
  }, {})
}

// parentKey为所属父级关联值
export const arrayToTree = (array: Array<any>, parentKey) => {
  let json = arrayToJson(array, 'nodeCode')
  return array.reduce((prev, curr) => {
    let pKey = curr[parentKey]
    let parent = json[pKey]
    if (parent) {
      parent.children ? parent.children.push(curr) : (parent.children = [curr])
    } else {
      prev.push(curr)
    }
    return prev
  }, [])
}

// 扁平化对象中的key属性
let keyArr = []
export const flatObjectKey = (obj: Object) => {
  for (const key in obj) {
    if (key == 'nodeCode') {
      keyArr.push(obj[key])
    }
    if (key == 'children') {
      obj[key].forEach((child) => {
        flatObjectKey(child)
      })
    }
  }
  return keyArr
}
