import router from "@/router"
import axios from "axios"
import Element from "element-ui"


const request = axios.create({
    
    baseURL: "http://localhost:8282/",
    timeout: 5000,
    headers: {
        
    }
})

request.interceptors.request.use(config => {
    config.headers["token"] = localStorage.getItem("token")
    return config
})


request.interceptors.response.use(
    response => {

        let res = response.data
        if (res.code === 200) {
           // ElementUI.Message.success(res.msg)
             return response.data
        } else {
            //重定向||权限不足
            if (res.code === 301 || res.code === 401) {
               Element.Message.error(res.msg)
                router.push({ path: "/login" })
                return Promise.resolve(res.msg)
            } else {
                Element.Message.error(!res.msg?"系统异常，请联系管理员":res.msg)
                return Promise.resolve(res.msg)
                
            }
            
        }

      

       
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

export default request