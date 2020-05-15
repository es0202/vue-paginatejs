import Paginate from './vue-paginatejs.vue'
export default Paginate
if(typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vue-paginatejs', Paginate);
}
