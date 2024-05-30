import SvgIconG from './SvgIconG/index.vue';
//全局对象  //流水线注册全局组件
const allGlobalComponents: any = { SvgIconG }
export default {
    install(app : any){
        Object.keys(allGlobalComponents).forEach(key => {
            app.component(key, allGlobalComponents[key]);
        })
    }
}