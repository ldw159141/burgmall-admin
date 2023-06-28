import router from "@/router"
import axios from "axios"
import Element from "element-ui"


const request = axios.create({
    
    baseURL: "http://localhost:8282/",
    timeout: 8000,
    headers: {
        
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem("token") 
    return config
})


request.interceptors.response.use(
    response => {

        let res = response.data
        if (res.code === 200) {
          //  Element.Message.success(res.msg)
             return response.data
        } else {

            //重定向||权限不足
            //这里在引入spring security之后报错了，返回code但是没办法正常处理
            if (res.code === 301 || res.code === 401) {
               Element.Message.error(res.mg)
                router.push({ path: "/login" })
                return Promise.resolve(res.msg)
            } else {
                Element.Message.error(!res.msg?"系统异常，请联系管理员":res.msg)
                return Promise.resolve(res.msg)
                
            }
            
        }

        
    },
    error => {
        let res="账号或者密码错误"
        Element.Message.error(res)
         return error
     
    }
)

export default request