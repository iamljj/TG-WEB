export const storage = {
  set(key: string, data, control = true) {
    try {
      if (control) {
        sessionStorage.setItem(key, JSON.stringify(data))
      } else {
        localStorage.setItem(key, JSON.stringify(data))
      }
      return true
    } catch (e) {
      console.warn(e)
      return false
    }
  },
  get(key: string, control = true) {
    try {
      let res
      if (control) {
        res = JSON.parse(sessionStorage.getItem(key))
      } else {
        res = JSON.parse(localStorage.getItem(key))
      }
      return res
    } catch (e) {
      console.warn(e)
    }
  },
  remove(key: string, control = true) {
    try {
      if (control) {
        sessionStorage.removeItem(key)
      } else {
        localStorage.removeItem(key)
      }
      return true
    } catch (e) {
      console.warn(e)
      return false
    }
  },
  clear(control = true) {
    try {
      if (control) {
        sessionStorage.clear()
      } else {
        localStorage.clear()
      }
      return true
    } catch (e) {
      console.warn(e)
      return false
    }
  }
}
