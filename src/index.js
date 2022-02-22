import Pagination from "./Pagination";

const PaginationComponent = {
    install(Vue) {
        Vue.component("v-pagination", Pagination);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(PaginationComponent);
}

export default PaginationComponent;