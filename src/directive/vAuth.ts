
export const vAuth = {
  created(el,binding) {
    if (binding.value) {
      el.style.display = 'inherit'
    } else {
      el.style.display = "none";
    }
  },

  unmounted(el) {

  },
}













