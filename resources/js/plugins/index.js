import filters from "./filters";

export default {
    install(vue, options){
        Object.keys(filters).forEach(key => vue.filter(filters[key].name, filters[key].methode))
    }
}
